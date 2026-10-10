import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";

export default function AboutBlurb() {
  return (
    <div className="relative">
      {/* Logo floating on the seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex -translate-y-1/2 justify-center"
      >
        <Image
          src="/logo-dark.png"
          alt=""
          width={157}
          height={96}
          className="h-auto w-16 drop-shadow-[0_0_18px_rgba(56,189,248,0.25)]"
        />
      </div>

      <Section eyebrow="Welcome" title="About the Studio">
        <p className="max-w-2xl text-lg leading-8 text-zinc-400">
          Short description of the studio: who it's for, what it offers, and what makes it
          different. Two or three sentences.
        </p>
        <Link href="/about" className="mt-8 inline-block text-sm font-medium underline underline-offset-4">
          More about us
        </Link>
      </Section>
    </div>
  );
}