'use client'
import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { LiveSystemPanel } from './LiveSystemPanel'
import { cn } from '@/lib/cn'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Hero — precision. Left: identity + CTAs. Right: a live-looking
 * system panel that is the *practice* itself.
 *
 * Motion budget: one entrance stagger + one pulsing live-dot
 * (in LiveSystemPanel). Nothing idle bounces.
 */
export function Hero() {
  const { t } = useLocale()

  return (
    <section id="top" className="relative border-b border-line">
      <Container className="pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14 items-start">
          {/* — Left column · Identity — */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            className="col-span-12 lg:col-span-7"
          >
            {/* Tag */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            >
              <div className="inline-flex items-center gap-2 h-7 px-2.5 rounded-full border border-line-2 mb-8">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span className="cap-fg">{t.hero.tag}</span>
              </div>
            </motion.div>

            {/* Name — massive precise sans */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="h-display text-fg mb-8"
            >
              <span className="block">{t.hero.firstName}</span>
              <span className="block">
                {t.hero.lastName}
                <span className="text-accent">.</span>
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="lead mb-10 max-w-xl"
            >
              {t.hero.subline}
            </motion.p>

            {/* CTAs — precision buttons with keyboard hints */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <a
                href="#work"
                className={cn(
                  'group inline-flex items-center gap-2 h-10 pl-4 pr-2 rounded-md',
                  'bg-accent text-bg font-medium text-[13.5px]',
                  'hover:bg-accent-2 transition-colors duration-150',
                )}
              >
                <span>{t.hero.ctaWork}</span>
                <span className="kbd border-bg/30 bg-bg/15 text-bg/80">↵</span>
              </a>
              <a
                href="#contact"
                className={cn(
                  'group inline-flex items-center gap-2 h-10 px-4 rounded-md',
                  'border border-line-2 text-fg text-[13.5px]',
                  'hover:border-fg-3 transition-colors duration-150',
                )}
              >
                <span>{t.hero.ctaContact}</span>
                <span className="text-fg-3 group-hover:text-fg transition-colors">→</span>
              </a>
            </motion.div>

            {/* Meta strip */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-line-2" />
              <p className="cap">{t.hero.metaLine}</p>
            </motion.div>
          </motion.div>

          {/* — Right column · Live panel — */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="col-span-12 lg:col-span-5 lg:pl-4"
          >
            <LiveSystemPanel />
          </motion.div>
        </div>
      </Container>

      {/* Footer strip — the OS status bar */}
      <div className="border-t border-line">
        <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:h-10 py-2 md:py-0">
          <div className="flex items-center gap-4">
            <span className="cap flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sig-live rounded-full" />
              open to one project this month
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="cap text-fg-4">{t.cmd.version}</span>
            <span className="cap text-fg-4">·</span>
            <span className="cap text-fg-4">Cairo · Egypt</span>
          </div>
        </Container>
      </div>
    </section>
  )
}
