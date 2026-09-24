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
        bg: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        line: {
          DEFAULT: 'var(--line)',
          2: 'var(--line-2)',
          3: 'var(--line-3)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          2: 'var(--fg-2)',
          3: 'var(--fg-3)',
          4: 'var(--fg-4)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          2: 'var(--accent-2)',
          glow: 'var(--accent-glow)',
        },
        cool: 'var(--cool)',
        'sig-live': 'var(--sig-live)',
        'sig-warn': 'var(--sig-warn)',
        'sig-idle': 'var(--sig-idle)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        arabicSerif: ['var(--font-arabic-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.028em',
        precise: '-0.01em',
        cap: '0.14em',
        stamp: '0.22em',
      },
      maxWidth: {
        container: '1360px',
      },
      transitionTimingFunction: {
        precise: 'cubic-bezier(0.16, 1, 0.3, 1)',
        snap: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      boxShadow: {
        panel:
          '0 0 0 1px var(--line), 0 1px 0 0 rgba(255,255,255,0.02) inset, 0 30px 60px -20px rgba(0,0,0,0.6)',
        'panel-glow':
          '0 0 0 1px var(--line-2), 0 40px 80px -20px rgba(242, 109, 80, 0.15), 0 1px 0 0 rgba(255,255,255,0.03) inset',
      },
      backgroundImage: {
        iridescent:
          'radial-gradient(ellipse 900px 500px at 15% 20%, var(--irid-1), transparent 55%),' +
          'radial-gradient(ellipse 800px 500px at 85% 0%, var(--irid-2), transparent 55%),' +
          'radial-gradient(ellipse 700px 600px at 60% 60%, var(--irid-3), transparent 60%),' +
          'radial-gradient(ellipse 700px 600px at 100% 100%, var(--irid-4), transparent 60%)',
      },
    },
  },
  plugins: [],
}

export default config
