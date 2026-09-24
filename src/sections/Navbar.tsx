'use client'
import { useEffect, useState } from 'react'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { LangToggle } from '@/components/ui/LangToggle'
import { cn } from '@/lib/cn'

export function Navbar() {
  const { t } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const links: { key: keyof typeof t.nav; href: string }[] = [
    { key: 'work', href: '#work' },
    { key: 'systems', href: '#systems' },
    { key: 'process', href: '#process' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ]

  // Close menu on route hash change or Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    // Lock body scroll while the sheet is open
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-40 bg-bg/70 backdrop-blur-md border-b border-line">
        <Container className="flex items-center justify-between h-12 gap-6">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-2 group">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="font-mono text-[13px] text-fg tracking-precise">
              eslam.ramadan
            </span>
            <span className="cap ml-2 hidden lg:inline">/ studio</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className={cn(
                  'px-2.5 h-7 inline-flex items-center rounded',
                  'font-mono text-[12.5px] text-fg-3 hover:text-fg',
                  'transition-colors duration-150',
                )}
              >
                {t.nav[l.key]}
              </a>
            ))}
          </nav>

          {/* Right rail */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 h-7 px-2.5 rounded border border-line hover:border-line-2 transition-colors cursor-pointer">
              <span className="cap text-fg-3">{t.cmd.search}</span>
              <span className="kbd">⌘K</span>
            </div>
            <LangToggle />

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden inline-flex items-center justify-center w-8 h-7 rounded border border-line hover:border-line-2 transition-colors"
            >
              <span className="relative block w-3.5 h-2.5" aria-hidden>
                <span
                  className={cn(
                    'absolute inset-x-0 top-0 h-px bg-fg transition-transform duration-200',
                    menuOpen && 'translate-y-[4px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-px bg-fg transition-transform duration-200',
                    menuOpen && '-translate-y-[6px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile sheet */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-12 z-30 md:hidden bg-bg/95 backdrop-blur-md border-t border-line"
          role="dialog"
          aria-modal="true"
        >
          <Container className="pt-8 pb-10">
            <nav className="flex flex-col divide-y divide-line">
              {links.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between py-4 group"
                >
                  <span className="font-mono text-xs uppercase tracking-cap text-fg-3">
                    {t.nav[l.key]}
                  </span>
                  <span
                    aria-hidden
                    className="text-fg-3 group-hover:text-accent transition-colors"
                  >
                    →
                  </span>
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-accent text-bg font-medium text-sm"
            >
              {t.nav.start}
              <span aria-hidden>→</span>
            </a>
          </Container>
        </div>
      )}
    </>
  )
}
