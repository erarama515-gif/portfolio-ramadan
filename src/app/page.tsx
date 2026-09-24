import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'
import { WhatIBuild } from '@/sections/WhatIBuild'
import { SelectedWork } from '@/sections/SelectedWork'
import { Container } from '@/components/ui/Container'

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhatIBuild />
      <SelectedWork />

      {/* Phase 3 marker */}
      <section aria-hidden className="section-y border-t border-line">
        <Container>
          <p className="cap mb-4">— Phase 03 · Next up</p>
          <p className="prose-precise">
            How I Think About Systems · Engineering Philosophy · By the Numbers ·
            Process · Contact · Colophon
          </p>
        </Container>
      </section>
    </main>
  )
}
