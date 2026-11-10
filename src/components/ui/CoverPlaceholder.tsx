// Default artwork for credits with no cover: a minimal vinyl record.
// Fills its (square) parent; scales cleanly from small thumbnails to large tiles.
export default function CoverPlaceholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900"
    >
      <svg viewBox="0 0 100 100" className="h-3/5 w-3/5 text-zinc-500">
        {/* Disc */}
        <circle cx="50" cy="50" r="48" fill="currentColor" opacity="0.55" />
        {/* Grooves */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* Label */}
        <circle cx="50" cy="50" r="16" className="fill-sky-400/70" />
        {/* Spindle hole */}
        <circle cx="50" cy="50" r="2.5" className="fill-zinc-950" />
      </svg>
    </div>
  );
}
