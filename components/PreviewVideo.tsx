"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping preview. Downloads and plays only while on screen; with
 * prefers-reduced-motion it never autoplays and shows controls instead.
 */
export function PreviewVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-label={alt}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
      className="absolute inset-0 size-full object-cover object-top"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
