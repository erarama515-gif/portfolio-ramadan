# Portfolio Structure — Eslam Ramadan · Digital Business Architect

> **Purpose of this document:** a complete, implementation-ready blueprint for the portfolio rebuild. Section-by-section: final copy (EN primary, AR secondary), layout, components, animations, and visual specs. Read top to bottom; every section is a build ticket.

---

## 0 · Foundations

### 0.1 Positioning
- **Name:** Eslam Ramadan
- **Role:** Digital Business Architect
- **One-liner (EN):** I design and build digital systems that turn business operations into scalable software.
- **One-liner (AR):** أصمّم وأبني الأنظمة الرقمية اللي بتحوّل العمليات المعقّدة إلى حلول برمجية قابلة للتوسّع.
- **Domains:** Web Systems · ERP · CRM · POS · SaaS · AI Automation · Business Automation
- **Master tagline:** *From Business Problems to Digital Systems.*

### 0.2 Stack
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router, RSC, streaming) | Fast, SEO-ready, modern |
| Language | **TypeScript** (strict) | Type-safe, professional |
| Styling | **Tailwind CSS** + CSS variables | Design tokens as source of truth |
| Motion | **Framer Motion** | Premium micro-interactions |
| Content | **MDX** for case studies + `content/*.ts` for structured data | Version-controlled, portable |
| CMS (optional) | **Sanity Studio** (free tier) | Edit copy without code, later phase |
| Icons | **Lucide** + custom SVG marks | Consistent, minimal |
| Analytics | **Vercel Analytics** or Plausible | Privacy-friendly |
| Deploy | **Vercel** (frontend) | Zero-config, edge-ready |

**Kept from current repo:** Tailwind config idea, Framer Motion, project structure discipline.
**Dropped:** FastAPI + PostgreSQL + Admin panel (overkill for a portfolio; MDX + optional Sanity cover it).

### 0.3 Design System

#### Color tokens (dark premium)
```
--ink        #0A0A0B     ← background base (near-black, warm)
--ink-2      #111114     ← elevated surfaces
--ink-3      #17171B     ← cards, hovers
--line       #22222A     ← borders (subtle)
--line-2     #2E2E38     ← borders (visible)
--fg         #ECECEE     ← primary text (off-white)
--fg-2       #A8A8B3     ← secondary text
--fg-3       #6C6C79     ← faint / captions
--copper     #C87F5A     ← primary accent (muted, elegant)
--copper-2   #E39A73     ← hover / highlight
--moss       #6B8F71     ← secondary accent (muted green)
--danger     #C85A5A     ← errors
--success    #7AAE84     ← success signals
```
- **Light mode:** deferred to phase 2. Dark-first.
- **Contrast targets:** WCAG AA on all body text.

#### Typography
- **Display:** `Inter Display` or `Neue Haas Grotesk` (fallback: Inter). Weights: 300 / 500 / 700.
- **Body:** `Inter` variable.
- **Mono:** `JetBrains Mono` (for code, badges, meta).
- **Arabic:** `IBM Plex Sans Arabic` or `Tajawal` (weights 300/500/700).
- **Scale:**
  - Hero H1: `clamp(3.5rem, 8vw, 7rem)` · tracking `-0.03em` · weight 300 with 700 accent word
  - Section H2: `clamp(2rem, 4vw, 3.5rem)` · tracking `-0.02em` · weight 500
  - Body: `1.05rem` · leading `1.65`
  - Caption / meta: `0.8125rem` · uppercase · tracking `0.14em` · mono

#### Space & rhythm
- Base unit: `4px`. Section vertical padding: `120px` desktop / `80px` mobile.
- Container: `max-width: 1280px`, side gutter `24px` mobile → `48px` desktop.
- Grid: 12-col desktop, 4-col mobile, `gap: 24px`.

#### Motion principles
1. **Purposeful only** — nothing animates just to animate.
2. **Duration budget:** entrance 400–600ms, hover 150–250ms.
3. **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo-ish) for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for hover.
4. **Stagger:** children 60–100ms apart, max 4 children before switching to whole-block fade.
5. **Reduce-motion respected everywhere.**

#### Imagery rules
- Real product screenshots only. No AI-generated hero art.
- Screenshots on `--ink-2` with `1px --line-2` border, `border-radius: 12px`, subtle inner-glow.
- Optional 1-degree rotation for stack-of-two shots. No shadows-behind-glass tropes.

---

## 1 · Information Architecture

**Primary navigation (Navbar):**
`Work · Systems · Process · About · Contact` + language toggle `EN | AR` (top-right).

**Page order (single-page + case-study routes):**
```
/
├─ Hero
├─ About (3 pillars)
├─ What I Build (6 domains)
├─ Selected Work (5–7 project cards)
├─ How I Think (Architecture flow)
├─ Tech Stack (grouped)
├─ Engineering Philosophy (3 principles)
├─ By the Numbers
├─ Process (6 steps)
├─ Personal Brand strip
├─ Contact
└─ Footer

/work/[slug]  ← MDX case study per project
```

---

## 2 · Section-by-Section

Each block below contains: **purpose · layout · copy EN · copy AR · components · animations · visual notes.**

---

### 2.1 Navbar

- **Purpose:** persistent orientation, language switch, quick contact.
- **Layout:** fixed top, `72px` tall, `backdrop-blur(16px)` on `--ink/70%`. Bottom border `--line`.
  - Left: logo mark `◆ ER` + wordmark `ESLAM RAMADAN` (uppercase mono `0.75rem`, tracking `0.2em`).
  - Center: nav links.
  - Right: `EN | AR` toggle + `Start a Project →` button (copper outline).
- **Copy:** `Work · Systems · Process · About · Contact`
- **Animations:** links `opacity: 60 → 100` + `y: 0 → -1px` on hover 150ms. Active link has a `2px` copper underbar that morphs between items using `layoutId`.
- **Notes:** hide on scroll down, show on scroll up. Compact on mobile → menu icon opens full-screen overlay.

---

### 2.2 Hero

- **Purpose:** the one screen that tells anyone in 5 seconds what he does and at what level.
- **Layout:** 100vh, split (left copy, right visual) on desktop. Stacked on mobile.
  - **Left column (60%):**
    - Eyebrow (uppercase mono): `Digital Business Architect`
    - H1 (display): `ESLAM RAMADAN`
    - Subline (large body): `I build digital products, business systems and intelligent automations.`
    - Row of buttons:
      - Primary (copper filled): `View My Work →`
      - Secondary (bordered): `Start a Project`
    - Meta strip (mono, small):
      `300+ Projects  ·  6+ Years Experience  ·  Web · ERP · SaaS · AI`
  - **Right column (40%):** a live "system window" (see 2.2.1).
- **Copy EN:**
  ```
  DIGITAL BUSINESS ARCHITECT

  Eslam
  Ramadan.

  I build digital products, business systems and
  intelligent automations.

  [ View My Work → ]  [ Start a Project ]

  300+ PROJECTS  ·  6+ YEARS EXPERIENCE  ·  WEB · ERP · SaaS · AI
  ```
- **Copy AR:**
  ```
  مهندس أنظمة رقمية للأعمال

  إسلام
  رمضان.

  أبني منتجات رقمية، وأنظمة أعمال، وأتمتة ذكية.

  [ اعرض الأعمال → ]  [ ابدأ مشروع ]

  ‎+٣٠٠ مشروع  ·  ‎+٦ سنوات خبرة  ·  Web · ERP · SaaS · AI
  ```

#### 2.2.1 Hero Visual — "System Window"
A real screenshot **or** a subtle interactive mock:
- A dark browser-chrome-style card (`--ink-2`, `1px --line-2`, radius `14px`).
- Inside: an ERP dashboard screenshot **or** an animated architecture diagram (Business → Frontend → API → DB → Automation), where a copper dot travels the path continuously (60s loop, ease-in-out).
- Optional second card stacked behind, rotated `1.5deg`, opacity `40%`.
- No glass, no chaos, no floating logos.

- **Animations:**
  - Name splits into two words, each `y: 40 → 0`, `opacity: 0 → 1`, stagger 120ms, 700ms duration.
  - Subline fades in 300ms after name.
  - Buttons pop in `scale: 0.96 → 1` + fade, 400ms after subline.
  - Right visual: `x: 40 → 0` + fade, 800ms after buttons.
  - Copper dot in diagram runs after entrance.

---

### 2.3 About

- **Purpose:** anchor the positioning — he doesn't just code, he architects systems around businesses.
- **Layout:** two-row block.
  - Row 1: big two-line quote-like statement.
  - Row 2: 3 columns — Understand · Architect · Build.
- **Copy EN:**
  ```
  I don't just build software.
  I build systems around businesses.

  I work at the intersection of business and technology,
  helping companies transform manual processes into
  reliable digital systems. From custom ERP and POS
  platforms to SaaS products, AI-powered workflows and
  business automation — I focus on software that solves
  real operational problems.

  01 · UNDERSTAND
  I map the business and its workflows before writing a line of code.

  02 · ARCHITECT
  I design the system, the data model, and the operational logic.

  03 · BUILD
  I turn the architecture into reliable, production-grade software.
  ```
- **Copy AR:**
  ```
  أنا مش بس بأكتب كود.
  أنا ببني أنظمة حوالين الشركات.

  بشتغل في نقطة تقاطع الأعمال والتكنولوجيا،
  بساعد الشركات تحوّل عملياتها اليدوية لأنظمة رقمية موثوقة.
  من أنظمة ERP و POS مخصّصة، لمنتجات SaaS، لسير عمل مدعوم بـ AI،
  وأتمتة أعمال — تركيزي على البرمجيات اللي بتحل مشاكل تشغيلية حقيقية.

  ٠١ · افهم
  بأفهم الشركة وعملياتها قبل أول سطر كود.

  ٠٢ · اصمم
  بأصمّم النظام ونموذج البيانات ومنطق التشغيل.

  ٠٣ · ابنِ
  بأحوّل المعمار لبرمجية إنتاجية موثوقة.
  ```
- **Components:** `<QuoteBlock>`, `<PillarCard number title body />` × 3.
- **Visual notes:** each pillar card has a small `2×2` copper dot grid as icon (unique per pillar: 1 dot / 2 dots / 4 dots).
- **Animations:** quote appears line-by-line; pillar cards enter `y: 24 → 0` with 80ms stagger, `whileInView` once.

---

### 2.4 What I Build (Domains, not services)

- **Purpose:** shift the framing from freelance services to system domains.
- **Layout:** 6 large cards in a 3×2 grid (desktop), 2×3 (tablet), 1×6 (mobile).
- **Cards (EN / AR / one-liner):**

| # | Title (EN) | Title (AR) | Body (EN) | Body (AR) |
|---|---|---|---|---|
| 01 | Digital Systems | أنظمة رقمية | End-to-end platforms that run day-to-day operations. | منصّات كاملة بتشغّل العمليات اليومية. |
| 02 | ERP Systems | أنظمة ERP | Custom business management for operations, finance, roles. | إدارة أعمال مخصّصة للعمليات والمالية والأدوار. |
| 03 | CRM Platforms | منصّات CRM | Customer, sales, and pipeline orchestration built for the workflow. | تنسيق العملاء والمبيعات وخط الأنابيب حسب سير العمل. |
| 04 | POS Systems | أنظمة نقاط بيع | Retail, inventory, branches, barcode, real reports. | تجزئة ومخزون وفروع وباركود وتقارير حقيقية. |
| 05 | SaaS Products | منتجات SaaS | Multi-tenant products designed to scale from day one. | منتجات متعدّدة المستأجرين مصمّمة للتوسّع من اليوم الأول. |
| 06 | AI & Automation | AI وأتمتة | Wiring AI models into real business workflows via APIs & n8n. | ربط نماذج AI بسير عمل حقيقي عبر APIs و n8n. |

- **Card anatomy:** number top-left (mono `0.75rem`), title, one-line body, and a subtle `→` arrow bottom-right that translates on hover.
- **Animations:** card border animates from `--line` to `--copper/40` on hover (200ms). Arrow slides `+4px`. Background lightens to `--ink-3`.
- **No stock icons.** Only typography + border + arrow.

---

### 2.5 Selected Work (the heart of the site)

- **Purpose:** prove the positioning with 5 real projects. Each card is oversized, screenshot-first.
- **Layout:** vertical stack of big cards, each spanning full container width.
  - **Card anatomy:**
    - Top row: index `01/`, project name (H2), status pill.
    - Sub-title (role / category).
    - 2-column body: 60% screenshot / 40% description + tags + button.
    - Bottom row: tech chips + `Read case study →`.
- **The 5 flagship projects:**

#### 05.1 · KAYAN ERP
- **Sub-title:** Custom Enterprise Management Platform
- **Blurb (EN):** A bespoke ERP tailored to the way the business actually runs — not another off-the-shelf template. Users, roles, financial workflows, business intelligence, and custom modules built around real operations.
- **Blurb (AR):** ERP مصمّم على طريقة عمل الشركة الحقيقية — مش قالب جاهز. مستخدمين، أدوار، سير عمل مالي، ذكاء أعمال، ومودولز مخصّصة حوالين العمليات الفعلية.
- **Tech chips:** Next.js · NestJS · PostgreSQL · Prisma · TypeScript
- **Status:** `LIVE`

#### 05.2 · Kash Market
- **Sub-title:** Supermarket Management & POS Platform
- **Blurb (EN):** Built around real supermarket workflows rather than a generic POS template. Inventory, telecom services, stationery, reports, and a barcode workflow that matches how the counter actually operates.
- **Blurb (AR):** مبني حوالين سير عمل السوبرماركت الحقيقي، مش قالب POS عام. مخزون، خدمات اتصالات، قرطاسية، تقارير، وسير عمل باركود يطابق شغل الكاشير الفعلي.
- **Tech chips:** Next.js · Node.js · PostgreSQL · Redis · Barcode SDK
- **Status:** `LIVE`

#### 05.3 · AI-Powered Business Automation
- **Sub-title:** From Manual Ops to Autonomous Workflows
- **Blurb (EN):** A composed automation layer: `Python → LLM → n8n → APIs → Business Systems`. Not "I use AI" — a case study on wiring intelligence into daily operations.
- **Blurb (AR):** طبقة أتمتة مركّبة: `Python → LLM → n8n → APIs → Business Systems`. مش شعار "بستخدم AI" — دراسة حالة لربط الذكاء بالعمليات اليومية.
- **Tech chips:** Python · n8n · LLM APIs · REST · Webhooks
- **Status:** `INFRASTRUCTURE`

#### 05.4 · Almaviva — Automation Infrastructure
- **Sub-title:** Multi-account Automation Architecture
- **Blurb (EN):** Multi-account architecture with session management, fault isolation, browser-assisted workflows, monitoring, and a dry-run architecture — infrastructure engineering, not a bot.
- **Blurb (AR):** معمارية متعدّدة الحسابات مع إدارة الجلسات، عزل الأعطال، سير عمل مدعوم بالمتصفح، مراقبة، ومعمار dry-run — هندسة بنية تحتية، مش بوت.
- **Tech chips:** Node.js · Playwright · Redis · Queue · Observability
- **Status:** `PRIVATE`

#### 05.5 · Fasah
- **Sub-title:** Desktop Automation Platform
- **Blurb (EN):** Desktop architecture with a backend bridge, account isolation, supervisors, SSE, testing, and fault isolation. Architecture-grade automation, not scripts.
- **Blurb (AR):** معمارية سطح مكتب مع جسر Backend، عزل الحسابات، supervisors، SSE، اختبارات، وعزل أعطال. أتمتة بمستوى معماري، مش سكربتات.
- **Tech chips:** Electron · Node.js · SSE · PostgreSQL · Playwright
- **Status:** `PRIVATE`

- **Components:** `<ProjectCard />`, `<TechChip />`, `<StatusPill />`.
- **Animations:**
  - Card enters `y: 40 → 0` with fade, `whileInView`, once.
  - Screenshot has a subtle `scale: 1 → 1.02` on card hover, 400ms.
  - Card border shifts to `--copper/40` on hover.
- **Visual notes:** screenshots are the star. If not available, use an abstract system-diagram mock (see 2.2.1 style) as placeholder — never emoji or stock art.

---

### 2.6 Case Study Route (`/work/[slug]`)

Each project has its own MDX page. Template:

```
1. Hero
   - Project name (H1)
   - Sub-title
   - Meta strip: Role · Timeline · Status · Industry
   - Big hero screenshot

2. The Challenge
   - 2–3 paragraphs of the real business problem

3. The Approach
   - How the workflow was mapped
   - Key architectural decisions

4. The System
   - Architecture diagram (SVG)
     Business → Frontend → API → Business Logic → Database → Automation / AI
   - Layer-by-layer explainer

5. Key Features
   - Small cards (3–6): title + one-line description

6. Technology
   - Grouped chips (Frontend / Backend / Data / Infra)

7. Results (if real numbers exist)
   - "X% less manual work" · "N branches" · "N users"
   - Otherwise → qualitative outcomes

8. Next case study (auto-linked)
```

- **MDX components exposed:** `<CaseHero>`, `<Section>`, `<ArchDiagram>`, `<FeatureGrid>`, `<TechGroup>`, `<Results>`, `<NextCase>`.

---

### 2.7 How I Think (Architecture Section)

- **Purpose:** show the mental model that separates him from typical devs.
- **Layout:** centered flow diagram with copy on either side.
- **Copy EN (headline):**
  `Every system starts with the business workflow — not the technology.`
- **Copy AR (headline):**
  `كل نظام يبدأ من سير عمل الشركة — مش من التكنولوجيا.`

- **The flow (top → bottom, animated on scroll):**
  ```
  Business Requirements
          ↓
  System Architecture
          ↓
  Frontend
          ↓
  Backend
          ↓
  Database
          ↓
  Automation
          ↓
  AI
  ```
- **Each node:** a rounded rectangle (`--ink-3`, `1px --line-2`, radius `10px`), label in mono uppercase `0.75rem`. Arrow between nodes is a `24px` line with copper dot mid-way.
- **Animations:** as user scrolls, each node fades in `opacity: 0 → 1` + `y: 12 → 0`, and a copper dot travels down the whole chain in a continuous loop once all nodes are visible.

---

### 2.8 Tech Stack

- **Purpose:** show breadth without vomiting 50 logos.
- **Layout:** 5 grouped rows (labels left, chips right), each row separated by `--line`.
- **Groups:**

| Group | Items |
|---|---|
| Frontend | Next.js · React · TypeScript · Tailwind |
| Backend | Node.js · NestJS · Python · FastAPI |
| Data | PostgreSQL · Prisma · Redis |
| Automation | n8n · Python Automation · API Integrations · Playwright |
| AI | LLM APIs · AI Workflows · AI Agents |

- **Chips:** thin border `--line-2`, text `--fg-2`, hover → border `--copper/40` + text `--fg`.
- **Animations:** row-by-row fade in on scroll, chips stagger 40ms.
- **No logos in v1** (avoids licensing + keeps aesthetic clean). Add subtly in v2 if desired.

---

### 2.9 Engineering Philosophy

- **Purpose:** one short manifesto block.
- **Layout:** headline + 3-column grid.
- **Copy EN:**
  ```
  Built for real businesses.

  01 · SCALABLE
  Architecture that can grow with the business — not against it.

  02 · RELIABLE
  Testing, monitoring, and fault isolation are part of the system, not an afterthought.

  03 · PRACTICAL
  Technology serves the business — not the other way around.
  ```
- **Copy AR:**
  ```
  مبني لشركات حقيقية.

  ٠١ · قابل للتوسّع
  معمار يكبر مع الشركة — مش ضدها.

  ٠٢ · موثوق
  الاختبار والمراقبة وعزل الأعطال جزء من النظام، مش إضافة أخيرة.

  ٠٣ · عملي
  التكنولوجيا في خدمة الشركة — مش العكس.
  ```

- **Components:** `<PhilosophyCard />` × 3.
- **Visual:** each card has a copper vertical accent line on the left (2px, full height).
- **Animations:** cards enter with 80ms stagger, `y: 20 → 0`.

---

### 2.10 By the Numbers

- **Purpose:** validated proof of scale.
- **Layout:** 4-column row (2×2 on mobile).
- **Numbers (only verified):**
  ```
  300+           6+                 ∞               Multiple
  Projects       Years Building     Business Systems  Industries
  ```
- **If any number is uncertain**, replace with a category tile:
  ```
  Web Systems  ·  ERP  ·  POS  ·  SaaS  ·  AI Automation
  ```
- **Animations:** count-up from 0 to final number on `whileInView`, 1200ms, ease-out. Labels fade in after count settles.
- **Style:** giant display numeric (`clamp(4rem, 8vw, 7rem)`, weight 300), tiny mono label below.

---

### 2.11 Process

- **Purpose:** show the working method.
- **Layout:** horizontal timeline desktop / vertical mobile. 6 steps.
- **Steps:**

| # | Title (EN) | Title (AR) | Body (EN) |
|---|---|---|---|
| 01 | Discover | افهم | Understand the business, its constraints, and its people. |
| 02 | Architect | صمّم | Design the system, data model, and integration points. |
| 03 | Build | ابنِ | Develop the product with production quality from day one. |
| 04 | Automate | أتمتة | Connect workflows, APIs, and AI to remove manual work. |
| 05 | Test | اختبر | Validate the system under real business conditions. |
| 06 | Scale | وسّع | Prepare for growth — infrastructure, monitoring, docs. |

- **Node:** number in mono at top, title in display, one-line body.
- **Connector:** `1px` dashed line between nodes, copper dot animates along it on scroll.

---

### 2.12 Personal Brand Strip

- **Purpose:** identity anchor + social.
- **Layout:** centered block, big signature-style logotype.
- **Copy EN:**
  ```
  Built by Eslam Ramadan
  Digital Business Architect focused on software systems, automation and AI-driven business solutions.

  #ERamadan
  ```
- **Social links (icons only, mono row):** LinkedIn · GitHub · X · Instagram
- **Visual:** the `#ERamadan` hashtag rendered in display weight 300, `--copper` color.

---

### 2.13 Contact

- **Purpose:** convert. Framing = business problem, not portfolio inquiry.
- **Layout:** centered, single column, max-width 640px.
- **Copy EN:**
  ```
  Have a business problem worth solving?
  Let's turn it into a system.

  [ Start a Conversation → ]

  BUSINESS INQUIRY · REPLIES IN 24H
  ```
- **Copy AR:**
  ```
  عندك مشكلة أعمال تستحق حل؟
  خلّينا نحوّلها إلى نظام.

  [ ابدأ محادثة → ]

  استفسار أعمال · الرد خلال ٢٤ ساعة
  ```
- **Form fields:** Name · Email · Company (optional) · Message.
- **Success state:** replace form with a copper-outlined confirmation card + a suggestion to book a call (Calendly link if available).

---

### 2.14 Footer

- **Layout:** 3 rows, minimal.
- **Copy:**
  ```
  ESLAM RAMADAN
  Digital Business Architect
  Web · ERP · SaaS · AI · Automation

  © 2026 Eslam Ramadan     ·     eslam@ramadan.dev     ·     LinkedIn · GitHub
  ```
- **Visual:** top border `--line`, everything `--fg-3` except brand name.

---

## 3 · Component Library

Files under `src/components/`:

```
ui/
  Button.tsx           ← variants: primary / outline / ghost
  Chip.tsx             ← tech, status
  StatusPill.tsx       ← LIVE / PRIVATE / INFRASTRUCTURE
  Container.tsx        ← max-width + gutter
  Eyebrow.tsx          ← mono uppercase eyebrow text
  SectionHeader.tsx    ← eyebrow + title + kicker
  QuoteBlock.tsx
  PillarCard.tsx
  FeatureCard.tsx
  TechGroup.tsx

sections/
  Navbar.tsx
  Hero.tsx
  HeroSystemWindow.tsx
  About.tsx
  WhatIBuild.tsx
  SelectedWork.tsx
  ProjectCard.tsx
  HowIThink.tsx
  ArchFlow.tsx         ← the animated node chain
  TechStack.tsx
  Philosophy.tsx
  Numbers.tsx
  CountUp.tsx
  Process.tsx
  PersonalBrand.tsx
  Contact.tsx
  ContactForm.tsx
  Footer.tsx

case-study/
  CaseHero.tsx
  ArchDiagram.tsx
  FeatureGrid.tsx
  Results.tsx
  NextCase.tsx

lib/
  content/projects.ts  ← typed content for all cards
  content/philosophy.ts
  content/process.ts
  i18n.ts              ← EN/AR toggle context
  motion.ts            ← shared framer variants
```

---

## 4 · Directory Structure (new repo layout)

```
frontend/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx           ← fonts, theme provider, i18n
│  │  ├─ page.tsx             ← home
│  │  ├─ work/
│  │  │  ├─ page.tsx          ← all case studies index
│  │  │  └─ [slug]/page.tsx   ← MDX renderer
│  │  └─ globals.css
│  ├─ components/             ← (see §3)
│  ├─ content/
│  │  ├─ projects.ts
│  │  ├─ philosophy.ts
│  │  └─ case-studies/
│  │     ├─ kayan-erp.mdx
│  │     ├─ kash-market.mdx
│  │     ├─ ai-automation.mdx
│  │     ├─ almaviva.mdx
│  │     └─ fasah.mdx
│  ├─ lib/
│  ├─ styles/
│  │  └─ tokens.css           ← CSS variables
│  └─ i18n/
│     ├─ en.ts
│     └─ ar.ts
├─ public/
│  ├─ screenshots/            ← real project screenshots
│  └─ og/                     ← social share images
├─ tailwind.config.ts
├─ next.config.ts
├─ package.json
└─ tsconfig.json
```

`backend/` will be **archived** to `_legacy_backend/` (kept in the repo but not deployed).

---

## 5 · Implementation Phases

### Phase 1 · Foundation (Day 1–2)
- Wipe old frontend content (keep git history).
- Install new deps: Framer Motion, MDX, lucide-react.
- Add fonts (Inter, JetBrains Mono, IBM Plex Sans Arabic) via `next/font`.
- Create `tokens.css` + Tailwind theme extension mapping to CSS variables.
- Build `Container`, `Button`, `Eyebrow`, `SectionHeader`, `Chip`, `StatusPill`.
- Set up i18n context (EN/AR) + toggle. Direction switches on the `<html>` element.

### Phase 2 · Above-the-fold (Day 2–3)
- Navbar + language toggle + mobile menu.
- Hero + HeroSystemWindow (with animated architecture diagram fallback).
- About section (3 pillars).
- Ship a screenshot for review.

### Phase 3 · Selected Work (Day 3–5)
- ProjectCard + SelectedWork grid.
- `content/projects.ts` typed data for the 5 projects.
- Placeholder screenshots for now (SVG mocks in system-window style).
- MDX pipeline setup + one case study (Kayan ERP) end-to-end as template.

### Phase 4 · Middle sections (Day 5–6)
- WhatIBuild grid.
- HowIThink + ArchFlow (animated node chain).
- TechStack grouped rows.

### Phase 5 · Proof & convert (Day 6–7)
- Philosophy · Numbers (with CountUp) · Process.
- PersonalBrand strip.
- Contact form (posts to a serverless route → email via Resend, or to a Google Form as v1).
- Footer.

### Phase 6 · Polish & ship (Day 7–8)
- SEO metadata per route.
- OG image generator (`@vercel/og`) for the home + each case study.
- 404 + loading states.
- `reduced-motion` audit.
- Lighthouse pass (target 95+ on all).
- Deploy to Vercel.
- Add custom domain.

### Phase 7 · Content collection (parallel with above)
- Real project screenshots (Kayan, Kash Market, etc.).
- Verified metric numbers (or drop them).
- Social links, real email, Calendly URL if wanted.

---

## 6 · Copy Voice Guide

- **English:** confident, understated, no marketing fluff. Prefer `system`, `architecture`, `workflow`, `operational`, `production-grade`. Avoid `passionate`, `innovative`, `cutting-edge`, `unleash`.
- **Arabic:** فصحى واضحة بلمسة عملية، تجنّب المصطلحات المستوردة الحرفية. استخدم "معمار / نظام / تشغيلي / سير عمل / موثوق".
- Sentences ≤ 20 words. Paragraphs ≤ 3 sentences.

---

## 7 · Open Decisions (for the user)

Before implementation starts, please confirm:

1. **Domain / email** — what should Contact and Footer link to? (`eslam@…?`)
2. **Real screenshots** — can you share screenshots of Kayan ERP and Kash Market? If not, I'll build clean SVG mocks in the system-window style.
3. **Verified numbers** — is `300+ projects` and `6+ years` exact? If any is approximate, I'll soften wording.
4. **Book section** — the old site featured "عصر الاتصال المفرط". Keep it as a separate `/book` route (subtle link in the footer), drop it entirely, or fold into a small "Beyond Systems" strip?
5. **Calendly / call booking** — do you want a "Book a call" flow on Contact success?
6. **Social handles** — LinkedIn, GitHub, X, Instagram URLs.

---

## 8 · Next Step

Once §7 is answered, the very next tool call is **Phase 1**: scaffold `tokens.css`, install deps, and build the base component primitives. Then Phase 2 hits the Hero. Every phase ends with a screenshot for review.

---

*End of structure. Everything below the line is intentionally left for iteration.*
