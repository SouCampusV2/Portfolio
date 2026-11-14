"use client";

import { ArrowsOut, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

/**
 * Muted looping preview. Downloads and plays only while on screen; with
 * prefers-reduced-motion it never autoplays and shows controls instead.
 * The button in the corner opens the recording at full size.
 */
export function PreviewVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [reduced, setReduced] = useState(false);
  const [open, setOpen] = useState(false);

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

  function show() {
    setOpen(true);
    ref.current?.pause();
    dialog.current?.showModal();
  }

  return (
    <>
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
      <button
        type="button"
        onClick={show}
        aria-label="Watch at full size"
        title="Watch at full size"
        className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
      >
        <ArrowsOut aria-hidden="true" weight="bold" className="size-4" />
      </button>
      {/* Native dialog: Esc and the backdrop close it, focus is trapped for free. */}
      <dialog
        ref={dialog}
        onClose={() => {
          setOpen(false);
          if (!reduced) ref.current?.play().catch(() => {});
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="video-dialog m-auto w-[min(96vw,1600px)] overflow-visible bg-transparent p-0"
      >
        {/* The full-size file is only requested once the dialog is opened. */}
        {open && (
          <video aria-label={alt} poster={poster} autoPlay muted loop playsInline controls className="w-full rounded-xl bg-black shadow-2xl">
            <source src={src} type="video/mp4" />
          </video>
        )}
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close"
          className="absolute -top-11 right-0 grid size-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          <X aria-hidden="true" weight="bold" className="size-4" />
        </button>
      </dialog>
    </>
  );
}
