"use client"

import React from 'react'
import { useLanguage } from '../i18n/LanguageProvider'

type Props = {
  compact?: boolean
}

export default function LanguageSwitcher({ compact = false }: Props) {
  const { locale, setLocale } = useLanguage()
  const base = compact ? 'px-2 py-0.5 text-sm' : 'px-3 py-1 text-sm'
  return (
    <div className="inline-flex items-center rounded-full overflow-hidden border border-transparent">
      <button
        onClick={() => setLocale('es')}
        className={`${base} ${locale === 'es' ? 'bg-[#1da1f2] text-white' : 'bg-transparent text-slate-700 dark:text-slate-200'} transition-colors duration-150`}
        aria-pressed={locale === 'es'}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`${base} ${locale === 'en' ? 'bg-[#1da1f2] text-white' : 'bg-transparent text-slate-700 dark:text-slate-200'} transition-colors duration-150`}
        aria-pressed={locale === 'en'}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}
