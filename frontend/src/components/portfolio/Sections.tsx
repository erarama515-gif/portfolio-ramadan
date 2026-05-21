'use client'
import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { Service, TerminalLog, TickerMessage, SocialLink } from '@/types'
import { contactApi } from '@/lib/api'

/* ──────────────────────────────────────────────
   ServicesSection — ما الذي أبنيه
   ────────────────────────────────────────────── */
export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="section-tag mb-4">◆ الخدمات</div>
        <h2 className="text-4xl md:text-6xl font-black headline-ar mb-4 letterpress">
          ما الذي <span className="gradient-text">أبنيه</span>
        </h2>
        <p className="text-text-dim max-w-2xl mx-auto text-lg">
          أنظمة تختصر شركات بأكملها · أتمتة تُحرّر الوقت · بنية تحتية رقمية للسلطة
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{s.icon || '◆'}</div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
            <p className="text-text-dim text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   TerminalSection — سجلات النظام الحيّ
   ────────────────────────────────────────────── */
export function TerminalSection({ logs }: { logs: TerminalLog[] }) {
  return (
    <section className="relative py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="section-tag mb-4">◆ المنظومة</div>
        <h2 className="text-4xl md:text-6xl font-black headline-ar mb-4 letterpress">
          النظام يعمل <span className="gradient-text">الآن</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card overflow-hidden"
      >
        {/* Terminal header */}
        <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-gold/15 bg-bg-deeper">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-xs text-gold/70" dir="ltr">◈ enjaz.system — production-monitor</span>
          <span className="w-12" />
        </div>

        {/* Logs */}
        <div className="p-5 md:p-6 font-mono text-xs md:text-sm space-y-1.5 max-h-96 overflow-y-auto">
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex gap-3 items-start"
              dir="ltr"
            >
              <span className="text-gold/50 shrink-0">[{log.timestamp}]</span>
              <span
                className={
                  log.log_type === 'success' ? 'text-green-400' :
                  log.log_type === 'warning' ? 'text-yellow-400' :
                  log.log_type === 'error' ? 'text-red-400' :
                  'text-text-dim'
                }
              >
                ▸ {log.message}
              </span>
            </motion.div>
          ))}
          <div className="flex items-center gap-1 pt-2" dir="ltr">
            <span className="text-gold">$</span>
            <span className="w-2 h-4 bg-gold animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ArchitectureSection — البنية التقنية
   ────────────────────────────────────────────── */
export function ArchitectureSection() {
  const layers = [
    { name: 'طبقة العميل', tech: 'Next.js · React · Tailwind · Framer Motion', color: '#d4af37' },
    { name: 'بوابة الخدمة', tech: 'FastAPI · JWT · Pydantic · WebSockets', color: '#c8a96a' },
    { name: 'طبقة البيانات', tech: 'PostgreSQL · Redis · Prisma · Alembic', color: '#b87333' },
    { name: 'البنية التحتية', tech: 'Docker · Nginx · GitHub Actions · CDN', color: '#8a6d3a' },
  ]

  return (
    <section className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="section-tag mb-4">◆ البنية</div>
        <h2 className="text-4xl md:text-6xl font-black headline-ar mb-4 letterpress">
          كل طبقة <span className="gradient-text">محكَمة</span>
        </h2>
        <p className="text-text-dim max-w-2xl mx-auto text-lg">
          هندسة نظيفة · فصل واضح للمسؤوليات · قابلية توسّع حقيقية
        </p>
      </motion.div>

      <div className="space-y-3 max-w-4xl mx-auto">
        {layers.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card p-5 md:p-6 flex items-center justify-between gap-4 group hover:border-gold/50 transition-colors"
            style={{ borderRightWidth: '3px', borderRightColor: l.color }}
          >
            <div>
              <h4 className="font-bold text-lg group-hover:text-gold transition-colors">{l.name}</h4>
              <p className="text-text-dim text-sm font-mono mt-1" dir="ltr">{l.tech}</p>
            </div>
            <div
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-black shrink-0"
              style={{ borderColor: l.color, color: l.color }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   TickerBar — شريط متحرك
   ────────────────────────────────────────────── */
export function TickerBar({ messages }: { messages: TickerMessage[] }) {
  if (!messages.length) return null
  const items = [...messages, ...messages, ...messages]

  return (
    <div className="relative py-6 border-y border-gold/20 bg-bg-deeper overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap animate-ticker">
        {items.map((m, i) => (
          <span key={`${m.id}-${i}`} className="text-gold/80 font-mono text-sm flex items-center gap-3">
            <span className="text-gold">◆</span>
            {m.text}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ContactSection — تواصل + روابط اجتماعية
   ────────────────────────────────────────────── */
export function ContactSection({ social }: { social: SocialLink[] }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('من فضلك املأ الحقول الأساسية')
      return
    }
    setLoading(true)
    try {
      await contactApi.submit(form)
      toast.success('وصلتني رسالتك — سأعود إليك خلال 24 ساعة')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error('تعذّر الإرسال — جرّب البريد المباشر')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="section-tag mb-4">◆ تواصل</div>
        <h2 className="text-4xl md:text-6xl font-black headline-ar mb-4 letterpress">
          لنبني <span className="gradient-text">شيئاً عظيماً</span>
        </h2>
        <p className="text-text-dim max-w-xl mx-auto text-lg">
          مشروع جديد؟ نظام يحتاج إعادة هندسة؟ استشارة؟ — أنا هنا
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        onSubmit={handleSubmit}
        className="glass-card p-6 md:p-10 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono text-gold/70 mb-2">// الاسم</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="اسمك الكامل"
              className="w-full bg-bg-deep border border-gold/20 rounded-md px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition text-text placeholder:text-text-faint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gold/70 mb-2">// البريد الإلكتروني</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              dir="ltr"
              className="w-full bg-bg-deep border border-gold/20 rounded-md px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition text-text placeholder:text-text-faint"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-gold/70 mb-2">// الموضوع</label>
          <input
            type="text"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            placeholder="موضوع المشروع"
            className="w-full bg-bg-deep border border-gold/20 rounded-md px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition text-text placeholder:text-text-faint"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gold/70 mb-2">// الرسالة</label>
          <textarea
            rows={5}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="أخبرني عن مشروعك..."
            className="w-full bg-bg-deep border border-gold/20 rounded-md px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition text-text placeholder:text-text-faint resize-none"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري الإرسال...' : 'أرسل الرسالة →'}
          </button>

          {social.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-text-faint text-xs font-mono">// أو عبر:</span>
              {social.map(s => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-md border border-gold/20 flex items-center justify-center text-gold/70 hover:border-gold hover:text-gold hover:bg-gold/5 transition"
                  aria-label={s.platform}
                >
                  <span className="text-base">{s.icon || '◈'}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.form>
    </section>
  )
}
