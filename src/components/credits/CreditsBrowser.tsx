"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import CoverPlaceholder from "@/components/ui/CoverPlaceholder";
import type { Credit } from "@/data/credits";

function Accolades({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((a) => (
        <span key={a} className="rounded-sm border border-sky-400/40 px-2.5 py-0.5 text-xs text-sky-300">
          {a}
        </span>
      ))}
    </div>
  );
}

function TeamList({ team }: { team: Credit["team"] }) {
  return (
    <ul className="space-y-1">
      {team.map((t, i) => (
        <li key={i}>
          <span className="text-zinc-200">{t.member}</span>
          <span className="text-zinc-400">: {t.role}</span>
        </li>
      ))}
    </ul>
  );
}

function Listen({ links }: { links: Credit["links"] }) {
  if (!links?.spotify && !links?.youtube) return null;
  const cls = "underline underline-offset-4 transition-colors hover:text-sky-400";
  return (
    <span className="flex gap-4 text-sm text-zinc-300">
      {links.spotify && (
        <a href={links.spotify} target="_blank" rel="noopener noreferrer" className={cls}>
          Spotify
        </a>
      )}
      {links.youtube && (
        <a href={links.youtube} target="_blank" rel="noopener noreferrer" className={cls}>
          YouTube
        </a>
      )}
    </span>
  );
}

// Spotify serves each cover in several sizes under the same id; swap the 300px
// size code for the 640px one to get a sharper image for the preview.
const largeCover = (url: string) => url.replace("ab67616d00001e02", "ab67616d0000b273");

const previewSrc = (cover: string) => (cover.startsWith("http") ? largeCover(cover) : cover);

// Warm the browser cache with the large image (once per cover)
const preloaded = new Set<string>();
function preloadLarge(cover: string) {
  const src = previewSrc(cover);
  if (!cover.startsWith("http") || preloaded.has(src)) return;
  preloaded.add(src);
  const img = new window.Image();
  img.src = src;
}

function Cover({ c, size, onOpen }: { c: Credit; size: number; onOpen: (c: Credit) => void }) {
  const box = "relative shrink-0 overflow-hidden rounded-sm bg-zinc-800";

  if (!c.cover) {
    return (
      <div className={box} style={{ width: size, height: size }}>
        <CoverPlaceholder />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(c)}
      // Start downloading the large version before the click, so the preview is ready
      onPointerEnter={() => preloadLarge(c.cover!)}
      onFocus={() => preloadLarge(c.cover!)}
      aria-label={`View cover art for ${c.work} by ${c.artist}`}
      className={`${box} group cursor-zoom-in outline-none ring-sky-400 ring-offset-2 ring-offset-black focus-visible:ring-2`}
      style={{ width: size, height: size }}
    >
      <Image
        src={c.cover}
        alt=""
        fill
        sizes={`${size}px`}
        unoptimized={c.cover.startsWith("http")}
        className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110"
      />
    </button>
  );
}

function SharpCover({ credit }: { credit: Credit }) {
  const [loaded, setLoaded] = useState(false);
  const cover = credit.cover!;
  return (
    <Image
      src={previewSrc(cover)}
      alt={`${credit.work} cover art`}
      fill
      sizes="(min-width: 700px) 640px, 92vw"
      unoptimized={cover.startsWith("http")}
      onLoad={() => setLoaded(true)}
      className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

// Enlarged cover preview. Uses the native <dialog> element, so Esc closes it,
// focus stays inside while open, and the page behind is inert.
function CoverPreview({ credit, onClose }: { credit: Credit | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (credit && !dialog.open) dialog.showModal();
    if (!credit && dialog.open) dialog.close();
  }, [credit]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Clicking the dimmed backdrop (the dialog element itself) closes it
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-h-[92svh] w-[min(92vw,640px)] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm open:animate-[cover-in_250ms_ease-out] motion-reduce:open:animate-none"
    >
      {credit?.cover && (
        <figure>
          <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-zinc-900 shadow-2xl">
            {/* Already-loaded thumbnail shows instantly... */}
            {credit.cover.startsWith("http") && (
              <Image src={credit.cover} alt="" fill unoptimized className="object-cover" />
            )}
            {/* ...and the sharp version fades in over it once downloaded */}
            <SharpCover key={credit.cover} credit={credit} />
          </div>
          <figcaption className="mt-5 flex items-start justify-between gap-6">
            <div>
              <p className="text-xl font-semibold">{credit.work}</p>
              <p className="mt-1 text-base text-zinc-300">
                {credit.artist} · {credit.year}
                {credit.type && ` · ${credit.type}`}
              </p>
              <div className="mt-3">
                <Listen links={credit.links} />
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="cursor-pointer rounded-md border border-zinc-500 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-sky-400 hover:text-sky-400"
            >
              Close
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

function Meta({ c }: { c: Credit }) {
  if (!c.type && !c.links) return null;
  return (
    <div className="mt-1.5 flex items-center gap-4">
      {c.type && <span className="text-sm uppercase tracking-[0.15em] text-zinc-400">{c.type}</span>}
      <Listen links={c.links} />
    </div>
  );
}

// Lowercase and strip accents/punctuation so "too short" finds "Too $hort", "tone" finds "Toné"
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\$/g, "s")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// The three contribution types the role filter offers
const ROLES = ["Engineering", "Mixing", "Mastering"] as const;
type Role = (typeof ROLES)[number];

// Map the sheet's free-text roles ("Engineered, Mixed", "Recorded", "Mixing Engineer", ...)
// onto the three filter roles.
function rolesOf(c: Credit): Set<Role> {
  const text = c.team
    .map((t) => t.role.toLowerCase())
    .join(", ")
    .replace(/mixing engineer/g, "mixing"); // a mixing credit, not tracking
  const roles = new Set<Role>();
  if (/engineer|record|track/.test(text)) roles.add("Engineering");
  if (/mix/.test(text)) roles.add("Mixing");
  if (/master/.test(text)) roles.add("Mastering");
  return roles;
}

const labelClass = "text-xs font-medium uppercase leading-4 tracking-[0.2em] text-zinc-300";

const fieldClass =
  "h-14 rounded-md border border-zinc-500 bg-zinc-900 px-4 text-lg text-white outline-none transition-colors placeholder:text-zinc-400 hover:border-zinc-300 focus:border-sky-400 focus:ring-1 focus:ring-sky-400";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 text-zinc-300 ${className}`}>
      <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// Multi-select dropdown styled like the Year <select>: a button that opens a
// small panel of checkboxes. Closes on outside click or Esc.
function ContributionSelect({
  selected,
  counts,
  onToggle,
  matchAll,
  onMatchAll,
}: {
  selected: Role[];
  counts: Record<string, number>;
  onToggle: (r: Role) => void;
  matchAll: boolean;
  onMatchAll: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep the chosen roles in the fixed Engineering, Mixing, Mastering order
  const summary = selected.length
    ? ROLES.filter((r) => selected.includes(r)).join(", ")
    : "All contributions";

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-labelledby="contribution-label contribution-value"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldClass} flex w-full cursor-pointer items-center justify-between gap-3 text-left`}
      >
        <span id="contribution-value" className="truncate">
          {summary}
        </span>
        <Chevron className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 left-0 z-20 mt-2 rounded-md border border-zinc-600 bg-zinc-900 p-2 shadow-2xl">
          {ROLES.map((r) => (
            <label
              key={r}
              className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-base text-zinc-100 transition-colors hover:bg-white/5"
            >
              <input
                type="checkbox"
                checked={selected.includes(r)}
                onChange={() => onToggle(r)}
                className="h-4 w-4 cursor-pointer accent-sky-400"
              />
              <span className="flex-1">{r}</span>
              <span className="font-mono text-xs text-zinc-400">{counts[r]}</span>
            </label>
          ))}

          {/* Any / all: only meaningful with 2+ roles ticked */}
          {selected.length > 1 && (
            <div
              role="group"
              aria-label="Match"
              className="mt-2 flex items-center justify-between border-t border-zinc-700 px-3 pt-3 pb-1 text-xs uppercase tracking-[0.15em]"
            >
              <span className="text-zinc-400">Match</span>
              <div className="flex gap-1">
                {[
                  { label: "Any", value: false },
                  { label: "All", value: true },
                ].map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={matchAll === o.value}
                    onClick={() => onMatchAll(o.value)}
                    className={`cursor-pointer rounded-sm px-2.5 py-1 transition-colors ${
                      matchAll === o.value ? "bg-zinc-200 text-black" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CreditsBrowser({ credits }: { credits: Credit[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [matchAll, setMatchAll] = useState(false);
  const [preview, setPreview] = useState<Credit | null>(null);
  const deferredQuery = useDeferredValue(query);

  const years = useMemo(
    () => [...new Set(credits.map((c) => c.year).filter(Boolean))].sort((a, b) => b - a),
    [credits],
  );

  // Pre-build one searchable string per credit
  const creditRoles = useMemo(() => credits.map(rolesOf), [credits]);
  const roleCounts = useMemo(
    () => Object.fromEntries(ROLES.map((r) => [r, creditRoles.filter((set) => set.has(r)).length])),
    [creditRoles],
  );

  const toggleRole = (r: Role) =>
    setRoles((cur) => (cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r]));

  const index = useMemo(
    () =>
      credits.map((c) =>
        normalize([c.artist, c.work, c.year, c.type, ...c.team.map((t) => `${t.member} ${t.role}`)].join(" ")),
      ),
    [credits],
  );

  const results = useMemo(() => {
    const words = normalize(deferredQuery).split(" ").filter(Boolean);
    return credits.filter(
      (c, i) =>
        (!year || String(c.year) === year) &&
        (!roles.length ||
          (matchAll
            ? roles.every((r) => creditRoles[i].has(r))
            : roles.some((r) => creditRoles[i].has(r)))) &&
        words.every((w) => index[i].includes(w)),
    );
  }, [credits, index, creditRoles, deferredQuery, year, roles, matchAll]);

  const hasAccolades = credits.some((c) => c.accolades?.length);
  const filtering = Boolean(query || year || roles.length);

  return (
    <>
      {/* Filters: search, contribution, and year on one row (stacked on smaller screens) */}
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-4">
        <label className="flex min-w-0 flex-1 flex-col gap-2">
          <span className={labelClass}>Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Artist or title"
            className={fieldClass}
          />
        </label>

        <div className="flex flex-col gap-2 lg:w-64">
          <span id="contribution-label" className={labelClass}>
            Studio contribution
          </span>
          <ContributionSelect
            selected={roles}
            counts={roleCounts}
            onToggle={toggleRole}
            matchAll={matchAll}
            onMatchAll={setMatchAll}
          />
        </div>

        <label className="flex flex-col gap-2 lg:w-40">
          <span className={labelClass}>Year</span>
          <div className="relative">
            <select value={year} onChange={(e) => setYear(e.target.value)} className={`${fieldClass} w-full cursor-pointer appearance-none pr-10`}>
              <option value="">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <Chevron className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
          </div>
        </label>
      </div>

      <div className="mb-4 flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-zinc-400" aria-live="polite">
        <span>
          {results.length} of {credits.length} {credits.length === 1 ? "credit" : "credits"}
        </span>
        {filtering && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setYear("");
              setRoles([]);
              setMatchAll(false);
            }}
            className="cursor-pointer text-white underline underline-offset-4 transition-colors hover:text-sky-400"
          >
            Clear
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="border-t border-zinc-800 py-10 text-lg text-zinc-300">
          No credits match your search.
        </p>
      ) : (
        <>
          {/* Desktop: table */}
          <div className="hidden md:block">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="border-b border-zinc-800 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  <th className="py-3 pr-6 font-medium">Year</th>
                  <th className="py-3 pr-6 font-medium">Work</th>
                  <th className="py-3 pr-6 font-medium">Artist</th>
                  <th className="py-3 pr-6 font-medium">Team / Role</th>
                  {hasAccolades && <th className="py-3 font-medium">Accolades</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {results.map((c, i) => (
                  <tr key={i} className="align-top transition-colors hover:bg-white/[0.02]">
                    <td className="py-5 pr-6 font-mono text-zinc-400">{c.year}</td>
                    <td className="py-5 pr-6">
                      <div className="flex gap-4">
                        <Cover c={c} size={64} onOpen={setPreview} />
                        <div>
                          <p className="text-lg font-medium text-white">{c.work}</p>
                          <Meta c={c} />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 pr-6 text-zinc-300">{c.artist}</td>
                    <td className="py-5 pr-6">
                      <TeamList team={c.team} />
                    </td>
                    {hasAccolades && (
                      <td className="py-5">
                        <Accolades items={c.accolades} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <ul className="divide-y divide-zinc-800 border-y border-zinc-800 md:hidden">
            {results.map((c, i) => (
              <li key={i} className="space-y-2 py-5 text-base">
                <div className="flex items-start gap-4">
                  <Cover c={c} size={64} onOpen={setPreview} />
                  <div className="flex flex-1 items-baseline justify-between gap-4">
                    <p className="text-lg font-medium text-white">{c.work}</p>
                    <span className="font-mono text-sm text-zinc-400">{c.year}</span>
                  </div>
                </div>
                <p className="text-zinc-300">{c.artist}</p>
                <Meta c={c} />
                <TeamList team={c.team} />
                <Accolades items={c.accolades} />
              </li>
            ))}
          </ul>
        </>
      )}

      <CoverPreview credit={preview} onClose={() => setPreview(null)} />
    </>
  );
}
