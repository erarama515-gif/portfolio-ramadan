'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { SectionMasthead } from '@/components/ui/SectionMasthead'
import { cn } from '@/lib/cn'

/**
 * Stripe-borrow: a diagrammatic exposition of the thinking behind
 * the practice, rendered as an annotated architecture stack.
 * Vertical flow · left column labels · right column annotations.
 *
 * No animation — this reads as printed documentation.
 */
export function HowIThink() {
  const { t } = useLocale()
  const { think } = t

  return (
    <section id="process" className="pb-24 md:pb-32">
      <SectionMasthead
        eyebrow={think.eyebrow}
        figure={think.figure}
        titlePre={think.titlePre}
        titleItalic={think.titleItalic}
        titlePost={think.titlePost}
        kicker={think.kicker}
      />

      <Container className="mt-16 md:mt-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {/* Left · diagram */}
          <div className="col-span-12 lg:col-span-7">
            <ol className="relative">
              {/* Vertical spine */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-3 bottom-3 start-6 w-px bg-line-2"
              />

              {think.nodes.map((n, i) => (
                <li key={n.label} className="relative flex items-start gap-5 md:gap-6 py-4">
                  <span
                    className={cn(
                      'relative z-10 flex items-center justify-center',
                      'w-12 h-12 flex-none rounded-md border border-line-2',
                      'bg-surface text-accent',
                      'font-mono text-[11px] tabular tracking-cap',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 pt-2 flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                    <span className="text-fg text-lg md:text-xl font-medium tracking-tighter">
                      {n.label}
                    </span>
                    <span className="cap md:text-end">{n.note}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right · principle */}
          <aside className="col-span-12 lg:col-span-5 lg:pl-10 lg:border-l lg:border-line lg:rtl:border-l-0 lg:rtl:border-r lg:rtl:pl-0 lg:rtl:pr-10">
            <p className="cap mb-6">— Principle</p>
            <p className="font-serif italic text-[1.5rem] md:text-[1.75rem] leading-snug text-accent [text-wrap:balance]">
              “{think.principle}”
            </p>
            <div className="mt-10 space-y-4 text-[14.5px] leading-relaxed text-fg-2">
              <p>
                Read the diagram top-down. Each layer only exists to serve the one
                above it. If the top layer is unclear, everything below inherits
                the confusion.
              </p>
              <p className="text-fg-3">
                <span className="cap-fg text-accent">→</span>{' '}
                Case studies unpack this per project.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
