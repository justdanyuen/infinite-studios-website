import Link from "next/link";
import Section from "@/components/ui/Section";

export default function AboutBlurb() {
  return (
    <Section eyebrow="Welcome" title="About the Studio">
      <p className="max-w-2xl text-lg leading-8 text-zinc-400">
        Short description of the studio: who it's for, what it offers, and what makes it
        different. Two or three sentences.
      </p>
      <Link href="/about" className="mt-8 inline-block text-sm font-medium underline underline-offset-4">
        More about us
      </Link>
    </Section>
  );
}