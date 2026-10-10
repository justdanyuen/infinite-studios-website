"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  className?: string;
  interval?: number;
  children?: ReactNode; // overlay content (e.g. a title)
};

export default function Slideshow({ images, className = "", interval = 5000, children }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <section className={`relative overflow-hidden bg-zinc-900 ${className}`}>
      {images.map((src, i) => (
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
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-black/60 to-black" />
      {children && <div className="relative h-full">{children}</div>}
    </section>
  );
}