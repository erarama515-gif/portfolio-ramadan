import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider ' +
  'transition-all duration-200 ease-out-expo focus-visible:outline-none ' +
  'focus-visible:ring-1 focus-visible:ring-copper focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-ink disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-copper text-ink hover:bg-copper-2 border border-copper hover:border-copper-2',
  outline:
    'bg-transparent text-fg border border-line-2 hover:border-copper hover:text-copper-2',
  ghost:
    'bg-transparent text-fg-2 hover:text-fg hover:bg-ink-3 border border-transparent',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 rounded-md',
  lg: 'h-12 px-7 rounded-md',
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & CommonProps
>(function Button(
  { variant = 'primary', size = 'md', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    />
  )
})

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps
>(function ButtonLink(
  { variant = 'primary', size = 'md', className, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    />
  )
})
