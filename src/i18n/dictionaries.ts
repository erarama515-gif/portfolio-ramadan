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
    eyebrow: string
    firstName: string
    lastName: string
    subline: string
    viewWork: string
    startProject: string
    meta: string
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
      start: 'Start a Project',
    },
    hero: {
      eyebrow: 'Digital Business Architect',
      firstName: 'Eslam',
      lastName: 'Ramadan.',
      subline:
        'I build digital products, business systems and intelligent automations.',
      viewWork: 'View My Work',
      startProject: 'Start a Project',
      meta: '300+ Projects  ·  6+ Years Experience  ·  Web · ERP · SaaS · AI',
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
      eyebrow: 'مهندس أنظمة رقمية للأعمال',
      firstName: 'إسلام',
      lastName: 'رمضان.',
      subline: 'أبني منتجات رقمية، وأنظمة أعمال، وأتمتة ذكية.',
      viewWork: 'اعرض الأعمال',
      startProject: 'ابدأ مشروع',
      meta: '‎+٣٠٠ مشروع  ·  ‎+٦ سنوات خبرة  ·  Web · ERP · SaaS · AI',
    },
    langToggle: 'EN',
  },
}
