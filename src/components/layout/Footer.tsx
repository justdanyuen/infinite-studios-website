import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube, FaSpotify } from "react-icons/fa6";
import { studioLinks } from "@/data/studios";
import { site } from "@/lib/site";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/about#history", label: "History" },
  { href: "/credits", label: "Credits" },
  { href: "/#sessions", label: "Recent Sessions" },
];

const socials = [
  { href: site.socials.instagram, label: "Instagram", Icon: FaInstagram },
  { href: site.socials.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: site.socials.youtube, label: "YouTube", Icon: FaYoutube },
  { href: site.socials.spotify, label: "Spotify", Icon: FaSpotify },
].filter((s) => s.href);

const heading = "mb-5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500";
const link = "text-sm text-zinc-300 transition-colors duration-300 hover:text-sky-400";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-sky-400/60 bg-black">      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + address + contact */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo-dark.png" alt="" width={157} height={96} className="h-10 w-auto" />
              <span className="whitespace-nowrap font-logo text-lg font-light italic uppercase tracking-[0.18em] text-white">
                Infinite Studios<sup className="ml-0.5 text-[0.45em]">®</sup>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-zinc-400">{site.tagline}</p>

            <address className="mt-8 space-y-1 text-sm not-italic text-zinc-300">
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className={`block ${link}`}>
                {site.address.line1}
                <br />
                {site.address.line2}
              </a>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className={`block pt-3 ${link}`}>
                {site.phone}
              </a>
              <a href={`mailto:${site.emails.general}`} className={`block ${link}`}>
                {site.emails.general}
              </a>
              <a href={`mailto:${site.emails.booking}`} className={`block ${link}`}>
                {site.emails.booking} <span className="text-zinc-500">(booking)</span>
              </a>
            </address>
          </div>

          {/* Studios */}
          <nav aria-label="Studios">
            <h3 className={heading}>Studios</h3>
            <ul className="space-y-3">
              {studioLinks.map((s) => (
                <li key={s.slug}>
                  <Link href={`/studios/${s.slug}`} className={link}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className={heading}>Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Follow */}
          <div>
            <h3 className={heading}>Follow</h3>
            <ul className="flex gap-4">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors duration-300 hover:border-sky-400 hover:text-sky-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.emails.booking}`}
              className="mt-8 inline-block rounded-full border border-white/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <a href="#top" className="uppercase tracking-[0.2em] transition-colors hover:text-zinc-300">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}