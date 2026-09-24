import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { LocaleProvider } from '@/i18n/LocaleContext'
import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const display = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '500', '700'],
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['300', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eslam Ramadan · Digital Business Architect',
  description:
    'I build digital products, business systems and intelligent automations. ERP · CRM · POS · SaaS · AI Automation.',
  metadataBase: new URL('https://ramadan.dev'),
  openGraph: {
    type: 'website',
    title: 'Eslam Ramadan · Digital Business Architect',
    description:
      'From business problems to digital systems. ERP · CRM · POS · SaaS · AI Automation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eslam Ramadan · Digital Business Architect',
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
      className={`${sans.variable} ${display.variable} ${mono.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink text-fg antialiased noise">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
