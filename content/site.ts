/**
 * All site content lives here. Edit this file to change any text on the page;
 * components only read from it.
 *
 * Rules (from REDESIGN_BRIEF.md): facts only from section 3 of the brief. No
 * invented facts, numbers, clients, testimonials or links. Anything unknown is
 * marked `TODO` and is not rendered.
 */

export type Link = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
  context: string;
  /** Where the number is proven: a case study page or a project on this page. */
  href: string;
};

/**
 * Project media. Files live in public/projects/. Videos are 16:10 (1920x1200), play muted
 * and looped only while on screen and never autoplay for prefers-reduced-motion.
 */
export type ProjectMedia =
  | { kind: "video"; src: string; poster: string; alt: string }
  /** Still screenshots that crossfade. */
  | { kind: "slides"; images: { src: string; alt: string }[] }
  /** A chain of tools drawn with their icons, for a workflow without a UI. */
  | { kind: "flow"; steps: string[]; alt: string }
  /** A named list on drawing paper, until real screenshots exist. */
  | { kind: "list"; label: string; items: string[] };

export type Project = {
  /** Anchor on the home page: /#soucampus. */
  slug: string;
  title: string;
  /** Flagship projects get the large card; the rest are compact. */
  flagship?: boolean;
  /** One or two sentences under the title. */
  line: string;
  /** Label / value rows of the card: role, stack, how it was checked, result. */
  rows: [string, string][];
  /** Not shown on the card; the /tech-stack page collects them. */
  tags: string[];
  badge?: string;
  link?: Link;
  /** Further external links shown next to `link` (e.g. a second app store). */
  moreLinks?: Link[];
  /** Internal case study page, e.g. "/soucampus". */
  caseStudy?: string;
  media: ProjectMedia;
};

export type Role = {
  role: string;
  period: string;
  highlights: string[];
};

export type Job = {
  role: string;
  org: string;
  period: string;
  /** One line under the title. */
  summary: string;
  /** For a company with several positions: one row per position, newest first. */
  roles?: Role[];
  /** Label above `highlights` when `roles` are present. */
  highlightsLabel?: string;
  highlights: string[];
  /** Not shown on the home page; the /tech-stack page collects them. */
  tech?: string[];
};

export type TechGroup = {
  category: string;
  items: string[];
};

export type Hobby = {
  name: string;
  /** Illustration used on the card until a real photo is added. */
  art: "volleyball" | "sport" | "walks" | "travel" | "minecraft" | "counter-strike";
  /** Optional photo (public/hobbies/…, portrait ~4:5). Replaces the illustration. */
  photo?: string;
};

export type CaseSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
  /** Marks work that is planned, not shipped. */
  planned?: boolean;
};

/** Diagrams drawn in code; the map from id to component is in components/diagrams. */
export type DiagramId = "onboarding-as-is" | "onboarding-n8n" | "onboarding-data-flow";

/** A picture in a case study. Opens at full size on click. */
export type CaseFigure = { src: string; alt: string; caption: string; width: number; height: number };

/**
 * A case study at /projects/[slug]. Same order for every project (brief, section 5):
 * problem → my role → architecture → decisions → how I checked → what I'd do
 * differently → result.
 */
export type CaseStudy = {
  title: string;
  /** One or two sentences under the title; also the page description. */
  tagline: string;
  facts: { label: string; value: string }[];
  sections: {
    heading: string;
    body?: string[];
    bullets?: string[];
    /** Label / value pairs, e.g. decisions and the reason for each. */
    points?: { title: string; text: string }[];
    table?: { head: string[]; rows: string[][]; foot?: string[] };
    figures?: CaseFigure[];
    /** Diagrams drawn in code (components/diagrams), by id. */
    diagrams?: { id: DiagramId; caption: string }[];
  }[];
};

export type SkillLevel = {
  /** core = used a lot or right now; familiar = learned earlier or only touched. */
  level: "core" | "familiar";
  /** Shown as a tooltip on hover / focus / tap. */
  note: string;
};

export type Recommendation = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

export type Language = {
  name: string;
  level: string;
};

// TODO: set the final domain once it is known. On Vercel the production URL is
// picked up automatically from VERCEL_PROJECT_PRODUCTION_URL.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const site = {
  name: "Yevhenii Stavytskyi",
  title: "Junior Full-Stack Developer",
  // The one positioning line: hero, <title> and meta description all use it.
  tagline:
    "Junior full-stack developer in Tallinn. I build with TypeScript and PostgreSQL, I'm learning Java and Spring Boot, and I want to work on software that moves money.",
  location: "Tallinn, Estonia",
  avatar: "/portrait.webp",
  // The general CV (public/). Replace the file to update it; keep the name.
  cvHref: "/CV_Yevhenii_Stavytskyi.pdf",

  // Words in the bio that become links (first occurrence only).
  aboutLinks: {
    SouCampus: "https://soucampus.online/marketplace",
    Crossdesk: "https://crossdeskmatch.vercel.app/",
  } as Record<string, string>,

  about: [
    "I got my first paid Minecraft build in 2018, and years of briefs, deadlines and revisions taught me to deliver what the client actually asked for.",
    "Since 2025 I do the same with software: I led the front end of a mobile app that shipped to both stores at proceedit, and I build a marketplace with payments and database-level access control on my own.",
    "Now I'm looking for a junior developer role at a bank or fintech in Tallinn.",
  ],

  // Header links, in page order.
  nav: [
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Stack", href: "/#stack" },
    { label: "Builds", href: "/#builds" },
    { label: "About", href: "/#about" },
    { label: "Outside", href: "/#outside" },
    { label: "GitHub", href: "/#activity" },
    { label: "Contact", href: "/#contact" },
  ] satisfies Link[],

  // The stamp in the hero, like the title block of a drawing.
  heroSpec: [
    ["Role", "Junior full-stack developer"],
    ["Site", "Tallinn, Estonia · 59.44°N 24.75°E"],
    ["In production", "TypeScript · PostgreSQL"],
    ["Learning", "Java · Spring Boot"],
  ] as [string, string][],

  // Three numbers, each linked to the place that proves it.
  metrics: [
    {
      label: "Automation",
      value: "24 → 2 min",
      context: "HR admin time per candidate, bachelor's thesis built for proceedit",
      href: "/projects/onboarding-automation",
    },
    {
      label: "Speed",
      value: "100 / 90",
      context: "PageSpeed on SouCampus, desktop / mobile",
      href: "/soucampus",
    },
    {
      label: "Mobile app",
      value: "~200 users",
      context: "Registered in the CMI app, on the App Store and Google Play since March 2026",
      href: "/#cmi",
    },
  ] satisfies Metric[],

  projects: [
    {
      slug: "soucampus",
      title: "SouCampus",
      flagship: true,
      line: "A marketplace and studio site for Minecraft builds. I build it alone, from the database to production.",
      rows: [
        ["Role", "Sole engineer"],
        ["Period", "Jun 2026 – present"],
        ["Stack", "Next.js, TypeScript, Supabase (PostgreSQL, RLS), Stripe, Vercel"],
        ["Checked", "Security audit: RLS policies, Stripe webhook signatures, file uploads"],
        ["Speed", "PageSpeed 100 desktop / 90 mobile"],
        ["Payments", "Stripe checkout is built, not switched on yet"],
        ["Result", "3 custom-order clients, 5 maps sold directly"],
      ],
      tags: [
        "TypeScript",
        "Next.js",
        "React",
        "Node.js",
        "Tailwind CSS",
        "Motion",
        "Supabase (PostgreSQL)",
        "Stripe",
        "Google Analytics",
        "Vercel",
      ],
      link: { label: "soucampus.online", href: "https://soucampus.online" },
      caseStudy: "/soucampus",
      // Screen recording of the live site: landing → portfolio → marketplace.
      media: {
        kind: "video",
        src: "/projects/soucampus-hd.mp4",
        poster: "/projects/soucampus-hd-poster.webp",
        alt: "Screen recording: SouCampus landing page, then the portfolio, then the marketplace",
      },
    },
    {
      slug: "cmi",
      title: "CMI mobile app",
      flagship: true,
      // What CMI is: from its App Store / Google Play listing and proceedit.shop.
      line: "Continuous Market Insights: market analytics on a phone, made at proceedit. I led the front end and built screens myself.",
      rows: [
        ["Role", "Front end lead; built screens myself"],
        ["Period", "From June 2025"],
        ["Stack", "Flutter, FlutterFlow"],
        ["Team's part", "Backend, REST / GraphQL APIs and database, mostly"],
        ["Pace", "First working version in 6 months"],
        ["Shipped", "App Store and Google Play, March 2026"],
        ["Result", "~200 registered users"],
      ],
      tags: ["FlutterFlow", "Flutter", "PostgreSQL", "GraphQL", "Google Play", "App Store"],
      link: { label: "App Store", href: "https://apps.apple.com/us/app/cmi-ai-driven-market-analysis/id6754933246" },
      moreLinks: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.mycompany.cticontinuoustradinginsightsapplication",
        },
      ],
      // Promo screens made by proceedit's designer.
      media: {
        kind: "slides",
        images: [
          { src: "/projects/cmi-subscription.webp", alt: "CMI app: the subscription screen on a phone" },
          { src: "/projects/cmi-insights.webp", alt: "CMI app: the market insights screen" },
          { src: "/projects/cmi-themes.webp", alt: "CMI app in light and dark themes" },
          { src: "/projects/cmi-plans.webp", alt: "CMI app: choosing a plan" },
        ],
      },
    },
    {
      slug: "crossdesk",
      title: "Crossdesk",
      flagship: true,
      line: "B2B matching where each side's figures stay private. A working MVP in 2 days at a hackathon, in a team of three.",
      rows: [
        ["My part", "Database (Supabase, RLS), website scraping, sign-in, part of the fit scoring"],
        ["Event", "Vibe Sprint 2026 (Startup Garage), 18–19 Sep 2026"],
        ["Team", "Three people"],
        ["Stack", "Next.js, TypeScript, Supabase, Claude API"],
        ["Result", "Working MVP in 2 days"],
        ["Now", "IGNITER pre-accelerator"],
      ],
      tags: ["TypeScript", "Next.js", "React", "Node.js", "Tailwind CSS", "Supabase", "Claude API", "Tavily", "Stripe", "Zod", "Vercel"],
      badge: "MVP",
      link: { label: "Live demo", href: "https://crossdeskmatch.vercel.app/" },
      media: {
        kind: "video",
        src: "/projects/crossdesk-hd.mp4",
        poster: "/projects/crossdesk-hd-poster.webp",
        alt: "Screen recording: the animated Crossdesk landing page",
      },
    },
    {
      slug: "onboarding-automation",
      title: "Hiring and onboarding automation",
      // Thesis "Automated System for Onboarding in a Medium-Sized Company"
      // (University of Tartu, 2026).
      line: "My bachelor's thesis, built for proceedit: n8n takes a candidate from the application email to the first working day.",
      rows: [
        ["Result", "HR admin time per candidate: 24 → 2 minutes (−91.6%)"],
        ["Stack", "n8n, OpenAI, Gmail / Google Workspace, Jira"],
        ["Where", "University of Tartu, 2026"],
      ],
      tags: ["n8n", "JavaScript", "Google Sheets", "Gmail", "Google Calendar", "Google Drive", "Jira", "OpenAI API"],
      caseStudy: "/projects/onboarding-automation",
      media: {
        kind: "flow",
        steps: ["Gmail", "OpenAI API", "Google Sheets", "Google Calendar", "Google Drive", "Jira"],
        alt: "The n8n workflow: Gmail, OpenAI, Google Sheets, Google Calendar, Google Drive, Jira",
      },
    },
    {
      slug: "proceedit-website",
      title: "proceedit website",
      line: "The company website on Shopify. I am a co-author: part of the front end and the design.",
      rows: [
        ["Result", "Desktop PageSpeed 70 → 88, page weight −40%"],
        ["Stack", "Shopify, Liquid, HTML, CSS, JavaScript"],
        ["Role", "Co-author"],
      ],
      // Stack as detected on the live site. TODO: keep only what you worked with.
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript", "PageFly", "Shopify Metaobjects", "Lottie", "Rive", "Spline"],
      link: { label: "proceedit.shop", href: "https://proceedit.shop/" },
      media: {
        kind: "video",
        src: "/projects/proceedit-hd.mp4",
        poster: "/projects/proceedit-hd-poster.webp",
        alt: "Screen recording: the proceedit website landing page",
      },
    },
    {
      slug: "botcampus",
      title: "BotCampus",
      // Private repository SouCampusV2/soucampusBot. The code was not written by
      // hand: say "designed and run", never "wrote" (brief, rule 2).
      // TODO: screenshots of the order flow on the Discord server.
      line: "A Discord bot that runs SouCampus build orders, from the first ticket to the client's review.",
      rows: [
        ["My part", "Idea, order flow and features; runs on my own VPS"],
        ["Flow", "Ticket → order form → builder quotes → client picks a builder → payment confirmed → delivery → review"],
        ["Website", "Posts from soucampus.online to Discord; reviews and portfolio drafts go back to the site"],
        ["Stack", "Node.js, discord.js, SQLite; tests and CI on GitHub Actions"],
        ["Result", "3 orders handled through the bot so far"],
      ],
      tags: ["Node.js", "JavaScript", "SQLite", "GitHub Actions"],
      media: {
        kind: "list",
        label: "Order flow in Discord",
        items: ["Ticket", "Order form", "Quotes", "Pick a builder", "Payment", "Delivery", "Review"],
      },
    },
    {
      slug: "soutools",
      title: "SouTools",
      // The repository is private. Wording stays on what the tools are and do.
      // TODO: screenshots or a video of the tools in the editor.
      line: "Terrain tools I designed for my own building work: an add-on for the Axiom editor in Minecraft.",
      rows: [
        ["What", "About ten tools for shaping landscape"],
        ["Platform", "Java add-on for the Axiom editor (Fabric)"],
        ["Releases", "Built and released through GitHub Actions, with auto-update"],
      ],
      tags: ["Java", "GitHub Actions"],
      media: {
        kind: "list",
        label: "Axiom add-on",
        items: ["Floating Rock", "Carved Rock", "Palette Brush", "Ocean Floor", "Bushes"],
      },
    },
    // TODO: fourth flagship slot is reserved for the Java project (transfers API).
  ] satisfies Project[] as Project[],

  // Minecraft: eight years of client work. One strip on the home page.
  // TODO: a /builds page with renders; until then the link goes to soucampus.online.
  minecraft: {
    title: "Minecraft level design",
    period: "2018 – present",
    line: "My first paid build was in 2018. Since then: maps and structures for multiplayer servers, from the client's brief to the delivered build.",
    facts: [
      ["Servers", "Luckycraft, GuardiumMC, RamboMC, BreadBuilds, AstroSMP"],
      ["Studio work", "As a contract builder: builds for MrBeast projects and Minecraft Marketplace partners"],
      ["TikTok", "@soucampus: 1.8K followers, 168K likes"],
    ] as [string, string][],
    // Do not use MrBeast logos.
    links: [
      { label: "See the builds", href: "https://soucampus.online/portfolio" },
      { label: "TikTok", href: "https://www.tiktok.com/@soucampus" },
    ] satisfies Link[],
    media: {
      src: "/projects/minecraft-hd.mp4",
      poster: "/projects/minecraft-hd-poster.webp",
      alt: "Screen recording: browsing Minecraft builds in the soucampus.online portfolio",
    },
  },

  // Newest first. proceedit: only dated facts sit under a role; the rest goes
  // under "Across the whole time".
  experience: [
    {
      role: "Founder & sole engineer",
      org: "SouCampus",
      period: "Jun 2026 – Present",
      summary: "A marketplace and studio site for Minecraft builds, built alone from architecture to production.",
      highlights: [
        "Built the marketplace: categories, filters, ratings, collections, similar-map suggestions and a cart.",
        "Built the studio side: portfolio, client stories, custom orders, a wiki, changelog and support pages.",
        "Authentication and the database on Supabase (PostgreSQL), with row-level security deciding who reads each row.",
        "Stripe checkout is built; payments are not switched on yet.",
        "Ran a security audit before the relaunch: row-level security policies, Stripe webhook signatures and file uploads.",
        "PageSpeed 100 on desktop and 90 on mobile in production.",
        "The site has already brought 3 custom-order clients; 5 maps sold directly.",
      ],
      tech: ["TypeScript", "Next.js", "React", "Node.js", "Tailwind CSS", "Motion", "Supabase (PostgreSQL)", "Stripe", "Google Analytics", "REST APIs", "GitHub", "Vercel"],
    },
    {
      role: "Full Stack Developer → Head of Application Unit",
      org: "proceedit",
      period: "Jan 2025 – Jun 2026",
      summary: "Fintech company (AI market analytics), Barcelona, remote. Three positions between January 2025 and June 2026.",
      roles: [
        {
          role: "Head of Application Unit",
          period: "Mar 2026 – Jun 2026",
          highlights: [
            "Ran the application unit: up to 10 people at a time, developers and three designers. About 20 people went through the unit over time.",
            "Worked every day with designers, developers, business, marketing and the CEO.",
            "The CMI app went live on the App Store and Google Play in March 2026 and reached ~200 registered users.",
          ],
        },
        {
          role: "Frontend Supervisor",
          period: "Aug 2025 – Mar 2026",
          highlights: [
            "Led the front end of the CMI mobile app and kept building screens myself in Flutter and FlutterFlow.",
            "First working version in December 2025, 6 months after the start.",
            "Legal compliance work around August–September 2025: reworked many sections of the company website.",
            "Put the documentation in order: wrote usage docs and FlutterFlow tutorials so new interns could start on their own.",
            "Took part in backend architecture decisions; the backend, REST / GraphQL APIs and database were mostly the team's work.",
          ],
        },
        {
          role: "Full Stack Developer",
          period: "Jan 2025 – Aug 2025",
          highlights: [
            "Before CMI: worked on another company website and its design, and on a second app that was never finished because the plans kept changing.",
            "Taught the interns to work with FlutterFlow.",
            "CMI development started in June 2025: turned Figma designs into Flutter and FlutterFlow screens for iOS and Android.",
          ],
        },
      ],
      // TODO: move each line under the right position once the dates are known.
      highlightsLabel: "Across the whole time",
      highlights: [
        "Co-author of the company website on Shopify (Liquid): desktop PageSpeed 70 → 88, page weight −40%.",
        "Built the hiring and onboarding automation for the company as my bachelor's thesis (n8n, OpenAI, Gmail / Google Workspace, Jira): HR admin time per candidate 24 → 2 minutes.",
      ],
      tech: ["Flutter", "FlutterFlow", "Google Play", "App Store", "GraphQL", "REST APIs", "PostgreSQL", "Shopify", "HTML", "CSS", "JavaScript", "n8n", "Figma", "Jira"],
    },
    {
      // Note: one older CV says "Data Analytics Intern, 15 May – 15 Aug 2023".
      role: "Data Analyst",
      org: "Sayara International",
      period: "Apr 2023 – Oct 2023",
      summary: "Remote. Reports on narratives about the war in Ukraine, from media data.",
      highlights: ["Collected and organized media data in YouScan and Excel and turned it into reports."],
      tech: ["YouScan", "Excel", "Word"],
    },
    {
      role: "Freelance Minecraft Level Designer",
      org: "Self-employed",
      period: "2018 – Present",
      summary: "Multiplayer maps and structures for clients worldwide; first paid build in 2018.",
      // TODO: confirm/extend: pricing & scoping orders, deadlines, leading other builders, Discord community.
      highlights: [
        "English has been my working language with clients since 2018.",
        "Built for servers including Luckycraft, GuardiumMC, RamboMC, BreadBuilds and AstroSMP.",
        "As a contract builder for a studio: builds for MrBeast projects and Minecraft Marketplace partners.",
      ],
      tech: ["Level design", "Multiplayer servers", "Client support", "Ticket handling", "Client communication (English)", "TikTok", "Content creation"],
    },
  ] satisfies Job[] as Job[],

  // The stack block on the home page, three honest levels. The full list with
  // notes is on /tech-stack (`tech` and `skillLevels` below).
  stack: [
    {
      level: "In production",
      note: "Runs in products people use",
      items: ["TypeScript", "Next.js", "React", "PostgreSQL", "Supabase", "Stripe", "Tailwind CSS", "Vercel", "Flutter", "FlutterFlow", "Shopify"],
    },
    {
      level: "Used in projects",
      note: "Built something real with it",
      items: ["Node.js", "n8n", "OpenAI API", "REST APIs", "GraphQL", "Liquid", "Figma", "Git"],
    },
    {
      level: "Learning now",
      note: "Java and Spring Boot since October 2026",
      items: ["Java", "Spring Boot", "Kubernetes"],
    },
  ],

  // Technologies, grouped as on the /tech-stack page. Icons come from
  // simple-icons (see components/TechIcon.tsx); add new names there too.
  tech: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "Motion"],
    },
    {
      category: "Backend & Languages",
      items: ["Node.js", "REST APIs", "GraphQL", "Zod", "Stripe", "Python", "PHP", "C#", "C++"],
    },
    {
      category: "Databases",
      items: ["Supabase", "PostgreSQL", "MySQL", "SQLite"],
    },
    { category: "Mobile", items: ["Flutter", "FlutterFlow", "Google Play", "App Store"] },
    {
      category: "AI & Automation",
      // AI only as something built into a product, never as a list of AI tools.
      items: ["OpenAI API", "Claude API", "Tavily", "n8n", "Make.com"],
    },
    {
      category: "CMS & Marketing",
      items: ["Shopify", "Shopify Metaobjects", "Liquid", "PageFly", "SEO Optimization", "Google Analytics"],
    },
    { category: "Design & Motion", items: ["Figma", "Canva", "Lottie", "Rive", "Spline"] },
    {
      category: "Workspace & Data",
      items: ["Google Sheets", "Gmail", "Google Calendar", "Google Drive", "Excel", "PowerPoint", "Word", "YouScan"],
    },
    {
      // Delivery & support side, for coordination / governance / support roles.
      category: "Delivery & Support",
      items: ["Team leadership", "Stakeholder coordination", "Client support", "Ticket handling", "Client communication (English)", "Jira"],
    },
    {
      category: "Games & Content",
      items: ["Level design", "Multiplayer servers", "TikTok", "Content creation"],
    },
    {
      category: "Tools & Deployment",
      items: ["Git", "GitHub", "GitHub Actions", "npm", "Docker", "Kubernetes", "Vercel"],
    },
  ] satisfies TechGroup[] as TechGroup[],

  // How well each technology is known. Chips are highlighted by level and show
  // `note` as a tooltip. Names missing here render as plain chips.
  // DRAFT based on where each tool shows up in the projects above: correct freely.
  skillLevels: {
    // Used a lot / right now
    TypeScript: { level: "core", note: "Every day: SouCampus, Crossdesk and this site" },
    JavaScript: { level: "core", note: "Every web project, plus custom logic in n8n" },
    HTML: { level: "core", note: "Every web project; refactored legacy markup at proceedit" },
    CSS: { level: "core", note: "Every web project; refactored legacy styles at proceedit" },
    React: { level: "core", note: "SouCampus, Crossdesk and this site" },
    "Next.js": { level: "core", note: "SouCampus, Crossdesk and this site (App Router)" },
    "Node.js": { level: "core", note: "Server side of SouCampus and Crossdesk" },
    "Tailwind CSS": { level: "core", note: "Styling in all my current web projects" },
    Motion: { level: "core", note: "Animations on SouCampus and this site" },
    Supabase: { level: "core", note: "Auth, database and row-level security in SouCampus and Crossdesk" },
    "Supabase (PostgreSQL)": { level: "core", note: "Auth, database and row-level security in SouCampus" },
    PostgreSQL: { level: "core", note: "Through Supabase in SouCampus and Crossdesk" },
    Stripe: { level: "core", note: "Checkout in SouCampus (built, not switched on yet)" },
    Flutter: { level: "core", note: "Front end of the CMI app at proceedit, from Jun 2025" },
    FlutterFlow: { level: "core", note: "Front end of the CMI app at proceedit, from Jun 2025" },
    n8n: { level: "core", note: "Internal automations at proceedit and my bachelor's thesis" },
    Figma: { level: "core", note: "From design concepts to the CMI app and the proceedit site" },
    Shopify: { level: "core", note: "proceedit corporate website" },
    Git: { level: "core", note: "Every project" },
    GitHub: { level: "core", note: "Every project; team workflow on Crossdesk" },
    npm: { level: "core", note: "Every JavaScript project" },
    Vercel: { level: "core", note: "Deploys SouCampus, Crossdesk and this site" },
    Jira: { level: "core", note: "Delivery tracking at proceedit" },
    "Google Analytics": { level: "core", note: "Set up and used on SouCampus" },
    "REST APIs": { level: "core", note: "SouCampus back end; integrations in n8n" },
    "Google Play": { level: "core", note: "Published the CMI app" },
    "App Store": { level: "core", note: "Published the CMI app" },
    "OpenAI API": { level: "core", note: "AI agent that parses job applications in my n8n thesis" },
    "SEO Optimization": { level: "core", note: "Restructured content and code on the proceedit site" },
    "Google Sheets": { level: "core", note: "The data layer of my n8n onboarding system" },
    Gmail: { level: "core", note: "Triggers and emails in my n8n onboarding system" },
    "Google Calendar": { level: "core", note: "Automatic interview booking in my n8n onboarding system" },
    "Google Drive": { level: "core", note: "Contracts and access sharing in my n8n onboarding system" },
    "Team leadership": { level: "core", note: "Head of Application Unit at proceedit: up to 10 people at a time" },
    "Stakeholder coordination": { level: "core", note: "Daily work with designers, developers, business, marketing and the CEO at proceedit" },
    "Client support": { level: "core", note: "Years of Minecraft client work, from request to delivery" },
    "Ticket handling": { level: "core", note: "Client requests and revisions through tickets" },
    "Client communication (English)": { level: "core", note: "Daily with clients from many countries" },
    "Level design": { level: "core", note: "Minecraft maps and builds since 2018" },
    "Multiplayer servers": { level: "core", note: "Builds for Luckycraft, GuardiumMC, RamboMC, AstroSMP and more" },
    TikTok: { level: "core", note: "Grew @soucampus to 1.8K followers and 168K likes" },
    "Content creation": { level: "core", note: "52 build videos on @soucampus" },
    // Learned earlier / only touched
    GraphQL: { level: "familiar", note: "Used in the CMI app; the API layer was mostly the team's work" },
    Python: { level: "familiar", note: "Learned earlier; used for smaller tasks" },
    PHP: { level: "familiar", note: "Learned earlier; not used in recent projects" },
    "C#": { level: "familiar", note: "University course" },
    "C++": { level: "familiar", note: "Learned earlier; not used in recent projects" },
    "Vue.js": { level: "familiar", note: "Tried it; React is my main framework" },
    MySQL: { level: "familiar", note: "Learned earlier; PostgreSQL is my main database" },
    SQLite: { level: "familiar", note: "Learned earlier; small projects" },
    Kubernetes: { level: "familiar", note: "Learning now" },
    Docker: { level: "familiar", note: "Learned the basics; not in production yet" },
    "GitHub Actions": { level: "familiar", note: "Basic CI workflows" },
    "Make.com": { level: "familiar", note: "Evaluated against n8n and Zapier in my thesis" },
    Liquid: { level: "familiar", note: "Shopify theme work on the proceedit site" },
    PageFly: { level: "familiar", note: "Page builder on the proceedit site" },
    Lottie: { level: "familiar", note: "Explored for animations on the proceedit site" },
    Rive: { level: "familiar", note: "Explored for animations on the proceedit site" },
    Spline: { level: "familiar", note: "Built a 3D model for the proceedit site" },
    YouScan: { level: "familiar", note: "Media analysis at Sayara International, 2023" },
    "Claude API": { level: "familiar", note: "Built into Crossdesk: the agents that check the fit" },
    Zod: { level: "familiar", note: "Validation in the Crossdesk code base" },
    Tavily: { level: "familiar", note: "Fallback website reader in Crossdesk (set up by a teammate)" },
    "Shopify Metaobjects": { level: "familiar", note: "Structured content on the proceedit site" },
    Canva: { level: "familiar", note: "Quick graphics and presentations" },
    Excel: { level: "familiar", note: "Data analysis at Sayara International, 2023" },
    PowerPoint: { level: "familiar", note: "Presentations and reports" },
    Word: { level: "familiar", note: "Reports at Sayara International, 2023" },
  } as Record<string, SkillLevel>,

  // GitHub Activity heatmap (public contribution data, refreshed daily).
  githubUser: "SouCampusV2",

  // "Outside the IDE". Cards show an illustration until `photo` is set.
  outside: {
    text: "Away from the keyboard I'm usually on a volleyball court or doing some other sport. I walk a lot and travel whenever I can. And yes, I still play Minecraft, plus a few rounds of Counter-Strike.",
    hobbies: [
      { name: "Volleyball", art: "volleyball" },
      { name: "Sport", art: "sport" },
      { name: "Walks", art: "walks" },
      { name: "Travel", art: "travel" },
      { name: "Minecraft", art: "minecraft" },
      { name: "Counter-Strike", art: "counter-strike" },
    ] satisfies Hobby[] as Hobby[],
  },

  // Case studies at /projects/[slug]. Facts only from REDESIGN_BRIEF.md section 3
  // and, for the thesis, from the thesis itself (owner's own work).
  cases: {
    "onboarding-automation": {
      title: "Hiring and onboarding automation",
      tagline:
        "My bachelor's thesis (University of Tartu, 2026), built for proceedit: an n8n system that takes a candidate from the application email to the first working day.",
      facts: [
        { label: "Role", value: "Author: research, design, build" },
        { label: "Platform", value: "n8n, custom JavaScript" },
        { label: "Connected", value: "Gmail, OpenAI, Sheets, Calendar, Drive, Jira" },
        { label: "Result", value: "24 → 2 min per candidate" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "The company is a fintech of 50–100 people that hires three to ten people a month. Hiring ran by hand across email, Google Forms, one shared Google Sheet and Jira.",
            "Nothing sent alerts. HR had to watch the inbox for new applications, write every email, book interviews, prepare contracts and create accounts. Applications got missed, and new hires waited for access in their first days.",
          ],
          diagrams: [{ id: "onboarding-as-is", caption: "Before: seven phases, almost every step done by HR by hand" }],
        },
        {
          heading: "My role",
          body: [
            "I did the project alone. I knew the process from the inside: I went through it as a new hire at the company.",
          ],
          bullets: [
            "Interviewed the HR team and mapped the manual process step by step",
            "Ran surveys for HR staff and for new hires to get numbers, not only opinions",
            "Compared three tools and chose one",
            "Designed and built the workflow in n8n",
            "Measured the result against the manual baseline",
          ],
        },
        {
          heading: "Architecture",
          body: [
            "n8n works as an invisible layer between the tools HR already used. HR keeps working in the same Google Sheet. Changing a candidate's status in it starts the next step. The workflow has three parts:",
          ],
          points: [
            {
              title: "1. Intake",
              text: "A Gmail trigger catches new applications. An OpenAI model pulls the name, email and position out of free-form emails. The candidate becomes a row in Google Sheets, and the interview slot goes to Google Calendar.",
            },
            {
              title: "2. Status-driven pre-boarding",
              text: "Each status change in the sheet sends the candidate down one path: the test task with automatic reminders, a rejection email, or a contract copied from a template in Google Drive.",
            },
            {
              title: "3. IT setup",
              text: "Once a day the workflow picks up new hires. It creates the Jira user through the REST API, clones the onboarding tickets, tells the supervisor, shares the Drive folders and sends the welcome email. After seven days it adds the recurring team meetings.",
            },
          ],
          diagrams: [
            { id: "onboarding-n8n", caption: "The workflow in n8n: intake, pre-boarding, IT setup" },
            { id: "onboarding-data-flow", caption: "Data flow: Google Sheets is the single source of truth" },
          ],
        },
        {
          heading: "Decisions",
          points: [
            {
              title: "n8n, not Zapier or Make",
              text: "n8n can run on the company's own server, so contracts and personal details stay inside. It counts one run of a whole workflow, not every step, which keeps the price flat as hiring grows. And it lets me write JavaScript inside a step when no ready node exists.",
            },
            {
              title: "Keep Google Sheets",
              text: "The company did not want a new HR system. A status column turns the sheet into a simple state machine: HR moves a candidate forward by changing one value and never touches the automation.",
            },
            {
              title: "A person still reads the CV",
              text: "The AI only extracts data. The decision about a candidate stays with HR, so CV review keeps its 2 minutes in the comparison below.",
            },
          ],
        },
        {
          heading: "How I checked it",
          body: [
            "I compared HR time per candidate, step by step, before and after. The baseline figures came from the HR team. Interview time itself is not counted.",
          ],
          table: {
            head: ["HR task", "Before", "After"],
            rows: [
              ["CV review", "2 min", "2 min"],
              ["Shortlisting email", "~2 min", "0"],
              ["Booking the interview", "5 min", "0"],
              ["Rejection after the first interview", "1 min", "0"],
              ["Setting up the second interview", "7 min", "0"],
              ["Sending the test task", "1 min", "0"],
              ["Accounts and access", "5 min", "0"],
            ],
            foot: ["Total", "24 min", "2 min"],
          },
        },
        {
          heading: "What I would do differently",
          bullets: [
            "Google Sheets is the weak spot: it has no strict validation, and one wrong manual edit can break a trigger. Next step: PostgreSQL behind a small HR dashboard.",
            "The Jira node in n8n could not manage users, so I used direct HTTP requests and wait steps. If Jira answers slowly, account creation can time out. It needs retries and proper error handling.",
            "Offboarding is not automated yet. The next module would remove access to every tool when an employee's status changes to leaving.",
          ],
        },
        {
          heading: "Result",
          body: [
            "HR admin time per candidate went from 24 to 2 minutes, a 91.6% cut. The only manual step left is reading the CV.",
            "It is an MVP: it covers intake, pre-boarding and IT setup, not yet the whole employee lifecycle.",
          ],
        },
      ],
    },
  } as Record<string, CaseStudy>,

  // Case study page: /soucampus. Facts only from this file.
  // TODO: add the story behind key decisions and any numbers (users, sales, orders)
  // you want public.
  soucampusCase: {
    title: "SouCampus",
    tagline:
      "A marketplace for premium Minecraft maps and builds, built solo from architecture to production deployment.",
    facts: [
      { label: "Role", value: "Founder & sole developer" },
      { label: "Timeline", value: "Jun 2026 – Present" },
      { label: "PageSpeed", value: "100 desktop / 90 mobile" },
      { label: "Status", value: "Live; payments built, not switched on yet" },
    ],
    sections: [
      {
        heading: "The product",
        body: [
          "SouCampus is a Minecraft build business in one product. The studio side takes custom orders for maps, spawns and whole worlds, with a portfolio and client stories. The marketplace lists ready-made maps and builds. Checkout with instant download is built, but payments are not switched on yet.",
          "So far the site has brought 3 custom-order clients, and 5 maps were sold directly.",
        ],
      },
      {
        heading: "Business",
        // TODO: add numbers from the business plan you are happy to make public.
        body: [
          "I wrote the business plan myself. It combines two revenue streams: custom build commissions and marketplace sales of ready-made maps that anyone can buy without waiting for an order.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "The whole product alone: architecture, front end, database, payments and production deployment",
          "Authentication and accounts",
          "Database-level access control with Supabase row-level security, so the database itself decides who can read or change each row",
          "Checkout with Stripe (built, not switched on yet)",
          "A security audit before the relaunch: row-level security policies, Stripe webhook signatures and file uploads",
          "Marketplace browsing: categories (spawns and hubs, adventure and RPG, minigames and PvP, buildings, interiors, landscape, assets), filters, collections and free maps",
          "Listing pages with ratings, purchase and view counts, comments with moderation and a cart",
          "Similar maps picked by category, type and theme, not at random",
          "A wiki that answers the questions buyers used to ask in Discord, plus a changelog and support pages",
        ],
      },
      {
        heading: "Performance",
        body: [
          "Speed is part of the product: SouCampus scores 100 on Google PageSpeed on desktop and 90 on mobile.",
          "The reports below are a separate check: Lighthouse 12.8 run from my own machine on 14 November 2026. It gave 99 on desktop and 93 on mobile. Scores move a few points between runs and tools.",
        ],
      },
      {
        heading: "What's next",
        planned: true,
        body: [
          "A separate Python service that checks uploaded map files before they go live.",
        ],
      },
    ] satisfies CaseSection[] as CaseSection[],
    // Proof for the Performance section. Re-shoot when the site changes.
    lighthouse: [
      {
        src: "/projects/soucampus-lh-desktop.webp",
        alt: "Lighthouse report for soucampus.online, desktop: performance 99, accessibility 96, best practices 100, SEO 100",
        caption: "Desktop · Performance 99 · Accessibility 96 · Best practices 100 · SEO 100",
      },
      {
        src: "/projects/soucampus-lh-mobile.webp",
        alt: "Lighthouse report for soucampus.online, mobile: performance 93, accessibility 96, best practices 100, SEO 100",
        caption: "Mobile · Performance 93 · Accessibility 96 · Best practices 100 · SEO 100",
      },
    ],
    gallery: [
      { src: "/projects/soucampus-home.webp", alt: "SouCampus landing page", caption: "Landing" },
      { src: "/projects/soucampus-portfolio.webp", alt: "Portfolio of Minecraft builds", caption: "Portfolio" },
      { src: "/projects/soucampus-marketplace.webp", alt: "Marketplace with category filters and listings", caption: "Marketplace" },
      { src: "/projects/soucampus-listing.webp", alt: "Sky Cathedral listing with price and checkout", caption: "Listing & checkout" },
      { src: "/projects/soucampus-profile.webp", alt: "Public creator profile with maps, sales count and rating", caption: "Creator profile" },
      { src: "/projects/soucampus-wiki.webp", alt: "Wiki with guides for installing and using the maps", caption: "Wiki" },
      { src: "/projects/soucampus-update.webp", alt: "A changelog post about live notifications", caption: "Changelog" },
    ],
  },

  // TODO: no recommendations exist yet. The section stays hidden while this
  // array is empty. Add real quotes only — never placeholders.
  recommendations: [] as Recommendation[],

  education: {
    school: "University of Tartu, Narva College",
    degree: "BSc Information Technology Systems Development",
    period: "Sep 2022 – May 2026",
  },

  languages: [
    { name: "English", level: "B2" },
    { name: "Estonian", level: "B2" },
    { name: "Ukrainian", level: "Native" },
    { name: "Russian", level: "Native" },
  ] satisfies Language[],

  contact: {
    text: "Hiring a junior developer? Email is the fastest way to reach me.",
    email: "stavytskyiyevhenii@gmail.com",
    linkedin: "https://www.linkedin.com/in/eugenestavytskyi/",
    github: "https://github.com/SouCampusV2",
  },
} as const;
