export type Locale = 'en' | 'ar'

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
    // Headline split into 3 parts: pre + italic + post
    // e.g. "I build digital " + "systems" (italic) + "."
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
  langToggle: string
}

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
    cmd: {
      search: 'Search or jump to…',
      version: 'v.2026.01',
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
    cmd: {
      search: 'ابحث أو انتقل إلى…',
      version: 'v.2026.01',
    },
    langToggle: 'EN',
  },
}
