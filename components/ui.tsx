import type { ComponentProps } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function ExternalLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ArrowUpRight({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

export function ArrowRight({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowDown({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 3v9M4 8.5 8 12.5l4-4" />
    </svg>
  );
}

/** Section shell: a mono label column beside the content on wide screens. */
export function Section({
  id,
  label,
  action,
  children,
}: {
  id: string;
  label: string;
  /** Optional link under the label, e.g. "View all". */
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className="scroll-mt-20 border-t border-line py-14 sm:py-20"
    >
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="flex items-baseline justify-between gap-4 md:col-span-3 md:flex-col md:justify-start md:gap-3 md:pt-1.5">
          <h2
            id={`${id}-label`}
            className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted"
          >
            {label}
          </h2>
          {action}
        </div>
        <div className="min-w-0 md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="grid size-9 place-items-center rounded-full border border-line font-mono text-xs font-medium transition-colors hover:border-ink"
        >
          YS
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-3">
          <ul className="flex gap-3 text-sm text-muted sm:gap-5">
            <li>
              <Link className="transition-colors hover:text-ink" href="/#projects">
                Work
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-ink" href="/#experience">
                Experience
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-ink" href="/tech-stack">
                Stack
              </Link>
            </li>
          </ul>
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-line" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 border-t border-line py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between">
        <p>© 2026 {site.name}</p>
        <p>{site.location}</p>
      </div>
    </footer>
  );
}
