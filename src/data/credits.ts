import { cacheLife, cacheTag } from "next/cache";

export type Credit = {
  work: string; // song / album / project title
  artist: string;
  type?: string; // "Album", "EP", "Single"
  team: { member: string; role: string }[]; // who at Infinite worked on it, and as what
  year: number;
  accolades?: string[]; // e.g. "Grammy Nominee", "Billboard Hot 100"
  featured?: boolean; // show in the Music section on the home page
  cover?: string; // "/images/covers/x.jpg" (local) or a full https:// URL (e.g. from Spotify)
  links?: { spotify?: string; youtube?: string };
};

// ---------------------------------------------------------------------------
// Source: Google Sheet (must be shared as "Anyone with the link: Viewer").
// https://docs.google.com/spreadsheets/d/1jSf7d6pK0ZJNWXnjIecLfINaURxGPGPBNf79rSQzAIM
//
// Columns are matched by header text, so they can be reordered in the sheet:
//   Artist | Song / album title | Type | Year | Studio's role | Engineer |
//   Youtube Link | Spotify Link | Cover art file name | Feature on homepage? (Y/N) |
//   To Be Reviewed (Y = hidden from the site)
// Cover art, in order of preference:
//   1. "Cover art file name" cell with a full https:// image URL -> used as-is
//   2. "Cover art file name" cell with a file name -> public/images/covers/<name>
//   3. Blank cell + Spotify link -> artwork looked up from Spotify automatically
// ---------------------------------------------------------------------------
const SHEET_ID = "1jSf7d6pK0ZJNWXnjIecLfINaURxGPGPBNf79rSQzAIM";
const SHEET_GID = "0"; // the tab; "0" is the first tab
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

// Minimal RFC 4180 CSV parser (handles quoted fields, commas, and newlines in quotes)
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function rowsToCredits(rows: string[][]): Credit[] {
  // The header row is the first one whose first cell is "Artist" (title rows above it are skipped)
  const headerIdx = rows.findIndex((r) => r[0]?.trim().toLowerCase() === "artist");
  if (headerIdx === -1) throw new Error("Credits sheet: header row starting with 'Artist' not found");

  const headers = rows[headerIdx].map((h) => h.trim().toLowerCase());
  const col = (prefix: string) => headers.findIndex((h) => h.startsWith(prefix));
  const idx = {
    artist: col("artist"),
    work: col("song"),
    type: col("type"),
    year: col("year"),
    role: col("studio"),
    engineer: col("engineer"),
    youtube: col("youtube"),
    spotify: col("spotify"),
    cover: col("cover"),
    featured: col("feature"),
    review: headers.findIndex((h) => h.includes("review")),
  };

  const get = (r: string[], i: number) => (i >= 0 ? (r[i] ?? "").trim() : "");

  return rows
    .slice(headerIdx + 1)
    .filter((r) => get(r, idx.artist) && get(r, idx.work))
    // Rows flagged "To Be Reviewed" (Y) stay hidden until the flag is cleared
    .filter((r) => !get(r, idx.review).toUpperCase().startsWith("Y"))
    .map((r): Credit => {
      const engineer = get(r, idx.engineer);
      const role = get(r, idx.role);
      const spotify = get(r, idx.spotify);
      const youtube = get(r, idx.youtube);
      const cover = get(r, idx.cover);
      return {
        artist: get(r, idx.artist),
        work: get(r, idx.work),
        type: get(r, idx.type) || undefined,
        year: Number.parseInt(get(r, idx.year), 10) || 0,
        team: engineer || role ? [{ member: engineer, role }] : [],
        featured: get(r, idx.featured).toUpperCase().startsWith("Y"),
        cover: !cover ? undefined : /^https?:\/\//i.test(cover) ? cover : `/images/covers/${cover}`,
        links: spotify || youtube ? { spotify: spotify || undefined, youtube: youtube || undefined } : undefined,
      };
    });
}

// Looks up album/track artwork from a Spotify link via Spotify's public oEmbed
// endpoint (no API key). Cached per link for days, since artwork rarely changes.
async function fetchSpotifyCover(spotifyUrl: string): Promise<string | undefined> {
  "use cache";
  cacheLife("days");

  try {
    const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`);
    if (!res.ok) return undefined;
    const data: { thumbnail_url?: string } = await res.json();
    return data.thumbnail_url;
  } catch {
    return undefined;
  }
}

// Tag for on-demand refresh: revalidateTag(CREDITS_CACHE_TAG, ...) clears it immediately.
export const CREDITS_CACHE_TAG = "credits";

// Sheet edits show up within about 30-60 seconds, without a redeploy:
//   stale: 30      -> a visitor's browser reuses its copy for at most 30s (Next.js minimum)
//   revalidate: 30 -> the server re-reads the sheet at most every 30s, in the background
//                     (the visit that triggers it still gets the previous copy)
//   expire: 300    -> after 5 quiet minutes, the next visit waits for fresh data
async function fetchSheetCredits(): Promise<Credit[]> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 30, expire: 300 });
  cacheTag(CREDITS_CACHE_TAG);

  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error(`Credits sheet fetch failed: ${res.status}`);
  const credits = rowsToCredits(parseCsv(await res.text()));

  // Fill in missing cover art from Spotify (lookups run in parallel)
  return Promise.all(
    credits.map(async (c) =>
      c.cover || !c.links?.spotify ? c : { ...c, cover: await fetchSpotifyCover(c.links.spotify) },
    ),
  );
}

// Pages call this instead of fetching directly.
export async function getCredits(): Promise<Credit[]> {
  try {
    const credits = await fetchSheetCredits();
    return credits.sort((a, b) => b.year - a.year);
  } catch (err) {
    // Not cached, so the next request retries the sheet
    console.error(err);
    return [];
  }
}

// Newest featured credits first, for the home page
export async function getFeaturedCredits(limit = 4): Promise<Credit[]> {
  return (await getCredits()).filter((c) => c.featured).slice(0, limit);
}
