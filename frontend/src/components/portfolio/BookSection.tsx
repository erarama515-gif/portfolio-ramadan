'use client'
import { motion } from 'framer-motion'
import type { Book } from '@/types'
import { getImageUrl } from '@/lib/api'

interface BookSectionProps {
  book: Book
}

export default function BookSection({ book }: BookSectionProps) {
  const chapters = book.chapters || []
  const quotes = book.quotes || []

  return (
    <section id="book" className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="section-tag mb-4">◆ الكتاب</div>
        <h2 className="text-4xl md:text-6xl font-black headline-ar mb-4 letterpress">
          عمل <span className="gradient-text">قيد الإصدار</span>
        </h2>
        <p className="text-text-dim max-w-2xl mx-auto text-lg">
          سنوات من البحث في أكثر صناعة ربحاً في التاريخ: صناعة سرقة انتباهك
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 flex justify-center"
        >
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 via-gold-bright/20 to-accent-warm/20 blur-3xl rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

            {/* Cover Card */}
            <div className="relative w-72 md:w-80 aspect-[2/3] rounded-md overflow-hidden border-2 border-gold/40 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.4)] transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
              {book.cover_url ? (
                <img src={getImageUrl(book.cover_url)} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-bg-deeper via-bg-card to-bg-deep p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-gold/60 font-mono text-xs mb-2 tracking-widest">ISLAM RAMADAN</div>
                    <div className="w-12 h-0.5 bg-gold/40" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-text leading-tight mb-3 gold-shimmer">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="text-gold/80 text-sm leading-relaxed">{book.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="w-10 h-10 rounded-full border-2 border-gold/40 flex items-center justify-center">
                      <span className="text-gold text-lg">◆</span>
                    </div>
                    <div className="text-text-faint font-mono text-[10px]">2026</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-3 space-y-6"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1.5 rounded-md bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
              {book.status === 'published' ? '◈ صدر' : book.status === 'preorder' ? '◈ متاح للحجز' : '◈ قريباً 2026'}
            </span>
            <span className="text-text-faint text-xs font-mono">/ كتاب · بحث · ٣٢٠ صفحة</span>
          </div>

          <h3 className="text-3xl md:text-5xl font-black headline-ar leading-tight gold-shimmer">
            {book.title}
          </h3>

          {book.subtitle && (
            <p className="text-xl md:text-2xl text-gold/90 leading-relaxed font-light">
              {book.subtitle}
            </p>
          )}

          {book.tagline && (
            <p className="text-lg md:text-xl text-text italic leading-relaxed border-r-2 border-gold/40 pr-4">
              «{book.tagline}»
            </p>
          )}

          {book.description && (
            <p className="text-text-dim leading-loose">
              {book.description}
            </p>
          )}

          {chapters.length > 0 && (
            <div className="pt-4">
              <h4 className="font-mono text-gold text-sm mb-4">// الفصول</h4>
              <div className="space-y-2.5">
                {chapters.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-gold/60 font-mono text-xs mt-1 shrink-0">
                      ◆ {String(c.number).padStart(2, '0')}
                    </span>
                    <span className="text-text group-hover:text-gold transition-colors">{c.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {book.preorder_url && (
            <div className="pt-4">
              <a
                href={book.preorder_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-block"
              >
                {book.status === 'preorder' ? 'احجز نسختك' : 'سجّل لتنبيهات الإصدار'} →
              </a>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quotes */}
      {quotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid md:grid-cols-3 gap-6"
        >
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 relative"
            >
              <span className="absolute top-3 right-4 text-5xl text-gold/20 font-serif leading-none">❝</span>
              <p className="text-text leading-relaxed relative z-10 pr-6">
                {q.text}
              </p>
              {q.chapter && (
                <footer className="text-gold/60 text-xs font-mono mt-4 pt-3 border-t border-gold/10">
                  ─ {q.chapter}
                </footer>
              )}
            </motion.blockquote>
          ))}
        </motion.div>
      )}
    </section>
  )
}
