import Dropdown from "@/components/ui/Dropdown";
import type { Highlight } from "@/data/studios";

// Side column of spec groups: plain labels, or expandable dropdowns with item lists
export default function HighlightList({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="self-start border-t border-zinc-800">
      {highlights.map((h, idx) =>
        typeof h === "string" ? (
          <p
            key={idx}
            className="border-b border-zinc-800 py-4 text-xs uppercase tracking-[0.2em] text-zinc-300"
          >
            {h}
          </p>
        ) : (
          <Dropdown key={idx} label={h.label}>
            <ul className="space-y-2 text-zinc-200">
              {h.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Dropdown>
        ),
      )}
    </div>
  );
}
