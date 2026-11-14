import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, type CaseFigure, type CaseStudy } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { DIAGRAMS } from "@/components/diagrams";
import { ArrowLeft, ArrowUpRight } from "@/components/ui";

/**
 * Case study page: /projects/<slug>. One template for every project; the text
 * lives in `site.cases` (content/site.ts). Unknown slugs are a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(site.cases).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

function getCase(slug: string): CaseStudy | undefined {
  return Object.hasOwn(site.cases, slug) ? site.cases[slug] : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCase((await params).slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — case study — ${site.name}`,
    description: cs.tagline,
    alternates: { canonical: `/projects/${(await params).slug}` },
  };
}

const mono = "font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em]";

function Figure({ figure }: { figure: CaseFigure }) {
  return (
    <figure>
      {/* Diagrams are dense: the picture links to the full-size file. */}
      <a
        href={figure.src}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-xl border border-line bg-white"
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          quality={92}
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="h-auto w-full"
        />
        <span className={`${mono} absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100`}>
          Full size
          <ArrowUpRight />
        </span>
        <span className="sr-only"> (opens the full-size image in a new tab)</span>
      </a>
      <figcaption className="mt-2 font-mono text-xs text-muted">{figure.caption}</figcaption>
    </figure>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const cs = getCase((await params).slug);
  if (!cs) notFound();

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <Link href="/#projects" className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <header className="mt-8">
        <p className={`${mono} text-accent`}>Case study</p>
        <h1 className="mt-3 max-w-[18ch] text-[clamp(2.4rem,6.5vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          {cs.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{cs.tagline}</p>
      </header>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {cs.facts.map((f) => (
          <div key={f.label} className="bg-surface p-4 sm:p-6">
            <dt className={`${mono} text-accent`}>{f.label}</dt>
            <dd className="mt-2 text-base font-semibold leading-snug sm:text-lg">{f.value}</dd>
          </div>
        ))}
      </dl>

      {cs.sections.map((section, i) => {
        const id = section.heading.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
        return (
          <section key={section.heading} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line py-12 first-of-type:mt-14 sm:py-16">
            <Reveal>
              <h2 id={`${id}-title`} className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-none tracking-[-0.035em]">
                <span aria-hidden="true" className={`${mono} mb-3 block text-accent`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>

              {section.body && (
                <div className="mt-6 max-w-[65ch] space-y-4 text-lg leading-relaxed text-ink/85">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="mt-6 max-w-[65ch] space-y-2.5 text-lg leading-relaxed text-ink/85">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {section.points && (
                <dl className="mt-8 grid gap-6 md:grid-cols-3">
                  {section.points.map((point) => (
                    <div key={point.title} className="border-t-2 border-ink pt-4">
                      <dt className="text-lg font-semibold">{point.title}</dt>
                      <dd className="mt-2 leading-relaxed text-ink/80">{point.text}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.table && (
                <div className="mt-8 max-w-3xl overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-ink">
                        {section.table.head.map((h, c) => (
                          <th key={h} scope="col" className={`${mono} py-2.5 pr-4 text-muted ${c > 0 ? "text-right" : ""}`}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]} className="border-b border-line">
                          {row.map((cell, c) =>
                            c === 0 ? (
                              <th key={c} scope="row" className="py-2.5 pr-4 font-normal">
                                {cell}
                              </th>
                            ) : (
                              <td key={c} className="py-2.5 pr-4 text-right tabular-nums text-ink/85">
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                    {section.table.foot && (
                      <tfoot>
                        <tr className="border-t-2 border-ink">
                          {section.table.foot.map((cell, c) =>
                            c === 0 ? (
                              <th key={c} scope="row" className="py-3 pr-4 font-semibold">
                                {cell}
                              </th>
                            ) : (
                              <td key={c} className={`py-3 pr-4 text-right text-lg font-semibold tabular-nums ${c === section.table!.foot!.length - 1 ? "text-accent" : ""}`}>
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              )}

              {section.diagrams && (
                <div className="mt-8 space-y-8">
                  {section.diagrams.map(({ id, caption }) => {
                    const Diagram = DIAGRAMS[id];
                    return (
                      <figure key={id}>
                        <Diagram />
                        <figcaption className="mt-2 font-mono text-xs text-muted">{caption}</figcaption>
                      </figure>
                    );
                  })}
                </div>
              )}

              {section.figures && (
                <div className="mt-8 space-y-8">
                  {section.figures.map((figure) => (
                    <Figure key={figure.src} figure={figure} />
                  ))}
                </div>
              )}
            </Reveal>
          </section>
        );
      })}
    </main>
  );
}
