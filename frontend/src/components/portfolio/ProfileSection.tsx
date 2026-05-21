'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Profile, TechStack, Skill, TimelineItem } from '@/types'
import { getImageUrl } from '@/lib/api'

interface ProfileSectionProps {
  profile: Profile
  tech: TechStack[]
  skills: Skill[]
  timeline: TimelineItem[]
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1600
        const start = performance.now()
        const tick = (t: number) => {
          const p = Math.min((t - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return (
    <div ref={ref} className="gradient-text text-4xl md:text-5xl font-black tabular-nums">
      {count}{suffix}
    </div>
  )
}

export default function ProfileSection({ profile, tech, skills, timeline }: ProfileSectionProps) {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="section-tag mb-4">◆ من أنا</div>
        <h2 className="text-4xl md:text-6xl font-black headline-ar mb-4 letterpress">
          خلف <span className="gradient-text">المنظومة</span>
        </h2>
        <p className="text-text-dim max-w-2xl mx-auto text-lg">
          مهندس أنظمة أعمال · باحث في اقتصاد الانتباه · مؤسس إنجاز
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-8 text-center"
        >
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold via-gold-bright to-accent-warm animate-spin-slow opacity-80" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-[3px] rounded-full bg-bg-card flex items-center justify-center overflow-hidden">
              {profile.avatar_url ? (
                <img src={getImageUrl(profile.avatar_url)} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl text-gold">◆</span>
              )}
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{profile.name}</h3>
          <p className="text-gold text-sm mb-4">{profile.title}</p>
          <p className="text-text-dim text-sm mb-6 leading-relaxed">{profile.bio}</p>

          <div className="space-y-3 text-sm text-right">
            <div className="flex justify-between border-b border-gold/10 pb-2">
              <span className="text-gold/80">◈ الموقع</span>
              <span className="text-text">{profile.location}</span>
            </div>
            <div className="flex justify-between border-b border-gold/10 pb-2">
              <span className="text-gold/80">◈ الخبرة</span>
              <span className="text-text">{profile.experience}</span>
            </div>
            <div className="flex justify-between border-b border-gold/10 pb-2">
              <span className="text-gold/80">◈ التخصص</span>
              <span className="text-text">{profile.focus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gold/80">◈ البريد</span>
              <a href={`mailto:${profile.email}`} className="text-text hover:text-gold transition-colors text-xs" dir="ltr">{profile.email}</a>
            </div>
          </div>

          {profile.cv_url && (
            <a
              href={getImageUrl(profile.cv_url)}
              download
              className="mt-6 inline-block w-full btn-gold text-sm"
            >
              تحميل السيرة الذاتية ↓
            </a>
          )}
        </motion.div>

        {/* Stats + Tech */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="glass-card p-6 text-center">
              <CountUp target={50} suffix="+" />
              <div className="text-text-dim text-sm mt-2">مشروع منجز</div>
            </div>
            <div className="glass-card p-6 text-center">
              <CountUp target={6} suffix="+" />
              <div className="text-text-dim text-sm mt-2">سنوات خبرة</div>
            </div>
            <div className="glass-card p-6 text-center">
              <CountUp target={tech.length} />
              <div className="text-text-dim text-sm mt-2">تقنية مُتقنة</div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h4 className="font-mono text-gold text-sm mb-6">// المنظومة التقنية</h4>
            <div className="flex flex-wrap gap-3">
              {tech.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="px-4 py-2 rounded-md border border-gold/20 bg-bg-deep hover:border-gold/60 hover:bg-gold/5 transition-all cursor-default"
                  style={{ borderColor: `${t.color}33` }}
                >
                  <span className="text-sm font-medium" style={{ color: t.color }}>{t.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card p-8"
          >
            <h4 className="font-mono text-gold text-sm mb-6">// المهارات الأساسية</h4>
            <div className="space-y-4">
              {skills.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-text">{s.name}</span>
                    <span className="text-gold tabular-nums">{s.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      {timeline.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-8 md:p-12"
        >
          <h4 className="font-mono text-gold text-sm mb-8">// الرحلة</h4>
          <div className="relative space-y-8 pr-8 border-r border-gold/20">
            {timeline.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -right-[37px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-bg shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                <div className="text-gold font-mono text-xs mb-1">{t.year}</div>
                <h5 className="text-lg font-bold mb-1">{t.title}</h5>
                <p className="text-gold/70 text-sm mb-2">{t.company}</p>
                <p className="text-text-dim text-sm">{t.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
