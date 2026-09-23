import {
  siClaude,
  siCplusplus,
  siCss,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGoogleanalytics,
  siGooglegemini,
  siGraphql,
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
  siShopify,
  siSqlite,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

/**
 * Brand icons from simple-icons (CC0). Server component: the SVG paths are
 * inlined into the HTML, nothing ships to the client.
 * A string value = technology without an icon in the set → letter badge in
 * that brand color. Names not listed here render without an icon.
 */
const ICONS: Record<string, SimpleIcon | string> = {
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
  FlutterFlow: "#4b39ef",
  n8n: siN8n,
  "Make.com": siMake,
  ChatGPT: "#10a37f",
  Gemini: siGooglegemini,
  "Claude Code": siClaude,
  "Prompt Engineering": "#d97757",
  Shopify: siShopify,
  "SEO Optimization": "#0f9d58",
  "Google Analytics": siGoogleanalytics,
  Figma: siFigma,
  Canva: "#00c4cc",
  "Shopify Metaobjects": siShopify,
  Liquid: "#008060",
  PageFly: "#2f54eb",
  Excel: "#217346",
  PowerPoint: "#d24726",
  Word: "#2b579a",
  YouScan: "#3f5efb",
  Git: siGit,
  GitHub: siGithub,
  "GitHub Actions": siGithubactions,
  npm: siNpm,
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

/** Chip with icon + label, as used in project cards, the marquee and /tech-stack. */
export function TechChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const pad = size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-line bg-surface ${pad} text-ink/85`}
    >
      <TechIcon name={name} className={size === "md" ? "size-4" : "size-3.5"} />
      {name}
    </span>
  );
}
