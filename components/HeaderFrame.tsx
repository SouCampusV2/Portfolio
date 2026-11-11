"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The sticky header bar. While a full-width cover (the hero, marked with
 * `data-cover-top`) is still under it, the bar is transparent with white
 * text, so the gradient reaches the top of the screen. Once the cover has
 * scrolled away, the bar gets its normal background back.
 */
export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Only the home page starts on a cover; this keeps the first paint right.
  const [overCover, setOverCover] = useState(pathname === "/");

  useEffect(() => {
    const cover = document.querySelector("[data-cover-top]");
    if (!cover) {
      setOverCover(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setOverCover(entry.isIntersecting), {
      // Count the cover as "under the header" until its bottom passes the bar.
      rootMargin: "-64px 0px 0px 0px",
    });
    io.observe(cover);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header
      data-over-cover={overCover || undefined}
      className="site-header sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md transition-colors duration-300"
    >
      {children}
    </header>
  );
}
