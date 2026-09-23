# Yevhenii Stavytskyi — portfolio

Personal site: a one-page portfolio plus a `/tech-stack` page. Light/dark theme follows the system until the visitor uses the toggle (the choice is remembered). Next.js (App Router) + TypeScript + Tailwind CSS + Motion, fully static.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (must pass before deploying)
```

## Edit content

All text lives in [`content/site.ts`](content/site.ts). Components only read from it, so you never need to touch them to change copy.

- **Metrics** — `site.metrics`: `label`, `value`, `context`. Keep it at 6 tiles (the grid is 2 × 3).
- **Projects** — `site.projects`: `title`, `summary`, optional `role`, `highlights`, `badge`, `link { label, href }`, and `tags`. A card shows its button only when `link` is set.
- **Project previews** — `media` on a project: `{ kind: "video", src, poster, alt }` or `{ kind: "image", src, alt }`. Files go in `public/projects/`, 16:10 ratio. Videos play muted only while on screen, never autoplay with reduced motion; keep each under ~1 MB. `featured: true` gives a project the wide card.
- **Technologies** — `site.tech` (groups shown on `/tech-stack`; all items also scroll on the home page). Icons come from [simple-icons](https://simpleicons.org) via `components/TechIcon.tsx`; a name missing from its map gets no icon, one mapped to `null` gets a letter badge.
- **GitHub Activity** — `site.githubUser`. Public contribution data is fetched on the server and refreshed once a day; if the API is unreachable the section is simply hidden.
- **Case study** — `site.soucampusCase` feeds `/soucampus` (facts, sections, screens). A project links to it via `caseStudy: "/soucampus"`.
- **Outside the IDE** — `site.outside`: text + hobby cards. Each card shows an illustration until you set `photo` (put files in `public/hobbies/`, portrait ~4:5).
- **Experience** — `site.experience`, newest first.
- **Recommendations** — `site.recommendations`. The section is **hidden while the array is empty** and appears as soon as you add a real quote:
  ```ts
  recommendations: [
    { quote: "…", name: "Jane Doe", title: "CTO", company: "Acme" },
  ] as Recommendation[],
  ```
- Items still waiting on real information are marked `TODO` in the code.

## Add the CV

Put the PDF at **`public/cv.pdf`**. Both "Download CV" buttons link to `/cv.pdf`; they return a 404 until the file exists.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import the repo. The defaults are correct (framework: Next.js, build: `next build`).
3. Deploy. The canonical URL, sitemap and Open Graph links use Vercel's production domain automatically. If you add a custom domain, set the env var `NEXT_PUBLIC_SITE_URL=https://your-domain` in the Vercel project settings and redeploy.

Favicon, Open Graph and Twitter images are generated at build time from `app/icon.tsx`, `app/apple-icon.tsx` and `app/opengraph-image.tsx`.
