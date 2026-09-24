'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { SectionMasthead } from '@/components/ui/SectionMasthead'
import { cn } from '@/lib/cn'

/**
 * Four stat tiles. Big display numerals, monospace label + sub.
 * No count-up animation — the number sits still. Confidence,
 * not theatrics.
 */
export function Numbers() {
  const { t } = useLocale()
  const { numbers } = t

  return (
    <section className="pb-24 md:pb-32">
      <SectionMasthead
        eyebrow={numbers.eyebrow}
        figure={numbers.figure}
        titlePre={numbers.titlePre}
        titleItalic={numbers.titleItalic}
        titlePost={numbers.titlePost}
      />

      <Container className="mt-16 md:mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-line">
          {numbers.stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'py-10 md:py-14',
                // vertical hairlines between tiles
                (i % 2 === 0) && 'lg:border-e lg:border-line',
                i < 3 && 'lg:border-e lg:border-line',
                (i === 0 || i === 1) && 'border-b lg:border-b-0 border-line',
                (i === 0) && 'border-e border-line',
              )}
            >
              <p className="cap mb-4">— {s.label}</p>
              <p className="text-[3.25rem] md:text-[4.75rem] font-medium tracking-tightest leading-none text-fg tabular">
                {s.value}
              </p>
              <p className="cap mt-4">{s.sub}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
