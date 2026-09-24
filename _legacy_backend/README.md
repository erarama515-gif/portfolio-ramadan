# Backend · FastAPI · إنجاز

> FastAPI + SQLAlchemy + Alembic + PostgreSQL + JWT.

---

## 🇸🇦 بالعربية

### المتطلبات

* Python 3.11+
* PostgreSQL 14+ (أو استخدم Docker مباشرة)
* `pip` و `virtualenv`

### التشغيل المحلي (بدون Docker)

```bash
cd backend

# 1) بيئة افتراضية + اعتماديات
python -m venv venv
source venv/bin/activate          # على ويندوز: venv\Scripts\activate
pip install -r requirements.txt

# 2) إعدادات البيئة
cp .env.example .env
# عدّل DATABASE_URL ليُشير إلى قاعدتك المحلية

# 3) شغّل قاعدة البيانات (إذا كنت تستخدم Docker لـ Postgres فقط)
docker compose up -d db

# 4) طبّق المخطط + ابذر البيانات المبدئية
alembic upgrade head
python -m app.initial_data.seed

# 5) شغّل الخادم
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

افتح:

* الـ API: http://localhost:8000
* وثائق Swagger: http://localhost:8000/docs
* وثائق ReDoc: http://localhost:8000/redoc

### التشغيل عبر Docker (كل شيء)

```bash
cd backend
cp .env.example .env
docker compose up -d --build

docker compose exec api alembic upgrade head
docker compose exec api python -m app.initial_data.seed
```

### بيانات الدخول الافتراضية

* المستخدم: `admin`
* كلمة المرور: `admin123`

> 🚨 **غيّرها فوراً من لوحة التحكم بعد أول تشغيل، وبدّل `SECRET_KEY` في `.env` لقيمة عشوائية طويلة.**

### بنية المشروع

```
backend/
├── alembic/                    هجرة قاعدة البيانات
│   └── versions/001_initial.py
├── app/
│   ├── api/v1/                نقاط النهاية (auth, profile, hero, projects, book, contact, ...)
│   ├── core/                  الإعدادات + الأمن (JWT, bcrypt)
│   ├── crud/                  دوال قراءة/كتابة عامة
│   ├── db/                    جلسة SQLAlchemy + Base
│   ├── initial_data/seed.py   البيانات المبدئية بالعربية
│   ├── models/                نماذج SQLAlchemy
│   ├── schemas/               مخططات Pydantic v2
│   └── main.py                نقطة الدخول
├── uploads/                   ملفات مرفوعة (تُنشأ تلقائياً)
├── docker-compose.yml
├── Dockerfile
└── requirements.txt
```

### النشر على Production

* الجداول تُهجَّر بـ `alembic upgrade head`.
* اجعل `SECRET_KEY` متغير بيئة آمن.
* عيّن `CORS_ORIGINS` لدومين الواجهة الأمامية (مثل `https://your-site.com`).
* استخدم خدمة مثل **Railway / Fly.io / DigitalOcean App Platform** مع قاعدة Postgres مُدارة.
* مجلد `uploads/` يجب أن يكون على وحدة تخزين دائمة (Volume).

---

## 🇬🇧 English

### Requirements

* Python 3.11+
* PostgreSQL 14+ (or just use Docker)
* `pip` and `virtualenv`

### Local run (without Docker)

```bash
cd backend

# 1) Virtualenv + deps
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 2) Env
cp .env.example .env
# Edit DATABASE_URL to point at your local Postgres

# 3) Start just the DB if you don't have local Postgres
docker compose up -d db

# 4) Migrate + seed
alembic upgrade head
python -m app.initial_data.seed

# 5) Run server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open:

* API: http://localhost:8000
* Swagger: http://localhost:8000/docs
* ReDoc: http://localhost:8000/redoc

### Full Docker run

```bash
cd backend
cp .env.example .env
docker compose up -d --build

docker compose exec api alembic upgrade head
docker compose exec api python -m app.initial_data.seed
```

### Default credentials

* User: `admin`
* Password: `admin123`

> 🚨 **Change immediately from the admin panel after first run, and replace `SECRET_KEY` in `.env` with a long random value.**

### API endpoints (highlights)

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/v1/portfolio` | Combined public payload (everything in one call) |
| `POST` | `/api/v1/auth/login` | JWT login |
| `GET`  | `/api/v1/auth/me` | Current user |
| `GET/PUT` | `/api/v1/profile` | Profile + avatar/cv upload |
| `GET/PUT` | `/api/v1/hero` | Hero section |
| `GET/POST/PUT/DELETE` | `/api/v1/projects` | Projects CRUD + image upload + reorder |
| `GET/PUT` | `/api/v1/book` | Book section + cover upload |
| `POST` | `/api/v1/contact` | Public contact form |
| `GET`  | `/api/v1/contact/messages` | Inbox (auth) |
| ...    | ... | Skills, tech, services, timeline, terminal, ticker, social, SEO, settings |

### Deployment

* Run migrations with `alembic upgrade head`.
* Set `SECRET_KEY` to a secure secret in env vars.
* Set `CORS_ORIGINS` to your frontend origin (e.g. `https://your-site.com`).
* Deploy to **Railway / Fly.io / DigitalOcean App Platform** with managed Postgres.
* Mount `uploads/` on a persistent volume.

### Useful commands

```bash
# Create new migration after model change
alembic revision --autogenerate -m "describe change"

# Roll back one migration
alembic downgrade -1

# Re-seed (idempotent — skips if rows already exist)
python -m app.initial_data.seed
```
