import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Chip({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-7 px-3 rounded-full',
        'border border-line-2 text-fg-2 font-mono text-xs tracking-wider',
        'transition-colors duration-200 ease-out-expo',
        'hover:border-copper/60 hover:text-fg',
        className,
      )}
      {...rest}
    />
  )
}
