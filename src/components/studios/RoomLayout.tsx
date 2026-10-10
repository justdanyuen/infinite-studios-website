import Section from "@/components/ui/Section";
import Slideshow from "@/components/ui/Slideshow";
import type { RoomStudio } from "@/data/studios";
import { site } from "@/lib/site";

export default function RoomLayout({ studio }: { studio: RoomStudio }) {
  return (
    <>
      <Slideshow images={studio.images} className="h-[70svh] min-h-[420px]">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400">Studio</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">{studio.name}</h1>
          <p className="mt-3 max-w-xl text-lg text-zinc-300">{studio.tagline}</p>
        </div>
      </Slideshow>

      <Section eyebrow="Overview" title="About the space">
        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <p className="text-lg leading-8 text-zinc-400">{studio.description}</p>
          <ul className="space-y-3 border-l border-zinc-800 pl-6">
            {studio.highlights.map((h, idx) => (
              <li key={idx} className="text-sm uppercase tracking-[0.15em] text-zinc-300">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={`mailto:${site.emails.general}?subject=${encodeURIComponent(`Booking inquiry: ${studio.name}`)}`}
          className="mt-12 inline-block text-xs font-medium uppercase tracking-[0.2em] text-white underline underline-offset-8 transition-colors hover:text-sky-400"
        >
          Book a Session
        </a>
      </Section>
    </>
  );
}