'use client'
import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setWidth((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[1.5px] z-[9997]"
      style={{
        width: `${width}%`,
        background: 'linear-gradient(90deg, #8a6d3a, #c8a96a 45%, #d4af37 70%, #f1c97d)',
        boxShadow: '0 0 8px rgba(212,175,55,.55)',
        transition: 'width .08s linear',
      }}
    />
  )
}
