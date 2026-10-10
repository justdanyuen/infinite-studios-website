export type Studio = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  images: string[]; // paths under /public; empty = gray placeholders
};

export const studios: Studio[] = [
  {
    slug: "control-room",
    name: "Control Room",
    tagline: "One-line hook for the room.",
    description:
      "Two or three sentences about the room: what it's built for, what makes it sound or feel different, and who it's ideal for.",
    highlights: ["Console / DAW", "Monitoring", "Key outboard", "Room size"],
    images: [],
  },
  {
    slug: "tracking-room",
    name: "Tracking Room",
    tagline: "One-line hook for the room.",
    description: "Placeholder description.",
    highlights: ["Square footage", "Ceiling height", "Isolation booths", "Instruments on hand"],
    images: [],
  },
  {
    slug: "equipment-room",
    name: "Equipment Room",
    tagline: "One-line hook for the room.",
    description: "Placeholder description.",
    highlights: ["Microphones", "Preamps", "Compressors", "Effects"],
    images: [],
  },
  {
    slug: "lounge",
    name: "Lounge",
    tagline: "One-line hook for the space.",
    description: "Placeholder description.",
    highlights: ["Seating", "Kitchen", "Wi-Fi", "Parking"],
    images: [],
  },
  {
    slug: "floating-gear",
    name: "Floating Gear",
    tagline: "Gear that moves between rooms.",
    description: "Placeholder description.",
    highlights: ["Item", "Item", "Item", "Item"],
    images: [],
  },
  {
    slug: "mobile-services",
    name: "Mobile Services",
    tagline: "We bring the studio to you.",
    description: "Placeholder description.",
    highlights: ["Remote recording", "Live sound", "Travel area", "Rig details"],
    images: [],
  },
];

// The navbar reads this, so array order = menu order
export const studioLinks = studios.map(({ slug, name }) => ({ slug, name }));

export const getStudio = (slug: string) => studios.find((s) => s.slug === slug);