'use client'
import type { CaseResult } from '@/content/case-studies'
import { cn } from '@/lib/cn'

export function ResultsTiles({ results }: { results: CaseResult[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-line">
      {results.map((r, i) => (
        <div
          key={r.label + i}
          className={cn(
            'py-10 md:py-12',
            i < results.length - 1 && 'border-b md:border-b-0 md:border-e border-line',
          )}
        >
          <p className="text-[3rem] md:text-[4rem] font-medium tracking-tightest leading-none text-fg tabular">
            {r.value}
          </p>
          <p className="cap mt-4">— {r.label}</p>
        </div>
      ))}
    </div>
  )
}
