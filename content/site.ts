/**
 * All site content lives here. Edit this file to change any text on the page;
 * components only read from it.
 *
 * Rules (from PORTFOLIO_BRIEF.md): no invented facts, numbers, clients,
 * testimonials or links. Anything unknown is marked `TODO` and is not rendered.
 */

export type Link = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
  context: string;
};

/**
 * Project preview shown at the top of a card. Files live in public/projects/.
 * Use a 16:10 ratio. A video plays muted and looped only while on screen and
 * never autoplays for prefers-reduced-motion; keep it under ~1 MB.
 */
export type ProjectMedia =
  | { kind: "video"; src: string; poster: string; alt: string }
  | { kind: "image"; src: string; alt: string };

export type Project = {
  title: string;
  /** Featured projects get the wide card at the top of the grid. */
  featured?: boolean;
  summary: string;
  role?: string;
  highlights?: string[];
  tags: string[];
  badge?: string;
  link?: Link;
  /** Internal case study page, e.g. "/soucampus". */
  caseStudy?: string;
  media?: ProjectMedia;
};

export type Job = {
  role: string;
  org: string;
  period: string;
  note?: string;
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
  title: "Full-Stack Developer · Product Delivery",
  tagline: "I build products end to end and keep cross-team delivery on track.",
  location: "Tallinn, Estonia",
  // TODO: add the file manually at public/cv.pdf
  cvHref: "/cv.pdf",

  // Words in the bio that become links (first occurrence only).
  aboutLinks: {
    SouCampus: "https://soucampus.online/marketplace",
    Crossdesk: "https://crossdeskmatch.vercel.app/",
  } as Record<string, string>,

  about: [
    "Hey, I'm Yevhenii. I graduated in IT Systems Development from the University of Tartu in 2026.",
    "For a year and a half I was Head of the Application Unit at proceedit, where I led the launch of the CMI mobile app and aligned engineering with business, marketing and leadership.",
    "Outside of that I build my own products: SouCampus, a marketplace for premium Minecraft builds, and Crossdesk, a privacy-first B2B matching platform that started at a hackathon.",
    "If your team needs someone who can both ship and keep delivery organized, get in touch.",
  ],

  metrics: [
    {
      label: "Launch",
      value: "6 months",
      context: "CMI mobile app built from scratch, ~200 registered users",
    },
    {
      label: "Performance",
      value: "70 → 85",
      context: "PageSpeed on the proceedit website, page weight cut by 40%",
    },
    {
      label: "Speed",
      // TODO: replace "~100" with exact SouCampus PageSpeed numbers (e.g. "100 / 98") when provided.
      value: "~100",
      context: "PageSpeed on SouCampus, desktop and mobile",
    },
    {
      label: "Team",
      value: "10 + 10",
      context:
        "Led 10 developers, coordinated ~10 people across business, marketing and leadership",
    },
    {
      label: "Hackathon",
      value: "2 days",
      context: "Working MVP of Crossdesk in a team of three",
    },
    {
      label: "Clients",
      value: "5+ years",
      context:
        "Minecraft maps and builds, including work with MrBeast and Microsoft",
    },
  ] satisfies Metric[],

  projects: [
    {
      title: "SouCampus",
      summary:
        "Marketplace for buying and selling premium Minecraft maps and builds.",
      role: "Founder and sole developer, from architecture to production deployment.",
      highlights: [
        "Authentication and database-level access control (Supabase row-level security)",
        "Secure Stripe checkout",
        "Listings, checkout and accounts work end to end",
        "PageSpeed ~100",
      ],
      tags: [
        "TypeScript",
        "Next.js",
        "React",
        "Tailwind CSS",
        "Motion",
        "Supabase (PostgreSQL)",
        "Stripe",
        "Vercel",
      ],
      link: {
        label: "Visit marketplace",
        href: "https://soucampus.online/marketplace",
      },
      featured: true,
      caseStudy: "/soucampus",
      // Screen recording of the live site: landing → portfolio → marketplace.
      media: {
        kind: "video",
        src: "/projects/soucampus.mp4",
        poster: "/projects/soucampus-poster.webp",
        alt: "Screen recording: SouCampus landing page, then the portfolio, then the marketplace",
      },
    },
    {
      title: "Crossdesk",
      summary:
        "Privacy-first B2B matching. A company privately describes a problem; AI agents check budget, timing and contract fit with vendors; people meet only once the terms fit, and each side's figures stay private.",
      // TODO: hackathon name, his exact role in the team, any result or award.
      role: "Built in a team of three at a hackathon (business track, Sep 2026); now continuing in the IGNITER pre-acceleration programme.",
      // TODO: tech tags (stack not confirmed yet).
      tags: [],
      badge: "MVP / in development",
      link: { label: "Live demo", href: "https://crossdeskmatch.vercel.app/" },
      media: {
        kind: "video",
        src: "/projects/crossdesk.mp4",
        poster: "/projects/crossdesk-poster.webp",
        alt: "Screen recording: the animated Crossdesk landing page",
      },
    },
    {
      title: "CMI mobile app — proceedit",
      summary:
        "Mobile application launched from scratch in 6 months, grown to ~200 registered users.",
      role: "Head of Application Unit. Led delivery, owned the front end, took part in architecture decisions.",
      tags: ["FlutterFlow", "Flutter", "PostgreSQL", "GraphQL"],
      // TODO: CMI app screenshots or a screen recording, if they can be shown publicly.
    },
    {
      title: "proceedit website",
      summary: "proceedit's corporate website, built on Shopify.",
      // TODO: your exact role on the website (what you built or changed yourself).
      highlights: ["PageSpeed raised from 70 to 85", "Page weight cut by 40%"],
      // Stack as detected on the live site (Shopify Dawn theme, PageFly, files on
      // the Shopify CDN, content in metaobjects). TODO: keep only what you worked with.
      tags: ["Shopify", "Liquid", "PageFly", "Shopify Metaobjects"],
      link: { label: "Visit proceedit", href: "https://proceedit.shop/" },
      media: {
        kind: "video",
        src: "/projects/proceedit.mp4",
        poster: "/projects/proceedit-poster.webp",
        alt: "Screen recording: the proceedit website landing page",
      },
    },
    {
      title: "Employee onboarding automation — bachelor's thesis",
      // TODO: one sentence on what the system automates.
      summary: "Onboarding automation system built in n8n for proceedit.",
      tags: ["n8n", "Workflow automation"],
    },
    {
      title: "Minecraft level design",
      summary:
        "Multiplayer maps and structures for clients worldwide since 2019, including collaborations with MrBeast and Microsoft for public events.",
      tags: ["Level design", "Client work"],
      // TODO: confirm this is the right portfolio page; add build renders if available.
      // Do not use MrBeast or Microsoft logos.
      link: { label: "See the builds", href: "https://soucampus.online/portfolio" },
      media: {
        kind: "video",
        src: "/projects/minecraft.mp4",
        poster: "/projects/minecraft-poster.webp",
        alt: "Screen recording: browsing Minecraft builds in the soucampus.online portfolio",
      },
    },
  ] satisfies Project[] as Project[],

  experience: [
    {
      role: "Founder & Full-Stack Developer",
      org: "SouCampus",
      period: "Jun 2026 – Present",
    },
    {
      role: "Head of Application Unit",
      org: "proceedit",
      period: "Jan 2025 – Jun 2026",
    },
    {
      role: "Data Analyst",
      org: "Sayara International",
      period: "Apr 2023 – Oct 2023",
      note: "Collected, validated and organized media data (YouScan, Excel) and prepared visualizations and reports.",
    },
    {
      role: "Minecraft Level Designer",
      org: "Freelance",
      period: "2019 – Present",
    },
  ] satisfies Job[] as Job[],

  // Technologies, grouped as on the /tech-stack page. Icons come from
  // simple-icons (see components/TechIcon.tsx); add new names there too.
  tech: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "Motion"],
    },
    {
      category: "Backend & Languages",
      items: ["Node.js", "Python", "PHP", "C#", "C++", "GraphQL", "Stripe"],
    },
    {
      category: "Databases",
      items: ["Supabase", "PostgreSQL", "MySQL", "SQLite"],
    },
    { category: "Mobile", items: ["Flutter", "FlutterFlow"] },
    {
      category: "AI & Automation",
      items: ["Claude Code", "ChatGPT", "Gemini", "Prompt Engineering", "n8n", "Make.com"],
    },
    {
      category: "CMS & Marketing",
      items: ["Shopify", "Liquid", "PageFly", "SEO Optimization", "Google Analytics"],
    },
    { category: "Design", items: ["Figma", "Canva"] },
    {
      category: "Data & Office",
      items: ["Excel", "PowerPoint", "Word", "YouScan"],
    },
    {
      category: "Tools & Deployment",
      items: ["Git", "GitHub", "GitHub Actions", "npm", "Vercel"],
    },
  ] satisfies TechGroup[] as TechGroup[],

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
      { label: "PageSpeed", value: "~100 desktop & mobile" },
      { label: "Status", value: "Live" },
    ],
    sections: [
      {
        heading: "The product",
        body: [
          "SouCampus is where people buy and sell premium Minecraft maps and builds. Listings, checkout and accounts work end to end.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "The whole product alone: architecture, front end, database, payments and production deployment",
          "Authentication and accounts",
          "Database-level access control with Supabase row-level security, so the database itself decides who can read or change each row",
          "Secure checkout with Stripe",
          "Listings, checkout and accounts working end to end",
        ],
      },
      {
        heading: "Performance",
        body: [
          "Speed is part of the product: SouCampus scores ~100 on Google PageSpeed on both desktop and mobile.",
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
    gallery: [
      { src: "/projects/soucampus-home.webp", alt: "SouCampus landing page", caption: "Landing" },
      { src: "/projects/soucampus-portfolio.webp", alt: "Portfolio of Minecraft builds", caption: "Portfolio" },
      { src: "/projects/soucampus-marketplace.webp", alt: "Marketplace with category filters and listings", caption: "Marketplace" },
      { src: "/projects/soucampus-listing.webp", alt: "Sky Cathedral listing with price and checkout", caption: "Listing & checkout" },
    ],
  },

  // TODO: no recommendations exist yet. The section stays hidden while this
  // array is empty. Add real quotes only — never placeholders.
  recommendations: [] as Recommendation[],

  education: {
    school: "University of Tartu",
    degree: "BSc Information Technology Systems Development",
    period: "2022 – 2026",
  },

  languages: [
    { name: "English", level: "B2" },
    { name: "Estonian", level: "B1" },
    { name: "Ukrainian", level: "Native" },
    { name: "Russian", level: "Native" },
  ] satisfies Language[],

  contact: {
    email: "stavytskyiyevhenii@gmail.com",
    linkedin: "https://www.linkedin.com/in/eugenestavytskyi/",
    github: "https://github.com/SouCampusV2",
  },
} as const;
