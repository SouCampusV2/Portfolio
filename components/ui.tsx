import type { ComponentProps } from "react";
import Link from "next/link";
import {
  ArrowLeft as PhArrowLeft,
  ArrowRight as PhArrowRight,
  ArrowUpRight as PhArrowUpRight,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { HeaderFrame } from "@/components/HeaderFrame";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VisitorPill } from "@/components/VisitorPill";

export function ExternalLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* Icons: Phosphor (phosphoricons.com), bold weight at small sizes. */
type IconProps = { className?: string };

export function ArrowUpRight({ className = "size-3.5" }: IconProps) {
  return <PhArrowUpRight aria-hidden="true" weight="bold" className={className} />;
}

export function ArrowRight({ className = "size-3.5" }: IconProps) {
  return <PhArrowRight aria-hidden="true" weight="bold" className={className} />;
}

export function ArrowLeft({ className = "size-3.5" }: IconProps) {
  return <PhArrowLeft aria-hidden="true" weight="bold" className={className} />;
}

/** "Download" arrow. */
export function ArrowDown({ className = "size-3.5" }: IconProps) {
  return <DownloadSimple aria-hidden="true" weight="bold" className={className} />;
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
    <HeaderFrame>
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          title="Yevhenii Stavytskyi · SouCampus"
          className="grid h-9 shrink-0 place-items-center rounded-full border border-line px-3 font-mono text-xs font-medium tracking-[0.06em] transition-colors hover:border-accent hover:text-accent"
        >
          YSS
        </Link>
        <nav aria-label="Main" className="flex min-w-0 items-center gap-1 sm:gap-3">
          {/* On phones the links scroll sideways instead of wrapping. */}
          <ul className="nav-scroll flex items-center gap-1 overflow-x-auto whitespace-nowrap text-sm text-muted">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link className="block rounded-full px-3 py-1.5 transition-colors hover:bg-ink/10 hover:text-ink" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-line" />
          <ThemeToggle />
        </nav>
      </div>
    </HeaderFrame>
  );
}

/** Full-width dark band; the content stays in the page column. */
export function SiteFooter() {
  return (
    <footer className="on-dark bg-[#17040a] text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 font-mono text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1">
          <p>© 2026 {site.name}</p>
          <p>{site.location}</p>
        </div>
        <VisitorPill />
      </div>
    </footer>
  );
}
