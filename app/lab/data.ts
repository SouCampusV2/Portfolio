import { site } from "@/content/site";

/**
 * Texts for the design lab. Facts only from REDESIGN_BRIEF.md, section 3.
 * Once a variant is chosen, the texts it needs move to content/site.ts.
 */

// The positioning line, split so a variant can set the two parts differently.
const cut = site.tagline.indexOf(". ") + 1;
export const lead = site.tagline.slice(0, cut); // "Junior full-stack developer in Tallinn."
export const rest = site.tagline.slice(cut + 1); // "I build with …"

export const numbers = [
  { value: "24 → 2 min", label: "HR admin time per candidate", where: "Bachelor's thesis, n8n" },
  { value: "100 / 90", label: "PageSpeed, desktop / mobile", where: "SouCampus" },
  { value: "~200 users", label: "registered in the app", where: "CMI, App Store and Google Play" },
];

// Rows for the "statement" hero.
export const ledger = [
  { date: "2018", text: "First paid Minecraft build", amount: "8 years of client work" },
  { date: "Jan 2025", text: "proceedit: front end of the CMI mobile app", amount: "~200 users" },
  { date: "2026", text: "Bachelor's thesis: hiring automation in n8n", amount: "24 → 2 min" },
  { date: "Jun 2026", text: "SouCampus: marketplace, sole engineer", amount: "100 / 90" },
  { date: "Oct 2026", text: "Learning Java and Spring Boot", amount: "in progress" },
];

export type LabMedia =
  | { kind: "video"; src: string; poster: string; alt: string }
  | { kind: "slides"; images: { src: string; alt: string }[] };

export type LabProject = {
  slug: string;
  title: string;
  /** Shown in a browser bar or as a small label. */
  host: string;
  kicker: string;
  line: string;
  metric: { value: string; label: string };
  facts: string[];
  /** Label / value rows for table-like variants. */
  rows: [string, string][];
  link: { label: string; href: string };
  media: LabMedia;
};

export const projects: LabProject[] = [
  {
    slug: "soucampus",
    title: "SouCampus",
    host: "soucampus.online",
    kicker: "Sole engineer · Jun 2026 – present",
    line: "A marketplace and studio site for Minecraft builds. I build it alone, from the database to production.",
    metric: { value: "100 / 90", label: "PageSpeed, desktop / mobile" },
    facts: [
      "Row-level security in PostgreSQL decides who reads each row",
      "Security audit before the relaunch",
      "3 custom-order clients, 5 maps sold directly",
    ],
    rows: [
      ["Role", "Sole engineer"],
      ["Period", "Jun 2026 – present"],
      ["Stack", "Next.js, TypeScript, Supabase, Stripe"],
      ["Checked", "Security audit: RLS, Stripe webhooks, uploads"],
      ["Result", "3 clients, 5 maps sold"],
    ],
    link: { label: "soucampus.online", href: "https://soucampus.online" },
    media: {
      kind: "video",
      src: "/projects/soucampus.mp4",
      poster: "/projects/soucampus-poster.webp",
      alt: "Screen recording: SouCampus landing page, portfolio and marketplace",
    },
  },
  {
    slug: "cmi",
    title: "CMI mobile app",
    host: "App Store · Google Play",
    kicker: "proceedit · front end lead · from Jun 2025",
    line: "Market analytics on a phone. I led the front end and built screens myself in Flutter and FlutterFlow.",
    metric: { value: "~200", label: "registered users" },
    facts: [
      "First working version in 6 months",
      "On the App Store and Google Play since March 2026",
      "Backend and database: mostly the team's work",
    ],
    rows: [
      ["Role", "Front end lead"],
      ["Period", "Jun 2025 – Jun 2026"],
      ["Stack", "Flutter, FlutterFlow"],
      ["Shipped", "App Store and Google Play, March 2026"],
      ["Result", "~200 registered users"],
    ],
    link: {
      label: "App Store",
      href: "https://apps.apple.com/us/app/cmi-ai-driven-market-analysis/id6754933246",
    },
    media: {
      kind: "slides",
      images: [
        { src: "/projects/cmi-subscription.webp", alt: "CMI app: the subscription screen on a phone" },
        { src: "/projects/cmi-insights.webp", alt: "CMI app: market insights screen" },
        { src: "/projects/cmi-themes.webp", alt: "CMI app in light and dark themes" },
        { src: "/projects/cmi-plans.webp", alt: "CMI app: plan selection screen" },
        { src: "/projects/cmi-cover.webp", alt: "Continuous Market Insights announcement" },
      ],
    },
  },
  {
    slug: "crossdesk",
    title: "Crossdesk",
    host: "crossdeskmatch.vercel.app",
    kicker: "Team of three · Vibe Sprint 2026 · 18–19 Sep 2026",
    line: "B2B matching where each side's figures stay private. A working MVP in 2 days at a hackathon.",
    metric: { value: "2 days", label: "from idea to a working MVP" },
    facts: [
      "My part: database with row-level security, website scraping, sign-in",
      "Part of the fit-scoring logic",
      "Now in the IGNITER pre-accelerator",
    ],
    rows: [
      ["Role", "Database, scraping, sign-in"],
      ["Period", "18–19 Sep 2026, then IGNITER"],
      ["Stack", "Next.js, TypeScript, Supabase"],
      ["Team", "Three people"],
      ["Result", "MVP in 2 days"],
    ],
    link: { label: "Live demo", href: "https://crossdeskmatch.vercel.app/" },
    media: {
      kind: "video",
      src: "/projects/crossdesk.mp4",
      poster: "/projects/crossdesk-poster.webp",
      alt: "Screen recording: the Crossdesk landing page",
    },
  },
];

export const me = {
  name: site.name,
  location: site.location,
  avatar: site.avatar,
  cv: site.cvHref,
  email: site.contact.email,
  linkedin: site.contact.linkedin,
  github: site.contact.github,
};
