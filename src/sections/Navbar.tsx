'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { LangToggle } from '@/components/ui/LangToggle'
import { cn } from '@/lib/cn'

/**
 * Editorial masthead. Behaves like the running header on a book page:
 * hairline top, small typographic wordmark, thin nav.
 * No backdrop blur, no shadow, no drama.
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
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-[2px] border-b border-rule">
      <Container className="flex items-center justify-between h-14 gap-6">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span className="font-serif italic text-lg leading-none text-ink">
            Eslam
          </span>
          <span className="font-serif text-lg leading-none text-ink">
            Ramadan
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={cn(
                'font-mono text-[0.7rem] uppercase tracking-stamp',
                'text-ink-3 hover:text-ink transition-colors duration-200',
              )}
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LangToggle />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-stamp text-brick hover:text-brick-2 transition-colors"
          >
            <span aria-hidden>→</span>
            {t.nav.start}
          </a>
        </div>
      </Container>
    </header>
  )
}
