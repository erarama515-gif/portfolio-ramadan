import type { Metadata } from 'next'
import {
  Instrument_Serif,
  Instrument_Sans,
  JetBrains_Mono,
  Noto_Naskh_Arabic,
  Amiri,
} from 'next/font/google'
import { LocaleProvider } from '@/i18n/LocaleContext'
import './globals.css'

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const arabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

const arabicSerif = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eslam Ramadan — Digital Business Architect',
  description:
    'From business problems to digital systems. Selected works: ERP · CRM · POS · SaaS · AI Automation.',
  metadataBase: new URL('https://ramadan.dev'),
  openGraph: {
    type: 'website',
    title: 'Eslam Ramadan — Digital Business Architect',
    description:
      'From business problems to digital systems. ERP · CRM · POS · SaaS · AI Automation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eslam Ramadan — Digital Business Architect',
    description:
      'From business problems to digital systems. ERP · CRM · POS · SaaS · AI Automation.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${arabic.variable} ${arabicSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
