import Image from "next/image";
import Link from "next/link";
import { site, type Project } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { PreviewVideo } from "@/components/PreviewVideo";
import { GithubActivity } from "@/components/GithubActivity";
import { HobbyStack } from "@/components/HobbyStack";
import { TechChip, TechIcon, hasTechIcon } from "@/components/TechIcon";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Section,
} from "@/components/ui";

// Re-render at most once a day so the GitHub heatmap stays fresh.
export const revalidate = 86400;

const mailto = `mailto:${site.contact.email}`;

const buttonBase =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors";
const buttonPrimary = `${buttonBase} bg-accent text-accent-ink hover:opacity-90`;
const buttonSecondary = `${buttonBase} border border-line text-ink hover:border-ink`;
const viewAll =
  "group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink";

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Hero />
      <About />
      <Metrics />
      <Experience />
      <Projects />
      <Technologies />
      <Education />
      <Outside />
      <Activity />
      <Recommendations />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="pb-16 pt-12 sm:pb-24 sm:pt-20">
      <div className="flex items-center gap-4">
        <Image
          src={site.avatar}
          alt={`Portrait of ${site.name}`}
          width={96}
          height={96}
          priority
          className="size-16 rounded-full object-cover ring-2 ring-line ring-offset-2 ring-offset-bg sm:size-20"
        />
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {site.location}
        </p>
      </div>
      <h1
        id="hero-name"
        className="mt-6 text-[clamp(2.6rem,9vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
      >
        {site.name}
      </h1>
      <p className="mt-6 text-lg font-medium text-accent sm:text-xl">{site.title}</p>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
        {site.tagline}
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a href={mailto} className={buttonPrimary}>
          Contact me
        </a>
        {/* TODO: add public/cv.pdf manually — this link 404s until the file exists. */}
        <a href={site.cvHref} download className={buttonSecondary}>
          Download CV
          <ArrowDown />
        </a>
        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line sm:block" />
        <SocialIcons />
      </div>
    </section>
  );
}

function SocialIcons() {
  const item =
    "grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-ink";
  return (
    <ul className="flex items-center gap-1">
      <li>
        <ExternalLink href={site.contact.github} aria-label="GitHub" className={item}>
          <TechIcon name="GitHub" className="size-[18px]" />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={site.contact.linkedin} aria-label="LinkedIn" className={item}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
          </svg>
        </ExternalLink>
      </li>
      <li>
        <a href={mailto} aria-label={`Email ${site.contact.email}`} className={item}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </a>
      </li>
    </ul>
  );
}

function About() {
  return (
    <Section id="about" label="About">
      <Reveal>
        <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
          {site.about.map((sentence, i) => (
            <p key={i} className={i === 0 ? "text-ink" : "text-ink/80"}>
              {sentence}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Metrics() {
  return (
    <section
      id="numbers"
      aria-labelledby="numbers-label"
      className="border-t border-line py-14 sm:py-20"
    >
      <h2
        id="numbers-label"
        className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted"
      >
        In numbers
      </h2>
      <Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {site.metrics.map((metric) => (
            <li key={metric.label} className="flex flex-col bg-surface p-4 sm:p-7">
              <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-accent">
                {metric.label}
              </span>
              <span className="mt-5 whitespace-nowrap text-[clamp(1.6rem,6.4vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:mt-8">
                {metric.value}
              </span>
              <span className="mt-3 text-sm leading-snug text-muted">
                {metric.context}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-label"
      className="scroll-mt-20 border-t border-line py-14 sm:py-20"
    >
      <h2
        id="projects-label"
        className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted"
      >
        Projects
      </h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {site.projects.map((project, i, all) => (
          <li
            key={project.title}
            className={project.featured || isLoneLast(all, i) ? "md:col-span-2" : ""}
          >
            <Reveal className="h-full">
              <ProjectCard project={project} wide={project.featured || isLoneLast(all, i)} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The last card would sit alone in its row: let it span both columns. */
function isLoneLast(all: Project[], i: number) {
  const regular = all.filter((p) => !p.featured);
  return i === all.length - 1 && !all[i].featured && regular.length % 2 === 1;
}

/** `wide` = spans both grid columns: media and text sit side by side on large screens. */
function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
  const { featured } = project;
  return (
    <article
      className={`card-spotlight group flex h-full flex-col rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/35 ${
        wide ? "lg:grid lg:grid-cols-[1.45fr_1fr]" : ""
      }`}
    >
      {/* Media keeps its exact 16:10 ratio so recordings are never cropped;
          in the wide featured card it sits centered beside the text. */}
      <div
        className={`border-b border-line bg-line ${
          wide ? "lg:flex lg:items-center lg:border-b-0 lg:border-r" : ""
        }`}
      >
        <div className="relative aspect-[16/10] w-full max-w-full overflow-hidden">
          <ProjectMedia project={project} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {featured && (
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-accent">
            Featured build
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className={`font-semibold tracking-[-0.02em] ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {project.title}
          </h3>
          {project.badge && (
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] text-accent">
              {project.badge}
            </span>
          )}
        </div>
        {project.role && <p className="text-sm font-medium leading-snug text-ink/80">{project.role}</p>}
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
        {project.highlights && (
          <ul className="space-y-1.5 text-sm leading-relaxed text-muted">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {project.tags.length > 0 && (
          <ul aria-label="Tech" className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <li key={tag}>
                <TechChip name={tag} />
              </li>
            ))}
          </ul>
        )}
        {(project.link || project.caseStudy) && (
          <div className="mt-auto flex flex-wrap items-center justify-end gap-x-6 gap-y-2 border-t border-line pt-4">
            {project.caseStudy && (
              <Link
                href={project.caseStudy}
                className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-accent transition-colors hover:text-ink"
              >
                Read case study
                <ArrowRight className="size-3.5" />
              </Link>
            )}
            {[...(project.link ? [project.link] : []), ...(project.moreLinks ?? [])].map((l) => (
              <ExternalLink
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
              >
                {l.label}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ExternalLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const media = project.media;
  if (media?.kind === "video") {
    return <PreviewVideo src={media.src} poster={media.poster} alt={media.alt} />;
  }
  if (media?.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(min-width: 768px) 560px, 100vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }
  if (media?.kind === "app") {
    return (
      <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:14px_14px]">
        <Image
          src={media.icon}
          alt={media.alt}
          width={160}
          height={160}
          className="size-28 rounded-[22%] shadow-[0_18px_40px_-16px_rgba(16,20,27,0.55)] transition-transform duration-500 group-hover:scale-105 sm:size-36"
        />
      </div>
    );
  }
  // No preview yet: a quiet panel built from the project's own tags.
  const icons = project.tags.filter(hasTechIcon).slice(0, 8);
  const plain = project.tags.filter((t) => !hasTechIcon(t));
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(var(--line)_1px,transparent_1px)] p-6 [background-size:14px_14px]">
      {icons.length > 0 && (
        <div className="flex max-w-xs flex-wrap justify-center gap-4 text-ink">
          {icons.map((t) => (
            <TechIcon key={t} name={t} className="size-10 sm:size-11" />
          ))}
        </div>
      )}
      {plain.length > 0 && (
        <p className="text-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {plain.join(" · ")}
        </p>
      )}
    </div>
  );
}

function Experience() {
  return (
    <Section id="experience" label="Experience">
      <Reveal>
        <ol className="divide-y divide-line border-y border-line">
          {site.experience.map((job) => (
            <li key={`${job.role}-${job.org}`}>
              <details className="job group/job" open={job.open}>
                <summary className="grid cursor-pointer list-none gap-1 py-5 sm:grid-cols-[11rem_1fr_auto] sm:gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs leading-6 text-muted tabular-nums">{job.period}</span>
                  <span>
                    <span className="block text-base font-semibold sm:text-lg">
                      {job.role}
                      <span className="font-normal text-muted"> · {job.org}</span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{job.summary}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden size-8 place-items-center self-start rounded-full border border-line text-muted transition-[transform,color,border-color] duration-300 group-open/job:rotate-45 group-open/job:border-accent group-open/job:text-accent group-hover/job:text-ink sm:grid"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="size-3.5">
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-6 sm:pl-[calc(11rem+1.5rem)] sm:pr-14">
                  <ul className="space-y-2 text-[0.95rem] leading-relaxed text-ink/85">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {job.tech && (
                    <ul aria-label="Tech" className="mt-4 flex flex-wrap gap-1.5">
                      {job.tech.map((t) => (
                        <li key={t}>
                          <TechChip name={t} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Each half holds the list twice so it is always wider than the viewport.
  const half = [...items, ...items];
  const copy = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0">
      {half.map((name, i) => (
        <li key={`${name}-${i}`} className="pr-2" aria-hidden={!hidden && i >= items.length ? true : undefined}>
          <TechChip name={name} size="md" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden">
      <div
        className="marquee-track flex w-max py-1"
        data-reverse={reverse || undefined}
        style={{ ["--marquee-duration" as string]: `${items.length * 5}s` }}
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

function Technologies() {
  const all = site.tech.flatMap((g) => g.items);
  const third = Math.ceil(all.length / 3);
  const rows = [all.slice(0, third), all.slice(third, third * 2), all.slice(third * 2)];
  return (
    <Section
      id="technologies"
      label="Technologies"
      action={
        <Link href="/tech-stack" className={viewAll}>
          View all
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      }
    >
      <Reveal>
        <div className="flex flex-col gap-2.5">
          {rows.map((row, i) => (
            <MarqueeRow key={i} items={row} reverse={i % 2 === 1} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Activity() {
  return (
    <Section
      id="activity"
      label="GitHub Activity"
      action={
        <ExternalLink href={site.contact.github} className={viewAll}>
          @{site.githubUser}
          <ArrowUpRight className="size-3.5" />
        </ExternalLink>
      }
    >
      <Reveal>
        <GithubActivity user={site.githubUser} />
      </Reveal>
    </Section>
  );
}

function Outside() {
  const { outside } = site;
  return (
    <Section id="outside" label="Outside the IDE">
      <Reveal>
        <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto] sm:gap-12">
          <div>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink/80">{outside.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {outside.hobbies.map((h) => (
                <li
                  key={h.name}
                  className="rounded-full border border-line px-3 py-1 text-sm text-ink/80"
                >
                  {h.name}
                </li>
              ))}
            </ul>
          </div>
          {/* TODO: add real photos via `photo` on each hobby in content/site.ts. */}
          <HobbyStack hobbies={outside.hobbies} />
        </div>
      </Reveal>
    </Section>
  );
}

/** Hidden until real quotes are added to `site.recommendations`. */
function Recommendations() {
  if (site.recommendations.length === 0) return null;
  return (
    <Section id="recommendations" label="Recommendations">
      <div className="grid gap-10 lg:grid-cols-2">
        {site.recommendations.map((rec) => (
          <Reveal key={rec.name}>
            <figure className="flex flex-col gap-4">
              <blockquote className="text-lg leading-relaxed">“{rec.quote}”</blockquote>
              <figcaption className="text-sm text-muted">
                <span className="font-semibold text-ink">{rec.name}</span>
                <br />
                {rec.title} @ {rec.company}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  const { education, languages } = site;
  return (
    <Section id="education" label="Education & Languages">
      <Reveal>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">{education.school}</h3>
            <p className="mt-1 text-muted">{education.degree}</p>
            <p className="mt-2 font-mono text-xs text-muted tabular-nums">{education.period}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-start">
            {languages.map((lang) => (
              <div key={lang.name}>
                <dt className="font-semibold">{lang.name}</dt>
                <dd className="font-mono text-xs text-muted">{lang.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

function Contact() {
  const { contact } = site;
  const cards = [
    {
      label: "Email",
      value: contact.email,
      href: mailto,
      external: false,
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "in/eugenestavytskyi",
      href: contact.linkedin,
      external: true,
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: `@${site.githubUser}`,
      href: contact.github,
      external: true,
      icon: <TechIcon name="GitHub" className="size-5" />,
    },
  ];

  return (
    <Section id="contact" label="Contact">
      <Reveal>
        <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.03em]">
          Let&apos;s work together.
        </h3>
        <p className="mt-4 max-w-[46ch] text-lg text-muted">
          Hiring for a developer or delivery role? Email is the fastest way to reach me.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {cards.map((card) => {
            const inner = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-bg text-ink transition-colors group-hover:border-accent group-hover:text-accent">
                  {card.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent">
                    {card.label}
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-ink">
                    {card.value}
                  </span>
                </span>
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                  <path d="m6 3 5 5-5 5" />
                </svg>
              </>
            );
            const cls =
              "card-spotlight group flex items-center gap-3.5 rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/35";
            return (
              <li key={card.label} className={card.label === "Email" ? "sm:col-span-2 lg:col-span-1" : ""}>
                {card.external ? (
                  <ExternalLink href={card.href} className={cls}>
                    {inner}
                  </ExternalLink>
                ) : (
                  <a href={card.href} className={cls}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-6">
          <a href={site.cvHref} download className={buttonSecondary}>
            Download CV
            <ArrowDown />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
