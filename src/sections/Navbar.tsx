'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { LangToggle } from '@/components/ui/LangToggle'
import { cn } from '@/lib/cn'

/**
 * OS-panel-style header. Thin, dense, monospace details, no drama.
 * Reads like the top bar of a tool, not a landing page navbar.
 */
export function Navbar() {
  const { t } = useLocale()

  const links: { key: keyof typeof t.nav; href: string }[] = [
    { key: 'work', href: '#work' },
    { key: 'systems', href: '#systems' },
    { key: 'process', href: '#process' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-bg/70 backdrop-blur-md border-b border-line">
      <Container className="flex items-center justify-between h-12 gap-6">
        {/* — Brand (tiny, monospace-precise) — */}
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          <span className="font-mono text-[13px] text-fg tracking-precise">
            eslam.ramadan
          </span>
          <span className="cap ml-2 hidden lg:inline">/ studio</span>
        </a>

        {/* — Nav — */}
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

        {/* — Right — */}
        <div className="flex items-center gap-4">
          {/* Fake ⌘K search hint — the Rauno detail */}
          <div className="hidden lg:flex items-center gap-2 h-7 px-2.5 rounded border border-line hover:border-line-2 transition-colors cursor-pointer">
            <span className="cap text-fg-3">{t.cmd.search}</span>
            <span className="kbd">⌘K</span>
          </div>
          <LangToggle />
        </div>
      </Container>
    </header>
  )
}
