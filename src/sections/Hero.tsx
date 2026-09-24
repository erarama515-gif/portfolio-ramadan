'use client'
import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { fadeUp, stagger, EASE_OUT_EXPO } from '@/lib/motion'
import { HeroSystemWindow } from './HeroSystemWindow'

export function Hero() {
  const { t } = useLocale()

  return (
    <section
      id="top"
      className="relative pt-32 md:pt-40 pb-24 md:pb-32 min-h-[92vh] flex items-center"
    >
      <Container>
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
            className="md:col-span-7"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow className="block mb-6">{t.hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="h1-display text-fg mb-8"
            >
              <span className="block">{t.hero.firstName}</span>
              <span className="block text-copper">{t.hero.lastName}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="lead max-w-xl mb-10"
            >
              {t.hero.subline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <Button variant="primary" size="lg">
                {t.hero.viewWork} <span aria-hidden>→</span>
              </Button>
              <Button variant="outline" size="lg">
                {t.hero.startProject}
              </Button>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="h-px w-16 bg-copper mb-4" />
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-fg-3">
                {t.hero.meta}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT_EXPO }}
            className="md:col-span-5"
          >
            <HeroSystemWindow />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
