'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { LangToggle } from '@/components/ui/LangToggle'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

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
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 h-[72px]',
        'bg-ink/70 backdrop-blur-xl border-b border-line',
      )}
    >
      <Container className="h-full flex items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="text-copper text-lg leading-none">◆</span>
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-fg group-hover:text-copper transition-colors">
            Eslam Ramadan
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={cn(
                'px-3 h-9 inline-flex items-center rounded',
                'font-mono text-xs uppercase tracking-wider',
                'text-fg-2 hover:text-fg transition-colors duration-200',
              )}
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <ButtonLink href="#contact" variant="outline" size="md">
            {t.nav.start} <span aria-hidden>→</span>
          </ButtonLink>
        </div>
      </Container>
    </header>
  )
}
