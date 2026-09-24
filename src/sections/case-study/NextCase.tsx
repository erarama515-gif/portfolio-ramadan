'use client'
import { Container } from '@/components/ui/Container'
import { StatusPill } from '@/components/ui/StatusPill'
import type { Project } from '@/i18n/dictionaries'

export function NextCase({
  next,
  cta,
}: {
  next: Project
  cta: string
}) {
  return (
    <section className="border-t border-line">
      <a href={`/work/${next.slug}`} className="group block">
        <Container className="py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-6">
            <p className="cap">— {cta}</p>
            <p className="cap text-fg-4">{next.index}</p>
          </div>

          <div className="flex items-baseline justify-between gap-6 flex-wrap">
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-tightest leading-none text-fg transition-colors group-hover:text-accent">
              {next.title}
            </h2>
            <div className="flex items-center gap-3">
              <StatusPill status={next.status} />
              <span
                aria-hidden
                className="text-2xl text-fg-3 group-hover:text-accent transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </div>
          </div>

          <p className="cap mt-4">— {next.subtitle}</p>
        </Container>
      </a>
    </section>
  )
}
