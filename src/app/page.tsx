import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'
import { Container } from '@/components/ui/Container'

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />

      {/* Phase 2 marker */}
      <section id="work" aria-hidden className="section-y">
        <Container>
          <p className="cap mb-4">— Phase 02 · Next up</p>
          <p className="prose-precise">
            Selected Work · How I Think About Systems · What I Build · Tech Stack ·
            Engineering Philosophy · By the Numbers · Process · Contact · Colophon
          </p>
        </Container>
      </section>
    </main>
  )
}
