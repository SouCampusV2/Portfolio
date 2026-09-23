import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { TechChip } from "@/components/TechIcon";

export const metadata: Metadata = {
  title: `Tech Stack — ${site.name}`,
  description: `Tools and technologies ${site.name} uses, grouped by area.`,
  alternates: { canonical: "/tech-stack" },
};

export default function TechStackPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 transition-transform group-hover:-translate-x-0.5">
          <path d="M13 8H3M7 4 3 8l4 4" />
        </svg>
        Back to home
      </Link>

      <h1 className="mt-8 text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-none tracking-[-0.03em]">
        Tech stack
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        The tools and technologies behind the projects on this site, grouped by area.
      </p>

      <div className="mt-12 divide-y divide-line border-y border-line">
        {site.tech.map((group) => (
          <Reveal key={group.category}>
            <section
              aria-labelledby={`tech-${group.category}`}
              className="grid gap-4 py-7 md:grid-cols-12 md:gap-8"
            >
              <h2
                id={`tech-${group.category}`}
                className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted md:col-span-3 md:pt-2"
              >
                {group.category}
              </h2>
              <ul className="flex flex-wrap gap-2 md:col-span-9">
                {group.items.map((name) => (
                  <li key={name}>
                    <TechChip name={name} size="md" />
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
