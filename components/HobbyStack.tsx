"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Hobby } from "@/content/site";

const ART: Record<Hobby["art"], { bg: string; svg: React.ReactNode }> = {
  volleyball: {
    bg: "linear-gradient(160deg,#ffd35c,#f59e0b)",
    svg: (
      <g fill="none" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round">
        <circle cx="60" cy="60" r="34" fill="#fff" />
        <path d="M60 26c-8 14-8 30 0 44M26 60c14-6 30-4 44 6M94 60c-16 2-28 10-34 24M40 34c8 6 22 8 34 4M86 38c-6 12-4 26 4 36" />
      </g>
    ),
  },
  sport: {
    bg: "linear-gradient(160deg,#fb7185,#e11d48)",
    svg: (
      <g fill="#fff">
        <rect x="22" y="44" width="10" height="32" rx="3" />
        <rect x="34" y="36" width="10" height="48" rx="3" />
        <rect x="44" y="56" width="32" height="8" rx="2" />
        <rect x="76" y="36" width="10" height="48" rx="3" />
        <rect x="88" y="44" width="10" height="32" rx="3" />
      </g>
    ),
  },
  walks: {
    bg: "linear-gradient(160deg,#86efac,#16a34a)",
    svg: (
      <g>
        <path d="M22 96c18-4 14-24 32-28s20-22 38-26" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" />
        <path d="M92 22a12 12 0 0 1 12 12c0 10-12 22-12 22S80 44 80 34a12 12 0 0 1 12-12Z" fill="#fff" />
        <circle cx="92" cy="34" r="4.5" fill="#16a34a" />
      </g>
    ),
  },
  travel: {
    bg: "linear-gradient(160deg,#7dd3fc,#0284c7)",
    svg: (
      <g fill="#fff">
        <path d="M58 22c4 0 6 4 6 8v20l32 18v8l-32-10v18l10 8v6l-16-5-16 5v-6l10-8V66L20 76v-8l32-18V30c0-4 2-8 6-8Z" />
      </g>
    ),
  },
  minecraft: {
    bg: "linear-gradient(160deg,#a3e635,#4d7c0f)",
    svg: (
      <g stroke="#1a2e05" strokeWidth="2" strokeLinejoin="round">
        <path d="M60 24 94 42 60 60 26 42Z" fill="#65a30d" />
        <path d="M26 42 60 60v38L26 80Z" fill="#8b5a2b" />
        <path d="M94 42 60 60v38l34-18Z" fill="#6b4423" />
        <path d="M26 42 60 60 94 42v8L60 68 26 50Z" fill="#4d7c0f" />
      </g>
    ),
  },
  "counter-strike": {
    bg: "linear-gradient(160deg,#475569,#0f172a)",
    svg: (
      <g fill="none" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round">
        <circle cx="60" cy="60" r="26" />
        <path d="M60 22v18M60 80v18M22 60h18M80 60h18" />
        <circle cx="60" cy="60" r="3" fill="#fbbf24" stroke="none" />
      </g>
    ),
  },
};

/**
 * A small stack of hobby cards. The top card flies off and goes to the back
 * every few seconds (paused on hover/focus) or when clicked. No autoplay for
 * prefers-reduced-motion.
 */
export function HobbyStack({ hobbies }: { hobbies: Hobby[] }) {
  const [order, setOrder] = useState(() => hobbies.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const paused = useRef(false);

  const next = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(false);
    }, 380);
  }, [leaving]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && document.visibilityState === "visible") next();
    }, 3200);
    return () => window.clearInterval(id);
  }, [next]);

  const top = hobbies[order[0]];

  return (
    <div
      className="relative mx-auto h-[300px] w-[230px] sm:h-[320px] sm:w-[250px]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <button
        type="button"
        onClick={next}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        aria-label={`${top.name}. Show next hobby`}
        className="absolute inset-0 z-50 cursor-pointer rounded-3xl"
      />
      {order.map((hobbyIndex, depth) => {
        const hobby = hobbies[hobbyIndex];
        const art = ART[hobby.art];
        const isTop = depth === 0;
        const flying = isTop && leaving;
        const rotate = depth === 0 ? -2 : depth % 2 === 0 ? -6 - depth : 5 + depth;
        return (
          <figure
            key={hobby.name}
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden rounded-3xl border-4 border-surface shadow-[0_18px_40px_-18px_rgba(16,20,27,0.5)] transition-[transform,opacity] duration-[380ms] ease-out"
            style={{
              zIndex: hobbies.length - depth,
              opacity: depth > 3 ? 0 : 1,
              transform: flying
                ? "translate(115%, 8%) rotate(18deg)"
                : `translate(${depth * 6}px, ${depth * 4}px) rotate(${rotate}deg) scale(${1 - depth * 0.03})`,
              background: art.bg,
            }}
          >
            {hobby.photo ? (
              <Image src={hobby.photo} alt="" fill sizes="250px" className="object-cover" />
            ) : (
              <svg viewBox="0 0 120 120" className="absolute inset-x-0 top-[12%] mx-auto w-[70%]">
                {art.svg}
              </svg>
            )}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-10 text-lg font-semibold text-white">
              {hobby.name}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
