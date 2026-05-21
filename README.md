# Islam Ramadan · Portfolio · بورتفوليو إسلام رمضان

> موقع شخصي بصري سينمائي — Next.js 14 + FastAPI + PostgreSQL.
> A cinematic personal site — Next.js 14 + FastAPI + PostgreSQL.

---

## 🇸🇦 بالعربية

**إسلام رمضان** — مؤسس "إنجاز"، مهندس أنظمة الأعمال، ومؤلف كتاب **"عصر الاتصال المفرط"**.

الموقع مبني على بنية كاملة من طبقتين:

* **الواجهة الأمامية:** Next.js 14 (App Router) + TypeScript + TailwindCSS + Framer Motion.
* **الواجهة الخلفية:** FastAPI + SQLAlchemy + Alembic + PostgreSQL + JWT.
* **الأسلوب البصري:** جمالية داكنة بلمسة "بوس / مافيا" — ذهبي على أسود، خط Cinzel للإنجليزي، Tajawal للعربي.
* **اللوحة الإدارية:** كل محتوى الموقع قابل للتعديل من خلال لوحة `/admin`.

شاهد `backend/README.md` و `frontend/README.md` لتفاصيل التشغيل.

### تشغيل سريع (Docker)

```bash
# 1) الواجهة الخلفية + قاعدة البيانات
cd backend
cp .env.example .env
docker compose up -d --build

# 2) تطبيق المخططات + البيانات المبدئية
docker compose exec api alembic upgrade head
docker compose exec api python -m app.initial_data.seed

# 3) الواجهة الأمامية
cd ../frontend
cp .env.local.example .env.local
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) — لوحة التحكم على `/admin/login` (بيانات افتراضية: `admin / admin123`).

---

## 🇬🇧 English

**Islam Ramadan** — Founder of **Enjaz**, business automation engineer, and author of the upcoming book **"The Age of Hyper-Connection"**.

A two-layer stack:

* **Frontend:** Next.js 14 (App Router) + TypeScript + TailwindCSS + Framer Motion.
* **Backend:** FastAPI + SQLAlchemy + Alembic + PostgreSQL + JWT.
* **Aesthetic:** Cinematic dark "Boss/Mafia" — gold on black, Cinzel for Latin, Tajawal for Arabic, RTL throughout.
* **Admin panel:** Every section of the site is editable from the `/admin` dashboard.

See `backend/README.md` and `frontend/README.md` for full details.

### Quick start (Docker)

```bash
# 1) Backend + Postgres
cd backend
cp .env.example .env
docker compose up -d --build

# 2) Migrations + seed
docker compose exec api alembic upgrade head
docker compose exec api python -m app.initial_data.seed

# 3) Frontend
cd ../frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — admin at `/admin/login` (default credentials: `admin / admin123`).

> ⚠ **بعد أول تشغيل غيّر كلمة المرور و `SECRET_KEY` في الـ `.env`.**
> ⚠ **After first run, change the password and `SECRET_KEY` in `.env`.**

---

## 📁 Structure

```
.
├── backend/      FastAPI · SQLAlchemy · Alembic · JWT
├── frontend/     Next.js 14 · App Router · TailwindCSS · Framer Motion
└── README.md     This file
```

## ✨ Features

* 🎬 Cinematic dark/gold aesthetic with film grain, vignette, custom cursor.
* 🌐 Full RTL Arabic content with Tajawal + Cinzel typography.
* 📖 Dedicated section for the book *عصر الاتصال المفرط*.
* 🛠️ Live editable admin panel for every public section.
* 📥 Public contact form persisting to the database.
* 🔐 JWT-secured admin with bcrypt password hashing.
* 📦 Production-ready Docker setup with PostgreSQL.

## 📜 License

Personal portfolio · All rights reserved · © Islam Ramadan / Enjaz.

---

## 🚀 Production Deployment

For full step-by-step deployment to **Netlify (frontend) + Render (backend + Postgres)** — all free tier, no credit card required — see [**DEPLOY.md**](./DEPLOY.md).

للنشر الكامل على Netlify + Render مجاناً — راجع [**DEPLOY.md**](./DEPLOY.md).
