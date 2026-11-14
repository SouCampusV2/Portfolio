import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { site, type Job, type Project } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { PreviewVideo } from "@/components/PreviewVideo";
import { Slides } from "@/components/Slides";
import { IsoBlocks, build } from "@/components/IsoBlocks";
import { GithubActivity } from "@/components/GithubActivity";
import { HobbyStack } from "@/components/HobbyStack";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { TechChip, TechIcon } from "@/components/TechIcon";
import { ArrowDown, ArrowRight, ArrowUpRight, ExternalLink } from "@/components/ui";

// Re-render at most once a day so the GitHub heatmap stays fresh.
export const revalidate = 86400;

// mailto: does nothing without a desktop mail app, so the email button copies
// the address, and "Write in Gmail" opens a draft in the browser.
const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.contact.email)}`;

/** The page column: full-width bands put their content in it. */
const column = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";
const mono = "font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em]";
const pill = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85";
const pillLight = `${pill} bg-white text-[#3a0911]`;
const pillGhost = `${pill} border border-white/40 text-white`;
const textLink = `${mono} inline-flex items-center gap-1.5 transition-colors`;
const card = "rounded-2xl border border-line bg-surface";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <div className={column}>
        <Numbers />
        <Projects />
        <Experience />
        <Stack />
        <Builds />
        <About />
        <Outside />
        <Activity />
        <Recommendations />
      </div>
      <Contact />
    </main>
  );
}

/** A section of the page: number and big title on top, content under it at full width. */
function Block({
  id,
  index,
  title,
  action,
  children,
}: {
  id: string;
  index: string;
  title: string;
  /** Optional link on the right of the title. */
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <h2 id={`${id}-title`} className="text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-none tracking-[-0.035em]">
          <span aria-hidden="true" className={`${mono} mb-4 block text-accent`}>
            {index}
          </span>
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-9 sm:mt-11">{children}</div>
    </section>
  );
}

/** The positioning line: the first sentence is the headline, the rest sits under it. */
function line() {
  const cut = site.tagline.indexOf(". ") + 1;
  return { lead: site.tagline.slice(0, cut), rest: site.tagline.slice(cut + 1) };
}

/** Label / value table on the cover gradient, like the title block of a drawing. */
function Spec({ rows, className = "" }: { rows: [string, string][]; className?: string }) {
  return (
    <dl className={`grid grid-cols-[auto_1fr] border border-white/35 bg-black/20 font-mono text-xs backdrop-blur-sm ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-white/25 last:border-b-0">
          <dt className="border-r border-white/25 px-3 py-2 uppercase tracking-[0.12em] text-white/65">{k}</dt>
          <dd className="px-3 py-2 text-white">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Hero() {
  const { lead, rest } = line();
  const [before, after] = lead.split("full-stack");
  // The three phrases a recruiter looks for stand out from the sentence.
  const parts = rest.split(/(TypeScript and PostgreSQL|Java and Spring Boot|software that moves money)/);
  return (
    // Full-width band that also runs under the header (60px + its border), so
    // the gradient starts at the very top of the screen.
    <section id="top" data-cover-top aria-labelledby="hero-title" className="cover -mt-[61px] overflow-hidden pt-[61px]">
      <div className={`${column} grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-20`}>
        <div>
          <p className={`${mono} text-white/70`}>
            {site.name} · {site.location}
          </p>
          <h1 id="hero-title" className="mt-7 text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
            {before}
            <span className="whitespace-nowrap">full-stack</span>
            {after}
          </h1>
          <p className="mt-7 max-w-[32ch] text-xl leading-snug text-white/75 sm:text-2xl">
            {parts.map((part, i) =>
              i % 2 ? (
                <span key={i} className="font-medium text-white">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={site.cvHref} download className={pillLight}>
              Download CV
              <ArrowDown className="size-4" />
            </a>
            <ExternalLink href={site.contact.linkedin} className={pillGhost}>
              <LinkedinLogo aria-hidden="true" weight="fill" className="size-4" />
              LinkedIn
            </ExternalLink>
            <CopyEmailButton email={site.contact.email} className={pillGhost}>
              <EnvelopeSimple aria-hidden="true" weight="bold" className="size-4" />
              Copy email
            </CopyEmailButton>
          </div>
        </div>

        {/* The object in the frame: a build made of blocks, with its stamp under it. */}
        <div className="flex flex-col items-center gap-6 lg:items-stretch">
          <IsoBlocks heights={build} drop size={56} className="mx-auto w-[min(100%,22rem)] [--accent:#c8414f] max-sm:hidden" />
          <Spec rows={site.heroSpec} className="w-full" />
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section aria-label="In numbers" className="py-10 sm:py-14">
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {site.metrics.map((metric) => (
          <li key={metric.label}>
            <Link href={metric.href} className="group flex h-full flex-col bg-surface p-6 transition-colors hover:bg-accent-soft/40 sm:p-7">
              <span className={`${mono} text-accent`}>{metric.label}</span>
              <span className="mt-6 whitespace-nowrap text-[clamp(2.2rem,4.4vw,3.4rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                {metric.value}
              </span>
              <span className="mt-3 text-sm leading-snug text-muted">{metric.context}</span>
              <span className={`${textLink} mt-auto pt-5 text-muted group-hover:text-accent`}>
                See the proof
                <ArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const media = project.media;
  if (media.kind === "video") return <PreviewVideo src={media.src} poster={media.poster} alt={media.alt} />;
  if (media.kind === "slides") return <Slides images={media.images} />;
  const panel = "paper-grid absolute inset-0 flex flex-col items-center justify-center gap-5 p-6";
  const tag = "flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5";
  if (media.kind === "list") {
    // No screenshots yet: the names of the parts, on drawing paper.
    return (
      <div className={panel}>
        <p className={`${tag} ${mono} text-muted`}>{media.label}</p>
        <ul className="flex max-w-sm flex-wrap justify-center gap-2">
          {media.items.map((item) => (
            <li key={item} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium shadow-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // A workflow has no screen to show: draw its tools as a chain.
  return (
    <div role="img" aria-label={media.alt} className={panel}>
      <div className={tag}>
        <TechIcon name="n8n" className="size-4" />
        <span aria-hidden="true" className={`${mono} text-muted`}>
          n8n workflow
        </span>
      </div>
      <ol aria-hidden="true" className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-3">
        {media.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight className="size-3.5 text-accent" />}
            <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface shadow-sm">
              <TechIcon name={step} className="size-5" />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Label / value rows with a dotted leader: the fact table of a project. */
function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="border-t-2 border-ink">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline gap-3 border-b border-line py-2.5">
          <dt className={`${mono} shrink-0 text-muted`}>{k}</dt>
          <dd className="flex min-w-0 flex-1 items-baseline gap-3">
            <span aria-hidden="true" className="leader" />
            <span className="max-w-[80%] text-right text-sm font-medium leading-snug text-ink">{v}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const external = [...(project.link ? [project.link] : []), ...(project.moreLinks ?? [])];
  if (!project.caseStudy && external.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {project.caseStudy && (
        <Link href={project.caseStudy} className={`${textLink} text-accent hover:text-ink`}>
          Read case study
          <ArrowRight />
        </Link>
      )}
      {external.map((l) => (
        <ExternalLink key={l.href} href={l.href} className={`${textLink} text-muted hover:text-ink`}>
          {l.label}
          <ArrowUpRight />
        </ExternalLink>
      ))}
    </div>
  );
}

function Projects() {
  const flagship = site.projects.filter((p) => p.flagship);
  const more = site.projects.filter((p) => !p.flagship);
  return (
    <Block id="projects" index="01" title="Projects">
      <div className="space-y-6">
        {flagship.map((project, i) => (
          <Reveal key={project.slug}>
            <article
              id={project.slug}
              className={`${card} grid scroll-mt-24 gap-8 p-6 sm:p-10 ${i % 2 ? "lg:grid-cols-[1.35fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.35fr]"}`}
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{project.title}</h3>
                  {project.badge && (
                    <span className={`${mono} rounded-full bg-accent-soft px-2.5 py-1 text-accent`}>{project.badge}</span>
                  )}
                </div>
                <p className="mt-3 max-w-[42ch] leading-snug text-muted">{project.line}</p>
                <div className="mt-7">
                  <Rows rows={project.rows} />
                </div>
                <div className="mt-6">
                  <ProjectLinks project={project} />
                </div>
              </div>
              <div className="relative aspect-[16/10] self-start overflow-hidden rounded-lg border border-line bg-line lg:mt-1">
                <ProjectMedia project={project} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className={`${mono} mt-14 text-muted`}>More work</h3>
      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {more.map((project) => (
          <li key={project.slug}>
            <Reveal className="h-full">
              <article id={project.slug} className={`${card} flex h-full scroll-mt-24 flex-col overflow-hidden`}>
                <div className="relative aspect-[16/10] border-b border-line bg-line">
                  <ProjectMedia project={project} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h4 className="text-2xl font-semibold tracking-[-0.03em]">{project.title}</h4>
                  <p className="mt-2 leading-snug text-muted">{project.line}</p>
                  <div className="mt-5">
                    <Rows rows={project.rows} />
                  </div>
                  <div className="mt-auto pt-5">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 text-[0.95rem] leading-relaxed text-ink/85 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex break-inside-avoid gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobHead({ job }: { job: Job }) {
  return (
    <header>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className={`${mono} text-accent`}>{job.org}</p>
        <p className="font-mono text-xs text-muted tabular-nums">{job.period}</p>
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{job.role}</h3>
      <p className="mt-2 max-w-[70ch] leading-relaxed text-muted">{job.summary}</p>
    </header>
  );
}

function JobCard({ job }: { job: Job }) {
  // Positions are stored newest first; the steps read left to right in time.
  const steps = job.roles ? [...job.roles].reverse() : [];
  return (
    <article className={`${card} p-6 sm:p-8`}>
      <JobHead job={job} />

      {steps.length > 0 && (
        <ol className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {steps.map((role, i) => (
            <li key={role.role} className="relative border-t-2 border-accent pt-5">
              <span aria-hidden="true" className="absolute -top-[7px] left-0 size-3 rounded-full bg-accent ring-4 ring-surface" />
              <p className="flex items-center gap-2 font-mono text-xs text-muted tabular-nums">
                <span className="text-accent">Step {i + 1}</span>
                {role.period}
              </p>
              <h4 className="mt-1.5 text-lg font-semibold">{role.role}</h4>
              <Bullets items={role.highlights} className="mt-3" />
            </li>
          ))}
        </ol>
      )}

      {job.highlights.length > 0 && (
        <div className={steps.length > 0 ? "mt-8 border-t border-line pt-6" : "mt-6"}>
          {job.highlightsLabel && <p className={`${mono} mb-3 text-muted`}>{job.highlightsLabel}</p>}
          <Bullets items={job.highlights} className={job.highlights.length > 3 ? "gap-x-10 lg:columns-2" : ""} />
        </div>
      )}
    </article>
  );
}

function Experience() {
  // Long entries get a full row; short ones share a row.
  const isLong = (job: Job) => Boolean(job.roles) || job.highlights.length > 3;
  const long = site.experience.filter(isLong);
  const short = site.experience.filter((job) => !isLong(job));
  return (
    <Block id="experience" index="02" title="Experience">
      <div className="space-y-6">
        {long.map((job) => (
          <Reveal key={`${job.role}-${job.org}`}>
            <JobCard job={job} />
          </Reveal>
        ))}
        <div className="grid gap-6 md:grid-cols-2">
          {short.map((job) => (
            <Reveal key={`${job.role}-${job.org}`} className="h-full [&>article]:h-full">
              <JobCard job={job} />
            </Reveal>
          ))}
        </div>
      </div>
    </Block>
  );
}

function Stack() {
  return (
    <Block
      id="stack"
      index="03"
      title="Stack"
      action={
        <Link href="/tech-stack" className={`${textLink} text-accent hover:text-ink`}>
          Every tool, with notes
          <ArrowRight />
        </Link>
      }
    >
      <Reveal>
        <ul className="grid gap-6 lg:grid-cols-[1.35fr_1fr_0.8fr]">
          {site.stack.map((group, i) => (
            <li
              key={group.level}
              className={`rounded-2xl border p-6 ${
                i === site.stack.length - 1 ? "border-accent/40 bg-accent-soft/50" : "border-line bg-surface"
              }`}
            >
              <p className={`${mono} text-accent`}>Level {i + 1}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{group.level}</h3>
              <p className="mt-1 text-sm text-muted">{group.note}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((name) => (
                  <li key={name}>
                    <TechChip name={name} size="md" />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Reveal>
    </Block>
  );
}

function Builds() {
  const mc = site.minecraft;
  return (
    <Block id="builds" index="04" title="Before software">
      <Reveal>
        {/* The recording is the picture; the title sits on it. */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-line md:aspect-[16/8]">
          <PreviewVideo src={mc.media.src} poster={mc.media.poster} alt={mc.media.alt} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.9),rgb(0_0_0/0.5)_30%,transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 text-white sm:p-8">
            <h3 className="text-[clamp(1.75rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]">{mc.title}</h3>
            <p className={`${mono} text-white/80`}>{mc.period}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-lg leading-relaxed text-ink/85">{mc.line}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {mc.links.map((l) => (
                <ExternalLink key={l.href} href={l.href} className={`${textLink} text-accent hover:text-ink`}>
                  {l.label}
                  <ArrowUpRight />
                </ExternalLink>
              ))}
            </div>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            {mc.facts.map(([k, v]) => (
              <div key={k} className="border-t-2 border-ink pt-3">
                <dt className={`${mono} text-muted`}>{k}</dt>
                <dd className="mt-2 text-sm font-medium leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Block>
  );
}

function About() {
  const { education, languages } = site;
  const [first, ...others] = site.about;
  return (
    <Block id="about" index="05" title="About">
      <Reveal>
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <figure className="relative w-48 self-start sm:w-60">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-accent" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-line">
              <Image src={site.avatar} alt={`Portrait of ${site.name}`} fill quality={92} sizes="480px" className="object-cover" />
            </div>
          </figure>
          <div>
            <p className="max-w-[30ch] text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em]">{first}</p>
            <div className="mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed text-ink/80">
              {others.map((sentence) => (
                <p key={sentence}>{sentence}</p>
              ))}
            </div>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className={`${card} p-5`}>
                <dt className={`${mono} text-accent`}>Education</dt>
                <dd className="mt-3">
                  <span className="block font-semibold">{education.degree}</span>
                  <span className="mt-0.5 block text-muted">{education.school}</span>
                  <span className="mt-2 block font-mono text-xs text-muted tabular-nums">{education.period}</span>
                </dd>
              </div>
              <div className={`${card} p-5`}>
                <dt className={`${mono} text-accent`}>Languages</dt>
                <dd className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                  {languages.map((lang) => (
                    <span key={lang.name} className="whitespace-nowrap">
                      <span className="font-semibold">{lang.name}</span>{" "}
                      <span className="font-mono text-xs text-muted">{lang.level}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>
    </Block>
  );
}

function Outside() {
  const { outside } = site;
  return (
    <Block id="outside" index="06" title="Outside the IDE">
      <Reveal>
        <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto] sm:gap-16">
          <div>
            <p className="max-w-[40ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-ink/85">{outside.text}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {outside.hobbies.map((h) => (
                <li key={h.name} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm">
                  {h.name}
                </li>
              ))}
            </ul>
          </div>
          {/* TODO: add real photos via `photo` on each hobby in content/site.ts. */}
          {/* Room for the rotated cards so they never touch the page edge. */}
          <div className="sm:pr-6">
            <HobbyStack hobbies={outside.hobbies} />
          </div>
        </div>
      </Reveal>
    </Block>
  );
}

function Activity() {
  return (
    <Block
      id="activity"
      index="07"
      title="GitHub activity"
      action={
        <ExternalLink href={site.contact.github} className={`${textLink} text-accent hover:text-ink`}>
          @{site.githubUser}
          <ArrowUpRight />
        </ExternalLink>
      }
    >
      <Reveal>
        <GithubActivity user={site.githubUser} />
      </Reveal>
    </Block>
  );
}

/** Hidden until real quotes are added to `site.recommendations`. */
function Recommendations() {
  if (site.recommendations.length === 0) return null;
  return (
    <Block id="recommendations" index="08" title="Recommendations">
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
    </Block>
  );
}

function Contact() {
  const { contact } = site;
  const row = "flex items-center gap-3 border-b border-white/25 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-white/10";
  return (
    // Full-width band; the footer follows it directly.
    <section id="contact" aria-labelledby="contact-title" className="cover mt-6 scroll-mt-16 overflow-hidden">
      <div className={`${column} grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-end`}>
        <div>
          <p className={`${mono} text-white/70`}>Contact</p>
          <h2 id="contact-title" className="mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            Let&apos;s work together.
          </h2>
          <p className="mt-5 max-w-[36ch] text-xl leading-snug text-white/75">{contact.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalLink href={gmail} className={pillLight}>
              Write in Gmail
              <ArrowUpRight className="size-4" />
            </ExternalLink>
            <a href={site.cvHref} download className={pillGhost}>
              Download CV
              <ArrowDown className="size-4" />
            </a>
          </div>
        </div>
        <ul className="border border-white/35 bg-black/20 font-mono text-sm backdrop-blur-sm">
          <li>
            <CopyEmailButton email={contact.email} className={`${row} w-full`}>
              <EnvelopeSimple aria-hidden="true" weight="bold" className="size-5 shrink-0 text-white/70" />
              <span className="min-w-0 flex-1 truncate">{contact.email}</span>
              <span className={`${mono} text-white/60`}>Copy</span>
            </CopyEmailButton>
          </li>
          <li>
            <ExternalLink href={contact.linkedin} className={row}>
              <LinkedinLogo aria-hidden="true" weight="fill" className="size-5 shrink-0 text-white/70" />
              <span className="min-w-0 flex-1 truncate">in/eugenestavytskyi</span>
              <ArrowUpRight className="size-4 text-white/60" />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={contact.github} className={row}>
              <GithubLogo aria-hidden="true" weight="fill" className="size-5 shrink-0 text-white/70" />
              <span className="min-w-0 flex-1 truncate">@{site.githubUser}</span>
              <ArrowUpRight className="size-4 text-white/60" />
            </ExternalLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
