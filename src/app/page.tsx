import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />

      {/* Placeholder for the rest of the sections — coming in Phase 2+ */}
      <section
        id="about"
        aria-hidden
        className="section-y border-t border-line"
      >
        <div className="container-x">
          <p className="eyebrow">Next up · Phase 2</p>
          <p className="text-fg-2 mt-2 font-mono text-sm">
            About · What I Build · Selected Work · How I Think · Tech Stack ·
            Philosophy · Numbers · Process · Contact · Footer
          </p>
        </div>
      </section>
    </main>
  )
}
