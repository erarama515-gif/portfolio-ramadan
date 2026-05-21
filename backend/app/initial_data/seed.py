"""
Seed the database with Arabic content for Islam Ramadan's portfolio.
Run:  python -m app.initial_data.seed
"""
from app.db.base import SessionLocal
from app.models import models
from app.core.security import get_password_hash
from app.crud import crud
from app.schemas import schemas


def seed_data():
    db = SessionLocal()
    try:
        # ── Global guard: once admin exists, we consider DB already initialized.
        # This prevents auto re-seeding on every deploy even if the user deletes
        # rows (e.g. all projects) from the admin panel.
        if db.query(models.User).filter(models.User.username == "admin").first():
            print("⏭  Database already initialized — skipping seed.")
            return

        # ── Admin user ──
        if not db.query(models.User).filter(models.User.username == "admin").first():
            admin = models.User(
                username="admin",
                email="admin@enjaz.eg",
                hashed_password=get_password_hash("admin123"),
                is_active=True,
            )
            db.add(admin); db.commit()
            print("✅ Admin user created: admin / admin123")

        # ── Profile ──
        if not crud.get_profile(db):
            crud.create_profile(db, schemas.ProfileCreate(
                name="إسلام رمضان",
                role="مؤسس إنجاز · مهندس أنظمة الأعمال",
                bio=(
                    "أُؤسِّس وأُهندس أنظمة عمل تُغيّر قواعد اللعبة. "
                    "أُحلّل، أُؤتمت، وأُحوّل الفوضى التشغيلية إلى ماكينة دقيقة تعمل وحدها. "
                    "متخصص في أتمتة الأعمال، تحليل الأنظمة، والكتابة عن اقتصاد الانتباه في عصر الاتصال المفرط."
                ),
                location="جمهورية مصر العربية",
                email="islam@enjaz.eg",
                experience="مؤسس · باحث · مُنفِّذ",
                focus="أتمتة · تحليل · سُلطة المعرفة",
            ))
            print("✅ Profile created (Islam Ramadan)")

        # ── Hero ──
        if not crud.get_hero(db):
            crud.create_hero(db, schemas.HeroSectionCreate(
                headline="من الفوضى إلى السيطرة",
                subheadline=(
                    "أُؤسِّس أنظمةً لا تنام. أُؤتمت ما يستنزف وقتك، وأُحلّل ما يستنزف انتباهك. "
                    "هنا تلتقي هندسة الأعمال بعلم النفس الرقمي."
                ),
                typing_words=[
                    "تعمل وحدها",
                    "تتحرّر من البشر",
                    "تُضاعف الأرباح",
                    "تُعيد لك الوقت",
                ],
                cta_primary="استكشف الأعمال",
                cta_secondary="تواصل معي",
                show_cv_btn=True,
                show_status_badge=True,
                status_text="متاح لمشروع واحد هذا الشهر",
                bg_neural=True,
                bg_grid=True,
            ))
            print("✅ Hero section created")

        # ── Projects ──
        if not crud.get_projects(db):
            for p in [
                schemas.ProjectCreate(
                    icon="◆",
                    name="إنجاز · مكتب الخدمات الإلكترونية",
                    description="مكتب رقمي يُؤدي عشرات الخدمات الحكومية والإدارية في دقائق، بدلاً من أيام.",
                    long_description=(
                        "إنجاز ليس مكتباً عادياً؛ هو نظامٌ تشغيلي كامل يدمج بين الخدمات الحكومية، "
                        "الإدارية، والمالية في واجهة واحدة. بُني لتقديم الخدمة بأقل احتكاك ممكن، "
                        "وبأعلى دقة ممكنة، مدعوماً بأتمتة ذكية تُلغي الأخطاء البشرية وتختصر الوقت."
                    ),
                    tags=["خدمات حكومية", "أتمتة", "تجربة عملاء", "إدارة عمليات"],
                    status="live",
                    sort_order=1,
                    metrics=[
                        {"label": "عميل خدمته", "value": "+5,000"},
                        {"label": "وقت متوسط للخدمة", "value": "-78%"},
                        {"label": "معدّل الرضا", "value": "99.2%"},
                    ],
                ),
                schemas.ProjectCreate(
                    icon="◇",
                    name="نظام أتمتة سير العمل",
                    description="منصة Workflow ذكية تربط بين الأقسام وتُلغي الإدخال اليدوي، مع لوحات تحكم لحظية للمدير.",
                    long_description=(
                        "نظام أتمتة كامل بُني لمكاتب الخدمات والشركات المتوسطة. يربط بين قاعدة العملاء، "
                        "نظام المهام، الفواتير، والتنبيهات في تدفّق واحد. كل خطوة موثّقة، كل تأخير مُنبَّه عنه، "
                        "وكل تقرير يصل المدير قبل أن يطلبه."
                    ),
                    tags=["Python", "FastAPI", "أتمتة", "تحليل بيانات"],
                    status="live",
                    sort_order=2,
                    metrics=[
                        {"label": "ساعات وُفّرت أسبوعياً", "value": "+120"},
                        {"label": "خطأ بشري", "value": "-94%"},
                        {"label": "سرعة التنفيذ", "value": "×6"},
                    ],
                ),
                schemas.ProjectCreate(
                    icon="❖",
                    name="نظام تحليل العملاء (CRM)",
                    description="CRM مُخصّص لمكاتب الخدمات، يفهم سلوك العميل ويُنبّهك قبل أن يضيع.",
                    long_description=(
                        "نظام إدارة علاقات بُني خصيصاً لطبيعة مكاتب الخدمات في السوق المصري. "
                        "يتتبّع كل تفاعل، يُصنّف العملاء تلقائياً، ويُولّد تقارير ذكية عن قِمم وقيعان الموسم. "
                        "نتيجته: قرارات أسرع، خسائر أقل، احتفاظ أعلى."
                    ),
                    tags=["CRM", "تحليل سلوك", "تقارير ذكية"],
                    status="live",
                    sort_order=3,
                    metrics=[
                        {"label": "احتفاظ بالعملاء", "value": "+38%"},
                        {"label": "وقت اتخاذ قرار", "value": "-65%"},
                        {"label": "بيانات يومية", "value": "+12k"},
                    ],
                ),
                schemas.ProjectCreate(
                    icon="◈",
                    name="لوحة تحكّم تنفيذية",
                    description="لوحة Executive Dashboard تُري المدير حقيقة الأعمال في 7 ثوانٍ، بلا فلترة بشرية.",
                    long_description=(
                        "لوحة قيادة تنفيذية تجمع كل المؤشرات الحرجة في شاشة واحدة: التدفّق النقدي، "
                        "حالة العملاء، أداء الفريق، نقاط الضعف. تُحدَّث لحظياً وتُرسل تنبيهات صامتة "
                        "للمدير وقت الحاجة فقط — بدون ضوضاء، بدون تشويش."
                    ),
                    tags=["BI", "تحليلات", "Executive"],
                    status="live",
                    sort_order=4,
                    metrics=[
                        {"label": "مؤشرات لحظية", "value": "48"},
                        {"label": "سرعة القرار", "value": "×4"},
                        {"label": "اجتماعات أُلغيت", "value": "-70%"},
                    ],
                ),
                schemas.ProjectCreate(
                    icon="✦",
                    name="نظام إدارة المحتوى للباحثين",
                    description="منصة بحث ومعرفة لكتّاب الكتب والباحثين — تنظيم أفكار، اقتباسات، ومصادر بدقة جراحية.",
                    long_description=(
                        "أداة بحثية بُنيت أثناء تأليف كتاب «عصر الاتصال المفرط». تُنظّم آلاف المصادر، "
                        "تربط الأفكار، وتُولّد خرائط معرفية تكشف ما لا يراه البحث التقليدي. "
                        "أداة أصبحت الآن مُتاحة لباحثين آخرين."
                    ),
                    tags=["معرفة", "بحث", "Knowledge Graph"],
                    status="live",
                    sort_order=5,
                    metrics=[
                        {"label": "مصدر مُفهرس", "value": "+3,200"},
                        {"label": "تسريع البحث", "value": "×9"},
                        {"label": "اقتباسات", "value": "+1,800"},
                    ],
                ),
            ]:
                crud.create_project(db, p)
            print("✅ 5 projects created")

        # ── Skills ──
        if not crud.get_skills(db):
            for s in [
                schemas.SkillCreate(name="تحليل الأنظمة", percentage=98, category="استراتيجية", sort_order=1),
                schemas.SkillCreate(name="أتمتة الأعمال", percentage=96, category="تنفيذ", sort_order=2),
                schemas.SkillCreate(name="هندسة العمليات", percentage=94, category="استراتيجية", sort_order=3),
                schemas.SkillCreate(name="إدارة المشاريع", percentage=92, category="قيادة", sort_order=4),
                schemas.SkillCreate(name="تصميم تجربة الخدمة", percentage=90, category="تنفيذ", sort_order=5),
                schemas.SkillCreate(name="تحليل اقتصاد الانتباه", percentage=93, category="بحث", sort_order=6),
                schemas.SkillCreate(name="الكتابة التحليلية", percentage=91, category="بحث", sort_order=7),
                schemas.SkillCreate(name="القيادة التنفيذية", percentage=88, category="قيادة", sort_order=8),
            ]:
                crud.create_skill(db, s)
            print("✅ 8 skills created")

        # ── Tech Stack ──
        if not crud.get_tech_stack(db):
            for t in [
                schemas.TechStackCreate(name="Python", color="#c8a96a", sort_order=1),
                schemas.TechStackCreate(name="FastAPI", color="#d4af37", sort_order=2),
                schemas.TechStackCreate(name="Next.js", color="#c8a96a", sort_order=3),
                schemas.TechStackCreate(name="PostgreSQL", color="#a88a4e", sort_order=4),
                schemas.TechStackCreate(name="Notion API", color="#c8a96a", sort_order=5),
                schemas.TechStackCreate(name="Zapier / Make", color="#d4af37", sort_order=6),
                schemas.TechStackCreate(name="Power BI", color="#a88a4e", sort_order=7),
                schemas.TechStackCreate(name="Airtable", color="#c8a96a", sort_order=8),
                schemas.TechStackCreate(name="n8n", color="#d4af37", sort_order=9),
                schemas.TechStackCreate(name="OpenAI", color="#a88a4e", sort_order=10),
            ]:
                crud.create_tech(db, t)
            print("✅ 10 tech items created")

        # ── Services ──
        if not crud.get_services(db):
            for s in [
                schemas.ServiceCreate(icon="◆", title="تأسيس مكاتب خدمات",
                    description="من الصفر إلى مكتب يعمل بنظام كامل: تحليل السوق، هيكل تشغيلي، أتمتة، وفريق مُدرَّب.", sort_order=1),
                schemas.ServiceCreate(icon="◇", title="أتمتة الأعمال",
                    description="أُحوّل المهام المُكرَّرة إلى عمليات تعمل وحدها — وفّر مئات الساعات شهرياً.", sort_order=2),
                schemas.ServiceCreate(icon="❖", title="تحليل الأنظمة",
                    description="أُفكّك أنظمة الشركات إلى عناصرها، أكتشف نقاط النزيف، وأُعيد التصميم بدقّة.", sort_order=3),
                schemas.ServiceCreate(icon="✦", title="استشارات تنفيذية",
                    description="جلسات استراتيجية للمؤسّسين والمديرين — قرارات أصعب، بوضوح أعلى.", sort_order=4),
                schemas.ServiceCreate(icon="◉", title="بناء لوحات تحكُّم",
                    description="Dashboards تُري المدير الحقيقة بلا تجميل — كل المؤشرات في شاشة واحدة.", sort_order=5),
                schemas.ServiceCreate(icon="✧", title="محاضرات وورش",
                    description="ورش عن اقتصاد الانتباه، التركيز العميق، وإدارة الوقت في عصر التشتُّت.", sort_order=6),
                schemas.ServiceCreate(icon="❂", title="تصميم سير العمل",
                    description="رسم خرائط العمليات، توثيقها، وتحويلها إلى SOPs قابلة للتنفيذ والتدريب.", sort_order=7),
                schemas.ServiceCreate(icon="❈", title="تحرير ومراجعة استراتيجية",
                    description="مراجعة وثائق، خطط، ومقترحات استراتيجية بعين تحليلية صارمة.", sort_order=8),
            ]:
                crud.create_service(db, s)
            print("✅ 8 services created")

        # ── Timeline ──
        if not crud.get_timeline(db):
            for t in [
                schemas.TimelineItemCreate(year="2026 — الآن",
                    title="تأليف «عصر الاتصال المفرط»",
                    subtitle="أعمل على كتاب يُفكّك اقتصاد الانتباه وأثره على القرار والإنتاجية والذاكرة.",
                    sort_order=1),
                schemas.TimelineItemCreate(year="2023 — الآن",
                    title="مؤسس · إنجاز",
                    subtitle="تأسيس مكتب خدمات إلكترونية يعمل بنظام أتمتة كامل، خدمة آلاف العملاء.",
                    sort_order=2),
                schemas.TimelineItemCreate(year="2021 — 2023",
                    title="مهندس أتمتة وتحليل أنظمة",
                    subtitle="بناء أنظمة CRM وأتمتة سير عمل لمكاتب ومؤسسات في السوق المصري.",
                    sort_order=3),
                schemas.TimelineItemCreate(year="2019 — 2021",
                    title="بحث وكتابة في اقتصاد الانتباه",
                    subtitle="بداية الانخراط في دراسة الإدمان الرقمي، الدوبامين، والتبلّد العقلي الجماعي.",
                    sort_order=4),
            ]:
                crud.create_timeline_item(db, t)
            print("✅ 4 timeline items created")

        # ── Terminal Logs (Arabic flavored — system feel) ──
        if not crud.get_terminal_logs(db):
            for l in [
                schemas.TerminalLogCreate(tag="SYS", tag_type="SYS",
                    message="إنجاز · النظام يعمل · 99.9% وقت تشغيل", sort_order=1, active=True),
                schemas.TerminalLogCreate(tag="API", tag_type="API",
                    message="POST /services/new — مُعالَجة بنجاح · 47ms", sort_order=2, active=True),
                schemas.TerminalLogCreate(tag="WS", tag_type="WS",
                    message="اتّصال مباشر · 12 جلسة عميل نشطة", sort_order=3, active=True),
                schemas.TerminalLogCreate(tag="AI", tag_type="AI",
                    message="مُحلّل السلوك · رصد 3 عملاء بأولوية مرتفعة", sort_order=4, active=True),
                schemas.TerminalLogCreate(tag="DB", tag_type="DB",
                    message="قاعدة البيانات · معدّل cache: 96.4%", sort_order=5, active=True),
                schemas.TerminalLogCreate(tag="SYS", tag_type="SYS",
                    message="مهمّة مُؤتمتة مكتملة · إرسال تقرير يومي", sort_order=6, active=True),
                schemas.TerminalLogCreate(tag="API", tag_type="API",
                    message="248 طلب خدمة مُكتمل خلال آخر ساعة", sort_order=7, active=True),
                schemas.TerminalLogCreate(tag="AI", tag_type="AI",
                    message="تنبيه · نمط جديد في سلوك العملاء — تقرير في الطريق", sort_order=8, active=True),
            ]:
                crud.create_terminal_log(db, l)
            print("✅ 8 terminal logs created")

        # ── Ticker Messages ──
        if not crud.get_ticker_messages(db):
            for m in [
                schemas.TickerMessageCreate(tag="SYS", tag_type="SYS",
                    message="إنجاز يعمل · جميع الخدمات متاحة", active=True),
                schemas.TickerMessageCreate(tag="AI", tag_type="AI",
                    message="مُحلّل الأنماط · إصدار 3.2 قيد التشغيل", active=True),
                schemas.TickerMessageCreate(tag="API", tag_type="API",
                    message="4,182 خدمة منجزة هذا الشهر · بزمن أقل 78%", active=True),
                schemas.TickerMessageCreate(tag="WS", tag_type="WS",
                    message="استشارات مباشرة · 3 جلسات نشطة", active=True),
                schemas.TickerMessageCreate(tag="SYS", tag_type="SYS",
                    message="كتاب «عصر الاتصال المفرط» · قيد الكتابة", active=True),
                schemas.TickerMessageCreate(tag="AI", tag_type="AI",
                    message="تنبيه أتمتة · 32 مهمّة مُكتملة تلقائياً اليوم", active=True),
            ]:
                crud.create_ticker_message(db, m)
            print("✅ 6 ticker messages created")

        # ── Social Links ──
        if not crud.get_social_links(db):
            for link in [
                schemas.SocialLinkCreate(platform="LinkedIn", icon="in", url="https://linkedin.com/in/islamramadan"),
                schemas.SocialLinkCreate(platform="X / Twitter", icon="✕", url="https://x.com/"),
                schemas.SocialLinkCreate(platform="البريد", icon="@", url="mailto:islam@enjaz.eg"),
                schemas.SocialLinkCreate(platform="واتساب", icon="✦", url="https://wa.me/20"),
            ]:
                crud.create_social_link(db, link)
            print("✅ 4 social links created")

        # ── SEO ──
        if not crud.get_seo(db):
            crud.create_seo(db, schemas.SeoSettingsCreate(
                title="إسلام رمضان · إنجاز · مهندس أنظمة الأعمال",
                description="مؤسس إنجاز، متخصص في أتمتة الأعمال وتحليل الأنظمة. مؤلف كتاب «عصر الاتصال المفرط».",
                keywords="إسلام رمضان, إنجاز, أتمتة الأعمال, تحليل الأنظمة, اقتصاد الانتباه, عصر الاتصال المفرط, Enjaz",
                og_image="",
                canonical_url="",
                twitter_handle="@islamramadan",
            ))
            print("✅ SEO settings created")

        # ── Site Settings ──
        if not crud.get_site_settings(db):
            crud.create_site_settings(db, schemas.SiteSettingsCreate(
                show_hire_btn=True, show_terminal=True, show_ticker=True,
                show_architecture=True, show_contact_form=True,
                show_cv_btn=True, available_for_work=True, show_book=True,
            ))
            print("✅ Site settings created")

        # ── Book ──
        if not crud.get_book(db):
            crud.create_book(db, schemas.BookCreate(
                title="عصر الاتصال المفرط",
                subtitle="كيف سرقت الشاشاتُ انتباهك وأعادت كتابة دماغك",
                tagline="ليست مشكلتك أنك مشتّت. المشكلة أن النظام صُمّم لتشتيتك.",
                description=(
                    "في زمنٍ يُقاس فيه نجاح أكبر الشركات بمدى ما تُسرَق من انتباهك، لم يعد التركيز رفاهية؛ "
                    "بل أصبح ميزة تنافسية شبه نادرة. هذا الكتاب يُفكّك ميكانيكا اقتصاد الانتباه، يكشف كيف "
                    "أُعيدت برمجة دوائر المكافأة في الدماغ، ولماذا أصبحت ظاهرة «التبلّد العقلي» (Brain Rot) "
                    "وَباءً صامتاً يأكل من إنتاجيتك وذاكرتك. "
                    "ليس كتاباً تحذيرياً، بل دليلٌ تشغيلي لاستعادة السيطرة — على وقتك، على ذهنك، وعلى قرارك."
                ),
                status="coming_soon",
                release_date="2026",
                preorder_url="",
                chapters=[
                    {"title": "الفصل الأول · ماكينة الانتباه", "summary": "كيف تحوّل انتباهك إلى أكثر السلع ربحاً في التاريخ."},
                    {"title": "الفصل الثاني · صناعة الإدمان", "summary": "تشريح حلقة الدوبامين التي تربطك بالشاشة."},
                    {"title": "الفصل الثالث · التبلّد العقلي", "summary": "Brain Rot كظاهرة جماعية، لا فردية."},
                    {"title": "الفصل الرابع · إعادة البرمجة", "summary": "بروتوكولات تشغيلية لاستعادة التركيز العميق."},
                    {"title": "الفصل الخامس · التبسيط الرقمي", "summary": "Digital Minimalism كاختيار سُلطوي، لا تقشُّفي."},
                    {"title": "الفصل السادس · اقتصاد السيطرة", "summary": "كيف تبني نظام انتباه شخصي يخدمك أنت."},
                ],
                quotes=[
                    {"text": "كلّما زاد اتصالك، قلّت سيطرتك. كلّما ضاقت قنواتك، اتّسع أفقك.", "context": "مقدمة الكتاب"},
                    {"text": "الانتباه عملة جديدة. ومن لا يُسيطر على عملته، يبيعها بسعر بخس.", "context": "الفصل الأول"},
                    {"text": "الإلهاء ليس عدوّاً يأتي من خارجك؛ بل صناعةٌ مُتقنة تبيع نفسها لك يومياً.", "context": "الفصل الثاني"},
                ],
            ))
            print("✅ Book created (عصر الاتصال المفرط)")

        print("\n🎉 Database seeded successfully — جاهز للعمل")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
