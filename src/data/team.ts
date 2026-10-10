export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  headshot?: string; // path under /public, e.g. "/images/team/jane.jpg"
};

export const team: TeamMember[] = [
  {
    name: "Engineer Name",
    role: "Owner / Head Engineer",
    bio: "A paragraph about this engineer: background, how they got into audio, the genres and artists they've worked with, what they bring to a session, and what they enjoy most about the work. Three to five sentences reads well next to a headshot.",
  },
  {
    name: "Engineer Name",
    role: "Recording & Mix Engineer",
    bio: "A paragraph about this engineer: background, specialties, notable projects, and their approach in the studio. Three to five sentences reads well next to a headshot.",
  },
];

export const servicesBlurb =
  "Infinite Studios provides recording, tracking, mixing, and mastering for artists, bands, and producers, along with mobile recording for sessions outside the studio.";