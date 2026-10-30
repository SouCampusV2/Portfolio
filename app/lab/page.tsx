import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cards } from "./cards";
import { Heroes } from "./heroes";
import { projects } from "./data";
import "./lab.css";

/**
 * Design lab: variants of the hero and of the project card on real texts and
 * media, so the owner can choose by eye. Local only: production answers 404.
 */
export const metadata: Metadata = {
  title: "Design lab",
  robots: { index: false, follow: false },
};

const ten = Array.from({ length: 10 }, (_, i) => i + 1);

export default async function Lab({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();

  const { p: slug } = await searchParams;
  const index = Math.max(0, projects.findIndex((p) => p.slug === slug));
  const project = projects[index];
  const jump = "rounded px-1.5 py-0.5 font-mono text-xs text-muted transition-colors hover:bg-line hover:text-ink";

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
      <nav
        aria-label="Variants"
        className="sticky top-[61px] z-30 -mx-4 flex flex-wrap items-center gap-x-1 gap-y-1 border-b border-line bg-bg/90 px-4 py-2 backdrop-blur-md"
      >
        <span className="mr-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">Hero</span>
        {ten.map((n) => (
          <a key={n} href={`#h${n}`} className={jump}>
            H{n}
          </a>
        ))}
        <span className="ml-4 mr-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">Card</span>
        {ten.map((n) => (
          <a key={n} href={`#c${n}`} className={jump}>
            C{n}
          </a>
        ))}
      </nav>

      <header className="pt-10">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Лаборатория вариантов</h1>
        <p className="mt-2 max-w-[70ch] text-muted">
          10 вариантов hero и 10 вариантов карточки проекта на настоящих текстах и медиа. Тема переключается
          кнопкой в шапке. Назовите номера, которые нравятся (можно «H3, но с кнопками из H1») — дальше
          подкручиваем мелкими шагами.
        </p>
      </header>

      <Heroes />

      <div id="cards" className="mt-10 scroll-mt-28 border-t border-line pt-10">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Карточка проекта</h1>
        <p className="mt-2 text-muted">На каком проекте показать все десять вариантов:</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/lab?p=${p.slug}#cards`}
                aria-current={i === index ? "true" : undefined}
                className={`inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  i === index ? "border-accent bg-accent text-accent-ink" : "border-line text-ink hover:border-ink"
                }`}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Cards key={project.slug} p={project} index={index} />
    </main>
  );
}
