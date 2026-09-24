'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'

/**
 * Colophon strip. Thin, editorial, closes the volume.
 */
export function Footer() {
  const { t } = useLocale()
  const { footer } = t

  return (
    <footer className="border-t border-line">
      <Container className="py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          {/* Colophon left */}
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="vercel-mark text-accent" aria-hidden />
              <span className="font-mono text-sm text-fg tracking-precise">
                eslam.ramadan
              </span>
            </div>
            <p className="cap mb-1">— {footer.role}</p>
            <p className="cap text-fg-4">{footer.domains}</p>
          </div>

          {/* Right meta */}
          <div className="flex flex-col md:items-end gap-2">
            <p className="cap">{footer.copy}</p>
            <p className="cap text-fg-4">
              <span>v.2026.01</span> · <span>Cairo · Egypt</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
