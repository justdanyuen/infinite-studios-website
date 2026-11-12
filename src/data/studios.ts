type Base = {
  slug: string;
  name: string;
  tagline: string;
  images: string[]; // paths under /public; first one is used on the /studios overview card
};

// A highlight is either a plain label (placeholder) or a label with a list of items
export type Highlight = string | { label: string; items: string[] };

export type RoomStudio = Base & {
  kind: "room";
  description: string | string[]; // use an array for multiple paragraphs
  highlights?: Highlight[]; // omit to let the description span the full width
};

export type GearItem = { name: string; detail?: string; qty?: number };

export type GearStudio = Base & {
  kind: "gear";
  intro: string;
  highlights?: Highlight[]; // optional side dropdowns next to the intro
  categories: { name: string; items: GearItem[] }[];
};

export type Studio = RoomStudio | GearStudio;

export const studios: Studio[] = [
  {
    kind: "room",
    slug: "control-room",
    name: "Control Room",
    tagline: "State-of-the-art mixing with full Dolby Atmos monitoring.",
    description: [
      "The Control Room is a state-of-the-art mixing suite featuring premium audio gear and a legacy of hosting legendary artists. The space delivers high-end sonic quality for professional mixing, housing an elite Avid S6 console, Matrix preamps, and pristine Burl converters. For world-class playback translation, the room is equipped with top-of-the-line ATC SCM25A Mk2 speakers alongside a full Dolby Atmos Neumann monitoring system.",
      "Over the years, this premier studio has served as a creative home for an impressive roster of iconic talent, including Tupac, E-40, Shock G, Kehlani, Stick Figure, Collie Buddz, and many more.",
    ],
    highlights: [
      {
        label: "Console / DAW",
        items: ["Avid S6", "Pro Tools 2026.4", "Logic", "Reason 13", "WaveLab 13"],
      },
      {
        label: "Stereo Monitoring",
        items: ["ATC SCM25A Mk2", "Yamaha NS-10M", "Auratone"],
      },
      {
        label: "Dolby Atmos Monitoring",
        items: ["Neumann KH 120", "Neumann stereo subwoofer"],
      },
      {
        label: "Compressors",
        items: [
          "UREI LA-4A",
          "Universal Audio 1176",
          "Drawmer DL241 Dual Compressor",
          "Focusrite RED 3 Dual Compressor",
        ],
      },
      {
        label: "Preamps",
        items: [
          "Avalon U5",
          "API 512c",
          "Millennia HV-3D 8-Channel",
          "Millennia Twin Direct TD-1",
          "Telefunken V72",
          "Matrix Preamps",
          "Burl B80 Preamps",
          "Vintech X73 (×2)",
          "Avid Preamp",
          "True Systems P2 Analog Stereo Preamp",
        ],
      },
      {
        label: "Equalizers",
        items: [
          "Focusrite RED 2 Stereo Equalizer",
          "Pulse Techniques EQP-1A3 (×2)",
          "API 550b",
          "API 560",
          "Sonic Farm Masternaught Dual EQ",
          "IGS Tilt'n Bands Stereo Equalizer",
        ],
      },
      {
        label: "Channel Strips",
        items: ["Avalon VT-737 (×2)", "GML 2020 (×2)", "Neve 3314"],
      },
      {
        label: "External Effects",
        items: [
          "Eventide H9000",
          "Eventide Ultra-Harmonizer DSP7000",
          "Eventide Ultra-Harmonizer DSP4000",
          "Lexicon 224X Digital Reverberator",
          "Lexicon PCM 70",
          "Lexicon PCM 81",
          "Lexicon PCM 91",
          "Lexicon Model 200 Digital Reverb",
        ],
      },
    ],
    images: [
      // TODO: real control room photos
      "/images/studios/studio-gear/equipment.jpg",
      "/images/studios/studio-gear/equipment2.jpg",
    ],
  },
  {
    kind: "room",
    slug: "tracking-room",
    name: "Tracking Room",
    tagline: "A versatile live room for full bands, horn sections, and vocals.",
    description: [
      "The Tracking Room at Infinite Studios is engineered for ultimate versatility, built to handle everything from full horn sections to intimate vocal sessions. Drums tracked in this space sound exceptionally tight, delivering a pristine, punchy sound straight from the source.",
      "The room is acoustically treated with a hybrid “live end / dead end” design, allowing engineers to capture distinct sonic characteristics and natural room reflections depending entirely on the project's creative direction. Whether recording a live band or tracking a solo artist, the space provides the exact acoustic flexibility needed to shape the perfect sound.",
    ],
    images: [
      "/images/studios/tracking-room/isoroom.jpg",
      "/images/studios/tracking-room/isoroom2.jpg",
      "/images/studios/tracking-room/microphonefull.jpg",
    ],
  },
  {
    kind: "gear",
    slug: "equipment-room",
    name: "Equipment Room",
    tagline: "A deep collection of vintage and modern microphones.",
    intro:
      "The Equipment Room has full output access to the Control Room, providing extra recording space when needed. Our microphone collection spans classic tube, condenser, and ribbon mics alongside modern workhorses, from Neumann and Telefunken to Royer, Sony, and AKG.",
    highlights: [
      {
        label: "Computer",
        items: ["Mac Pro Tower (Intel 16-core Xeon W)"],
      },
      {
        label: "Chassis",
        items: [
          "Burl B80 Mothership",
          "Mutec Clock",
          "Avid MTRX",
          "Avid Sync IO",
          "Waves SoundGrid",
          "Waves DiGiGrid System",
          "Lexicon 224X",
          "Eventide H9000",
        ],
      },
    ],
    images: [
      "/images/studios/studio-gear/microphone.jpg",
      "/images/studios/studio-gear/vintageequip.jpg",
      "/images/studios/studio-gear/equipment3.jpg",
      "/images/studios/studio-gear/keyboards.jpg",
    ],
    categories: [
      {
        name: "Tube Condensers",
        items: [
          { name: "Neumann U 67", qty: 2 },
          { name: "Telefunken U47", qty: 2 },
          { name: "Telefunken M49", qty: 2 },
          { name: "Sony C-800G", qty: 2 },
          { name: "Sony C-37A", qty: 2 },
          { name: "AKG C 61 Nu-tube", qty: 2 },
        ],
      },
      {
        name: "Large-Diaphragm Condensers",
        items: [
          { name: "Neumann U 87 Ai" },
          { name: "Neumann U 87 Gold", detail: "Matched set" },
          { name: "Neumann U 89", qty: 2 },
          { name: "Sony C-37P" },
          { name: "AKG C 414 B-ULS Custom" },
          { name: "AKG C 414 B-ULS", qty: 2 },
          { name: "AKG C 414 E C12" },
          { name: "AKG C 414 EB C12", qty: 2 },
          { name: "Audio-Technica AT4050 CM5", qty: 2 },
          { name: "Audio-Technica AT4033a", qty: 2 },
          { name: "Sanken CU-41" },
        ],
      },
      {
        name: "Small-Diaphragm Condensers",
        items: [
          { name: "Neumann KM 84", detail: "Vintage", qty: 2 },
          { name: "Neumann KM 56", detail: "Vintage", qty: 2 },
          { name: "Neumann KM 254", detail: "Vintage", qty: 3 },
          { name: "Neumann KM 184", qty: 2 },
          { name: "AKG C 451 EB", qty: 4 },
          { name: "Audio-Technica AT4051", qty: 2 },
          { name: "Shure SM81", qty: 5 },
          { name: "Sennheiser MKH 8040", qty: 2 },
          { name: "DPA 4003", detail: "Matched set" },
          { name: "B&K 4011", detail: "Matched set" },
          { name: "Nakamichi CM-300" },
        ],
      },
      {
        name: "Ribbon",
        items: [
          { name: "Royer R-121", qty: 2 },
          { name: "Royer SF-12", detail: "Stereo" },
          { name: "RCA 77-DX", detail: "Vintage", qty: 2 },
          { name: "Beyerdynamic M 260", qty: 2 },
        ],
      },
      {
        name: "Dynamic",
        items: [
          { name: "Sennheiser MD 421 U-5", qty: 6 },
          { name: "Shure SM57", qty: 4 },
          { name: "Shure SM58", qty: 2 },
          { name: "Shure SM7B", qty: 2 },
          { name: "Shure 520DX Bullet" },
          { name: "AKG D 112" },
          { name: "AKG D 125" },
          { name: "AKG D 310 S" },
          { name: "Electro-Voice RE20" },
          { name: "Electro-Voice 664A", qty: 3 },
        ],
      },
      {
        name: "Handheld Condensers",
        items: [
          { name: "Neumann KMS 105" },
          { name: "Shure Beta 87C" },
          { name: "Shure SM85" },
        ],
      },
      {
        name: "Specialty & Other",
        items: [
          { name: "Neumann SM 269", detail: "Vintage stereo" },
          { name: "Crown PZM-30 GPG", detail: "Boundary" },
          { name: "Audio-Technica AT9900" },
          { name: "Shure 571" },
          { name: "Electro-Voice Sphere X 920", detail: "Vintage, Buchanan, Michigan" },
        ],
      },
    ],
  },
  {
    kind: "room",
    slug: "lounge",
    name: "Lounge",
    tagline: "A laid-back hybrid space for tracking, natural reverb, and downtime.",
    description: [
      "The Lounge is a comfortable hybrid space where recording capabilities meet the laid-back energy of a spot built to just chill. Directly connected to the main control room, this dual-purpose environment functions cleanly as a secondary tracking space and a natural reverb chamber, giving your drums an authentic, real live room ambiance.",
      "Far from a sterile booth, it is a relaxed place to decompress and unwind between intense takes, centered around a pair of comfortable green couches and a vintage Coke machine to keep the session fueled. Whether you are routing audio to capture rich physical reflections, cutting isolated tracks, or simply relaxing with a slice of pizza, The Lounge delivers the perfect balance of studio utility and low-stress comfort to keep the session moving.",
    ],
    images: [
      "/images/studios/lounge/couch.jpg",
      "/images/studios/lounge/kitchen.jpg",
      "/images/studios/lounge/cokemachine.jpg",
    ],
  },
  {
    kind: "gear",
    slug: "floating-gear",
    name: "Floating Gear",
    tagline: "Gear that moves between rooms.",
    intro: "Equipment available in any room on request. Placeholder intro text.",
    images: [
      "/images/studios/floating-gear/guitars.jpg",
      "/images/studios/floating-gear/fenderamp.jpg",
    ],
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

// Spaces featured on the home page, in display order
export const featuredStudioSlugs = ["tracking-room", "control-room", "lounge", "equipment-room"];

export const getStudio = (slug: string) => studios.find((s) => s.slug === slug);