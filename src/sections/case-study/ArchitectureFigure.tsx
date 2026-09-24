'use client'
import type { CaseLayer } from '@/content/case-studies'
import { cn } from '@/lib/cn'

/**
 * The system architecture, rendered as a numbered vertical stack
 * with a spine. Reused from HowIThink but scoped per-project.
 */
export function ArchitectureFigure({ layers }: { layers: CaseLayer[] }) {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 bottom-3 start-6 w-px bg-line-2"
      />
      {layers.map((n, i) => (
        <li key={n.label} className="relative flex items-start gap-5 md:gap-6 py-4">
          <span
            className={cn(
              'relative z-10 flex items-center justify-center',
              'w-12 h-12 flex-none rounded-md border border-line-2',
              'bg-surface text-accent font-mono text-[11px] tabular tracking-cap',
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
  )
}
