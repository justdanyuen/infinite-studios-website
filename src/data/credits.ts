export type Credit = {
  work: string;      // song / album / project title
  artist: string;
  team: { member: string; role: string }[]; // who at Infinite worked on it, and as what
  year: number;
  accolades?: string[]; // e.g. "Grammy Nominee", "Billboard Hot 100"
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
  },
  {
    work: "Single Title",
    artist: "Artist Name",
    team: [{ member: "Engineer Name", role: "Mixing, Mastering" }],
    year: 2024,
  },
  {
    work: "EP Title",
    artist: "Artist Name",
    team: [{ member: "Engineer Name", role: "Tracking" }],
    year: 2023,
  },
];

// Pages call this instead of reading the array directly. Later, replace the body
// with a fetch from a spreadsheet or CMS and nothing else has to change.
export async function getCredits(): Promise<Credit[]> {
  return [...credits].sort((a, b) => b.year - a.year);
}