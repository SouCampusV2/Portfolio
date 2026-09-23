"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AVATARS = ["/avatars/knight-1.webp", "/avatars/knight-2.webp", "/avatars/knight-3.webp"];
const SEEN_KEY = "yss-visited";

/**
 * "Visited by N people" with a stack of crystal-knight avatars.
 * Each browser is counted once (a localStorage flag); later visits only read
 * the number. Renders nothing until a real count arrives.
 */
export function VisitorPill() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    fetch("/api/visits", { method: seen ? "GET" : "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { count: number | null } | null) => {
        if (typeof data?.count !== "number") return;
        setCount(data.count);
        if (!seen) {
          try {
            localStorage.setItem(SEEN_KEY, "1");
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <div className="group inline-flex items-center gap-3 rounded-full border border-line bg-surface py-1 pl-1 pr-4 font-sans text-xs text-muted">
      <div className="flex" aria-hidden="true">
        {AVATARS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={28}
            height={28}
            className={`size-7 rounded-full object-cover ring-2 ring-surface transition-[margin] duration-300 ${
              i === 0 ? "" : "-ml-2.5 group-hover:ml-0.5"
            }`}
          />
        ))}
      </div>
      <span>
        Visited by{" "}
        <span className="font-medium text-ink tabular-nums">{count.toLocaleString("en-US")}</span>{" "}
        {count === 1 ? "person" : "people"}
      </span>
    </div>
  );
}
