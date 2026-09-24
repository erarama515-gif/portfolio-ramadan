'use client'
import type { CaseFeature } from '@/content/case-studies'

export function FeatureGrid({ features }: { features: CaseFeature[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {features.map((f, i) => (
        <article
          key={f.title}
          className="relative p-6 rounded-lg bg-surface border border-line"
        >
          <span className="cap text-accent">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 text-[1.25rem] font-medium tracking-tighter text-fg">
            {f.title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{f.body}</p>
        </article>
      ))}
    </div>
  )
}
