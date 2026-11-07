// Text fields support **bold** and *italic* (see src/components/ui/RichText.tsx).
// Use curly quotes (“ ”) inside strings so they don't need escaping.
export type TeamMember = {
  name: string;
  role: string;
  bio: string[]; // one string per paragraph
  credits?: string[]; // optional "Notable Collaborations & Engineering Credits" paragraphs
  headshot?: string; // path under /public, e.g. "/images/team/jane.jpg"
};

export const team: TeamMember[] = [
  {
    name: "Michael Denten",
    role: "Owner / Head Engineer",
    headshot: "/images/team/MichaelDenton.jpeg",
    bio: [
      "Michael Denten was born in the Bay Area of California, where his deep love for music began at a very young age. He first established himself as a performing musician in the **early 1970s** before transitioning behind the boards to become a full-time **recording, mixing, and mastering engineer**. Known for his *technical precision and creative ear*, Denten quickly became a trusted, highly reputable figure for some of the **most prolific artists to ever come out of the West Coast**.",
      "Denten cut his teeth working alongside the architects of funk and soul, engineering sessions for legendary figures like **Verdine White, Sly Stone, and Tower of Power**. Managing these heavy-hitting rhythm and horn sections early in his career sharpened his instinct for capturing dynamic live tracking and a *pristine, powerful low end*.",
      "While Denten went on to earn massive industry accolades as a **true hip-hop pioneer** who helped build the sonic foundation of West Coast rap, his trademark is his *deep creative versatility*. He is far more than a genre-specific engineer: his range spans landmark pop-R&B records and intricate Latin jazz recordings, capturing world-renowned percussionists like **Giovanni Hidalgo** with the same dedication and sonic mastery he brings to the culture of hip-hop.",
      "Throughout his exceptional history in the music industry, Michael Denten has lived by a simple, enduring philosophy: *“If you honor the music, the music will honor you.”*",
    ],
    credits: [
      "Michael Denten's engineering legacy spans iconic eras in American music. In the realms of funk, R&B, and jazz, he engineered and preserved the signature *“East Bay Soul”* horn arrangements for Oakland legends **Tower of Power**, tracked studio sessions with Earth, Wind & Fire's world-class bassist **Verdine White**, and worked closely with **Sly Stone** to capture his legendary Bay Area funk energy. He was also a key engineering and mixing contributor to **Bobby Brown** during his landmark, multi-platinum R&B era, and recorded master percussionist **Giovanni Hidalgo**, capturing intricate Latin jazz rhythms and acoustic instrumentation with precise clarity.",
      "As a definitive pioneer in hip-hop and rap, Denten's sonic architecture shaped the genre's history. He mixed the global, multi-platinum anthem *“I Got 5 On It”* by **Luniz** and provided crucial engineering and programming for **2Pac** on his posthumous multi-platinum releases. He remains a cornerstone of modern West Coast music, serving as the longtime engineer and mixer behind **E-40**'s biggest hits, including *“Choices (Yup)”* and *“Function”*, and mixing the massive collaborative single *“Big Subwoofer”* for the West Coast supergroup **Mount Westmore** (Snoop Dogg, Ice Cube, E-40, and Too $hort).",
    ],
  },
  {
    name: "Anthony Perez",
    role: "Audio Engineer",
    headshot: "/images/team/AnthonyPerez.png",
    bio: [
      "Born in Mountain View and raised in the small town of Morgan Hill, California, Anthony Perez grew up in a creative environment that encouraged *self-taught exploration* and a *deep curiosity for sound*. He began producing music in his **early teens**, a passion that led him to formalize his craft at the **Musicians Institute**.",
      "Immediately after graduating, Anthony joined the team at Infinite Studios in Alameda, working closely under the mentorship of veteran engineer **Michael Denten**. Stepping straight into high-stakes studio environments, he served as an **assistant engineer** on the breakout **Mount Westmore** supergroup single *“Big Subwoofer”* (Snoop Dogg, Ice Cube, E-40, and Too $hort).",
      "Anthony has since built a versatile range of experience across various session demands. His credits include assistant engineering across **E-40**'s subsequent projects, serving as an **assistant mastering engineer** on a full-length project for **P-Lo**, and tracking for global Punjabi icon **Diljit Dosanjh** (including the single *“Charmer”*). From running live instrumentation tracking to detailed vocal production, he continues to support an eclectic roster of artists at the facility, including Digital Underground legend **Money B** and blues legend **Billy Branch**.",
    ],
  },
];

export const servicesBlurb =
  "Infinite Studios provides recording, tracking, mixing, and mastering for artists, bands, and producers, along with mobile recording for sessions outside the studio.";
