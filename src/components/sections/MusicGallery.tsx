import Image from "next/image";
import CoverPlaceholder from "@/components/ui/CoverPlaceholder";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { getFeaturedCredits } from "@/data/credits";

export default async function MusicGallery() {
  const featured = await getFeaturedCredits();
  if (!featured.length) return null;

  return (
    <Section eyebrow="Selected Works" title="Music">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {featured.map((c, i) => (
          <div key={i}>
            <div className="relative aspect-square overflow-hidden rounded-sm bg-zinc-800">
              {c.cover ? (
                <Image
                  src={c.cover}
                  alt={`${c.work} cover art`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  unoptimized={c.cover.startsWith("http")}
                  className="object-cover"
                />
              ) : (
                <CoverPlaceholder />
              )}
            </div>
            <p className="mt-3 font-medium">{c.work}</p>
            <p className="text-sm text-zinc-300">
              {c.artist} · {c.year}
            </p>
            <div className="mt-2 flex gap-3 text-sm">
              {c.links?.spotify && (
                <a href={c.links.spotify} target="_blank" rel="noopener noreferrer" className="underline">
                  Spotify
                </a>
              )}
              {c.links?.youtube && (
                <a href={c.links.youtube} target="_blank" rel="noopener noreferrer" className="underline">
                  YouTube
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link href="/credits" className="mt-10 inline-block text-sm font-medium underline underline-offset-4">
        All credits
      </Link>
    </Section>
  );
}
