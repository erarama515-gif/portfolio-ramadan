import { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

export function SectionHeader({
  eyebrow,
  title,
  kicker,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  kicker?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('mb-16 md:mb-20 max-w-3xl', className)}>
      {eyebrow && <Eyebrow className="mb-4 block">{eyebrow}</Eyebrow>}
      <h2 className="h2-display text-fg">{title}</h2>
      {kicker && <p className="lead mt-6">{kicker}</p>}
    </header>
  )
}
