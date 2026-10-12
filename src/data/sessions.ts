export type SessionPhoto = {
  src: string; // path under /public
  alt: string;
};

// Shown in the "Recent Sessions" gallery on the home page, in order
export const sessionPhotos: SessionPhoto[] = [
  { src: "/images/sessions/sessions_img.jpg", alt: "Recording session in progress" },
  { src: "/images/sessions/mixing_img.jpg", alt: "Mixing at the console" },
  { src: "/images/sessions/mastering_img.jpg", alt: "Mastering session" },
  { src: "/images/studios/floating-gear/guitars.jpg", alt: "Guitars ready for tracking" },
  { src: "/images/studios/floating-gear/fenderamp.jpg", alt: "Fender amplifier" },
  { src: "/images/studios/studio-gear/keyboards.jpg", alt: "Keyboards in the studio" },
];
