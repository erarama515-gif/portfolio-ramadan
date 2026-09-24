'use client'
import { createContext, ReactNode, useContext } from 'react'
import type { Dict, Locale } from './dictionaries'

/**
 * Optional override for the copy that useLocale() returns.
 * When present, the site consumes CMS-fetched content per locale;
 * when absent, useLocale falls back to the compiled dictionary.
 */
const ContentContext = createContext<Record<Locale, Dict> | null>(null)

export function ContentProvider({
  children,
  content,
}: {
  children: ReactNode
  content: Record<Locale, Dict>
}) {
  return (
    <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
  )
}

export function useContentOverride() {
  return useContext(ContentContext)
}
