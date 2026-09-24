import type { Variants } from 'framer-motion'

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export const stagger = (each = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each } },
})

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
}
