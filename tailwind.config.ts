import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          2: 'var(--paper-2)',
          3: 'var(--paper-3)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        rule: {
          DEFAULT: 'var(--rule)',
          2: 'var(--rule-2)',
        },
        brick: {
          DEFAULT: 'var(--brick)',
          2: 'var(--brick-2)',
        },
        moss: 'var(--moss)',
        gold: 'var(--gold)',
        danger: 'var(--danger)',
        success: 'var(--success)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        arabicSerif: ['var(--font-arabic-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        editorial: '0.02em',
        stamp: '0.22em',
      },
      maxWidth: {
        container: '1360px',
        prose: '65ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
        editorial: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
      },
    },
  },
  plugins: [],
}

export default config
