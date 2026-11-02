import { CopyEmailButton } from "@/components/CopyEmailButton";
import { PreviewVideo } from "@/components/PreviewVideo";
import { ArrowDown, ArrowRight, ArrowUpRight, ExternalLink } from "@/components/ui";
import { Slides } from "@/components/Slides";
import { me, type LabProject } from "./data";

export { IsoBlocks, build } from "@/components/IsoBlocks";

/** One numbered variant on the lab page: a label, a note for the owner, the design. */
export function Stage({
  id,
  code,
  name,
  note,
  children,
}: {
  id: string;
  code: string;
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-8">
      <header className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="rounded-md bg-ink px-2 py-0.5 font-mono text-xs font-medium text-bg">{code}</span>
        <h2 className="text-base font-semibold">{name}</h2>
        <p className="text-sm text-muted">{note}</p>
      </header>
      <div className="lab-stage overflow-hidden rounded-2xl border border-line bg-bg">{children}</div>
    </section>
  );
}

export const mono = "font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em]";

/** CV / LinkedIn / email. `tone` picks colours that work on the variant's ground. */
export function Actions({ tone = "accent", className = "" }: { tone?: "accent" | "ink" | "light"; className?: string }) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85";
  const primary =
    tone === "accent" ? "bg-accent text-accent-ink" : tone === "ink" ? "bg-ink text-bg" : "bg-white text-[#2a070c]";
  const secondary =
    tone === "light" ? "border border-white/40 text-white" : "border border-line text-ink hover:border-ink";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={me.cv} download className={`${base} ${primary}`}>
        Download CV
        <ArrowDown />
      </a>
      <ExternalLink href={me.linkedin} className={`${base} ${secondary}`}>
        LinkedIn
        <ArrowUpRight />
      </ExternalLink>
      <CopyEmailButton email={me.email} className={`${base} ${secondary}`}>
        Copy email
      </CopyEmailButton>
    </div>
  );
}

/** Fills its (relative) parent with the project's video or screenshots. */
export function Media({ p }: { p: LabProject }) {
  if (p.media.kind === "video") {
    return <PreviewVideo src={p.media.src} poster={p.media.poster} alt={p.media.alt} />;
  }
  return <Slides images={p.media.images} />;
}

/** Links under a card: the case study (placeholder until it exists) and the live product. */
export function CardLinks({ p, tone = "ink" }: { p: LabProject; tone?: "ink" | "light" }) {
  const main = tone === "light" ? "text-white" : "text-accent";
  const side = tone === "light" ? "text-white/70 hover:text-white" : "text-muted hover:text-ink";
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${mono}`}>
      <a href={`#case-${p.slug}`} className={`inline-flex items-center gap-1.5 ${main}`}>
        Read case study
        <ArrowRight />
      </a>
      <ExternalLink href={p.link.href} className={`inline-flex items-center gap-1.5 transition-colors ${side}`}>
        {p.link.label}
        <ArrowUpRight />
      </ExternalLink>
    </div>
  );
}
