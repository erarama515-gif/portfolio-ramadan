import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { LocaleProvider } from '@/i18n/LocaleContext'
import './globals.css'

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eslam Ramadan — Digital Business Architect',
  description:
    'From business problems to digital systems. ERP · CRM · POS · SaaS · AI Automation.',
  metadataBase: new URL('https://ramadan.dev'),
  openGraph: {
    type: 'website',
    title: 'Eslam Ramadan — Digital Business Architect',
    description:
      'From business problems to digital systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eslam Ramadan — Digital Business Architect',
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-fg antialiased selection:bg-accent selection:text-bg">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
