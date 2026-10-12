export type Credit = {
  work: string;      // song / album / project title
  artist: string;
  team: { member: string; role: string }[]; // who at Infinite worked on it, and as what
  year: number;
  accolades?: string[]; // e.g. "Grammy Nominee", "Billboard Hot 100"
  featured?: boolean;   // show in the Music section on the home page
  links?: { spotify?: string; youtube?: string };
};

const credits: Credit[] = [
  {
    work: "Album Title",
    artist: "Artist Name",
    team: [
      { member: "Engineer Name", role: "Recording" },
      { member: "Engineer Name", role: "Mixing" },
    ],
    year: 2025,
    accolades: ["Example Award Nominee"],
    featured: true,
  },
  {
    work: "Single Title",
    artist: "Artist Name",
    team: [{ member: "Engineer Name", role: "Mixing, Mastering" }],
    year: 2024,
    featured: true,
  },
  {
    work: "EP Title",
    artist: "Artist Name",
    team: [{ member: "Engineer Name", role: "Tracking" }],
    year: 2023,
    featured: true,
  },
];

// Pages call this instead of reading the array directly. Later, replace the body
// with a fetch from a spreadsheet or CMS and nothing else has to change.
export async function getCredits(): Promise<Credit[]> {
  return [...credits].sort((a, b) => b.year - a.year);
}

// Newest featured credits first, for the home page
export async function getFeaturedCredits(limit = 4): Promise<Credit[]> {
  return (await getCredits()).filter((c) => c.featured).slice(0, limit);
}
