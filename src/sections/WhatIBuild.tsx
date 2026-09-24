'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { SectionMasthead } from '@/components/ui/SectionMasthead'
import { cn } from '@/lib/cn'

/**
 * Framer-borrow: tactile grid cards. Six domains, no icons.
 * Cards are quiet by default and warm up on hover with a soft
 * accent-tinted ring and a small lift.
 *
 * No idle animation — the tactile response IS the interaction.
 */
export function WhatIBuild() {
  const { t } = useLocale()
  const { build } = t

  return (
    <section id="systems" className="pb-24 md:pb-32">
      <SectionMasthead
        eyebrow={build.eyebrow}
        figure={build.figure}
        titlePre={build.titlePre}
        titleItalic={build.titleItalic}
        titlePost={build.titlePost}
        kicker={build.kicker}
      />

      <Container className="mt-14 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {build.domains.map((d) => (
            <article
              key={d.index}
              className={cn(
                'group relative overflow-hidden rounded-lg p-6 md:p-7',
                'bg-surface border border-line',
                'transition-all duration-300 ease-precise',
                'hover:border-line-3 hover:bg-surface-2',
                'hover:-translate-y-0.5',
              )}
            >
              {/* Ambient warm glow on hover — the Framer / Stripe tactile hint */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 400px 200px at 20% 0%, var(--accent-glow), transparent 60%)',
                }}
              />

              <div className="relative flex items-baseline justify-between mb-6">
                <span className="cap text-accent">{d.index}</span>
                <span
                  aria-hidden
                  className="cap text-fg-4 group-hover:text-fg-2 transition-colors"
                >
                  →
                </span>
              </div>

              <h3 className="relative text-[1.375rem] md:text-[1.5rem] font-medium tracking-tighter text-fg mb-3 leading-tight">
                {d.title}
              </h3>
              <p className="relative text-[14.5px] leading-relaxed text-fg-2 max-w-[36ch]">
                {d.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
