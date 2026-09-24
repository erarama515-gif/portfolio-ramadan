'use client'
import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { EASE_OUT_EXPO } from '@/lib/motion'

/**
 * Cover-page treatment. Meant to read as the first spread of a
 * design monograph, not a SaaS landing.
 *
 * Motion budget: 2 opacity/translate reveals on load. Nothing else.
 */
export function Hero() {
  const { t } = useLocale()

  return (
    <section id="top" className="border-b border-rule">
      {/* — Top stamp strip — */}
      <div className="border-b border-rule">
        <Container className="grid grid-cols-3 items-center h-11">
          <span className="stamp">{t.meta.year}</span>
          <span className="stamp text-center">{t.hero.volume}</span>
          <span className="stamp text-end">{t.hero.place}</span>
        </Container>
      </div>

      {/* — Main cover — */}
      <Container className="py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {/* Left · massive name */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="col-span-12 lg:col-span-8"
          >
            <p className="idx mb-8">
              <span className="mr-2 rtl:ml-2 rtl:mr-0">—</span>
              Digital Business Architect
            </p>

            <h1 className="h-cover text-ink">
              <span className="block">{t.hero.firstName}</span>
              <span className="block">
                <span className="h-cover-italic text-brick">
                  {t.hero.lastName}
                </span>
                <span className="h-cover-italic text-brick">.</span>
              </span>
            </h1>
          </motion.div>

          {/* Right · manifesto quote */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.4,
              ease: EASE_OUT_EXPO,
            }}
            className="col-span-12 lg:col-span-4 lg:pt-32"
          >
            <div className="hairline-2 w-10 mb-5" />
            <blockquote className="lead-editorial mb-6 [text-wrap:balance]">
              {t.hero.manifesto}
            </blockquote>
            <cite className="stamp not-italic block">
              — {t.hero.manifestoCite}
            </cite>
          </motion.aside>
        </div>
      </Container>

      {/* — Contents index — */}
      <div className="border-t border-rule">
        <Container className="py-14 md:py-16">
          <div className="flex items-baseline justify-between mb-8">
            <p className="stamp">— {t.hero.indexHeading}</p>
            <p className="stamp text-ink-3 hidden md:block">Fig. 00</p>
          </div>

          <ol>
            {t.hero.indexItems.map((item, i) => (
              <li
                key={item.href}
                className="border-t border-rule last:border-b"
              >
                <a
                  href={item.href}
                  className="group flex items-baseline gap-6 md:gap-10 py-5 md:py-7 hover:bg-paper-2/60 transition-colors duration-200 ease-editorial px-1 -mx-1"
                >
                  <span className="idx w-8 flex-none tabular">
                    {item.num}
                  </span>
                  <span className="font-serif text-2xl md:text-4xl leading-tight text-ink transition-colors group-hover:text-brick">
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto rtl:ml-0 rtl:mr-auto stamp text-ink-3 group-hover:text-brick transition-colors"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      {/* — Bottom stamp strip — */}
      <div className="border-t border-rule">
        <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:h-12 py-3 md:py-0">
          <span className="stamp">{t.hero.stampLeft}</span>
          <span className="stamp">{t.hero.stampRight}</span>
        </Container>
      </div>
    </section>
  )
}
