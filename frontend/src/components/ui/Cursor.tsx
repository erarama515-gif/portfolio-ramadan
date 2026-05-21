'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const lerp = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(lerp)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a,button,[data-cursor-hover]')
      if (ringRef.current) {
        ringRef.current.style.width = el ? '54px' : '34px'
        ringRef.current.style.height = el ? '54px' : '34px'
        ringRef.current.style.borderColor = el ? 'rgba(212,175,55,.75)' : 'rgba(200,169,106,.40)'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    rafRef.current = requestAnimationFrame(lerp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] w-1.5 h-1.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          background: '#d4af37',
          boxShadow: '0 0 12px rgba(212,175,55,.85)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 34, height: 34,
          border: '1px solid rgba(200,169,106,.40)',
          transition: 'width .2s cubic-bezier(.22,1,.36,1), height .2s cubic-bezier(.22,1,.36,1), border-color .2s',
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}
