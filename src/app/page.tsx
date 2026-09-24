import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'
import { Container } from '@/components/ui/Container'

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />

      {/* Placeholder for the rest — coming in Phase 2 */}
      <section
        id="about"
        aria-hidden
        className="section-y border-t border-rule"
      >
        <Container>
          <p className="stamp mb-4">— Phase 02 · Next up</p>
          <p className="prose-editorial">
            About · What I Build · Selected Work · How I Think · Tech Stack ·
            Philosophy · Numbers · Process · Contact · Colophon
          </p>
        </Container>
      </section>
    </main>
  )
}
