import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RoomLayout from "@/components/studios/RoomLayout";
import GearLayout from "@/components/studios/GearLayout";
import { studios, getStudio } from "@/data/studios";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return studios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = getStudio(slug);
  return studio ? { title: studio.name, description: studio.tagline } : {};
}

export default async function StudioPage({ params }: Props) {
  const { slug } = await params;
  const studio = getStudio(slug);
  if (!studio) notFound();

  const i = studios.indexOf(studio);
  const prev = studios[(i - 1 + studios.length) % studios.length];
  const next = studios[(i + 1) % studios.length];

  return (
    <main>
      {studio.kind === "gear" ? <GearLayout studio={studio} /> : <RoomLayout studio={studio} />}

      <nav className="mx-auto flex max-w-6xl justify-between px-6 pb-16 text-xs uppercase tracking-[0.2em]">
        <Link href={`/studios/${prev.slug}`} className="text-zinc-400 hover:text-sky-400">
          ← {prev.name}
        </Link>
        <Link href={`/studios/${next.slug}`} className="text-zinc-400 hover:text-sky-400">
          {next.name} →
        </Link>
      </nav>
    </main>
  );
}