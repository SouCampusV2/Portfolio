"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const stamped = document.documentElement.dataset.theme;
  if (stamped === "light" || stamped === "dark") return stamped;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Clip for the incoming theme at progress p (0 → 1): everything on the
 * top-right side of a diagonal line that sweeps from the top-right corner to
 * the bottom-left one. The polygon extends past the viewport so the edge
 * stays a straight line the whole way.
 */
function diagonal(p: number) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const d = p * (w + h); // the line is x - y = w - d
  const far = 3 * (w + h);
  return `polygon(${w - d - h}px ${-h}px, ${far}px ${-h}px, ${far}px ${2 * h}px, ${w - d + 2 * h}px ${2 * h}px)`;
}

/**
 * Sun/moon toggle. Starts from the system theme; a click stamps and remembers
 * a choice. Where the View Transitions API exists (and motion is allowed) the
 * new theme sweeps across the page diagonally.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(currentTheme());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  function apply() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  function toggle() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      apply();
      return;
    }
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [diagonal(0), diagonal(1)] },
          {
            duration: 1100,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }

  const icon = "absolute size-4 transition-all duration-500";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="relative grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-ink"
    >
      {/* Sun: visible in dark theme (click → light). */}
      <Sun aria-hidden="true" weight="bold" className={`${icon} ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"}`} />
      {/* Moon: visible in light theme (click → dark). */}
      <Moon aria-hidden="true" weight="bold" className={`${icon} ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
    </button>
  );
}
