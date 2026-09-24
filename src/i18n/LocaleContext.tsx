'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { dict, type Locale, type Dict } from './dictionaries'
import { useContentOverride } from './ContentContext'

interface LocaleContextValue {
  locale: Locale
  t: Dict
  setLocale: (l: Locale) => void
  toggle: () => void
}

const LocaleContext = createContext<Omit<LocaleContextValue, 't'> | null>(null)

const STORAGE_KEY = 'er.locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
      if (saved === 'en' || saved === 'ar') setLocaleState(saved)
    } catch {}
  }, [])

  useEffect(() => {
    const html = document.documentElement
    html.lang = locale
    html.dir = locale === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {}
  }, [locale])

  const setLocale = (l: Locale) => setLocaleState(l)
  const toggle = () => setLocaleState((l) => (l === 'en' ? 'ar' : 'en'))

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  const override = useContentOverride()
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  const t = override ? override[ctx.locale] : dict[ctx.locale]
  return { ...ctx, t }
}
