/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Tajawal', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#06050a',
          1: '#0a0908',
          2: '#100c08',
          3: '#1a140d',
        },
        gold: {
          DEFAULT: '#c8a96a',
          bright: '#d4af37',
          deep: '#8a6d3a',
        },
        accent: {
          warm: '#b87333',
          deep: '#6b4423',
          blood: '#8b1a1a',
        },
        text: {
          DEFAULT: '#ece5d6',
          dim: '#8c8377',
          faint: '#5a534a',
        },
      },
      animation: {
        'grid-shift': 'gridShift 28s linear infinite',
        'glow-pulse': 'glowPulse 5s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'spin-slow': 'spin 6s linear infinite',
        'blink': 'blink 1s infinite',
        'fade-up': 'fadeUp .85s cubic-bezier(.22,1,.36,1) both',
      },
      keyframes: {
        gridShift: { to: { backgroundPosition: '64px 64px' } },
        glowPulse: { '0%,100%': { opacity: '.55', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.12)' } },
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '50%': { opacity: '0' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
