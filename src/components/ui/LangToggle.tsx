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
        'inline-flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-stamp',
        'text-ink-3 hover:text-ink transition-colors',
        className,
      )}
    >
      <span className={cn(locale === 'en' ? 'text-ink' : 'text-ink-3')}>
        EN
      </span>
      <span className="text-ink-3">/</span>
      <span className={cn(locale === 'ar' ? 'text-ink' : 'text-ink-3')}>
        AR
      </span>
    </button>
  )
}
