/* Payload admin owns its own layout — this file exists only so the
 * (payload) route group has a valid root layout without pulling in
 * the marketing site's fonts and providers. */
import type { Metadata } from 'next'
import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'

import '@payloadcms/next/css'

export const metadata: Metadata = {
  title: 'Admin · Eslam Ramadan',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return RootLayout({ config, importMap, children })
}
