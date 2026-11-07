import Section from "@/components/ui/Section";
import Slideshow from "@/components/ui/Slideshow";
import Dropdown from "@/components/ui/Dropdown";
import HighlightList from "@/components/studios/HighlightList";
import type { GearStudio } from "@/data/studios";

export default function GearLayout({ studio }: { studio: GearStudio }) {
  const hasImages = studio.images.length > 0;
  const hasHighlights = !!studio.highlights?.length;

  // First half of the groups in the left column, the rest in the right
  const half = Math.ceil(studio.categories.length / 2);
  const columns = [studio.categories.slice(0, half), studio.categories.slice(half)];

  return (
    <>
      {hasImages && (
        <Slideshow images={studio.images} className="h-[70svh] min-h-[420px]">
          <div className="h-full px-6">
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-end pb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-400">Studio</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {studio.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-zinc-300">{studio.tagline}</p>
            </div>
          </div>
        </Slideshow>
      )}

      <Section
        eyebrow={hasImages ? "Inventory" : "Studio"}
        title={hasImages ? "Equipment list" : studio.name}
      >
        <div className={hasHighlights ? "grid gap-12 md:grid-cols-[3fr_2fr]" : undefined}>
          <p className="text-lg leading-8 text-zinc-300">{studio.intro}</p>
          {hasHighlights && <HighlightList highlights={studio.highlights!} />}
        </div>

        {/* Two independent columns so opening a group never reflows the other column */}
        <div className="mt-16 grid items-start gap-x-16 md:grid-cols-2">
          {columns.map((col, c) => (
            <div key={c} className="border-zinc-800 max-md:[&:first-child]:border-t md:border-t">
              {col.map((cat) => (
                <Dropdown key={cat.name} label={cat.name} meta={String(cat.items.length)}>
                  <dl className="divide-y divide-zinc-800 border-t border-zinc-800">
                    {cat.items.map((item, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 py-3"
                      >
                        <span className="font-mono text-xs leading-5 text-zinc-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <dt className="text-base text-white">
                          {item.name}
                          {item.qty && item.qty > 1 && (
                            <span className="ml-2 font-mono text-zinc-400">×{item.qty}</span>
                          )}
                        </dt>
                        <dd className="text-right text-xs uppercase tracking-[0.15em] text-zinc-400">
                          {item.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Dropdown>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
