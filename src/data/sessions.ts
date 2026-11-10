export type SessionPhoto = {
  src: string; // path under /public
  alt: string;
};

// Shown in the "Recent Sessions" gallery on the home page, in order
// Empty for now: this will be filled from a separate image gallery.
// The section is hidden on the home page while the list is empty.
export const sessionPhotos: SessionPhoto[] = [];
