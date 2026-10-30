import { CopyEmailButton } from "@/components/CopyEmailButton";
import { PreviewVideo } from "@/components/PreviewVideo";
import { ArrowDown, ArrowUpRight, ExternalLink } from "@/components/ui";
import { Slides } from "./Slides";
import { me, type LabProject } from "./data";

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
        <span aria-hidden="true">→</span>
      </a>
      <ExternalLink href={p.link.href} className={`inline-flex items-center gap-1.5 transition-colors ${side}`}>
        {p.link.label}
        <ArrowUpRight />
      </ExternalLink>
    </div>
  );
}

/**
 * Isometric blocks, the "builder" motif. `heights[x][y]` = how many blocks are
 * stacked on that cell. `wire` draws outlines only, like a drawing.
 */
export function IsoBlocks({
  heights,
  size = 44,
  wire,
  drop,
  className = "",
}: {
  heights: number[][];
  size?: number;
  wire?: boolean;
  /** Blocks fall into place one by one. */
  drop?: boolean;
  className?: string;
}) {
  const w = size * 0.866;
  const h = size * 0.5;
  const pt = (x: number, y: number, z: number) => [(x - y) * w, (x + y) * h - z * size] as const;
  const poly = (pts: (readonly [number, number])[]) => pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");

  const cubes: { x: number; y: number; z: number }[] = [];
  heights.forEach((row, x) => row.forEach((n, y) => { for (let z = 0; z < n; z++) cubes.push({ x, y, z }); }));
  cubes.sort((a, b) => a.x + a.y - (b.x + b.y) || a.z - b.z);

  const nx = heights.length;
  const ny = Math.max(...heights.map((r) => r.length));
  const nz = Math.max(...heights.flat());
  const minX = -ny * w;
  const minY = -nz * size;
  const width = (nx + ny) * w;
  const height = (nx + ny) * h + nz * size;

  const faces = wire
    ? ["none", "none", "none"]
    : [
        "color-mix(in oklab, var(--block) 55%, white)",
        "var(--block)",
        "color-mix(in oklab, var(--block) 72%, black)",
      ];
  const stroke = wire ? "var(--block)" : "color-mix(in oklab, var(--block) 45%, black)";

  return (
    <svg
      aria-hidden="true"
      viewBox={`${minX - 2} ${minY - 2} ${width + 4} ${height + 4}`}
      className={className}
      style={{ ["--block" as string]: "var(--accent)" }}
    >
      {cubes.map(({ x, y, z }, i) => (
        <g
          key={`${x}-${y}-${z}`}
          className={drop ? "lab-drop" : undefined}
          style={drop ? { animationDelay: `${i * 45}ms` } : undefined}
          stroke={stroke}
          strokeWidth={wire ? 1 : 0.75}
          strokeLinejoin="round"
        >
          <polygon fill={faces[0]} points={poly([pt(x, y, z + 1), pt(x + 1, y, z + 1), pt(x + 1, y + 1, z + 1), pt(x, y + 1, z + 1)])} />
          <polygon fill={faces[1]} points={poly([pt(x, y + 1, z + 1), pt(x + 1, y + 1, z + 1), pt(x + 1, y + 1, z), pt(x, y + 1, z)])} />
          <polygon fill={faces[2]} points={poly([pt(x + 1, y, z + 1), pt(x + 1, y + 1, z + 1), pt(x + 1, y + 1, z), pt(x + 1, y, z)])} />
        </g>
      ))}
    </svg>
  );
}

export const build = [
  [4, 3, 1, 1],
  [3, 2, 2, 0],
  [1, 2, 1, 1],
  [1, 0, 1, 0],
];
