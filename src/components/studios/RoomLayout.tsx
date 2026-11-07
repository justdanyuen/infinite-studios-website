import Section from "@/components/ui/Section";
import Slideshow from "@/components/ui/Slideshow";
import HighlightList from "@/components/studios/HighlightList";
import type { RoomStudio } from "@/data/studios";
import { site } from "@/lib/site";

export default function RoomLayout({ studio }: { studio: RoomStudio }) {
  const paragraphs = Array.isArray(studio.description) ? studio.description : [studio.description];
  const hasHighlights = !!studio.highlights?.length;

  return (
    <>
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

      <Section eyebrow="Overview" title="About the space">
        <div className={hasHighlights ? "grid gap-12 md:grid-cols-[3fr_2fr]" : undefined}>
          <div className="space-y-6 text-lg leading-8 text-zinc-300">
            {paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          {hasHighlights && <HighlightList highlights={studio.highlights!} />}
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