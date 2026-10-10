type Base = {
  slug: string;
  name: string;
  tagline: string;
  images: string[]; // paths under /public; first one is used on the /studios overview card
};

export type RoomStudio = Base & {
  kind: "room";
  description: string;
  highlights: string[];
};

export type GearItem = { name: string; detail?: string; qty?: number };

export type GearStudio = Base & {
  kind: "gear";
  intro: string;
  categories: { name: string; items: GearItem[] }[];
};

export type Studio = RoomStudio | GearStudio;

export const studios: Studio[] = [
  {
    kind: "room",
    slug: "control-room",
    name: "Control Room",
    tagline: "One-line hook for the room.",
    description:
      "Two or three sentences about the room: what it's built for, what makes it sound or feel different, and who it's ideal for.",
    highlights: ["Console / DAW", "Monitoring", "Key outboard", "Room size"],
    images: [],
  },
  {
    kind: "room",
    slug: "tracking-room",
    name: "Tracking Room",
    tagline: "One-line hook for the room.",
    description: "Placeholder description.",
    highlights: ["Square footage", "Ceiling height", "Isolation booths", "Instruments on hand"],
    images: [],
  },
  {
    kind: "room",
    slug: "equipment-room",
    name: "Equipment Room",
    tagline: "One-line hook for the room.",
    description: "Placeholder description.",
    highlights: ["Microphones", "Preamps", "Compressors", "Effects"],
    images: [],
  },
  {
    kind: "room",
    slug: "lounge",
    name: "Lounge",
    tagline: "One-line hook for the space.",
    description: "Placeholder description.",
    highlights: ["Seating", "Kitchen", "Wi-Fi", "Parking"],
    images: [],
  },
  {
    kind: "gear",
    slug: "floating-gear",
    name: "Floating Gear",
    tagline: "Gear that moves between rooms.",
    intro: "Equipment available in any room on request. Placeholder intro text.",
    images: [],
    categories: [
      {
        name: "Microphones",
        items: [
          { name: "Microphone model", detail: "Type / pattern", qty: 2 },
          { name: "Microphone model", detail: "Type / pattern" },
        ],
      },
      {
        name: "Preamps",
        items: [{ name: "Preamp model", detail: "Channels / character" }],
      },
      {
        name: "Outboard",
        items: [{ name: "Compressor model", detail: "Type" }],
      },
    ],
  },
  {
    kind: "room",
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