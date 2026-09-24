'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { SectionMasthead } from '@/components/ui/SectionMasthead'
import { StatusPill } from '@/components/ui/StatusPill'
import { Chip } from '@/components/ui/Chip'
import { cn } from '@/lib/cn'
import type { Project } from '@/i18n/dictionaries'

/**
 * Emil-borrow: quiet list. No cards, no icons. Each project is a
 * typographic row, separated by a hairline. The title carries.
 *
 * On hover: the title shifts to accent + gets a hairline underscore
 * that draws in from the leading edge (Rauno-inspired). The row
 * background warms very slightly.
 */
function ProjectRow({ p, readCta }: { p: Project; readCta: string }) {
  return (
    <a
      href={`/work/${p.slug}`}
      className={cn(
        'group block border-t border-line',
        'transition-colors duration-300 ease-precise',
        'hover:bg-surface/60',
      )}
    >
      <div className="grid grid-cols-12 gap-x-5 items-start py-8 md:py-12">
        {/* Index */}
        <div className="col-span-2 md:col-span-1">
          <span className="cap text-accent">{p.index}</span>
        </div>

        {/* Title + subtitle */}
        <div className="col-span-10 md:col-span-6">
          <h3 className="relative inline-block text-2xl md:text-[2.25rem] font-medium tracking-tighter text-fg leading-tight [text-wrap:balance]">
            <span className="transition-colors duration-300 group-hover:text-accent">
              {p.title}
            </span>
            <span
              aria-hidden
              className={cn(
                'absolute left-0 rtl:left-auto rtl:right-0 -bottom-1 h-px w-full origin-left rtl:origin-right',
                'bg-accent scale-x-0 group-hover:scale-x-100',
                'transition-transform duration-500 ease-precise',
              )}
            />
          </h3>
          <p className="cap mt-3">— {p.subtitle}</p>

          <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-fg-2">
            {p.blurb}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-6">
            {p.tags.map((t) => (
              <Chip key={t} className="text-[10.5px]">
                {t}
              </Chip>
            ))}
          </div>
        </div>

        {/* Right rail: status + CTA */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end gap-4 mt-6 md:mt-0">
          <StatusPill status={p.status} />
          <span
            className={cn(
              'cap flex items-center gap-2 text-fg-3',
              'transition-colors duration-300 group-hover:text-fg',
            )}
          >
            {readCta}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </a>
  )
}

export function SelectedWork() {
  const { t } = useLocale()
  const { work } = t

  return (
    <section id="work" className="pb-24 md:pb-32">
      <SectionMasthead
        eyebrow={work.eyebrow}
        figure={work.figure}
        titlePre={work.titlePre}
        titleItalic={work.titleItalic}
        titlePost={work.titlePost}
        kicker={work.kicker}
      />

      <Container className="mt-12 md:mt-16">
        <div className="border-b border-line">
          {work.projects.map((p) => (
            <ProjectRow key={p.slug} p={p} readCta={work.readCta} />
          ))}
        </div>
      </Container>
    </section>
  )
}
