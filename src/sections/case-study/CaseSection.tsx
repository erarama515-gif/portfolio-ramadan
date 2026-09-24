'use client'
import { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

/**
 * Chapter-style section wrapper for case study pages.
 * Left column: eyebrow + optional figure. Right column: content.
 */
export function CaseSection({
  eyebrow,
  figure,
  children,
}: {
  eyebrow: string
  figure?: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-line">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-3">
            <div className="md:sticky md:top-20">
              <p className="cap">— {eyebrow}</p>
              {figure && <p className="cap text-fg-4 mt-2">{figure}</p>}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">{children}</div>
        </div>
      </Container>
    </section>
  )
}
