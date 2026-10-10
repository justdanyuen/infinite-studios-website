import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { studios } from "@/data/studios";

export const metadata: Metadata = {
  title: "Studios",
  description: "Rooms, gear, and services at Infinite Studios.",
};

export default function StudiosIndex() {
  return (
    <main>
      <Section eyebrow="Infinite Studios" title="Our Spaces">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((s) => (
            <Link key={s.slug} href={`/studios/${s.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-800">
                {s.images[0] && (
                  <Image
                    src={s.images[0]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover saturate-[0.7] transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <h2 className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors group-hover:text-sky-400">
                {s.name}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}