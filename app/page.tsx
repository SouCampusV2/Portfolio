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
import { ArrowDown, ArrowRight, ArrowUpRight, ExternalLink, Section } from "@/components/ui";

// Re-render at most once a day so the GitHub heatmap stays fresh.
export const revalidate = 86400;

// mailto: does nothing without a desktop mail app, so the email button copies
// the address, and "Write in Gmail" opens a draft in the browser.
const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.contact.email)}`;

const mono = "font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em]";
const pill = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85";
const pillLight = `${pill} bg-white text-[#3a0911]`;
const pillGhost = `${pill} border border-white/40 text-white`;
const textLink = `${mono} inline-flex items-center gap-1.5 transition-colors`;

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Hero />
      <Numbers />
      <Projects />
      <Experience />
      <Stack />
      <Minecraft />
      <About />
      <Outside />
      <Activity />
      <Recommendations />
      <Contact />
    </main>
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
    <section
      id="top"
      aria-labelledby="hero-title"
      className="cover relative mt-4 grid gap-10 overflow-hidden rounded-3xl px-6 py-12 sm:mt-6 sm:px-12 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center"
    >
      <div>
        <p className={`${mono} text-white/70`}>
          {site.name} · {site.location}
        </p>
        <h1
          id="hero-title"
          className="mt-7 text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.04em]"
        >
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
        <IsoBlocks
          heights={build}
          drop
          size={56}
          className="mx-auto w-[min(100%,22rem)] [--accent:#c8414f] max-sm:hidden"
        />
        <Spec rows={site.heroSpec} className="w-full" />
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
              <span className={`${textLink} mt-5 text-muted group-hover:text-accent`}>
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
  // A workflow has no screen to show: draw its tools as a chain.
  return (
    <div role="img" aria-label={media.alt} className="paper-grid absolute inset-0 flex flex-col items-center justify-center gap-5 p-6">
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
        <TechIcon name="n8n" className="size-4" />
        <span aria-hidden="true" className={`${mono} text-muted`}>
          n8n workflow
        </span>
      </div>
      <ol aria-hidden="true" className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-3">
        {media.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight className="size-3.5 text-accent" />}
            <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface shadow-sm sm:size-12">
              <TechIcon name={step} className="size-5 sm:size-6" />
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
          <span aria-hidden="true" className="leader" />
          <dd className="max-w-[72%] text-right text-sm font-medium leading-snug text-ink">{v}</dd>
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
    <section id="projects" aria-labelledby="projects-label" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <h2 id="projects-label" className={`${mono} text-muted`}>
        Projects
      </h2>
      <div className="mt-8 space-y-6">
        {flagship.map((project, i) => (
          <Reveal key={project.slug}>
            <article
              id={project.slug}
              className="grid scroll-mt-24 gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]"
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
              <div className="relative aspect-[16/10] self-center overflow-hidden rounded-lg border border-line bg-line">
                <ProjectMedia project={project} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className={`${mono} mt-14 text-muted`}>More work</h3>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {more.map((project) => (
          <li key={project.slug}>
            <Reveal className="h-full">
              <article
                id={project.slug}
                className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <div className="relative aspect-[16/8] border-b border-line bg-line">
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
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[0.95rem] leading-relaxed text-ink/85">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobRow({ job }: { job: Job }) {
  return (
    <li className="grid gap-x-6 gap-y-2 py-7 sm:grid-cols-[10.5rem_1fr]">
      <p className="font-mono text-xs leading-7 text-muted tabular-nums">{job.period}</p>
      <div>
        <h3 className="text-lg font-semibold sm:text-xl">
          {job.role}
          <span className="font-normal text-muted"> · {job.org}</span>
        </h3>
        <p className="mt-1 leading-relaxed text-muted">{job.summary}</p>

        {/* Several positions at one company: a row for each, newest first. */}
        {job.roles && (
          <ol className="mt-5 space-y-5 border-l border-line pl-5">
            {job.roles.map((role) => (
              <li key={role.role} className="relative">
                <span aria-hidden="true" className="absolute -left-[1.5rem] top-2 size-2 rounded-full bg-accent" />
                <h4 className="flex flex-wrap items-baseline gap-x-3 font-semibold">
                  {role.role}
                  <span className="font-mono text-xs font-normal text-muted tabular-nums">{role.period}</span>
                </h4>
                <div className="mt-2">
                  <Bullets items={role.highlights} />
                </div>
              </li>
            ))}
          </ol>
        )}

        {job.highlights.length > 0 && (
          <div className="mt-5">
            {job.highlightsLabel && <p className={`${mono} mb-2.5 text-muted`}>{job.highlightsLabel}</p>}
            <Bullets items={job.highlights} />
          </div>
        )}
      </div>
    </li>
  );
}

function Experience() {
  return (
    <Section id="experience" label="Experience">
      <Reveal>
        <ol className="divide-y divide-line border-y border-line">
          {site.experience.map((job) => (
            <JobRow key={`${job.role}-${job.org}`} job={job} />
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

function Stack() {
  return (
    <Section
      id="stack"
      label="Stack"
      action={
        <Link href="/tech-stack" className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
          Everything, with notes
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      }
    >
      <Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {site.stack.map((group) => (
            <div key={group.level} className="grid gap-x-6 gap-y-3 py-5 sm:grid-cols-[10.5rem_1fr]">
              <dt>
                <span className="block font-semibold">{group.level}</span>
                <span className="mt-0.5 block text-sm text-muted">{group.note}</span>
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((name) => (
                    <li key={name}>
                      <TechChip name={name} size="md" />
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

function Minecraft() {
  const mc = site.minecraft;
  return (
    <Section id="minecraft" label="Before software">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-line">
            <PreviewVideo src={mc.media.src} poster={mc.media.poster} alt={mc.media.alt} />
          </div>
          <div>
            <h3 className="flex flex-wrap items-baseline gap-x-3 text-3xl font-semibold tracking-[-0.03em]">
              {mc.title}
              <span className="font-mono text-xs font-normal text-muted tabular-nums">{mc.period}</span>
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{mc.line}</p>
            <div className="mt-6">
              <Rows rows={mc.facts} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {mc.links.map((l) => (
                <ExternalLink key={l.href} href={l.href} className={`${textLink} text-muted hover:text-ink`}>
                  {l.label}
                  <ArrowUpRight />
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function About() {
  const { education, languages } = site;
  return (
    <Section id="about" label="About">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="max-w-[58ch] space-y-4 text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
              {site.about.map((sentence, i) => (
                <p key={i} className={i === 0 ? "text-ink" : "text-ink/80"}>
                  {sentence}
                </p>
              ))}
            </div>
            <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className={`${mono} text-muted`}>Education</dt>
                <dd className="mt-2">
                  <span className="block font-semibold">{education.degree}</span>
                  <span className="block text-muted">{education.school}</span>
                  <span className="mt-1 block font-mono text-xs text-muted tabular-nums">{education.period}</span>
                </dd>
              </div>
              <div>
                <dt className={`${mono} text-muted`}>Languages</dt>
                <dd className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
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
          <figure className="relative w-48 self-start max-lg:hidden xl:w-56">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-accent" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-line">
              <Image src={site.avatar} alt={`Portrait of ${site.name}`} fill sizes="224px" className="object-cover" />
            </div>
          </figure>
        </div>
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
                <li key={h.name} className="rounded-full border border-line px-3 py-1 text-sm text-ink/80">
                  {h.name}
                </li>
              ))}
            </ul>
          </div>
          {/* TODO: add real photos via `photo` on each hobby in content/site.ts. */}
          {/* Room for the rotated cards so they never touch the page edge. */}
          <div className="sm:pr-4">
            <HobbyStack hobbies={outside.hobbies} />
          </div>
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
        <ExternalLink
          href={site.contact.github}
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
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

function Contact() {
  const { contact } = site;
  const row = "flex items-center gap-3 border-b border-white/25 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-white/10";
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="cover mb-6 mt-4 grid scroll-mt-24 gap-10 overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-end"
    >
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
    </section>
  );
}
