'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { portfolioApi } from '@/lib/api'
import type { PortfolioData } from '@/types'

import Navbar from '@/components/portfolio/Navbar'
import Hero from '@/components/portfolio/Hero'
import ProfileSection from '@/components/portfolio/ProfileSection'
import ProjectsSection from '@/components/portfolio/ProjectsSection'
import BookSection from '@/components/portfolio/BookSection'
import {
  ServicesSection,
  TerminalSection,
  ArchitectureSection,
  TickerBar,
  ContactSection,
} from '@/components/portfolio/Sections'
import NeuralCanvas from '@/components/portfolio/NeuralCanvas'

/* ──────────────────────────────────────────────
   Arabic fallback data (mirrors backend seed)
   Renders when backend is unreachable so the
   landing page always looks complete.
   ────────────────────────────────────────────── */
const FALLBACK: PortfolioData = {
  profile: {
    id: 1,
    name: 'إسلام رمضان',
    title: 'مؤسس إنجاز · مهندس أنظمة الأعمال',
    bio: 'أبني أنظمة آلية تُحرّر الشركات من العمل اليدوي وتُضاعف إيراداتها. مهتم بدراسة اقتصاد الانتباه وكيف يُعيد تشكيلنا.',
    location: 'القاهرة · مصر',
    experience: '٦+ سنوات',
    focus: 'أتمتة · تحليل · سُلطة المعرفة',
    email: 'islam@enjaz.studio',
    avatar_url: '',
    cv_url: '',
  },
  hero: {
    id: 1,
    headline: 'من الفوضى إلى السيطرة',
    subheadline: 'أبني أنظمة',
    typing_words: ['تعمل وحدها', 'تتحرّر من البشر', 'تُضاعف الأرباح', 'تُعيد لك الوقت'],
    description: 'مؤسس إنجاز · مهندس أنظمة أعمال آلية · باحث في اقتصاد الانتباه. النظام الذي تبنيه اليوم يحرّرك غداً.',
    cta_primary_text: 'استكشف الأعمال',
    cta_primary_link: '#work',
    cta_secondary_text: 'تواصل معي',
    cta_secondary_link: '#contact',
    status_text: 'متاح لمشروع واحد هذا الشهر',
  },
  projects: [
    { id: 1, title: 'إنجاز · مكتب الخدمات الإلكترونية', description: 'منصة موحَّدة تُقدّم عشرات الخدمات الحكومية والإلكترونية للأفراد والشركات تحت سقف واحد.', full_description: 'نظام كامل لإدارة الطلبات، الدفع الإلكتروني، تتبّع الحالة، وإصدار الوثائق آلياً مع لوحة تحكّم تنفيذية.', tags: 'Next.js,FastAPI,PostgreSQL,Redis,Stripe', metrics: { 'عميل': '+٢٠٠٠', 'خدمة': '+٤٥', 'رضا': '٩٨٪' }, image_url: '', live_url: '#', repo_url: '', status: 'live', featured: true, order_index: 1 },
    { id: 2, title: 'نظام أتمتة سير العمل', description: 'محرّك Workflow مرئي يربط الأنظمة الداخلية ويُؤتمت العمليات المتكررة بدون كود.', full_description: 'محرّك قابل للتمدّد بمئات الـ Triggers و Actions، يدعم Webhooks و Scheduled Jobs و Conditional Logic.', tags: 'Python,Celery,Redis,React Flow', metrics: { 'ساعة وُفِّرت': '+١٢٠٠', 'عملية': '+٦٠', 'دقة': '٩٩٫٢٪' }, image_url: '', live_url: '#', repo_url: '', status: 'live', featured: true, order_index: 2 },
    { id: 3, title: 'نظام تحليل العملاء CRM', description: 'CRM ذكي يُحلّل سلوك العملاء، يصنّفهم تلقائياً، ويقترح الخطوة القادمة لكل عميل.', full_description: 'تكامل مع WhatsApp Business، Email، وSMS. تقارير ذكية تُكشف الأنماط الخفية في سلوك الشراء.', tags: 'FastAPI,PostgreSQL,Pandas,WhatsApp API', metrics: { 'عميل مُحلَّل': '+١٥ ألف', 'تحويل': '+٣٨٪', 'ROI': '٤٫٢×' }, image_url: '', live_url: '#', repo_url: '', status: 'live', featured: false, order_index: 3 },
    { id: 4, title: 'لوحة تحكّم تنفيذية', description: 'Dashboard لحظي يجمع KPIs من كل الأقسام في شاشة واحدة لصانع القرار.', full_description: 'تجميع بيانات من ١٢+ مصدر، تنبيهات ذكية، تنبّؤات قائمة على ML.', tags: 'Next.js,D3.js,FastAPI,TimescaleDB', metrics: { 'مصدر': '+١٢', 'تأخير': '<٢ث', 'مستخدم': '+٥٠' }, image_url: '', live_url: '#', repo_url: '', status: 'live', featured: false, order_index: 4 },
  ],
  skills: [
    { id: 1, name: 'تحليل الأنظمة', percentage: 96, category: 'core', order_index: 1 },
    { id: 2, name: 'أتمتة الأعمال', percentage: 95, category: 'core', order_index: 2 },
    { id: 3, name: 'هندسة العمليات', percentage: 92, category: 'core', order_index: 3 },
    { id: 4, name: 'تطوير Full-Stack', percentage: 90, category: 'core', order_index: 4 },
    { id: 5, name: 'الكتابة التحليلية', percentage: 88, category: 'core', order_index: 5 },
    { id: 6, name: 'اقتصاد الانتباه', percentage: 93, category: 'research', order_index: 6 },
  ],
  tech: [
    { id: 1, name: 'Python', color: '#d4af37', icon: '', category: 'backend', order_index: 1 },
    { id: 2, name: 'FastAPI', color: '#c8a96a', icon: '', category: 'backend', order_index: 2 },
    { id: 3, name: 'Next.js', color: '#d4af37', icon: '', category: 'frontend', order_index: 3 },
    { id: 4, name: 'React', color: '#c8a96a', icon: '', category: 'frontend', order_index: 4 },
    { id: 5, name: 'PostgreSQL', color: '#a88a4e', icon: '', category: 'database', order_index: 5 },
    { id: 6, name: 'Redis', color: '#b87333', icon: '', category: 'database', order_index: 6 },
    { id: 7, name: 'Docker', color: '#d4af37', icon: '', category: 'devops', order_index: 7 },
    { id: 8, name: 'TypeScript', color: '#c8a96a', icon: '', category: 'frontend', order_index: 8 },
  ],
  services: [
    { id: 1, title: 'بناء أنظمة الأعمال', description: 'منصات داخلية مخصّصة تختصر العمل اليدوي وتوحّد عمليات الشركة.', icon: '◆', order_index: 1 },
    { id: 2, title: 'أتمتة العمليات', description: 'أتمتة العمليات المتكررة عبر سير عمل ذكي يربط أنظمتك القائمة.', icon: '◈', order_index: 2 },
    { id: 3, title: 'تحليل الأنظمة', description: 'دراسة عميقة لعملياتك، كشف نقاط الاختناق، وإعادة هندستها للنمو.', icon: '◇', order_index: 3 },
    { id: 4, title: 'استشارات استراتيجية', description: 'مرافقة في رحلة التحوّل الرقمي من القرار حتى التشغيل الكامل.', icon: '◉', order_index: 4 },
  ],
  timeline: [
    { id: 1, year: '٢٠٢٤ — الآن', title: 'تأليف "عصر الاتصال المفرط"', company: 'بحث مستقل', description: 'كتاب يفكّك صناعة سرقة الانتباه وأثرها على العقل والإرادة.', order_index: 1 },
    { id: 2, year: '٢٠٢٢', title: 'تأسيس إنجاز', company: 'مكتب الخدمات الإلكترونية', description: 'بناء منصة موحّدة تخدم آلاف العملاء بأنظمة آلية بالكامل.', order_index: 2 },
    { id: 3, year: '٢٠٢٠', title: 'مهندس أتمتة أعمال', company: 'مستقل · عميل تنفيذي', description: 'بناء أنظمة CRM وأتمتة لعملاء في مصر والخليج.', order_index: 3 },
    { id: 4, year: '٢٠١٩', title: 'بداية الرحلة', company: 'تطوير مستقل', description: 'الانتقال من التطوير التقليدي إلى هندسة أنظمة الأعمال.', order_index: 4 },
  ],
  terminal_logs: [
    { id: 1, timestamp: '00:00:01', log_type: 'info', message: 'enjaz.system → booting production cluster', order_index: 1 },
    { id: 2, timestamp: '00:00:02', log_type: 'success', message: 'database pool ready (24 connections)', order_index: 2 },
    { id: 3, timestamp: '00:00:03', log_type: 'success', message: 'workflow engine: 47 active automations', order_index: 3 },
    { id: 4, timestamp: '00:00:05', log_type: 'info', message: 'CRM sync → 15,234 customers indexed', order_index: 4 },
    { id: 5, timestamp: '00:00:07', log_type: 'success', message: 'all services healthy · uptime 99.97%', order_index: 5 },
    { id: 6, timestamp: '00:00:09', log_type: 'info', message: 'awaiting next directive...', order_index: 6 },
  ],
  ticker_messages: [
    { id: 1, text: 'متاح لمشروع واحد فقط هذا الشهر', order_index: 1 },
    { id: 2, text: 'كتاب "عصر الاتصال المفرط" — قريباً ٢٠٢٦', order_index: 2 },
    { id: 3, text: 'إنجاز يخدم +٢٠٠٠ عميل', order_index: 3 },
    { id: 4, text: 'استشارات الأتمتة مفتوحة', order_index: 4 },
  ],
  social: [
    { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com/in/islamramadan', icon: 'in', order_index: 1 },
    { id: 2, platform: 'X', url: 'https://x.com/islamramadan', icon: 'X', order_index: 2 },
    { id: 3, platform: 'Email', url: 'mailto:islam@enjaz.studio', icon: '@', order_index: 3 },
    { id: 4, platform: 'WhatsApp', url: 'https://wa.me/201000000000', icon: 'W', order_index: 4 },
  ],
  seo: {
    id: 1,
    site_title: 'إسلام رمضان · إنجاز',
    site_description: 'مؤسس إنجاز · مهندس أنظمة أعمال · مؤلف كتاب عصر الاتصال المفرط',
    keywords: 'إسلام رمضان, إنجاز, أتمتة الأعمال, تحليل الأنظمة, عصر الاتصال المفرط',
    og_image: '',
    favicon: '',
  },
  settings: {
    id: 1,
    show_terminal: true,
    show_architecture: true,
    show_ticker: true,
    show_book: true,
    primary_color: '#d4af37',
    accent_color: '#c8a96a',
  },
  book: {
    id: 1,
    title: 'عصر الاتصال المفرط',
    subtitle: 'كيف سرقت الشاشاتُ انتباهك وأعادت كتابة دماغك',
    tagline: 'ليست مشكلتك أنك مشتّت. المشكلة أن النظام صُمّم لتشتيتك.',
    description: 'كتاب يُفكّك أكثر صناعة ربحاً في التاريخ: صناعة سرقة الانتباه. من خوارزميات الإدمان، إلى انهيار التركيز، إلى ظاهرة "تعفّن الدماغ"، إلى الحرب الصامتة على إرادتك. ليس كتاباً ضدّ التكنولوجيا — بل خريطة للنجاة منها واستعادة عقلك.',
    cover_url: '',
    status: 'coming_soon',
    release_date: '2026',
    preorder_url: '',
    chapters: [
      { number: 1, title: 'الانتباه عملةُ القرن' },
      { number: 2, title: 'خوارزميات الإدمان' },
      { number: 3, title: 'تعفّن الدماغ' },
      { number: 4, title: 'انهيار التركيز العميق' },
      { number: 5, title: 'البساطة الرقمية كمقاومة' },
      { number: 6, title: 'استعادة العقل' },
    ],
    quotes: [
      { text: 'لم تعد أنت من تختار ما تراه. الخوارزمية تختار لك، ثم تُقنعك أنك اخترت.', chapter: 'الفصل الثاني' },
      { text: 'الإدمان لم يعد جانبياً للمنتج. الإدمان هو المنتج.', chapter: 'الفصل الثالث' },
      { text: 'كل دقيقة من انتباهك تُباع. السؤال: هل تعرف بكم؟', chapter: 'الفصل الأول' },
    ],
  },
}

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    portfolioApi.getAll()
      .then(d => setData(d))
      .catch(() => setData(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-gold/60 text-sm">جاري تحميل المنظومة...</p>
        </div>
      </div>
    )
  }

  const d = data || FALLBACK
  const { profile, hero, projects, skills, tech, services, timeline, terminal_logs, ticker_messages, social, settings, book } = d

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <NeuralCanvas />

      <Navbar showBook={settings?.show_book ?? true} />

      <Hero hero={hero} />

      <ProfileSection profile={profile} tech={tech} skills={skills} timeline={timeline} />

      <ProjectsSection projects={projects} />

      {settings?.show_book && book && <BookSection book={book} />}

      <ServicesSection services={services} />

      {settings?.show_ticker && <TickerBar messages={ticker_messages} />}

      {settings?.show_terminal && <TerminalSection logs={terminal_logs} />}

      {settings?.show_architecture && <ArchitectureSection />}

      <ContactSection social={social} />

      {/* Footer */}
      <footer className="relative border-t border-gold/15 py-12 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-text-faint text-sm font-mono">
            © {new Date().getFullYear()} · إنجاز · إسلام رمضان · جميع الحقوق محفوظة
          </div>
          <div className="flex items-center gap-3 text-xs text-text-faint font-mono">
            <span>صُنع بـ</span>
            <span className="text-gold">◆</span>
            <span>Next.js · FastAPI</span>
          </div>
        </div>
      </footer>

      {/* Admin floating button */}
      <Link
        href="/admin/login"
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-bg-card border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold transition-all backdrop-blur-md"
        title="لوحة التحكم"
      >
        <span className="text-lg">⚙</span>
      </Link>
    </main>
  )
}
