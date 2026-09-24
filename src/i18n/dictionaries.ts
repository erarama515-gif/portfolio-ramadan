export type Locale = 'en' | 'ar'

export type ProjectStatus = 'LIVE' | 'PRIVATE' | 'INFRASTRUCTURE'

export interface Project {
  slug: string
  index: string
  title: string
  subtitle: string
  blurb: string
  tags: string[]
  status: ProjectStatus
}

export interface Domain {
  index: string
  title: string
  body: string
}

export interface Dict {
  nav: {
    work: string
    systems: string
    process: string
    about: string
    contact: string
    start: string
  }
  hero: {
    tag: string
    headPre: string
    headItalic: string
    headPost: string
    subline: string
    ctaWork: string
    ctaContact: string
    metaLine: string
  }
  panel: {
    title: string
    liveLabel: string
    metrics: { label: string; value: string; sub: string }[]
    logsLabel: string
    logs: string[]
  }
  cmd: {
    search: string
    version: string
  }
  build: {
    eyebrow: string
    figure: string
    titlePre: string
    titleItalic: string
    titlePost: string
    kicker: string
    domains: Domain[]
  }
  work: {
    eyebrow: string
    figure: string
    titlePre: string
    titleItalic: string
    titlePost: string
    kicker: string
    readCta: string
    projects: Project[]
  }
  langToggle: string
}

const projectsEN: Project[] = [
  {
    slug: 'kayan-erp',
    index: '01',
    title: 'Kayan ERP',
    subtitle: 'Custom Enterprise Management Platform',
    blurb:
      'A bespoke ERP shaped by how the business actually operates — users, roles, financial workflows, business intelligence, and custom modules built around real operations, not a template.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'TypeScript'],
    status: 'LIVE',
  },
  {
    slug: 'kash-market',
    index: '02',
    title: 'Kash Market',
    subtitle: 'Supermarket Management & POS',
    blurb:
      'Built around real supermarket workflows rather than a generic POS template. Inventory, telecom services, stationery, reports, and a barcode workflow that matches how the counter actually operates.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Barcode SDK'],
    status: 'LIVE',
  },
  {
    slug: 'ai-automation',
    index: '03',
    title: 'AI-Powered Automation',
    subtitle: 'From Manual Ops to Autonomous Workflows',
    blurb:
      'A composed automation layer: Python → LLM → n8n → APIs → Business Systems. Not a slogan — a case study on wiring intelligence into daily operations.',
    tags: ['Python', 'n8n', 'LLM APIs', 'REST', 'Webhooks'],
    status: 'INFRASTRUCTURE',
  },
  {
    slug: 'almaviva',
    index: '04',
    title: 'Almaviva',
    subtitle: 'Multi-account Automation Architecture',
    blurb:
      'Multi-account architecture with session management, fault isolation, browser-assisted workflows, monitoring, and a dry-run architecture — infrastructure engineering, not a bot.',
    tags: ['Node.js', 'Playwright', 'Redis', 'Queue', 'Observability'],
    status: 'PRIVATE',
  },
  {
    slug: 'fasah',
    index: '05',
    title: 'Fasah',
    subtitle: 'Desktop Automation Platform',
    blurb:
      'Desktop architecture with a backend bridge, account isolation, supervisors, SSE, testing, and fault isolation. Architecture-grade automation, not scripts.',
    tags: ['Electron', 'Node.js', 'SSE', 'PostgreSQL', 'Playwright'],
    status: 'PRIVATE',
  },
]

const projectsAR: Project[] = [
  {
    slug: 'kayan-erp',
    index: '٠١',
    title: 'كيان ERP',
    subtitle: 'منصّة إدارة أعمال مخصّصة',
    blurb:
      'نظام ERP مصمّم على طريقة عمل الشركة الحقيقية — مستخدمين، أدوار، سير عمل مالي، ذكاء أعمال، ومودولز مخصّصة حول العمليات الفعلية، مش قالب جاهز.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'TypeScript'],
    status: 'LIVE',
  },
  {
    slug: 'kash-market',
    index: '٠٢',
    title: 'كاش ماركت',
    subtitle: 'إدارة سوبرماركت ونقاط بيع',
    blurb:
      'مبني حول سير عمل السوبرماركت الحقيقي، مش قالب POS عام. مخزون، خدمات اتصالات، قرطاسية، تقارير، وسير عمل باركود يطابق شغل الكاشير الفعلي.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Barcode SDK'],
    status: 'LIVE',
  },
  {
    slug: 'ai-automation',
    index: '٠٣',
    title: 'أتمتة مدعومة بـ AI',
    subtitle: 'من العمليات اليدوية لسير عمل ذاتي',
    blurb:
      'طبقة أتمتة مركّبة: Python → LLM → n8n → APIs → Business Systems. مش شعار — دراسة حالة لربط الذكاء بالعمليات اليومية.',
    tags: ['Python', 'n8n', 'LLM APIs', 'REST', 'Webhooks'],
    status: 'INFRASTRUCTURE',
  },
  {
    slug: 'almaviva',
    index: '٠٤',
    title: 'ألمافيفا',
    subtitle: 'معمار أتمتة متعدّد الحسابات',
    blurb:
      'معمارية متعدّدة الحسابات مع إدارة الجلسات، عزل الأعطال، سير عمل مدعوم بالمتصفح، مراقبة، ومعمار dry-run — هندسة بنية تحتية، مش بوت.',
    tags: ['Node.js', 'Playwright', 'Redis', 'Queue', 'Observability'],
    status: 'PRIVATE',
  },
  {
    slug: 'fasah',
    index: '٠٥',
    title: 'فصاح',
    subtitle: 'منصّة أتمتة سطح مكتب',
    blurb:
      'معمارية سطح مكتب مع جسر Backend، عزل الحسابات، supervisors، SSE، اختبارات، وعزل أعطال. أتمتة بمستوى معماري، مش سكربتات.',
    tags: ['Electron', 'Node.js', 'SSE', 'PostgreSQL', 'Playwright'],
    status: 'PRIVATE',
  },
]

const domainsEN: Domain[] = [
  { index: '01', title: 'Digital Systems', body: 'End-to-end platforms that run day-to-day operations.' },
  { index: '02', title: 'ERP Systems', body: 'Custom business management for operations, finance, and roles.' },
  { index: '03', title: 'CRM Platforms', body: 'Customer, sales, and pipeline orchestration built for the workflow.' },
  { index: '04', title: 'POS Systems', body: 'Retail, inventory, branches, barcode, and reports that hold up.' },
  { index: '05', title: 'SaaS Products', body: 'Multi-tenant products designed to scale from day one.' },
  { index: '06', title: 'AI & Automation', body: 'Wiring AI models into real business workflows via APIs and n8n.' },
]

const domainsAR: Domain[] = [
  { index: '٠١', title: 'أنظمة رقمية', body: 'منصّات كاملة تُشغّل العمليات اليومية.' },
  { index: '٠٢', title: 'أنظمة ERP', body: 'إدارة أعمال مخصّصة للعمليات والمالية والأدوار.' },
  { index: '٠٣', title: 'منصّات CRM', body: 'تنسيق العملاء والمبيعات وخط الأنابيب حسب سير العمل.' },
  { index: '٠٤', title: 'أنظمة نقاط بيع', body: 'تجزئة، مخزون، فروع، باركود، وتقارير تصمد.' },
  { index: '٠٥', title: 'منتجات SaaS', body: 'منتجات متعدّدة المستأجرين مصمّمة للتوسّع من اليوم الأول.' },
  { index: '٠٦', title: 'AI وأتمتة', body: 'ربط نماذج AI بسير عمل حقيقي عبر APIs و n8n.' },
]

export const dict: Record<Locale, Dict> = {
  en: {
    nav: {
      work: 'Work',
      systems: 'Systems',
      process: 'Process',
      about: 'About',
      contact: 'Contact',
      start: 'Start a project',
    },
    hero: {
      tag: 'Digital Business Architect',
      headPre: 'I build digital ',
      headItalic: 'systems',
      headPost: '.',
      subline:
        'Business problems, turned into scalable software. ERP, POS, SaaS products and AI-powered automation, built around how the work actually runs.',
      ctaWork: 'View selected work',
      ctaContact: 'Start a project',
      metaLine:
        '300+ projects · 6+ years · Web · ERP · POS · SaaS · AI Automation',
    },
    panel: {
      title: 'eslam.system',
      liveLabel: 'live',
      metrics: [
        { label: 'Projects', value: '300+', sub: 'shipped' },
        { label: 'Systems', value: '12', sub: 'in production' },
        { label: 'Automations', value: '47', sub: 'active' },
        { label: 'Uptime', value: '99.9%', sub: '30d rolling' },
      ],
      logsLabel: 'recent activity',
      logs: [
        '[kayan-erp] · deployed workflow module v2.4',
        '[kash-market] · POS sync — 1,204 orders processed',
        '[almaviva] · 8 workers healthy · queue empty',
        '[fasah] · dry-run passed · ready to ship',
      ],
    },
    cmd: { search: 'Search or jump to…', version: 'v.2026.01' },
    build: {
      eyebrow: 'What I Build',
      figure: 'Fig. 01',
      titlePre: 'Six domains,',
      titleItalic: 'one practice',
      titlePost: '.',
      kicker:
        'Not services. Systems. Every domain below is a system I design, build and operate end-to-end.',
      domains: domainsEN,
    },
    work: {
      eyebrow: 'Selected Work',
      figure: 'Fig. 02',
      titlePre: 'Systems shaped by',
      titleItalic: 'real operations',
      titlePost: '.',
      kicker:
        'Five projects, chosen for the thinking behind them — not the surface polish.',
      readCta: 'Read case study',
      projects: projectsEN,
    },
    langToggle: 'AR',
  },
  ar: {
    nav: {
      work: 'الأعمال',
      systems: 'الأنظمة',
      process: 'المنهجية',
      about: 'من أنا',
      contact: 'تواصل',
      start: 'ابدأ مشروع',
    },
    hero: {
      tag: 'مهندس أنظمة رقمية للأعمال',
      headPre: 'أبني ',
      headItalic: 'أنظمة',
      headPost: ' رقمية.',
      subline:
        'أحوّل مشاكل الأعمال إلى برمجيات قابلة للتوسّع. ERP و POS و منتجات SaaS وأتمتة مدعومة بـ AI — مبنية على طريقة عمل الشركة الحقيقية.',
      ctaWork: 'اعرض الأعمال المختارة',
      ctaContact: 'ابدأ مشروع',
      metaLine:
        '‎+٣٠٠ مشروع · ‎+٦ سنوات · Web · ERP · POS · SaaS · AI Automation',
    },
    panel: {
      title: 'eslam.system',
      liveLabel: 'مباشر',
      metrics: [
        { label: 'مشروع', value: '‎+٣٠٠', sub: 'شُحن' },
        { label: 'نظام', value: '١٢', sub: 'قيد التشغيل' },
        { label: 'أتمتة', value: '٤٧', sub: 'نشط' },
        { label: 'التوفر', value: '٩٩٫٩٪', sub: 'آخر ٣٠ يوم' },
      ],
      logsLabel: 'النشاط الأخير',
      logs: [
        '[kayan-erp] · تم نشر مودول سير العمل v٢٫٤',
        '[kash-market] · مزامنة نقاط البيع — ١٢٠٤ طلب',
        '[almaviva] · ٨ عاملين شغّالين · القائمة فاضية',
        '[fasah] · اختبار تجريبي ناجح · جاهز للشحن',
      ],
    },
    cmd: { search: 'ابحث أو انتقل إلى…', version: 'v.2026.01' },
    build: {
      eyebrow: 'ما الذي أبنيه',
      figure: 'شكل ٠١',
      titlePre: 'ستّة مجالات،',
      titleItalic: 'ممارسة واحدة',
      titlePost: '.',
      kicker:
        'مش خدمات. أنظمة. كل مجال في الأسفل نظام كامل بأصمّمه، ببنيه، وأشغّله.',
      domains: domainsAR,
    },
    work: {
      eyebrow: 'الأعمال المختارة',
      figure: 'شكل ٠٢',
      titlePre: 'أنظمة تشكّلت من',
      titleItalic: 'عمليات حقيقية',
      titlePost: '.',
      kicker:
        'خمسة مشاريع، اختيرت بسبب الفكر ورائها — مش لمعان السطح.',
      readCta: 'اقرأ دراسة الحالة',
      projects: projectsAR,
    },
    langToggle: 'EN',
  },
}
