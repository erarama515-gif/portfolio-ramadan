'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

export function LangToggle({ className }: { className?: string }) {
  const { locale, toggle } = useLocale()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className={cn(
        'inline-flex items-center h-7 px-2 gap-1 rounded',
        'border border-line hover:border-line-2 transition-colors',
        'font-mono text-[11.5px] tracking-cap uppercase',
        className,
      )}
    >
      <span className={cn(locale === 'en' ? 'text-fg' : 'text-fg-3')}>EN</span>
      <span className="text-fg-4">/</span>
      <span className={cn(locale === 'ar' ? 'text-fg' : 'text-fg-3')}>AR</span>
    </button>
  )
}
