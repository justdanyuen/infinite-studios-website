import Link from "next/link";
import Section from "@/components/ui/Section";

export default function History() {
  return (
    <div className="relative">
      {/* Logo divider straddling the hero / History boundary */}

      <Section eyebrow="Our Story" title="History" className="bg-zinc-950 pt-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="aspect-[4/3] rounded-lg bg-zinc-800" />
          <div>
            <div className="space-y-6 text-lg leading-8 text-zinc-300">
              <p>
                Founded in <b>January 1977</b>, Infinite Studios has spent nearly five decades cementing its
                legacy as one of the most respected and notable tracking, mixing, and mastering
                facilities in the music industry. Originally established in the heart of the vibrant
                East Bay music scene, the studio quickly evolved from a passionate local creative space
                into a premier commercial recording powerhouse.
              </p>
              <p>
                Throughout its formative years in the late 1970s and 1980s, Infinite Studios became a
                trusted haven for legendary soul, funk, and R&amp;B figures. The studio&apos;s elite sonic
                environment attracted iconic artists and industry heavyweights who helped build the
                legacy of the space, hosting sessions for <b>Sly Stone, Tower of Power, Bobby Brown, Tony!
                Toni! Toné!, En Vogue, The Whispers, and Verdine White.</b>
              </p>
              <p>
                This foundational success paved the way for Infinite Studios to become the definitive
                epicenter of the historic 1990s West Coast hip-hop boom. Renowned for its pristine
                engineering and signature <em>Bay Area slap</em>, the facility served as a foundational creative
                headquarters for rap royalty, including <b>Tupac Shakur, E-40, Too $hort, and Digital
                Underground.</b>
              </p>
              <p>
                Today, operating out of its flagship facility in <b>Alameda, California</b>, Infinite Studios
                continues to build upon its rich history. The studio remains dedicated to delivering
                world-class production, mixing, and mastering services—bridging the gap between its
                legendary musical roots and cutting-edge modern audio technology.
              </p>
            </div>
            {/* <Link
              href="/about#history"
              className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
            >
              Read the full story
            </Link> */}
          </div>
        </div>
      </Section>
    </div>
  );
}
