import Section from "@/components/ui/Section";
import type { GearStudio } from "@/data/studios";

export default function GearLayout({ studio }: { studio: GearStudio }) {
  return (
    <Section eyebrow="Studio" title={studio.name}>
      <p className="max-w-2xl text-lg leading-8 text-zinc-400">{studio.intro}</p>

      <div className="mt-16 space-y-14">
        {studio.categories.map((cat) => (
          <div key={cat.name}>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-sky-400">{cat.name}</h2>
            <dl className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
              {cat.items.map((item, i) => (
                <div key={i} className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 py-3 md:grid-cols-[2.5rem_1fr_1fr]">
                  <span className="font-mono text-xs leading-5 text-zinc-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="text-sm text-white">
                    {item.name}
                    {item.qty && item.qty > 1 && <span className="ml-2 font-mono text-zinc-500">×{item.qty}</span>}
                  </dt>
                  {item.detail && (
                    <dd className="col-start-2 text-sm text-zinc-400 md:col-start-auto">{item.detail}</dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}