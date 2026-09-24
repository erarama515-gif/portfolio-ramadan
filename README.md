# Eslam Ramadan · Digital Business Architect

> A cinematic portfolio for a business-systems engineer.
> Unified Next.js + Payload CMS 3 codebase, deployed as a single app.

- **Public site** at `/` — Selected Work, How I Think, Process, Numbers, Contact.
- **Case studies** at `/work/[slug]` — full architectural write-ups per project.
- **Admin panel** at `/admin` — every section on the site is editable without touching code, in **English or Arabic** on the same records.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router · Turbopack · React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables · Geist Sans / Geist Mono / Instrument Serif italic / Amiri (Arabic serif) |
| Motion | Framer Motion, sparingly |
| CMS | Payload 3.x — collections + globals, EN/AR localization, media uploads |
| Database | SQLite for local dev · Postgres in production |
| Deploy | Vercel + Neon Postgres + Vercel Blob (for uploads) |

---

## Local development

```bash
# 1) Install (Payload's dep tree needs the legacy resolver)
npm install --legacy-peer-deps

# 2) Copy env defaults — SQLite by default, no external DB needed
cp .env.example .env.local

# 3) Run dev
npm run dev
# → site:  http://localhost:3000
# → admin: http://localhost:3000/admin
```

**First run:** open `/admin` and create the first user. Any subsequent
user has to be invited from the admin panel.

**Seed the DB with the compiled content** (Hero, Profile, Numbers,
Process, Domains × 6, Projects × 5 with full case studies, in EN+AR):

```bash
# With the dev server running:
node --experimental-vm-modules \
  scratchpad/seed-http.mjs   # (adjust the path if you moved the script)
```

The seed is idempotent — safe to re-run.

---

## Repository layout

```
src/
├─ app/
│  ├─ layout.tsx              ← passthrough root
│  ├─ globals.css             ← Tailwind + design tokens
│  ├─ (site)/                 ← public marketing site
│  │  ├─ layout.tsx           ← fonts, providers, dynamic SEO
│  │  ├─ page.tsx             ← home
│  │  └─ work/[slug]/         ← case study pages
│  └─ (payload)/              ← Payload admin + REST
│     ├─ admin/[[...segments]]/page.tsx
│     ├─ api/[...slug]/route.ts
│     └─ layout.tsx
├─ collections/               ← Payload collection defs
│  Users, Media, Projects, Domains, SocialLinks, ContactMessages
├─ globals/                   ← Payload global defs
│  Profile, Hero, Numbers, Process, Settings
├─ components/ui/             ← Container · Button · Chip ·
│                                Eyebrow · StatusPill · SectionMasthead ·
│                                LangToggle
├─ sections/                  ← Hero · Navbar · Footer · Contact ·
│                                WhatIBuild · SelectedWork · HowIThink ·
│                                Process · Numbers · LiveSystemPanel
├─ sections/case-study/       ← CaseHero · CaseSection ·
│                                ArchitectureFigure · FeatureGrid ·
│                                TechStack · ResultsTiles · NextCase
├─ content/case-studies.ts    ← static fallback content per project
├─ i18n/                      ← LocaleContext · ContentContext ·
│                                dictionaries (EN + AR compiled fallback)
├─ lib/                       ← content-loader, case-study-loader,
│                                payload-client, cn, motion, seed
├─ styles/tokens.css          ← design tokens (CSS variables)
└─ payload.config.ts          ← the single Payload config
```

`docs/PORTFOLIO_STRUCTURE.md` holds the full design system, section-
by-section blueprint (copy + animations + layouts), and the
implementation-phase log.

---

## Content model

**Globals** (single records, edited under Payload / Content or Identity)
- `hero` — headline (pre/italic/post), subline, CTAs, meta line, availability
- `profile` — name, role, tagline, location, email, headshot
- `numbers` — array of stat tiles (value, label, sub)
- `process` — array of the 6 process steps
- `settings` — SEO defaults + primary color

**Collections**
- `projects` — every project shown in Selected Work + `/work/[slug]`.
  Fields include a full `caseStudy` group: role, timeline, industry,
  challenge paragraphs, approach paragraphs, architecture stack,
  features, tech groups, results.
- `domains` — the 6 "What I Build" cards.
- `socialLinks` — social handles for footer and personal-brand strip.
- `media` — image uploads (screenshots, OG images).
- `contactMessages` — read-only inbox for contact-form submissions.
- `users` — admin auth.

**All text fields are localized** — the same record carries EN and AR
content. The locale switcher at the top-right of the admin toggles
between them.

---

## Deployment

Target: **Vercel** for the app · **Neon** (or Vercel Postgres) for
the DB · **Vercel Blob** (or Cloudflare R2) for uploads.

1. Push the repo to GitHub.
2. On Vercel: import the repo. It auto-detects Next 16.
3. Add the environment variables from `.env.example` — swap the SQLite
   URL for a Postgres URL:
   ```
   DATABASE_URI=postgres://user:pass@host/db?sslmode=require
   PAYLOAD_SECRET=<a long random string>
   NEXT_PUBLIC_SERVER_URL=https://<your-domain>
   ```
4. First deploy: `payload migrate` runs on boot; visit `/admin` and
   create the first user.
5. Optional: for cloud media uploads, install
   `@payloadcms/storage-vercel-blob` and add its plugin to
   `src/payload.config.ts`.

---

## Development notes

- The compiled dictionary in `src/i18n/dictionaries.ts` acts as a
  **fallback** for every CMS field, so the site never renders blank
  even against a fresh DB. Editing the dictionary is how you change
  the "factory defaults."
- Turbopack requires `@import` to precede `@tailwind` in
  `globals.css`.
- Route groups `(site)` and `(payload)` each own their own
  `<html>/<body>` — the top-level `src/app/layout.tsx` is a
  passthrough.
- Motion budget for the marketing site is kept small on purpose
  (Hero load reveal + one live pulse + one log rotation). No idle
  parallax, no scroll-linked overkill.

---

## License

Personal portfolio · All rights reserved · © Eslam Ramadan.
