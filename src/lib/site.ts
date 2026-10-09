// Public URL of the live site. Set NEXT_PUBLIC_SITE_URL in .env.local and in your
// hosting provider's env vars, e.g. NEXT_PUBLIC_SITE_URL=https://www.infinitestudios.com
// (no trailing slash). Falls back to localhost for local dev.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const site = {
  name: "Infinite Studios",
  tagline: "The Bay Area's premier recording studio",
  url: SITE_URL,
  address: {
    line1: "3132 Marina Drive",
    line2: "Alameda, CA, 94501",
    mapUrl: "https://maps.google.com/?q=Infinite+Studios", // TODO: real Maps link
  },
  phone: "(510) 521-0321",
  emails: {
    general: "record@infinitestudios.com",
    // booking: "booking@example.com",
  },
  socials: {
    instagram: "https://www.instagram.com/infinitestudios/",
    facebook: "https://www.facebook.com/TheInfinitestudios",
    // spotify: "", // leave empty to hide
  },
};

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

// Public, indexable routes used by src/app/sitemap.ts.
// Keep in sync with the folders in src/app. changeFrequency/priority are hints only.
export const PUBLIC_ROUTES: {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/studios", changeFrequency: "monthly", priority: 0.9 },
  { path: "/credits", changeFrequency: "weekly", priority: 0.8 },
  { path: "/music", changeFrequency: "weekly", priority: 0.7 }, // song library — rename to match your route
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];