# Portfolio Website — Build Brief

You are building a personal portfolio site for **Yevhenii Stavytskyi**. Read this whole file before writing code.

## 1. Goal

A one-page personal site that a recruiter can scan in under 30 seconds. It should answer three questions:
1. **Who is he?** A short bio with a clear position.
2. **What has he done?** Metric tiles and project cards with links.
3. **How do I contact him?** Contact links and a CV download.

Inspiration: https://stakhov.vercel.app/. That site uses a short bio, a grid of metric tiles, work examples, recommendations and contact. **Copy the structure, not the design or the text.**

The site must work for **two kinds of roles** at once:
- developer roles (frontend / full-stack), and
- delivery, support, governance and coordination roles (e.g. bank IT internships).

The positioning is **"a builder who also coordinates"**: he ships products himself and keeps cross-team delivery on track.

## 2. Hard rules

- **Do not invent facts, numbers, clients, testimonials or links.** Use only what is in this file. Where something is marked `TODO`, render a clearly marked placeholder in the code (a comment plus a hidden or obviously temporary element). Never fill it with made-up content.
- All site text is in **English**.
- Do **not** publish the home address or phone number. Email, LinkedIn and GitHub only.
- The site itself must score **~100 on Google PageSpeed (desktop and mobile)**. Performance is part of his personal brand, so this matters.

## 3. Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion (framer-motion), used sparingly: subtle fade-in on scroll only, and respect `prefers-reduced-motion`
- Static rendering, no backend, no database
- Deploy on Vercel
- Contact uses `mailto:`. No form backend.
- Put all content in one typed file (`/content/site.ts`) so text can be edited without touching components.

## 4. Page structure (single page, in this order)

### 4.1 Header / Hero
- Name: **Yevhenii Stavytskyi**
- Title line: **Full-Stack Developer · Product Delivery**
- Sub-line: *I build products end to end and keep cross-team delivery on track.*
- Buttons: `Contact me` (mailto) and `Download CV` (links to `/cv.pdf`; the file will be added manually, see TODO)
- Small location line: *Tallinn, Estonia*

### 4.2 About (short bio, 3–5 sentences)
Draft text (may be lightly edited for flow, but no new facts):

> Hey, I'm Yevhenii. I graduated in IT Systems Development from the University of Tartu in 2026. For a year and a half I was Head of the Application Unit at proceedit, where I led the launch of the CMI mobile app and aligned engineering with business, marketing and leadership. Outside of that I build my own products: SouCampus, a marketplace for premium Minecraft builds, and Crossdesk, a privacy-first B2B matching platform that started at a hackathon. If your team needs someone who can both ship and keep delivery organized, get in touch.

### 4.3 Metric tiles (grid, 6 tiles)
Each tile has a short label, a big value and one line of context.

| Label | Value | Context |
|---|---|---|
| Launch | 6 months | CMI mobile app built from scratch, ~200 registered users |
| Performance | 70 → 85 | PageSpeed on the proceedit website, page weight cut by 40% |
| Speed | ~100 | PageSpeed on SouCampus, desktop and mobile |
| Team | 10 + 10 | Led 10 developers, coordinated ~10 people across business, marketing and leadership |
| Hackathon | 2 days | Working MVP of Crossdesk in a team of three |
| Clients | 5+ years | Minecraft maps and builds, including work with MrBeast and Microsoft |

`TODO:` if exact SouCampus PageSpeed numbers are provided (e.g. 100 / 98), replace `~100` with them.

### 4.4 Projects (cards)
Each card: title, one-line summary, his role, tech tags, link button (if a link exists).

1. **SouCampus**
   - Summary: Marketplace for buying and selling premium Minecraft maps and builds.
   - Role: Founder and sole developer, from architecture to production deployment.
   - Highlights: authentication, database-level access control (Supabase row-level security), secure Stripe checkout; listings, checkout and accounts work end to end; PageSpeed ~100.
   - Tags: TypeScript, Next.js, React, Tailwind CSS, Motion, Supabase (PostgreSQL), Stripe, Vercel
   - Link: https://soucampus.online/marketplace

2. **Crossdesk**
   - Summary: Privacy-first B2B matching. A company privately describes a problem; AI agents check budget, timing and contract fit with vendors; people meet only once the terms fit, and each side's figures stay private.
   - Role: Built in a team of three at a hackathon (business track, Sep 2026); now continuing in the IGNITER pre-acceleration programme.
   - Badge: `MVP / in development`
   - Link: https://crossdeskmatch.vercel.app/ (label the button `Live demo`)
   - `TODO:` hackathon name, his exact role in the team, any result or award.

3. **CMI mobile app — proceedit**
   - Summary: Mobile application launched from scratch in 6 months, grown to ~200 registered users.
   - Role: Head of Application Unit. Led delivery, owned the front end, took part in architecture decisions.
   - Tags: FlutterFlow, Flutter, PostgreSQL, GraphQL
   - No public link.

4. **Employee onboarding automation — bachelor's thesis**
   - Summary: Onboarding automation system built in n8n for proceedit.
   - Tags: n8n, workflow automation
   - No public link. `TODO:` one sentence on what the system automates.

5. **Minecraft level design**
   - Summary: Multiplayer maps and structures for clients worldwide since 2019, including collaborations with MrBeast and Microsoft for public events.
   - Tags: Level design, client work
   - `TODO:` portfolio link or images if available. Do not use MrBeast or Microsoft logos.

### 4.5 Experience (compact timeline)
- **Founder & Full-Stack Developer**, SouCampus, Jun 2026 – Present
- **Head of Application Unit**, proceedit, Jan 2025 – Jun 2026
- **Data Analyst**, Sayara International, Apr 2023 – Oct 2023. Collected, validated and organized media data (YouScan, Excel) and prepared visualizations and reports.
- **Minecraft Level Designer**, Freelance, 2019 – Present

### 4.6 Recommendations
`TODO:` no recommendations exist yet. Build the component (quote, name, title @ company), but **hide the whole section** until real quotes are added to `site.ts` (render only if the array is non-empty). Do not write placeholder quotes.

### 4.7 Education & Languages
- University of Tartu, BSc Information Technology Systems Development, 2022 – 2026
- English B2 · Estonian B1 · Ukrainian (native) · Russian (native)

### 4.8 Contact / Footer
- Email: stavytskyiyevhenii@gmail.com
- LinkedIn: https://www.linkedin.com/in/eugenestavytskyi/
- GitHub: https://github.com/SouCampusV2
- `© 2026 Yevhenii Stavytskyi`

## 5. Design

- Clean, calm, professional. It should look credible to a bank recruiter and still modern to a tech lead.
- Light and dark mode, following system preference.
- One accent color, a lot of whitespace, a strong typographic hierarchy.
- Metric tiles are the visual centerpiece: large numbers, small labels.
- Mobile first. Everything must read well at 375px width.
- Accessible: semantic HTML, sufficient contrast, visible focus states, alt text, keyboard navigation.

## 6. SEO & meta

- `<title>`: Yevhenii Stavytskyi — Full-Stack Developer · Product Delivery
- Meta description: one sentence based on the hero sub-line.
- Open Graph and Twitter card tags; generate a simple OG image (name + title) with `next/og`.
- Favicon from initials `YS`.
- `sitemap.xml` and `robots.txt`.

## 7. Performance checklist

- Use `next/font` for fonts (max 2 families) with `display: swap`.
- Use `next/image` for any image, correctly sized.
- No heavy libraries beyond those listed. Keep client components to a minimum.
- Before finishing, run a production build and check that nothing heavy ships to the client.

## 8. Done when

- [ ] `npm run build` passes with no errors or type errors
- [ ] All sections in section 4 are present; TODO items are placeholders in code, not visible fake content
- [ ] Recommendations section is hidden while empty
- [ ] All links open correctly (external links in a new tab with `rel="noopener noreferrer"`)
- [ ] Works on mobile (375px) and desktop, in light and dark mode
- [ ] A short `README.md` explains how to edit `content/site.ts`, add `public/cv.pdf` and deploy to Vercel
- [ ] A list of all remaining TODOs is printed at the end of your work
