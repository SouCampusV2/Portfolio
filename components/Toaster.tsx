"use client";

import { useEffect, useRef, useState } from "react";

const EVENT = "yss:toast";

/** Show a short message in the toast at the bottom of the screen. */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }));
}

/** Small pop-up at the bottom centre; one message at a time, gone after ~2.5 s. */
export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const onToast = (e: Event) => {
      timers.current.forEach(clearTimeout);
      setMessage((e as CustomEvent<string>).detail);
      setVisible(true);
      timers.current = [
        window.setTimeout(() => setVisible(false), 2500),
        window.setTimeout(() => setMessage(null), 2800),
      ];
    };
    window.addEventListener(EVENT, onToast);
    return () => {
      window.removeEventListener(EVENT, onToast);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] z-[80] flex justify-center px-4"
    >
      {message && (
        <div
          className={`flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-bg shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-accent">
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
          {message}
        </div>
      )}
    </div>
  );
}
