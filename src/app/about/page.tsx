import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/ui/Section";
import RichText from "@/components/ui/RichText";
import { team, servicesBlurb } from "@/data/team";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the engineers behind Infinite Studios.",
};

export default function AboutPage() {
  return (
    <main>
      <Section eyebrow="About" title="The Team">
        <div className="space-y-20 md:space-y-28">
          {team.map((member, i) => (
            <article key={i} className="grid items-start gap-10 md:grid-cols-[3fr_2fr] md:gap-16">
              {/* Headshot: on top on mobile, right side on desktop */}
              <div className="relative order-first aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-zinc-800 md:sticky md:top-32 md:order-last md:justify-self-end">
                {member.headshot && (
                  <Image
                    src={member.headshot}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-[center_15%]"
                  />
                )}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-400">{member.role}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {member.name}
                </h2>
                <div className="mt-6 space-y-5 text-lg leading-8 text-zinc-300">
                  {member.bio.map((para, j) => (
                    <p key={j}>
                      <RichText text={para} />
                    </p>
                  ))}
                </div>

                {member.credits && (
                  <div className="mt-12 border-t border-zinc-800 pt-10">
                    <h3 className="text-xs uppercase tracking-[0.25em] text-sky-400">
                      Notable Collaborations &amp; Engineering Credits
                    </h3>
                    <div className="mt-5 space-y-5 text-lg leading-8 text-zinc-300">
                      {member.credits.map((para, j) => (
                        <p key={j}>
                          <RichText text={para} />
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Services" title="What we do">
        <p className="max-w-2xl text-lg leading-8 text-zinc-300">{servicesBlurb}</p>
        <a
          href={`mailto:${site.emails.general}`}
          className="mt-8 inline-block text-xs font-medium uppercase tracking-[0.2em] text-white underline underline-offset-8 transition-colors hover:text-sky-400"
        >
          Book a Session
        </a>
      </Section>
    </main>
  );
}