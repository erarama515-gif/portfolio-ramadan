'use client'
import { motion } from 'framer-motion'

const NODES = [
  { label: 'BUSINESS' },
  { label: 'FRONTEND' },
  { label: 'API' },
  { label: 'DATABASE' },
  { label: 'AUTOMATION' },
]

export function HeroSystemWindow() {
  return (
    <div className="relative">
      {/* Card behind (slight offset for depth) */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-[14px] border border-line bg-ink-2/60"
      />

      {/* Main system window */}
      <div className="relative rounded-[14px] border border-line-2 bg-ink-2 overflow-hidden">
        {/* Chrome */}
        <div className="flex items-center gap-1.5 px-4 h-9 border-b border-line">
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-wider text-fg-3">
            system.architecture
          </span>
        </div>

        {/* Flow diagram */}
        <div className="p-8 md:p-10">
          <div className="flex flex-col items-center gap-3">
            {NODES.map((n, i) => (
              <div key={n.label} className="w-full flex flex-col items-center">
                <div className="w-full max-w-[240px] h-11 rounded-md border border-line-2 bg-ink-3 flex items-center justify-center">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-fg-2">
                    {n.label}
                  </span>
                </div>
                {i < NODES.length - 1 && (
                  <div className="relative h-8 w-px my-1 bg-line-2 overflow-hidden">
                    <motion.span
                      className="absolute left-1/2 -translate-x-1/2 top-0 h-2 w-2 rounded-full bg-copper"
                      animate={{ y: [0, 28, 0] }}
                      transition={{
                        duration: 2.4,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
