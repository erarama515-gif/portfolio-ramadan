'use client'
import { Chip } from '@/components/ui/Chip'
import type { CaseStudy } from '@/content/case-studies'

export function TechStack({ groups }: { groups: CaseStudy['techGroups'] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {groups.map((g) => (
        <li key={g.group} className="grid grid-cols-12 gap-4 items-start py-5">
          <p className="col-span-12 md:col-span-3 cap">— {g.group}</p>
          <div className="col-span-12 md:col-span-9 flex flex-wrap items-center gap-2">
            {g.items.map((it) => (
              <Chip key={it}>{it}</Chip>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
