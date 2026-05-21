'use client'
import { useState, useEffect } from 'react'

interface NavProps {
  showBook?: boolean
}

export default function Navbar({ showBook = true }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'من أنا' },
    { href: '#work', label: 'الأعمال' },
    ...(showBook ? [{ href: '#book', label: 'الكتاب' }] : []),
    { href: '#services', label: 'الخدمات' },
    { href: '#contact', label: 'تواصل' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-xl border-b border-gold/15 shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-[1280px] mx-auto">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="text-gold text-xl group-hover:rotate-180 transition-transform duration-700">◆</span>
          <span className="font-display font-extrabold text-sm tracking-wider gradient-text">
            ENJAZ · إنجاز
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-text-dim hover:text-gold text-[.82rem] font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex btn-gold text-[.78rem] font-semibold px-4 py-2 rounded-full"
          >
            احجز جلسة →
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gold text-xl w-10 h-10 flex items-center justify-center rounded-md border border-gold/20"
            aria-label="القائمة"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bg-card/95 backdrop-blur-xl border-t border-gold/15 px-6 py-4">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-text hover:text-gold text-sm transition-colors border-b border-gold/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-gold w-full text-center mt-4 inline-block"
          >
            احجز جلسة →
          </a>
        </div>
      )}
    </nav>
  )
}
