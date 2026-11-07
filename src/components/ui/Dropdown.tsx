"use client";

import { useId, useState, type ReactNode } from "react";

// Expandable row with an animated open/close.
// Height animates via grid-template-rows (0fr -> 1fr), which works in all modern browsers.
export default function Dropdown({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string; // small secondary text after the label, e.g. an item count
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-zinc-800">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full cursor-pointer items-center justify-between py-4 text-left text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:text-sky-400 ${
          open ? "text-sky-400" : "text-white"
        }`}
      >
        <span>
          {label}
          {meta && <span className="ml-3 font-mono tracking-normal text-zinc-400">{meta}</span>}
        </span>
        <span
          aria-hidden
          className={`ml-4 text-base leading-none transition-transform duration-300 ease-out ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div
            className={`pb-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
