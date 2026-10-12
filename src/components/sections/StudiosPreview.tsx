import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { featuredStudioSlugs, getStudio, type Studio } from "@/data/studios";

const spaces = featuredStudioSlugs
  .map(getStudio)
  .filter((s): s is Studio => s !== undefined);

export default function StudiosPreview() {
  return (
    <Section eyebrow="The Space" title="Studios">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {spaces.map((s) => (
          <Link key={s.slug} href={`/studios/${s.slug}`} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-800">
              {s.images[0] && (
                <Image
                  src={s.images[0]}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <p className="mt-3 font-medium">{s.name}</p>
          </Link>
        ))}
      </div>
      <Link href="/studios" className="mt-10 inline-block text-sm font-medium underline underline-offset-4">
        View all
      </Link>
    </Section>
  );
}
