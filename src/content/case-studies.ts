import type { Locale } from '@/i18n/dictionaries'

/**
 * Extended case study content, keyed by project slug + locale.
 * Kept in code for now; will be pulled from Payload CMS in Phase 5.
 */

export interface CaseStudyMeta {
  role: string
  timeline: string
  industry: string
}

export interface CaseFeature {
  title: string
  body: string
}

export interface CaseLayer {
  label: string
  note: string
}

export interface CaseResult {
  value: string
  label: string
}

export interface CaseStudy {
  meta: CaseStudyMeta
  challenge: string[]      // paragraphs
  approach: string[]       // paragraphs
  architecture: CaseLayer[]
  features: CaseFeature[]
  results: CaseResult[]
  techGroups: { group: string; items: string[] }[]
}

type CaseStudyMap = Record<string, Record<Locale, CaseStudy>>

/* ─── Content ─── */

const kayanErp: Record<Locale, CaseStudy> = {
  en: {
    meta: { role: 'Systems architect · Full-stack', timeline: '2023 — Ongoing', industry: 'Enterprise operations' },
    challenge: [
      'The company was running its operations across a patchwork of spreadsheets, three legacy tools, and a WhatsApp thread. Nothing was the source of truth for anything — and every workflow paused whenever an operator was away.',
      'Off-the-shelf ERPs solved the wrong problem: they gave a generic canvas, not the specific operation. We needed a system shaped by how this business actually runs, not how a template thinks it should.',
    ],
    approach: [
      'We spent the first two weeks with the operations team — not the executives — mapping every recurring workflow, every approval, every exception. Only then did we start designing.',
      'The result was a single unified platform with a modular architecture: each business function is an isolated module, but they share one data model, one auth layer, and one audit trail.',
    ],
    architecture: [
      { label: 'Business operations',      note: 'Real workflows, mapped and named' },
      { label: 'Frontend (Next.js)',       note: 'Role-aware panels, RTL-first' },
      { label: 'API (NestJS)',             note: 'Contracts, guards, audit' },
      { label: 'Domain layer',             note: 'Business rules in TypeScript' },
      { label: 'Postgres + Prisma',        note: 'Single source of truth' },
      { label: 'Automation triggers',      note: 'Cron, webhooks, integrations' },
    ],
    features: [
      { title: 'Users & Roles',         body: 'Fine-grained permissions modeled on the org chart, not on generic roles.' },
      { title: 'Financial workflows',   body: 'Invoices, expenses, approvals, reconciliation — audited at every hop.' },
      { title: 'Business intelligence', body: 'Live dashboards tied to the same data model — no ETL, no drift.' },
      { title: 'Custom modules',        body: 'New workflows added without redeployment. The stack expects extension.' },
    ],
    results: [
      { value: '11', label: 'operations modules in production' },
      { value: '80%', label: 'less time in spreadsheets' },
      { value: '24/7', label: 'uptime — no maintenance windows since Q1' },
    ],
    techGroups: [
      { group: 'Frontend',   items: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
      { group: 'Backend',    items: ['NestJS', 'Node.js', 'Zod'] },
      { group: 'Data',       items: ['PostgreSQL', 'Prisma', 'Redis'] },
      { group: 'Infra',      items: ['Docker', 'GitHub Actions', 'Fly.io'] },
    ],
  },
  ar: {
    meta: { role: 'مهندس أنظمة · Full-stack', timeline: '٢٠٢٣ — مستمر', industry: 'عمليات مؤسسات' },
    challenge: [
      'الشركة كانت شغّالة على مزيج من الشيتات وأدوات قديمة وواتساب. مافيش مصدر حقيقة واحد لأي حاجة — وأي workflow كان بيقف لمّا حد يغيب.',
      'الـ ERPs الجاهزة كانت بتحل المشكلة الغلط: بتدّي canvas عامّ، مش عملية محدّدة. المطلوب نظام مشكّل من طريقة عمل الشركة الفعلية.',
    ],
    approach: [
      'قضينا أول أسبوعين مع فريق العمليات — مش المديرين — بنرسم كل workflow متكرّر، كل approval، وكل استثناء. بعدها بس بدأنا التصميم.',
      'النتيجة منصّة موحّدة بمعمار modular: كل وظيفة عمل module منفصل، بس بيشاركوا نموذج بيانات واحد و auth واحد و audit trail واحد.',
    ],
    architecture: [
      { label: 'عمليات الأعمال', note: 'سير عمل حقيقي مرسوم ومسمّى' },
      { label: 'الواجهة (Next.js)', note: 'لوحات حسب الدور، RTL أولاً' },
      { label: 'API (NestJS)', note: 'عقود، حراس، تدقيق' },
      { label: 'طبقة النطاق', note: 'قواعد العمل في TypeScript' },
      { label: 'Postgres + Prisma', note: 'مصدر الحقيقة الوحيد' },
      { label: 'محفّزات الأتمتة', note: 'Cron وwebhooks وتكاملات' },
    ],
    features: [
      { title: 'المستخدمون والأدوار', body: 'صلاحيات دقيقة مبنية على هيكل الشركة، مش على أدوار عامّة.' },
      { title: 'سير عمل مالي', body: 'فواتير، مصروفات، اعتمادات، تسويات — مُدَقَّقة في كل خطوة.' },
      { title: 'ذكاء الأعمال', body: 'لوحات لحظية مربوطة بنفس نموذج البيانات — بلا ETL، بلا تباعد.' },
      { title: 'مودولز مخصّصة', body: 'workflows جديدة تُضاف بلا نشر. الـ stack مصمّم للتمدّد.' },
    ],
    results: [
      { value: '١١', label: 'مودول عمليات في الإنتاج' },
      { value: '٨٠٪', label: 'وقت أقل في الشيتات' },
      { value: '٢٤/٧', label: 'توفّر — لا نوافذ صيانة منذ الربع الأول' },
    ],
    techGroups: [
      { group: 'الواجهة', items: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
      { group: 'الخلفية', items: ['NestJS', 'Node.js', 'Zod'] },
      { group: 'البيانات', items: ['PostgreSQL', 'Prisma', 'Redis'] },
      { group: 'البنية', items: ['Docker', 'GitHub Actions', 'Fly.io'] },
    ],
  },
}

const kashMarket: Record<Locale, CaseStudy> = {
  en: {
    meta: { role: 'Systems architect · POS platform', timeline: '2024 — Ongoing', industry: 'Retail · Supermarket' },
    challenge: [
      'The client tried three off-the-shelf POS products and abandoned each — none matched how their counter actually works. A supermarket that also sells telecom top-ups and stationery does not fit a generic POS shape.',
      'The stakes are cashier speed: two extra clicks per sale is a full second lost, and a full second at peak means a queue. The system has to match the counter, not the other way around.',
    ],
    approach: [
      'We shadowed cashiers across three branches, timing every hand movement. The barcode workflow was redesigned so the physical scanner becomes a keyboard shortcut layer — the cashier never leaves the primary input.',
      'Inventory, telecom services, and stationery are surfaced through the same shortcut vocabulary, differentiated only by prefix. The mental model stays one.',
    ],
    architecture: [
      { label: 'Counter workflow',     note: 'Shortcut-first, no mouse required' },
      { label: 'POS UI (Next.js)',     note: 'Local-first, works offline' },
      { label: 'Sync gateway',         note: 'Deltas replicated to central DB' },
      { label: 'Inventory service',    note: 'Multi-branch, per-SKU rules' },
      { label: 'Postgres + Redis',     note: 'Reads hot, writes durable' },
      { label: 'Reports engine',       note: 'Materialized views, hourly refresh' },
    ],
    features: [
      { title: 'Barcode workflow',   body: 'Scanner acts as the keyboard. Every action reachable in ≤ 2 keys.' },
      { title: 'Multi-branch',       body: 'Central inventory with branch-level overrides for pricing and stock.' },
      { title: 'Telecom services',   body: 'Vodafone, Etisalat, Orange top-ups on the same counter surface.' },
      { title: 'Reports',            body: 'End-of-day, end-of-shift, end-of-month — every rollup a materialized view.' },
    ],
    results: [
      { value: '1.4s', label: 'average sale time — down from 3.1s' },
      { value: '3', label: 'branches synchronized in real time' },
      { value: '99.9%', label: 'POS uptime across the year' },
    ],
    techGroups: [
      { group: 'Frontend',   items: ['Next.js', 'React', 'TypeScript'] },
      { group: 'Backend',    items: ['Node.js', 'REST'] },
      { group: 'Data',       items: ['PostgreSQL', 'Redis'] },
      { group: 'Hardware',   items: ['Barcode SDK', 'Thermal printers', 'Cash drawers'] },
    ],
  },
  ar: {
    meta: { role: 'مهندس أنظمة · منصّة POS', timeline: '٢٠٢٤ — مستمر', industry: 'تجزئة · سوبرماركت' },
    challenge: [
      'العميل جرّب ٣ منتجات POS جاهزة وتركهم — مافيش واحد بيطابق شغل الكاشير الفعلي. سوبرماركت بيبيع كمان شحن تليفون وقرطاسية مش هيتنفع مع POS عام.',
      'المطلوب: سرعة كاشير. كبستين زيادة في العملية = ثانية ضائعة، وفي وقت الذروة الثانية دي = طابور. النظام لازم يطابق الكاشير، مش العكس.',
    ],
    approach: [
      'رافقنا الكاشيرز في ٣ فروع، وقسنا كل حركة يد. أعدنا تصميم سير عمل الباركود بحيث السكانر الفيزيائي يبقى طبقة اختصارات — الكاشير مش بيخرج من الـ input الأساسي.',
      'المخزون وخدمات التليفون والقرطاسية كلها بتظهر بنفس مفردات الاختصار، ومختلفة بس بالـ prefix. النموذج الذهني بيفضل واحد.',
    ],
    architecture: [
      { label: 'سير عمل الكاشير', note: 'اختصارات أولاً، بلا ماوس' },
      { label: 'واجهة POS (Next.js)', note: 'محلّية أولاً، شغّالة أوفلاين' },
      { label: 'بوّابة المزامنة', note: 'تحديثات جزئية للـ DB المركزي' },
      { label: 'خدمة المخزون', note: 'متعدّدة الفروع، قواعد لكل SKU' },
      { label: 'Postgres + Redis', note: 'قراءات حارّة، كتابات دائمة' },
      { label: 'محرّك التقارير', note: 'مشاهد مادّية، تحديث ساعي' },
    ],
    features: [
      { title: 'سير عمل الباركود', body: 'السكانر بيتصرّف كـ keyboard. كل عملية في ≤ ٢ ضغطة.' },
      { title: 'متعدّد الفروع', body: 'مخزون مركزي مع تجاوزات فرع للسعر والمخزون.' },
      { title: 'خدمات الاتصالات', body: 'شحن فودافون واتصالات وأورانج على نفس السطح.' },
      { title: 'التقارير', body: 'نهاية اليوم، نهاية الوردية، نهاية الشهر — كل تجميع مشهد مادّي.' },
    ],
    results: [
      { value: '١٫٤ث', label: 'متوسّط زمن العملية — نازل من ٣٫١ث' },
      { value: '٣', label: 'فروع متزامنة لحظياً' },
      { value: '٩٩٫٩٪', label: 'توفّر POS خلال السنة' },
    ],
    techGroups: [
      { group: 'الواجهة', items: ['Next.js', 'React', 'TypeScript'] },
      { group: 'الخلفية', items: ['Node.js', 'REST'] },
      { group: 'البيانات', items: ['PostgreSQL', 'Redis'] },
      { group: 'الأجهزة', items: ['Barcode SDK', 'طابعات حرارية', 'أدراج كاش'] },
    ],
  },
}

// For brevity, projects 3–5 share the same structural shell.
// Real content will come from the Payload CMS in Phase 5.
const generic = <T,>(en: T, ar: T): Record<Locale, T> => ({ en, ar })

const aiAutomation: Record<Locale, CaseStudy> = generic(
  {
    meta: { role: 'Automation architect', timeline: '2024 — Ongoing', industry: 'Cross-industry infrastructure' },
    challenge: [
      'Business teams were experimenting with LLMs as one-off tools, but nothing was wired into the systems that actually run the operation. Every automation lived in someone’s laptop.',
      'We needed a composed layer where AI decisions become durable business events — logged, traceable, and reversible.',
    ],
    approach: [
      'Every AI decision passes through n8n as a named workflow. The LLM is one node among many; the workflow is the contract.',
      'Outputs are written back into the same business systems they came from, so the loop closes and nothing is lost in a chat window.',
    ],
    architecture: [
      { label: 'Business events',    note: 'Triggers from real systems' },
      { label: 'n8n workflows',      note: 'Named, versioned, auditable' },
      { label: 'LLM APIs',           note: 'Model per task, not per app' },
      { label: 'Python helpers',     note: 'Domain-specific pre/post processing' },
      { label: 'Callback into ERP',  note: 'Decisions become records' },
    ],
    features: [
      { title: 'Named workflows',       body: 'Every automation has a URL, an owner, and a log stream.' },
      { title: 'Model-agnostic',        body: 'Swap LLM providers per node without touching business logic.' },
      { title: 'Idempotent by design',  body: 'Retries are safe. Every decision has a stable key.' },
      { title: 'Observable',            body: 'Traces flow into a shared dashboard — no black boxes.' },
    ],
    results: [
      { value: '47', label: 'named workflows in daily rotation' },
      { value: '~62%', label: 'manual triage removed from ops queues' },
      { value: '<2m', label: 'median time from trigger to system record' },
    ],
    techGroups: [
      { group: 'Automation', items: ['n8n', 'Python', 'REST', 'Webhooks'] },
      { group: 'AI',         items: ['LLM APIs', 'Function calling'] },
      { group: 'Infra',      items: ['Docker', 'Redis', 'Observability'] },
    ],
  },
  {
    meta: { role: 'مهندس أتمتة', timeline: '٢٠٢٤ — مستمر', industry: 'بنية تحتية متعدّدة الصناعات' },
    challenge: [
      'فرق الأعمال بتجرّب الـ LLM كأدوات مبعثرة، بس مافيش حاجة موصولة بالأنظمة اللي بتشغّل العمليات فعلاً. كل أتمتة عايشة في لابتوب حد.',
      'المطلوب طبقة مركّبة تحوّل قرارات الـ AI لأحداث أعمال دائمة — مسجّلة، قابلة للتتبّع، وقابلة للتراجع.',
    ],
    approach: [
      'كل قرار AI بيمرّ من n8n كـ workflow مسمّى. الـ LLM node واحد ضمن عدد، والـ workflow هو العقد.',
      'المخرجات بترجع للأنظمة نفسها اللي جت منها، فالحلقة بتقفل ومفيش حاجة تضيع في نافذة دردشة.',
    ],
    architecture: [
      { label: 'أحداث الأعمال', note: 'محفّزات من أنظمة حقيقية' },
      { label: 'workflows n8n', note: 'مسمّاة، مُصدَّرة، قابلة للتدقيق' },
      { label: 'LLM APIs', note: 'موديل لكل مهمّة، مش لكل تطبيق' },
      { label: 'مساعدو Python', note: 'معالجة قبل/بعد حسب النطاق' },
      { label: 'إعادة إلى الـ ERP', note: 'القرارات تصبح سجلّات' },
    ],
    features: [
      { title: 'workflows مسمّاة', body: 'كل أتمتة ليها URL ومسؤول وسجل لحظي.' },
      { title: 'مستقلّة عن الموديل', body: 'تبديل مزوّد الـ LLM لكل عقدة بلا لمس منطق العمل.' },
      { title: 'idempotent بالتصميم', body: 'إعادة المحاولة آمنة. كل قرار له مفتاح ثابت.' },
      { title: 'قابلة للمراقبة', body: 'الآثار بتتدفق للوحة مشتركة — بلا صناديق سوداء.' },
    ],
    results: [
      { value: '٤٧', label: 'workflow مسمّى في دوران يومي' },
      { value: '~٦٢٪', label: 'تصنيف يدوي مُزال من قوائم العمليات' },
      { value: '<٢د', label: 'وسيط الزمن من المحفّز إلى سجل النظام' },
    ],
    techGroups: [
      { group: 'أتمتة', items: ['n8n', 'Python', 'REST', 'Webhooks'] },
      { group: 'AI', items: ['LLM APIs', 'Function calling'] },
      { group: 'بنية', items: ['Docker', 'Redis', 'مراقبة'] },
    ],
  },
)

const almaviva: Record<Locale, CaseStudy> = generic(
  {
    meta: { role: 'Systems / automation architect', timeline: '2023 — Ongoing', industry: 'Private · infrastructure' },
    challenge: [
      'Coordinating many parallel accounts through browser-assisted workflows without stepping on each other, without leaking state between them, and without the whole system falling over when one account misbehaves.',
      'A single-tenant automation script would have taken a week. This is not that. This is infrastructure.',
    ],
    approach: [
      'Each account runs inside its own isolated worker with its own session store, its own fault boundary, and its own dry-run mode. A supervisor coordinates the fleet.',
      'The system logs every decision and can replay any sequence deterministically for testing. Nothing runs against production without passing dry-run first.',
    ],
    architecture: [
      { label: 'Supervisor',        note: 'Fleet coordination, health checks' },
      { label: 'Workers (per acct)', note: 'Session-isolated, sandboxed' },
      { label: 'Browser layer',     note: 'Playwright, headed for stability' },
      { label: 'Queue',             note: 'Redis, exactly-once semantics' },
      { label: 'Observability',     note: 'Structured logs, live dashboard' },
    ],
    features: [
      { title: 'Session isolation',    body: 'Each account owns its cookies, storage, and identity boundary.' },
      { title: 'Fault isolation',      body: 'A crashing worker never affects the fleet. Supervisor restarts it clean.' },
      { title: 'Dry-run architecture', body: 'Every operation runnable in a shadow mode with a diff report.' },
      { title: 'Monitoring',           body: 'Per-account health, queue depth, and error rate — always visible.' },
    ],
    results: [
      { value: '8', label: 'workers healthy in steady state' },
      { value: '0', label: 'cross-account leaks recorded' },
      { value: '~99%', label: 'operations pass dry-run before production' },
    ],
    techGroups: [
      { group: 'Runtime',   items: ['Node.js', 'Playwright'] },
      { group: 'Queue',     items: ['Redis', 'BullMQ'] },
      { group: 'Ops',       items: ['Docker', 'Observability', 'Logging'] },
    ],
  },
  {
    meta: { role: 'مهندس أنظمة/أتمتة', timeline: '٢٠٢٣ — مستمر', industry: 'خاص · بنية تحتية' },
    challenge: [
      'تنسيق حسابات متوازية عبر workflows بمساعدة المتصفح، من دون تعارض، من دون تسرّب حالة بينها، ومن دون انهيار كامل لو حساب اختلّ.',
      'سكربت أتمتة أحادي المستأجر كان هياخد أسبوع. ده مش ده. ده بنية تحتية.',
    ],
    approach: [
      'كل حساب بيشتغل داخل worker معزول بذاكرة جلسة خاصّة وحدود عطل خاصّة ووضع dry-run خاصّ. supervisor بينسّق الأسطول.',
      'النظام بيسجّل كل قرار ويقدر يعيد أي تسلسل حتمياً للاختبار. مافيش حاجة بتشتغل على الإنتاج قبل ما تعدّي dry-run.',
    ],
    architecture: [
      { label: 'Supervisor', note: 'تنسيق الأسطول وفحوصات الصحّة' },
      { label: 'Workers (لكل حساب)', note: 'معزولة جلسةً ومحاطة sandbox' },
      { label: 'طبقة المتصفح', note: 'Playwright، متصفّح مرئي للاستقرار' },
      { label: 'الطابور', note: 'Redis بدلالات exactly-once' },
      { label: 'قابلية المراقبة', note: 'سجلات مهيكلة، لوحة لحظية' },
    ],
    features: [
      { title: 'عزل الجلسات', body: 'كل حساب يملك كوكيز وتخزين وهوية خاصّة.' },
      { title: 'عزل الأعطال', body: 'انهيار worker لا يمسّ الأسطول. الـ supervisor يعيده نظيفاً.' },
      { title: 'معمار dry-run', body: 'كل عملية قابلة للتشغيل في وضع ظلّ مع تقرير فرق.' },
      { title: 'مراقبة', body: 'صحّة لكل حساب، عمق الطابور، ومعدّل الأخطاء — دائماً مرئي.' },
    ],
    results: [
      { value: '٨', label: 'عاملين شغّالين في الحالة المستقرّة' },
      { value: '٠', label: 'تسرّبات بين الحسابات مُسجّلة' },
      { value: '~٩٩٪', label: 'عمليات تعدّي dry-run قبل الإنتاج' },
    ],
    techGroups: [
      { group: 'وقت التشغيل', items: ['Node.js', 'Playwright'] },
      { group: 'الطابور', items: ['Redis', 'BullMQ'] },
      { group: 'التشغيل', items: ['Docker', 'مراقبة', 'سجلات'] },
    ],
  },
)

const fasah: Record<Locale, CaseStudy> = generic(
  {
    meta: { role: 'Desktop + backend architect', timeline: '2024 — Ongoing', industry: 'Private · desktop automation' },
    challenge: [
      'A desktop-first automation platform that had to feel like a native tool while carrying a backend that survives disconnects, retries, and multiple concurrent operator sessions.',
      'The hard part was fault isolation across a bridge that spans Electron, a Node.js service, and an operator watching in real time.',
    ],
    approach: [
      'We separated the desktop shell from the automation runtime and let them talk over SSE. Every event has a sequence number; every reconnect resumes from a known position.',
      'Account isolation is enforced at the process level. Testing happens against a mock protocol — production and test run the same code paths.',
    ],
    architecture: [
      { label: 'Electron shell',     note: 'Native surface, native shortcuts' },
      { label: 'Backend bridge',     note: 'SSE stream, sequence-numbered events' },
      { label: 'Supervisors',        note: 'Per-account, per-workflow' },
      { label: 'Account boundary',   note: 'Process isolation, no shared state' },
      { label: 'Test harness',       note: 'Mock protocol, same code paths' },
    ],
    features: [
      { title: 'SSE bridge',        body: 'Reconnect-safe streaming from backend to the shell.' },
      { title: 'Account isolation', body: 'Each operator gets a clean process — no cross-talk possible.' },
      { title: 'Supervisors',       body: 'Restart, backoff, and health per workflow, not per app.' },
      { title: 'Testing',           body: 'Mock protocol means test suites run the actual code.' },
    ],
    results: [
      { value: 'Native', label: 'desktop feel with backend-grade resilience' },
      { value: '0', label: 'cross-account incidents in production' },
      { value: 'Green', label: 'CI on every commit — no flaky retries' },
    ],
    techGroups: [
      { group: 'Desktop',   items: ['Electron', 'Node.js'] },
      { group: 'Bridge',    items: ['SSE', 'Sequence tracking'] },
      { group: 'Data',      items: ['PostgreSQL'] },
      { group: 'Testing',   items: ['Playwright', 'Mock protocol'] },
    ],
  },
  {
    meta: { role: 'مهندس سطح مكتب + خلفية', timeline: '٢٠٢٤ — مستمر', industry: 'خاص · أتمتة سطح مكتب' },
    challenge: [
      'منصّة أتمتة تبدأ من سطح المكتب، لازم تبان أداة أصلية بينما تحمل خلفية بتصمد أمام الانقطاعات وإعادة المحاولات وتعدّد جلسات المشغّل اللحظية.',
      'الصعوبة الحقيقية عزل الأعطال عبر جسر يمتد من Electron إلى Node.js إلى مشغّل يشاهد لحظياً.',
    ],
    approach: [
      'فصلنا shell سطح المكتب عن runtime الأتمتة، وخلّيناهم يتكلّموا عبر SSE. كل حدث له رقم تسلسل، وكل إعادة اتصال تستأنف من نقطة معروفة.',
      'عزل الحساب مفروض على مستوى العملية. الاختبار يجري ضد بروتوكول محاكاة — الإنتاج والاختبار يشغّلون نفس المسارات.',
    ],
    architecture: [
      { label: 'Electron shell', note: 'سطح أصلي، اختصارات أصلية' },
      { label: 'جسر الخلفية', note: 'تدفّق SSE، أحداث مرقّمة' },
      { label: 'Supervisors', note: 'لكل حساب ولكل workflow' },
      { label: 'حدود الحساب', note: 'عزل عملية، بلا حالة مشتركة' },
      { label: 'إطار الاختبار', note: 'بروتوكول محاكاة، نفس المسارات' },
    ],
    features: [
      { title: 'جسر SSE', body: 'تدفّق آمن ضد إعادة الاتصال من الخلفية إلى الـ shell.' },
      { title: 'عزل الحساب', body: 'كل مشغّل يحصل على عملية نظيفة — لا تداخل ممكن.' },
      { title: 'Supervisors', body: 'إعادة تشغيل، backoff، وصحّة لكل workflow، مش لكل تطبيق.' },
      { title: 'الاختبار', body: 'بروتوكول محاكاة يعني اختبارات تشغّل الكود الفعلي.' },
    ],
    results: [
      { value: 'أصلي', label: 'إحساس سطح مكتب بمرونة خلفية' },
      { value: '٠', label: 'حوادث تداخل بين الحسابات في الإنتاج' },
      { value: 'أخضر', label: 'CI في كل commit — بلا إعادات هشّة' },
    ],
    techGroups: [
      { group: 'سطح المكتب', items: ['Electron', 'Node.js'] },
      { group: 'الجسر', items: ['SSE', 'تتبّع التسلسل'] },
      { group: 'البيانات', items: ['PostgreSQL'] },
      { group: 'الاختبار', items: ['Playwright', 'بروتوكول محاكاة'] },
    ],
  },
)

export const caseStudies: CaseStudyMap = {
  'kayan-erp': kayanErp,
  'kash-market': kashMarket,
  'ai-automation': aiAutomation,
  'almaviva': almaviva,
  'fasah': fasah,
}

export function getCaseStudy(slug: string, locale: Locale): CaseStudy | null {
  const entry = caseStudies[slug]
  return entry ? entry[locale] : null
}
