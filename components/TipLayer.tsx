"use client";

import { useEffect, useRef, useState } from "react";

type Tip = { text: string; x: number; y: number; below: boolean };

/**
 * One tooltip for every element with a `data-tip` attribute (skill chips).
 * Fixed-positioned so it is never clipped by scrolling rows like the marquee;
 * shows on hover, keyboard focus and tap, hides on leave, blur and scroll.
 */
export function TipLayer() {
  const [tip, setTip] = useState<Tip | null>(null);
  const current = useRef<Element | null>(null);

  useEffect(() => {
    const show = (el: HTMLElement) => {
      current.current = el;
      const r = el.getBoundingClientRect();
      const below = r.top < 64;
      const half = 140;
      const x = Math.min(Math.max(r.left + r.width / 2, half + 8), innerWidth - half - 8);
      setTip({ text: el.dataset.tip ?? "", x, y: below ? r.bottom + 8 : r.top - 8, below });
    };
    const hide = () => {
      current.current = null;
      setTip(null);
    };
    const onOver = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.("[data-tip]") as HTMLElement | null;
      if (el?.dataset.tip) {
        if (el !== current.current) show(el);
      } else if (current.current && e.type !== "focusin") {
        hide();
      }
    };
    const onOut = (e: FocusEvent) => {
      if (e.target === current.current) hide();
    };
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("focusin", onOver);
    document.addEventListener("focusout", onOut);
    addEventListener("scroll", hide, { passive: true, capture: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("focusin", onOver);
      document.removeEventListener("focusout", onOut);
      removeEventListener("scroll", hide, { capture: true });
    };
  }, []);

  if (!tip) return null;
  return (
    <div
      role="tooltip"
      className={`pointer-events-none fixed z-[70] max-w-[280px] -translate-x-1/2 rounded-md bg-ink px-2.5 py-1.5 text-center text-xs leading-snug text-bg shadow-lg ${
        tip.below ? "" : "-translate-y-full"
      }`}
      style={{ left: tip.x, top: tip.y }}
    >
      {tip.text}
    </div>
  );
}
