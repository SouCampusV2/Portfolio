"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Crossfades through still images. Stays on the first one with reduced motion. */
export function Slides({ images }: { images: { src: string; alt: string }[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % images.length), 3200);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((img, n) => (
        <Image
          key={img.src}
          src={img.src}
          alt={n === i ? img.alt : ""}
          fill
          quality={92}
          sizes="(min-width: 1024px) 1080px, 100vw"
          className={`object-cover transition-opacity duration-700 ${n === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </>
  );
}
