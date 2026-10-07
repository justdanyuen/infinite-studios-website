"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  "/images/hero/banner1.jpg",
  "/images/hero/banner2.jpg",
  "/images/hero/banner3.jpg",
  "/images/hero/banner4.jpg",
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-[85vh] min-h-[500px] items-end overflow-hidden bg-zinc-900"
    >
      {slides.map((src, i) => (
        <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover saturate-[0.7] transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
            }`}
        />
        ))}

        {/* Even dim across the whole photo */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Extra shade behind the navbar */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Extra shade at the bottom behind the title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-300">Recording Studio</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white md:text-7xl">
          Infinite Studios
        </h1>
      </div>
    </section>
  );
}