import { cn } from '@/lib/cn'

export type ProjectStatus = 'LIVE' | 'PRIVATE' | 'INFRASTRUCTURE'

const dot: Record<ProjectStatus, string> = {
  LIVE: 'bg-success',
  PRIVATE: 'bg-fg-3',
  INFRASTRUCTURE: 'bg-copper',
}

export function StatusPill({
  status,
  className,
}: {
  status: ProjectStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 h-6 px-2.5',
        'border border-line-2 rounded-full',
        'font-mono text-[0.6875rem] uppercase tracking-wider text-fg-2',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dot[status])} />
      {status}
    </span>
  )
}
