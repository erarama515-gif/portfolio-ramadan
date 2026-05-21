'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import { getImageUrl } from '@/lib/api'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const live = projects.filter(p => p.status === 'live')

  return (
    <section id="work" className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="section-tag mb-4">◆ الأعمال</div>
        <h2 className="text-4xl md:text-6xl font-black headline-ar mb-4 letterpress">
          مشاريع <span className="gradient-text">مختارة</span>
        </h2>
        <p className="text-text-dim max-w-2xl mx-auto text-lg">
          أنظمة حقيقية تعمل في إنتاج · تُولّد إيرادات · تُحرّر الوقت
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {live.map((p, i) => {
          const isOpen = expanded === p.id
          const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean)

          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-card group overflow-hidden cursor-pointer relative"
              onClick={() => setExpanded(isOpen ? null : p.id)}
            >
              {/* Image */}
              {p.image_url && (
                <div className="relative h-52 overflow-hidden border-b border-gold/10">
                  <img
                    src={getImageUrl(p.image_url)}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  {p.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-gold/20 border border-gold/40 backdrop-blur text-gold text-xs font-bold">
                      ★ مميّز
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">{p.title}</h3>
                  <span className="font-mono text-xs text-gold/60 shrink-0 mt-1">/{i + 1 < 10 ? `0${i+1}` : i+1}</span>
                </div>
                <p className="text-text-dim text-sm leading-relaxed mb-4">{p.description}</p>

                {/* Metrics */}
                {p.metrics && (
                  <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-gold/10">
                    {Object.entries(p.metrics).slice(0, 3).map(([k, v]) => (
                      <div key={k} className="text-center">
                        <div className="gradient-text font-black text-lg">{String(v)}</div>
                        <div className="text-text-faint text-[10px] uppercase tracking-wider mt-1">{k}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.slice(0, 4).map(t => (
                    <span key={t} className="px-2.5 py-1 rounded text-xs bg-bg-deep border border-gold/15 text-gold/80">
                      {t}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {isOpen && p.full_description && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-dim text-sm leading-relaxed pt-4 border-t border-gold/10">
                        {p.full_description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 mt-5">
                  {p.live_url && (
                    <a
                      href={p.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-gold text-xs flex-1 text-center"
                    >
                      عرض مباشر ↗
                    </a>
                  )}
                  {p.repo_url && (
                    <a
                      href={p.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-ghost-gold text-xs flex-1 text-center"
                    >
                      المستودع ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
