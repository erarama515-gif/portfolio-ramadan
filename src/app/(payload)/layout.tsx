/* Payload admin owns its own layout — isolated from the marketing
 * site's fonts and providers. */
import type { Metadata } from 'next'
import type { ServerFunctionClient } from 'payload'

import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'

import { importMap } from './admin/importMap'

import '@payloadcms/next/css'

export const metadata: Metadata = {
  title: 'Admin · Eslam Ramadan',
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return RootLayout({
    config,
    importMap,
    serverFunction,
    children,
  })
}
