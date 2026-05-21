'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { NeuralCanvas } from './NeuralCanvas'
import type { HeroSection, Profile } from '@/types'
import { getImageUrl } from '@/lib/api'

interface HeroProps { hero: HeroSection; profile: Profile }

export function Hero({ hero, profile }: HeroProps) {
  const [typed, setTyped] = useState('')
  const words = hero.typing_words?.length ? hero.typing_words : ['تعمل وحدها']
  const state = useRef({ wi: 0, ci: 0, del: false })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const s = state.current
      const w = words[s.wi]
      if (!s.del) {
        s.ci++
        setTyped(w.slice(0, s.ci))
        if (s.ci === w.length) { s.del = true; timer = setTimeout(tick, 1800); return }
      } else {
        s.ci--
        setTyped(w.slice(0, s.ci))
        if (s.ci === 0) { s.del = false; s.wi = (s.wi + 1) % words.length }
      }
      timer = setTimeout(tick, s.del ? 35 : 75)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cvUrl = getImageUrl(profile?.cv_url)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center">
      {hero.bg_neural && <NeuralCanvas />}
      {hero.bg_grid && <div className="hero-grid" />}

      {/* Glow orbs — warm */}
      <div className="absolute top-1/4 left-1/3 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(212,175,55,.10),transparent 65%)', animation: 'glowPulse 6s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(184,115,51,.07),transparent 65%)', animation: 'glowPulse 6s ease-in-out infinite 3s' }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        {hero.show_status_badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full font-mono text-[.7rem]"
            style={{
              background: 'rgba(200,169,106,.07)',
              border: '1px solid rgba(200,169,106,.25)',
              color: '#d4af37',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4af37', boxShadow: '0 0 8px rgba(212,175,55,0.8)' }} />
            {hero.status_text}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease: [.22, 1, .36, 1] }}
          className="headline-ar letterpress mb-6"
          style={{ fontSize: 'clamp(2.4rem, 5.8vw, 5.4rem)' }}
        >
          <span className="gradient-text">{hero.headline}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease: [.22, 1, .36, 1] }}
          className="font-mono text-base md:text-lg text-[#c8a96a] mb-7 min-h-[2em]"
        >
          <span className="text-[#8c8377]">/&gt;</span>{' '}
          <span>{typed}</span>
          <span className="term-cursor" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, ease: [.22, 1, .36, 1] }}
          className="text-[#ece5d6]/75 text-base md:text-[1.05rem] leading-loose font-light max-w-[640px] mx-auto mb-10"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, ease: [.22, 1, .36, 1] }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <a href="#projects" className="btn-gold text-sm font-semibold px-8 py-3.5 rounded-full">
            {hero.cta_primary}
          </a>
          <a href="#contact" className="btn-ghost-gold text-sm font-medium px-8 py-3.5 rounded-full">
            {hero.cta_secondary}
          </a>
          {hero.show_cv_btn && cvUrl && (
            <a href={cvUrl} download
              className="text-[#ece5d6] text-sm font-medium px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,250,240,.025)', border: '1px solid rgba(255,250,240,.08)' }}>
              ⬇ تحميل السيرة
            </a>
          )}
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 mx-auto h-px w-32 gold-line"
        />
      </div>
    </section>
  )
}
