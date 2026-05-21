# Frontend · Next.js 14 · إنجاز

> Next.js 14 (App Router) + TypeScript + TailwindCSS + Framer Motion.
> Cinematic dark / gold aesthetic · Full RTL Arabic · JWT-secured admin.

---

## 🇸🇦 بالعربية

### المتطلبات

* Node.js 18.17+ (يُفضّل 20+)
* npm 9+ (أو pnpm / yarn)
* خادم الـ API يعمل على `http://localhost:8000` (راجع `backend/README.md`)

### التشغيل المحلي

```bash
cd frontend

# 1) إعدادات البيئة
cp .env.local.example .env.local
# تأكد أن NEXT_PUBLIC_API_URL يُشير إلى الـ backend

# 2) الاعتماديات
npm install

# 3) شغّل وضع التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) — لوحة التحكم على `/admin/login` (افتراضياً `admin / admin123`).

### الأوامر المتاحة

```bash
npm run dev          # وضع التطوير على :3000
npm run build        # بناء الإنتاج
npm run start        # تشغيل بناء الإنتاج
npm run lint         # فحص ESLint
```

### بنية المشروع

```
frontend/
├── src/
│   ├── app/
│   │   ├── admin/                لوحة التحكم (محمية بـ JWT)
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   ├── hero/
│   │   │   ├── projects/
│   │   │   ├── book/
│   │   │   ├── contact-messages/
│   │   │   ├── skills/ tech/ services/ timeline/
│   │   │   ├── terminal/ ticker/ social/ seo/ settings/
│   │   │   ├── login/
│   │   │   └── layout.tsx        قائمة جانبية + حماية
│   │   ├── globals.css            متغيرات + الجمالية البصرية
│   │   ├── layout.tsx             RTL + خطوط + metadata
│   │   └── page.tsx               الصفحة الرئيسية + Fallback عربي
│   ├── components/
│   │   ├── portfolio/            مكونات الموقع العام
│   │   │   ├── Hero.tsx
│   │   │   ├── ProfileSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── BookSection.tsx
│   │   │   ├── Sections.tsx      (services, terminal, architecture, ticker, contact)
│   │   │   ├── NeuralCanvas.tsx  جزيئات ذهبية متصلة
│   │   │   └── Navbar.tsx
│   │   ├── admin/
│   │   │   └── GenericCrud.tsx   مكون CRUD عام
│   │   └── ui/
│   │       ├── Cursor.tsx        مؤشر فأرة ذهبي مخصص
│   │       ├── ScrollProgress.tsx
│   │       └── Toaster.tsx
│   ├── lib/
│   │   └── api.ts                Axios + interceptors + كل الـ APIs
│   └── types/
│       └── index.ts              أنواع TypeScript
├── public/                       صور ثابتة + favicon
├── next.config.js
├── tailwind.config.js            ألوان ذهبية + خطوط
└── package.json
```

### الجمالية البصرية

* **الألوان:** أسود عميق (#06050a) + ذهبي (#c8a96a / #d4af37 / #8a6d3a).
* **الخطوط:** Tajawal (عربي) + Cinzel (لاتيني فاخر) + JetBrains Mono (كود).
* **التأثيرات:** حبوب فيلم خفيفة + Vignette + جزيئات ذهبية متفاعلة + مؤشر فأرة مخصص.
* **اتجاه:** `dir="rtl"` + `lang="ar"` على كامل الموقع.

### النشر على Vercel

```bash
npm i -g vercel
vercel
```

ثم في إعدادات المشروع على Vercel:

* عيّن متغير البيئة `NEXT_PUBLIC_API_URL` على رابط الـ backend الإنتاجي (مثل `https://api.your-domain.com`).
* تأكد من أن CORS في الـ backend يسمح بدومين Vercel.

### نصائح

* أي حقل عربي يجب أن يستخدم خط `font-tajawal` (افتراضي على الموقع).
* العنوان الإنجليزي الفاخر يستخدم `font-cinzel`.
* أيقونات هندسية بدل الإيموجي: `◆ ◈ ◇ ◉ ▣ ▲ ⬢ ●`.

---

## 🇬🇧 English

### Requirements

* Node.js 18.17+ (20+ recommended)
* npm 9+ (or pnpm / yarn)
* The API running at `http://localhost:8000` (see `backend/README.md`)

### Local run

```bash
cd frontend

# 1) Env
cp .env.local.example .env.local
# Make sure NEXT_PUBLIC_API_URL points at the backend

# 2) Deps
npm install

# 3) Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — admin at `/admin/login` (default `admin / admin123`).

### Available commands

```bash
npm run dev          # Dev server on :3000
npm run build        # Production build
npm run start        # Run production build
npm run lint         # ESLint
```

### Tech stack

* **Framework:** Next.js 14 (App Router, server components where possible)
* **Lang:** TypeScript (strict mode)
* **Styling:** TailwindCSS 3 with a custom gold palette + Cinzel/Tajawal/JetBrains
* **Motion:** Framer Motion (used sparingly for cinematic feel)
* **HTTP:** Axios with global response interceptor (unwraps `res.data`)
* **Auth:** JWT stored in `admin_token` cookie (HttpOnly recommended in production via middleware)
* **Toasts:** `react-hot-toast` with custom gold theme

### Aesthetic

* **Palette:** Deep blacks (`#06050a`) + gold (`#c8a96a` / `#d4af37` / `#8a6d3a`).
* **Type:** Tajawal (Arabic) + Cinzel (Latin display) + JetBrains Mono (code).
* **Effects:** Subtle film grain + radial vignette + gold particle field + custom gold cursor.
* **Direction:** Full RTL via `dir="rtl"` + `lang="ar"` at the root layout.

### Admin panel

Every section of the public site is editable from `/admin/*`:

| Page | Manages |
|------|---------|
| `/admin/dashboard` | Stats + health |
| `/admin/profile` | Bio, avatar, CV, contact details |
| `/admin/hero` | Headline, typing words, status, CTAs |
| `/admin/projects` | Project CRUD + image upload + reorder |
| `/admin/book` | Book section (cover, chapters, quotes) |
| `/admin/contact-messages` | Inbox for messages from the public form |
| `/admin/skills` `/tech` `/services` `/timeline` | List CRUD |
| `/admin/terminal` `/ticker` `/social` | List CRUD |
| `/admin/seo` | Meta tags |
| `/admin/settings` | Section visibility toggles + colors |

### Deployment on Vercel

```bash
npm i -g vercel
vercel
```

In the Vercel project settings:

* Set `NEXT_PUBLIC_API_URL` env to the production backend URL.
* Make sure the backend `CORS_ORIGINS` includes the Vercel domain.

### Tips

* All Arabic text uses `font-tajawal` (default).
* Latin display headings use `font-cinzel`.
* Use geometric glyphs instead of emojis: `◆ ◈ ◇ ◉ ▣ ▲ ⬢ ●`.
* The API layer in `lib/api.ts` auto-unwraps `res.data` — callers receive the data directly, not the Axios response.
