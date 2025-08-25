"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

import en from '../../locales/en.json'
import es from '../../locales/es.json'

type Locale = 'es' | 'en'

const resources: Record<Locale, any> = {
  es,
  en,
}

type LanguageContextType = {
  locale: Locale
  t: (path: string) => string
  setLocale: (l: Locale) => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'es',
  t: (path: string) => path,
  setLocale: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es')

  useEffect(() => {
    // cargar preferencia si existe
    try {
      const stored = localStorage.getItem('locale') as Locale | null
      if (stored && (stored === 'es' || stored === 'en')) setLocale(stored)
    } catch (e) {}
  }, [])

  const t = (path: string) => {
    const parts = path.split('.')
    let cur: any = resources[locale]
    for (const p of parts) {
      if (!cur) return path
      cur = cur[p]
    }
    return typeof cur === 'string' ? cur : path
  }

  const setLocaleAndStore = (l: Locale) => {
    setLocale(l)
    try { localStorage.setItem('locale', l) } catch (e) {}
    try {
      // set a cookie so server-side can read the preferred locale for metadata
      document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}`
    } catch (e) {}
  }

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale: setLocaleAndStore }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
