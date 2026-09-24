'use client'
import { Container } from '@/components/ui/Container'
import { StatusPill } from '@/components/ui/StatusPill'
import { Chip } from '@/components/ui/Chip'
import type { Project } from '@/i18n/dictionaries'
import type { CaseStudyMeta } from '@/content/case-studies'
import { cn } from '@/lib/cn'

interface Props {
  project: Project
  meta: CaseStudyMeta
  backLabel: string
}

export function CaseHero({ project, meta, backLabel }: Props) {
  return (
    <header className="border-b border-line">
      {/* Top strip · back nav */}
      <div className="border-b border-line">
        <Container className="h-11 flex items-center justify-between">
          <a
            href="/#work"
            className="group flex items-center gap-2 cap hover:text-fg transition-colors"
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
            >
              ←
            </span>
            <span>{backLabel}</span>
          </a>
          <span className="cap text-fg-4 tabular">
            {project.index} / {project.title}
          </span>
        </Container>
      </div>

      <Container className="pt-14 pb-16 md:pt-24 md:pb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="cap text-accent">{project.index}</span>
          <span className="h-px w-8 bg-line-2" />
          <StatusPill status={project.status} />
        </div>

        <h1 className={cn(
          'font-medium text-fg tracking-tightest leading-[0.98]',
          'text-[clamp(2.5rem,7vw,5.25rem)] max-w-[16ch]',
        )}>
          {project.title}
        </h1>

        <p className="mt-6 font-serif italic text-2xl md:text-[1.75rem] text-accent leading-snug max-w-3xl">
          {project.subtitle}
        </p>

        {/* Meta row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 border-t border-line pt-6">
          {(
            [
              ['Role', meta.role],
              ['Timeline', meta.timeline],
              ['Industry', meta.industry],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <p className="cap mb-1.5">— {label}</p>
              <p className="text-fg text-[15px] font-medium">{value}</p>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </Container>
    </header>
  )
}
