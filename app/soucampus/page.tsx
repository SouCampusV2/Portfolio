import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { PreviewVideo } from "@/components/PreviewVideo";
import { TechChip } from "@/components/TechIcon";
import { ArrowUpRight, ExternalLink, Section } from "@/components/ui";

const cs = site.soucampusCase;
const project = site.projects.find((p) => p.caseStudy === "/soucampus")!;

export const metadata: Metadata = {
  title: `${cs.title} case study — ${site.name}`,
  description: cs.tagline,
  alternates: { canonical: "/soucampus" },
};

// Pixel "S" (5 × 7). Blocks drop in bottom-up, like building in Minecraft.
const S = [".XXXX", "X....", "X....", ".XXX.", "....X", "....X", "XXXX."];
const blocks = S.flatMap((row, y) =>
  [...row].flatMap((c, x) => (c === "X" ? [{ x, y }] : [])),
).sort((a, b) => b.y - a.y || a.x - b.x);

function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <div className="relative" style={{ width: 5 * 25, height: 7 * 25 }}>
          {blocks.map((b, i) => (
            <span
              key={`${b.x}-${b.y}`}
              className="intro-block absolute size-[22px] rounded-[2px]"
              style={{
                left: b.x * 25,
                top: b.y * 25,
                animationDelay: `${i * 55}ms`,
                background: "#f66a0a",
                boxShadow:
                  "inset -3px -3px 0 rgba(0,0,0,.22), inset 3px 3px 0 rgba(255,255,255,.28)",
              }}
            />
          ))}
        </div>
        <p
          className="intro-word text-3xl font-bold tracking-[-0.03em]"
          style={{ color: "#f66a0a" }}
        >
          SouCampus
        </p>
      </div>
    </div>
  );
}

export default function SouCampusCaseStudy() {
  const video = project.media?.kind === "video" ? project.media : null;
  return (
    <>
      <Intro />
      <main id="main" className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
          >
            <path d="M13 8H3M7 4 3 8l4 4" />
          </svg>
          All projects
        </Link>

        <header className="mt-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">
            Case study
          </p>
          <h1 className="mt-3 text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            {cs.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {cs.tagline}
          </p>
          {project.link && (
            <ExternalLink
              href={project.link.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              {project.link.label}
              <ArrowUpRight />
            </ExternalLink>
          )}
        </header>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {cs.facts.map((f) => (
            <div key={f.label} className="bg-surface p-4 sm:p-6">
              <dt className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-accent">
                {f.label}
              </dt>
              <dd className="mt-2 text-base font-semibold sm:text-lg">{f.value}</dd>
            </div>
          ))}
        </dl>

        {video && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-line">
            <div className="relative aspect-[16/10] w-full max-w-full">
              <PreviewVideo src={video.src} poster={video.poster} alt={video.alt} />
            </div>
          </div>
        )}

        <div className="mt-6">
          {cs.sections.map((section) => (
            <Section
              key={section.heading}
              id={section.heading.toLowerCase().replace(/[^a-z]+/g, "-")}
              label={section.heading}
            >
              <Reveal>
                {section.planned && (
                  <span className="mb-4 inline-block rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] text-accent">
                    Planned
                  </span>
                )}
                {section.body && (
                  <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-ink/85">
                    {section.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
                {section.bullets && (
                  <ul className="max-w-[62ch] space-y-2.5 text-lg leading-relaxed text-ink/85">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </Section>
          ))}

          <Section id="stack" label="Stack">
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li key={t}>
                    <TechChip name={t} size="md" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </Section>

          <Section id="screens" label="Screens">
            <div className="grid gap-5 sm:grid-cols-2">
              {cs.gallery.map((g) => (
                <Reveal key={g.src}>
                  <figure>
                    <div className="relative aspect-[16/10] w-full max-w-full overflow-hidden rounded-xl border border-line bg-line">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(min-width: 640px) 420px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-2 font-mono text-xs text-muted">{g.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Section>
        </div>
      </main>
    </>
  );
}
