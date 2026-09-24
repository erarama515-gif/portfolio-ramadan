'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

export function LangToggle({ className }: { className?: string }) {
  const { locale, toggle, t } = useLocale()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className={cn(
        'inline-flex items-center gap-1 h-8 px-2.5 font-mono text-xs',
        'text-fg-2 border border-transparent hover:text-fg hover:border-line-2',
        'rounded transition-colors duration-200 ease-out-expo',
        className,
      )}
    >
      <span
        className={cn(
          'transition-colors',
          locale === 'en' ? 'text-copper' : 'text-fg-3',
        )}
      >
        EN
      </span>
      <span className="text-fg-3">|</span>
      <span
        className={cn(
          'transition-colors',
          locale === 'ar' ? 'text-copper' : 'text-fg-3',
        )}
      >
        AR
      </span>
      <span className="sr-only">{t.langToggle}</span>
    </button>
  )
}
