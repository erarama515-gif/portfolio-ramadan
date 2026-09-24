import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Container({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('container-x', className)} {...rest} />
  },
)
