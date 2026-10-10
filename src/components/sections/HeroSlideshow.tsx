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
    <section id="hero" className="relative h-[92svh] min-h-[560px] overflow-hidden bg-black">
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
      {/* Dissolve the bottom of the photo into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-black/60 to-black" />
    </section>
  );
}