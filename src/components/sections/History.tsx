import Link from "next/link";
import Section from "@/components/ui/Section";

export default function History() {
  return (
    <Section eyebrow="Our Story" title="History" className="bg-zinc-950">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="aspect-[4/3] rounded-lg bg-zinc-800" />
        <div>
          <p className="text-lg leading-8 text-zinc-400">
            How the studio started, key milestones, and where it is today.
          </p>
          <Link href="/about#history" className="mt-8 inline-block text-sm font-medium underline underline-offset-4">
            Read the full story
          </Link>
        </div>
      </div>
    </Section>
  );
}