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
    volume: string        // "Portfolio · Vol. 01"
    place: string         // "Cairo · Egypt"
    firstName: string
    lastName: string
    manifesto: string     // The italic pull-quote
    manifestoCite: string // e.g. "— Practice statement"
    indexHeading: string  // "Contents"
    indexItems: {
      label: string
      href: string
      num: string
    }[]
    stampLeft: string     // "Web · ERP · SaaS · AI · Automation"
    stampRight: string    // "Est. MMXVIII"
  }
  meta: {
    year: string          // 'MMXXVI'
  }
  langToggle: string
}

const indexItemsEN = [
  { num: '01', label: 'Selected Works', href: '#work' },
  { num: '02', label: 'How I Think About Systems', href: '#systems' },
  { num: '03', label: 'Process', href: '#process' },
  { num: '04', label: 'Contact', href: '#contact' },
]

const indexItemsAR = [
  { num: '٠١', label: 'الأعمال المختارة', href: '#work' },
  { num: '٠٢', label: 'كيف أفكّر في الأنظمة', href: '#systems' },
  { num: '٠٣', label: 'المنهجية', href: '#process' },
  { num: '٠٤', label: 'تواصل', href: '#contact' },
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
      volume: 'Portfolio · Vol. 01',
      place: 'Cairo · Egypt',
      firstName: 'Eslam',
      lastName: 'Ramadan',
      manifesto:
        '“I don’t just build software. I build systems around businesses.”',
      manifestoCite: 'A practice in digital business architecture.',
      indexHeading: 'Contents',
      indexItems: indexItemsEN,
      stampLeft: 'Web · ERP · SaaS · AI · Automation',
      stampRight: 'Est. MMXVIII',
    },
    meta: { year: 'MMXXVI' },
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
      volume: 'ملف الأعمال · المجلد الأول',
      place: 'القاهرة · مصر',
      firstName: 'إسلام',
      lastName: 'رمضان',
      manifesto:
        '«أنا لا أكتب برمجيات فقط. أنا أبني أنظمة حول الأعمال.»',
      manifestoCite: 'مقاربة في هندسة الأعمال الرقمية.',
      indexHeading: 'المحتويات',
      indexItems: indexItemsAR,
      stampLeft: 'Web · ERP · SaaS · AI · Automation',
      stampRight: 'تأسّست ٢٠١٨',
    },
    meta: { year: 'MMXXVI' },
    langToggle: 'EN',
  },
}
