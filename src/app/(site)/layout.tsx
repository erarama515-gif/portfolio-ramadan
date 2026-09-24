import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import {
  Instrument_Serif,
  IBM_Plex_Sans_Arabic,
  Amiri,
} from 'next/font/google'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LocaleProvider } from '@/i18n/LocaleContext'
import { ContentProvider } from '@/i18n/ContentContext'
import { loadAllContent } from '@/lib/content-loader'
import '../globals.css'

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-arabic',
  display: 'swap',
})

const arabicSerif = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic-serif',
  display: 'swap',
})

const FALLBACK_META = {
  title: 'Eslam Ramadan — Digital Business Architect',
  description:
    'From business problems to digital systems. ERP · CRM · POS · SaaS · AI Automation.',
  keywords:
    'Eslam Ramadan, portfolio, digital business, ERP, POS, SaaS, automation',
}

export async function generateMetadata(): Promise<Metadata> {
  let title = FALLBACK_META.title
  let description = FALLBACK_META.description
  let keywords = FALLBACK_META.keywords

  try {
    const payload = await getPayload({ config })
    const settings = (await payload
      .findGlobal({ slug: 'settings', locale: 'en' })
      .catch(() => null)) as any
    if (settings?.siteTitle) title = settings.siteTitle
    if (settings?.siteDescription) description = settings.siteDescription
    if (settings?.keywords) keywords = settings.keywords
  } catch {
    // fall through to defaults
  }

  const url = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(url),
    openGraph: {
      type: 'website',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = await loadAllContent()

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable} ${arabic.variable} ${arabicSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-fg antialiased selection:bg-accent selection:text-bg">
        <LocaleProvider>
          <ContentProvider content={content}>{children}</ContentProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
