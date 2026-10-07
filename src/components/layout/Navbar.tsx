"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { studioLinks } from "@/data/studios";
import { site } from "@/lib/site";

const BOOK_HREF = `mailto:${site.emails.booking}`;

const NAV_HEIGHT = 96; // h-24

// Accent color: swap sky-400 here, in linkBase, and in the row border to match the logo
const ACCENT_TEXT = "text-sky-400";

const linkBase =
  "text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-sky-400";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onStudioPage = pathname.startsWith("/studios");

  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studiosOpen, setStudiosOpen] = useState(false);

  // Turn the bar solid once the bottom of the hero scrolls up past the bar
  useEffect(() => {
    const check = () => {
      const hero = document.getElementById("hero");
      setPastHero(hero ? hero.getBoundingClientRect().bottom <= NAV_HEIGHT : true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  // Second row is open while hovering Studios, and always on /studios pages
  const rowOpen = studiosOpen || onStudioPage;
  const solid = !isHome || pastHero;

  const closeAll = () => {
    setMobileOpen(false);
    setStudiosOpen(false);
  };

  return (
    <>
      <header
        onMouseLeave={() => setStudiosOpen(false)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setStudiosOpen(false);
        }}
        className={`fixed inset-x-0 top-0 z-50 ${
          solid && !mobileOpen ? "bg-black transition-colors duration-500 ease-in-out" : "bg-transparent"
        }`}
      >
        {/* Main row */}
        <nav className="mx-auto flex h-24 max-w-6xl items-center justify-between px-6">
          {/* Logo: transparent icon + white wordmark */}
          <Link href="/" onClick={closeAll} className="relative z-50 flex shrink-0 items-center gap-3 md:gap-4">
            <Image
              src="/logo-dark.png"
              alt=""
              width={157}
              height={96}
              priority
              className="h-10 w-auto md:h-14"
            />
            <span className="whitespace-nowrap font-logo text-base font-light italic uppercase tracking-[0.18em] text-white md:text-3xl">
              Infinite Studios<sup className="ml-0.5 text-[0.4em]">®</sup>
            </span>
          </Link>

          <ul className="hidden items-center gap-10 text-zinc-100 md:flex">
            <li onMouseEnter={() => setStudiosOpen(true)}>
              <Link
                href="/studios"
                onFocus={() => setStudiosOpen(true)}
                onClick={closeAll}
                aria-expanded={rowOpen}
                className={`flex items-center gap-1.5 ${linkBase} ${onStudioPage || studiosOpen ? ACCENT_TEXT : ""}`}
              >
                Studios
                <svg
                  className={`h-3 w-3 transition-transform duration-500 ease-in-out ${studiosOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </Link>
            </li>
            <li onMouseEnter={() => setStudiosOpen(false)}>
              <Link href="/about" onClick={closeAll} className={`${linkBase} ${pathname === "/about" ? ACCENT_TEXT : ""}`}>
                About
              </Link>
            </li>
            <li onMouseEnter={() => setStudiosOpen(false)}>
              <Link href="/credits" onClick={closeAll} className={`${linkBase} ${pathname === "/credits" ? ACCENT_TEXT : ""}`}>
                Credits
              </Link>
            </li>
            <li onMouseEnter={() => setStudiosOpen(false)}>
              <a
                href={BOOK_HREF}
                className="rounded-full border border-white/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
              >
                Book a Session
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="relative z-50 h-6 w-7 shrink-0 md:hidden"
          >
            <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-white transition-transform duration-500 ease-in-out ${mobileOpen ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-white transition-transform duration-500 ease-in-out ${mobileOpen ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </nav>

        {/* Expanding studios row (desktop).
            Height animates via grid-rows 0fr → 1fr; the accent line lives on this wrapper
            so it travels down with the row and fades in alongside the labels. */}
        <div
          className={`hidden border-b transition-[grid-template-rows,border-color] duration-500 ease-in-out md:grid ${
            rowOpen ? "grid-rows-[1fr] border-sky-400/60" : "grid-rows-[0fr] border-transparent"
          }`}
        >
          <div className="overflow-hidden">
            <ul
              className={`mx-auto flex h-11 max-w-6xl items-center justify-center gap-x-10 px-6 transition-opacity duration-500 ease-in-out ${
                rowOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {studioLinks.map((s) => {
                const active = pathname === `/studios/${s.slug}`;
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/studios/${s.slug}`}
                      onClick={() => setStudiosOpen(false)}
                      tabIndex={rowOpen ? 0 : -1}
                      className={`whitespace-nowrap ${linkBase} ${active ? ACCENT_TEXT : "text-zinc-300"}`}
                    >
                      {s.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-black px-6 pb-12 pt-32 transition-opacity duration-500 ease-in-out md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="space-y-6">
          {[
            { href: "/studios", label: "Studios" },
            { href: "/about", label: "About" },
            { href: "/credits", label: "Credits" },
          ].map((item, i) => (
            <li
              key={item.href}
              className={`transition-all duration-700 ease-out ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: mobileOpen ? `${150 + i * 100}ms` : "0ms" }}
            >
              <Link href={item.href} onClick={closeAll} className="text-4xl font-semibold tracking-tight text-white">
                {item.label}
              </Link>
              {item.href === "/studios" && (
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-zinc-400">
                  {studioLinks.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/studios/${s.slug}`} onClick={closeAll} className="hover:text-white">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <a
          href={BOOK_HREF}
          className={`mt-10 inline-block rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-700 ease-out ${
            mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: mobileOpen ? "450ms" : "0ms" }}
        >
          Book a Session
        </a>
      </div>

      {/* Spacer so content clears the fixed bar on non-home pages (taller on /studios pages, where the second row stays open) */}
      {!isHome && <div className={onStudioPage ? "h-24 md:h-[calc(9.5rem+1px)]" : "h-24"} aria-hidden />}
    </>
  );
}