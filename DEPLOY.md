# دليل النشر · Deployment Guide

> Netlify (Frontend) · Render (Backend + PostgreSQL) · مجاناً 100%
> كل الخطوات بدون بطاقة ائتمان · Total time: ~25 دقيقة

---

## 🇸🇦 الخطة (المعمارية)

```
┌──────────────────┐  HTTPS  ┌──────────────────┐  SQL  ┌──────────────────┐
│   Netlify        │ ──────▶ │   Render         │ ────▶ │   Render         │
│   Frontend       │         │   FastAPI        │       │   PostgreSQL     │
│   Next.js 14     │         │   Python 3.11    │       │   1 GB           │
└──────────────────┘         └──────────────────┘       └──────────────────┘
  your.netlify.app             your-api.onrender.com      (داخلي)
```

* الموقع العام: **Netlify** (مجاني، سرعة CDN عالمية)
* الـ API + قاعدة البيانات: **Render** (مجاني، يدعم Python و Postgres)
* كل البيانات (المشاريع، الكتاب، الرسائل، إلخ) تُخزَّن في قاعدة Render
* لوحة التحكم تشتغل من Netlify ↔ Render مباشرة

---

## ⚠ ملاحظة مهمة قبل البدء

الخطة المجانية على Render لا توفّر **تخزيناً دائماً للملفات**:

| السلوك | الخطة المجانية |
|--------|----------------|
| البيانات (مشاريع، نصوص، رسائل) | ✅ تبقى في قاعدة Postgres للأبد |
| الصور المرفوعة (avatar، CV، صور مشاريع، غلاف الكتاب) | ⚠ تُحذف عند كل إعادة نشر للـ backend |
| الخادم ينام بعد 15 دقيقة بدون نشاط | ⚠ أول طلب بعد النوم بطيء (~50 ثانية) |

**الحلول لاحقاً (اختيارية):**
1. ترقية خطة Render Disk بـ$1/شهر = تخزين دائم.
2. ربط Cloudinary مجاناً للصور (سأساعدك لو طلبت).
3. ترقية إلى Render Starter بـ$7/شهر = لا نوم + سرعة دائمة.

للبدء، الخطة المجانية تكفي تماماً.

---

## 📋 الخطوات (تنفّذها بالترتيب)

### الخطوة 0 · رفع المشروع على GitHub

النشر على Netlify و Render يحتاج Git repo.

```bash
cd portfolio_final
git init
git add .
git commit -m "Initial commit · Portfolio · إنجاز"

# أنشئ ريبو جديد (private أو public) على github.com ثم:
git remote add origin https://github.com/USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

> 💡 لو ما عندكش حساب GitHub: اعمله من [github.com/signup](https://github.com/signup) (دقيقتان).

---

### الخطوة 1 · نشر الـ Backend على Render (الأهم — ابدأ بيه)

#### 1.1 سجّل دخول

اذهب إلى [render.com](https://render.com) → **Get Started for Free** → سجّل بحساب GitHub.

#### 1.2 اربط الريبو

في لوحة Render اضغط **New +** (أعلى يمين) → **Blueprint**.

* اختر الريبو اللي رفعت عليه المشروع.
* Render هيكتشف ملف `render.yaml` تلقائياً.
* اضغط **Apply**.

سيُنشئ Render تلقائياً:
- ✅ خدمة `portfolio-api` (Python web service)
- ✅ قاعدة بيانات `portfolio-db` (PostgreSQL مجانية)

#### 1.3 انتظر البناء

أول build يستغرق **3-5 دقائق** (تثبيت deps + migrations + seed).
شوف الـ logs لحظة بلحظة من زر **Logs**.

عند انتهاء البناء بنجاح، هتلاقي:
- ✅ `Your service is live 🎉`
- رابط الـ API يظهر فوق، شكله: `https://portfolio-api-xxxx.onrender.com`

**انسخ هذا الرابط — هنحتاجه في خطوة Netlify.**

#### 1.4 تحقّق من الـ API

افتح في المتصفح:
```
https://portfolio-api-xxxx.onrender.com/health
```

لازم يرجع: `{"status":"ok"}`

بعدها جرّب:
```
https://portfolio-api-xxxx.onrender.com/api/v1/portfolio
```

لازم يرجع كل بيانات الموقع بصيغة JSON.

> 🐢 لو الطلب الأول بطيء (40-50 ثانية)، ده طبيعي — الخادم كان نائم. الطلبات اللي بعده سريعة.

---

### الخطوة 2 · نشر الـ Frontend على Netlify

#### 2.1 سجّل دخول

اذهب إلى [app.netlify.com](https://app.netlify.com) → **Sign up** → اختر **GitHub**.

#### 2.2 اربط الريبو

اضغط **Add new site** → **Import an existing project** → **Deploy with GitHub** → اختر ريبو المشروع.

#### 2.3 تأكّد من إعدادات البناء

Netlify يقرأ `netlify.toml` تلقائياً، فاللي مفروض يظهر:

| Field | Value |
|-------|-------|
| Base directory | `frontend` |
| Build command | `npm install && npm run build` |
| Publish directory | `frontend/.next` |

**لا تغيّر شيئاً** — اضغط فقط على رابط **Add environment variables** قبل النشر.

#### 2.4 أضف متغير البيئة (مهم جداً!)

اضغط **Add environment variable**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://portfolio-api-xxxx.onrender.com` |

(استبدل `xxxx` برابط Render اللي نسخته من الخطوة 1.3.)

#### 2.5 اضغط Deploy

اضغط **Deploy site** أو **Deploy [name]**.

أول build يستغرق **2-3 دقائق**.

عند الانتهاء، هتلاقي رابط شكله:
```
https://amazing-name-12345.netlify.app
```

> 💡 يمكن تغييره من **Site settings → Change site name** لرابط أجمل، مثل `islam-ramadan.netlify.app`.

---

### الخطوة 3 · اربط Backend بـ Frontend (CORS)

دلوقتي لازم نخبر الـ backend إن Netlify يحقّ له يطلب منه.

#### 3.1 ارجع إلى Render

افتح خدمة `portfolio-api` → اذهب إلى **Environment** (في الشريط الجانبي).

#### 3.2 عدّل `CORS_ORIGINS`

دور على المتغير `CORS_ORIGINS` (اللي كان `sync: false`).

اضغط على القيمة وضع رابط Netlify كاملاً:

```
https://amazing-name-12345.netlify.app
```

(استبدل `amazing-name-12345` بالاسم الفعلي لموقعك.)

اضغط **Save Changes** — Render هيعيد نشر الخدمة تلقائياً (~دقيقة واحدة).

---

### الخطوة 4 · سجّل دخول لوحة التحكم وغيّر كلمة المرور

#### 4.1 افتح لوحة الإدارة

```
https://your-site.netlify.app/admin/login
```

اكتب:
* **المستخدم:** `admin`
* **كلمة المرور:** `admin123`

#### 4.2 ⚠ غيّر كلمة المرور فوراً

من لوحة التحكم → اذهب إلى أي قسم (مؤقتاً ليس فيه واجهة لتغيير الباسوورد المدمج، لذلك:)

**الطريقة الأمنية الفورية** — غيّر `SECRET_KEY` من Render حتى تنتهي صلاحية أي توكن قديم:

* ارجع إلى Render → `portfolio-api` → **Environment**
* اضغط **Edit** بجانب `SECRET_KEY` → اختر **Generate value**
* اضغط **Save**

كل التوكنات القديمة تنتهي صلاحيتها فوراً. سجّل دخول مرة أخرى.

#### 4.3 غيّر كلمة المرور الفعلية

من Render → `portfolio-api` → **Shell** (في الشريط الجانبي) — افتح Shell مباشر للخادم:

```bash
python -m app.initial_data.set_password "كلمةمرورك_الجديدة_القوية"
```

ستظهر رسالة `✅ تم تحديث كلمة مرور admin بنجاح.`

سجّل دخول مرة أخرى بكلمة المرور الجديدة.

> 💡 الحد الأدنى 8 أحرف. استخدم كلمة طويلة مع أرقام ورموز.

---

### الخطوة 5 · ابدأ التحكم في المحتوى

بعد دخول اللوحة، يمكنك تعديل:

| القسم | الرابط |
|------|--------|
| 👤 الملف الشخصي (الصورة، السيرة، الاتصال) | `/admin/profile` |
| 💎 القسم الرئيسي (العنوان، الكلمات المتحرّكة) | `/admin/hero` |
| 🚀 المشاريع | `/admin/projects` |
| 📖 الكتاب (الفصول، الاقتباسات، الغلاف) | `/admin/book` |
| ✉ الرسائل من نموذج التواصل | `/admin/contact-messages` |
| 🛠 المهارات / التقنيات / الخدمات / الرحلة | `/admin/skills`, `/tech`, `/services`, `/timeline` |
| 🔍 SEO + الإعدادات (إظهار/إخفاء أقسام) | `/admin/seo`, `/admin/settings` |

كل تعديل ينعكس فوراً على الموقع العام.

---

## 🔄 التحديثات المستقبلية

كل ما تـ`git push` على الـ `main` branch:
* **Netlify** ينشر الواجهة تلقائياً (1-2 دقيقة)
* **Render** ينشر الـ backend تلقائياً (3-5 دقائق)

محتوى قاعدة البيانات **لا يُمسح** — يبقى كما هو.

---

## 🆘 حلول للمشاكل الشائعة

### الموقع يفتح لكن البيانات لا تظهر

**السبب:** الـ `NEXT_PUBLIC_API_URL` غير مضبوط على Netlify.

**الحل:** Netlify → Site settings → Environment variables → تأكد من وجود المتغير. لو غيّرته، أعد النشر من **Deploys** → **Trigger deploy**.

### رسالة CORS error في الـ Console

**السبب:** الـ `CORS_ORIGINS` على Render لا يحتوي رابط Netlify.

**الحل:** Render → portfolio-api → Environment → عدّل `CORS_ORIGINS` ليحتوي رابطك كاملاً (بدون `/` في النهاية).

### الـ backend بطيء جداً عند أول طلب

**السبب:** الخدمة المجانية على Render تنام بعد 15 دقيقة.

**الحلول:**
1. تقبّل البطء (50 ثانية مرة واحدة كل فترة).
2. استخدم [UptimeRobot](https://uptimerobot.com) مجاناً لعمل ping كل 5 دقائق.
3. ترقّ إلى Render Starter ($7/شهر) — لا نوم.

### الصور المرفوعة اختفت بعد إعادة النشر

**السبب:** قرص Render مؤقّت على الخطة المجانية.

**الحل:** أعد رفعها من اللوحة، أو ربط Cloudinary (أخبرني لو محتاج هذا).

### "Could not connect to database"

**السبب:** الـ Postgres لسه بيتم إنشاؤها.

**الحل:** انتظر 1-2 دقيقة وأعد البناء من Render → Manual Deploy → **Clear build cache & deploy**.

---

## 🇬🇧 English Summary

This project uses a 3-service free-tier architecture:

- **Netlify** → Next.js frontend (`yourname.netlify.app`)
- **Render** → FastAPI backend (`portfolio-api-xxxx.onrender.com`)
- **Render** → PostgreSQL database (managed, free 1 GB)

**Files included for one-click deploy:**

- `netlify.toml` → Netlify build config
- `render.yaml` → Render Blueprint (creates both API + DB in one click)
- `frontend/next.config.js` → Reads `NEXT_PUBLIC_API_URL` from env
- `backend/Dockerfile` → Production-ready (no `--reload`, uses `$PORT`)
- `backend/.python-version` → Pins Python 3.11.9

**Quick deploy:**

1. `git push` your project to GitHub.
2. On Render: New → Blueprint → pick repo (uses `render.yaml`).
3. Copy the API URL Render gives you.
4. On Netlify: Import project → set env `NEXT_PUBLIC_API_URL=<that URL>` → Deploy.
5. Back on Render: set `CORS_ORIGINS` to your `*.netlify.app` URL.
6. Login at `/admin/login` with `admin / admin123`.
7. Regenerate `SECRET_KEY` on Render to invalidate the default token.

**Limitations (free tier):**

- Backend sleeps after 15 min idle (~50s cold start).
- Uploads folder is ephemeral (wiped on redeploy). DB data is persistent.
- Free Postgres expires after 90 days (1 GB) — upgrade or recreate.

For Cloudinary integration (persistent images on free tier), ask Claude to add it.
