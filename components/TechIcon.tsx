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
  siGoogledrive,
  siGooglegemini,
  siGooglesheets,
  siGraphql,
  siJira,
  siLottiefiles,
  siHtml5,
  siJavascript,
  siMake,
  siMysql,
  siN8n,
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
import { site } from "@/content/site";

/**
 * Outline glyphs for skills that are not brands, drawn after Lucide icons
 * (lucide.dev, ISC licence). Rendered in the accent colour.
 */
type Glyph = { glyph: React.ReactNode };

const GLYPHS: Record<string, Glyph> = {
  team: {
    glyph: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  network: {
    glyph: (
      <>
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
        <path d="M12 12V8" />
      </>
    ),
  },
  headset: {
    glyph: (
      <>
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
      </>
    ),
  },
  ticket: {
    glyph: (
      <>
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
      </>
    ),
  },
  box: {
    glyph: (
      <>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </>
    ),
  },
  server: {
    glyph: (
      <>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <path d="M6 6h.01" />
        <path d="M6 18h.01" />
      </>
    ),
  },
  video: {
    glyph: (
      <>
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </>
    ),
  },
  languages: {
    glyph: (
      <>
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </>
    ),
  },
};

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
  "Multiplayer servers": GLYPHS.server,
  "Content creation": GLYPHS.video,
  TikTok: siTiktok,
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
  "Google Drive": siGoogledrive,
  "Make.com": siMake,
  ChatGPT: "#10a37f",
  Gemini: siGooglegemini,
  "Claude Code": siClaude,
  "Claude API": siClaude,
  Zod: siZod,
  "Prompt Engineering": "#d97757",
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
    return (
      <span
        aria-hidden="true"
        style={{ background: icon }}
        className={`${className} inline-grid shrink-0 place-items-center rounded-[3px] text-[0.55rem] font-bold leading-none text-white`}
      >
        {name.replace(/[^A-Za-z]/g, "")[0]?.toUpperCase() ?? name[0]}
      </span>
    );
  }
  if ("glyph" in icon) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} shrink-0 text-accent`}
      >
        {icon.glyph}
      </svg>
    );
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

/** Chip with icon + label, as used in project cards, the marquee and /tech-stack.
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
      <span className={skill?.level === "familiar" ? "opacity-60" : ""}>
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
