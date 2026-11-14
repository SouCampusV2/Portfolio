import {
  siAppstore,
  siClaude,
  siCplusplus,
  siCss,
  siDocker,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGmail,
  siGoogleplay,
  siGoogleanalytics,
  siGooglecalendar,
  siGoogleforms,
  siGoogledrive,
  siGooglesheets,
  siGraphql,
  siJira,
  siLottiefiles,
  siHtml5,
  siJavascript,
  siMake,
  siMysql,
  siN8n,
  siOpenjdk,
  siSpringboot,
  siKubernetes,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRive,
  siShopify,
  siSqlite,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTiktok,
  siTypescript,
  siVercel,
  siVuedotjs,
  siZod,
  type SimpleIcon,
} from "simple-icons";
import {
  ArrowsLeftRight,
  Cube,
  HardDrives,
  Headset,
  Ticket,
  Translate,
  TreeStructure,
  UsersThree,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { site } from "@/content/site";

/** Icons for skills that are not brands: Phosphor, in the accent colour. */
type Glyph = { ph: PhosphorIcon };

const GLYPHS = {
  team: { ph: UsersThree },
  network: { ph: TreeStructure },
  headset: { ph: Headset },
  ticket: { ph: Ticket },
  box: { ph: Cube },
  server: { ph: HardDrives },
  video: { ph: VideoCamera },
  exchange: { ph: ArrowsLeftRight },
  languages: { ph: Translate },
} satisfies Record<string, Glyph>;

/**
 * Brand icons from simple-icons (CC0). Server component: the SVG paths are
 * inlined into the HTML, nothing ships to the client.
 * A string value = technology without an icon in the set → letter badge in
 * that brand color. Names not listed here render without an icon.
 */
const ICONS: Record<string, SimpleIcon | string | Glyph> = {
  "Team leadership": GLYPHS.team,
  "Stakeholder coordination": GLYPHS.network,
  "Client support": GLYPHS.headset,
  "Ticket handling": GLYPHS.ticket,
  "Client communication (English)": GLYPHS.languages,
  "Level design": GLYPHS.box,
  "REST APIs": GLYPHS.exchange,
  "Multiplayer servers": GLYPHS.server,
  "Content creation": GLYPHS.video,
  TikTok: siTiktok,
  Java: siOpenjdk,
  "Spring Boot": siSpringboot,
  Kubernetes: siKubernetes,
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Vue.js": siVuedotjs,
  "Tailwind CSS": siTailwindcss,
  Motion: "#8b5cf6",
  "Node.js": siNodedotjs,
  Python: siPython,
  PHP: siPhp,
  "C#": "#512bd4",
  "C++": siCplusplus,
  Supabase: siSupabase,
  "Supabase (PostgreSQL)": siSupabase,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  SQLite: siSqlite,
  GraphQL: siGraphql,
  Stripe: siStripe,
  Flutter: siFlutter,
  "Google Play": siGoogleplay,
  "App Store": siAppstore,
  FlutterFlow: "#4b39ef",
  n8n: siN8n,
  "OpenAI API": "#10a37f",
  "Google Sheets": siGooglesheets,
  Gmail: siGmail,
  "Google Calendar": siGooglecalendar,
  "Google Forms": siGoogleforms,
  "Google Drive": siGoogledrive,
  "Make.com": siMake,
  "Claude API": siClaude,
  Tavily: "#468bff",
  Zod: siZod,
  Shopify: siShopify,
  "Shopify Metaobjects": siShopify,
  Liquid: "#008060",
  PageFly: "#2f54eb",
  "SEO Optimization": "#0f9d58",
  "Google Analytics": siGoogleanalytics,
  Figma: siFigma,
  Lottie: siLottiefiles,
  Rive: siRive,
  Spline: "#7b61ff",
  Canva: "#00c4cc",
  Excel: "#217346",
  PowerPoint: "#d24726",
  Word: "#2b579a",
  YouScan: "#3f5efb",
  Git: siGit,
  GitHub: siGithub,
  "GitHub Actions": siGithubactions,
  npm: siNpm,
  Docker: siDocker,
  Jira: siJira,
  Vercel: siVercel,
};

/** Near-black / near-white brand colors would vanish in one theme; use text color. */
function brandColor(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.18 || lum > 0.9 ? "currentColor" : `#${hex}`;
}

export function hasTechIcon(name: string) {
  return name in ICONS;
}

export function TechIcon({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  if (typeof icon === "string") {
    // Letter badge. The letter is drawn by CSS (`[data-gen]::before` in
    // globals.css), not written as text: aria-hidden alone does not stop text
    // extractors, and they would read "FFlutterFlow".
    const letter = name.replace(/[^A-Za-z]/g, "")[0]?.toUpperCase() ?? name[0];
    return (
      <span
        aria-hidden="true"
        data-gen={letter}
        className={`${className} letter-badge shrink-0`}
        style={{ background: icon }}
      />
    );
  }
  if ("ph" in icon) {
    return <icon.ph aria-hidden="true" weight="bold" className={`${className} shrink-0 text-accent`} />;
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${className} shrink-0`}
      fill={brandColor(icon.hex)}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** Chip with icon + label, as used in the stack block and on /tech-stack.
 * Styled by `site.skillLevels`; a note there becomes a tooltip (see TipLayer). */
export function TechChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const skill = site.skillLevels[name];
  const pad = size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  const tone =
    skill?.level === "core"
      ? "border-accent/45 bg-accent-soft/60 text-ink"
      : skill?.level === "familiar"
        ? "border-dashed border-line bg-transparent text-muted"
        : "border-line bg-surface text-ink/85";
  return (
    <span
      data-tip={skill?.note}
      tabIndex={skill ? 0 : undefined}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border ${pad} ${tone} ${
        skill ? "cursor-help" : ""
      }`}
    >
      <span className={`inline-flex shrink-0 ${skill?.level === "familiar" ? "opacity-60" : ""}`}>
        <TechIcon name={name} className={size === "md" ? "size-4" : "size-3.5"} />
      </span>
      {name}
      {skill && <span className="sr-only">: {skill.note}</span>}
    </span>
  );
}

/** Legend for the two skill levels. */
export function SkillLegend() {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="size-3 rounded-[4px] border border-accent/45 bg-accent-soft/60" />
        Use a lot / right now
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="size-3 rounded-[4px] border border-dashed border-muted/60" />
        Learned earlier / touched
      </span>
      <span>Hover or tap a skill for details.</span>
    </p>
  );
}
