'use client'
import { useEffect, useState } from 'react'
import { useLocale } from '@/i18n/LocaleContext'
import { cn } from '@/lib/cn'

/**
 * A live-looking "system panel" — a self-portrait of the practice
 * as an actual product surface. Tabular numbers, hairline dividers,
 * a single pulsing live dot, an idling log stream.
 *
 * Not a mock of an ERP screen — a mock of *him*.
 */
export function LiveSystemPanel({ className }: { className?: string }) {
  const { t, locale } = useLocale()
  const { panel } = t
  const [tick, setTick] = useState(0)

  // Rotates through the log lines every 3.5s (one animation, editorial).
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 3500)
    return () => clearInterval(id)
  }, [])

  const now = new Date()
  const time = now.toLocaleTimeString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden',
        'bg-surface border border-line',
        'shadow-panel',
        className,
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 h-9 px-3 border-b border-line bg-surface-2/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
        </div>
        <span className="font-mono text-[11px] text-fg-3">
          {panel.title}
        </span>
        <span className="ml-auto rtl:ml-0 rtl:mr-auto flex items-center gap-2">
          <span className="relative flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-sig-live pulse-live" />
          </span>
          <span className="cap text-sig-live">{panel.liveLabel}</span>
        </span>
      </div>

      {/* Metric grid */}
      <div className="grid grid-cols-2 border-b border-line">
        {panel.metrics.map((m, i) => (
          <div
            key={m.label}
            className={cn(
              'p-4 md:p-5',
              i % 2 === 0 && 'border-e border-line',
              i < 2 && 'border-b border-line',
            )}
          >
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="cap">{m.label}</span>
              <span className="cap text-fg-4">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-medium tracking-tighter tabular text-fg">
                {m.value}
              </span>
              <span className="cap text-fg-3">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Log stream */}
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="cap">— {panel.logsLabel}</span>
          <span className="cap text-fg-4 tabular">{time}</span>
        </div>
        <ul className="space-y-2">
          {panel.logs.map((log, i) => {
            const isCurrent = i === tick % panel.logs.length
            return (
              <li
                key={log}
                className={cn(
                  'flex items-baseline gap-3 font-mono text-[12px] transition-colors duration-500',
                  isCurrent ? 'text-fg' : 'text-fg-3',
                )}
              >
                <span
                  className={cn(
                    'w-1 h-1 rounded-full flex-none translate-y-[-2px]',
                    isCurrent ? 'bg-accent' : 'bg-line-3',
                  )}
                />
                <span className="truncate">{log}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
