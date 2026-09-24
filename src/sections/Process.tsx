'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { SectionMasthead } from '@/components/ui/SectionMasthead'
import { cn } from '@/lib/cn'

/**
 * Six-step working method. Horizontal grid of nodes with dashed
 * connectors between them (rendered via border-b on the row, then
 * the number badge sits above it — very editorial).
 *
 * No motion — the numbers themselves anchor the rhythm.
 */
export function Process() {
  const { t } = useLocale()
  const { process } = t

  return (
    <section id="process" className="pb-24 md:pb-32">
      <SectionMasthead
        eyebrow={process.eyebrow}
        figure={process.figure}
        titlePre={process.titlePre}
        titleItalic={process.titleItalic}
        titlePost={process.titlePost}
      />

      <Container className="mt-16 md:mt-20">
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
          {process.steps.map((s, i) => (
            <li
              key={s.num}
              className={cn(
                'relative pt-8',
                // top hairline as the process spine
                'border-t border-line-2',
              )}
            >
              {/* Number badge floating above the hairline */}
              <span
                aria-hidden
                className={cn(
                  'absolute -top-3 start-0 h-6 px-2',
                  'inline-flex items-center rounded',
                  'bg-bg border border-line-2 text-accent cap-fg',
                )}
              >
                <span className="text-accent">{s.num}</span>
              </span>

              <h3 className="text-lg md:text-xl font-medium tracking-tighter text-fg mb-2">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-fg-2">
                {s.body}
              </p>

              {/* Arrow after each step except last, only on desktop */}
              {i < process.steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden lg:block absolute top-[-15px] end-[-14px] text-fg-4 cap"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
