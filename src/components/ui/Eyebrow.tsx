import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Eyebrow({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('eyebrow', className)} {...rest} />
}
