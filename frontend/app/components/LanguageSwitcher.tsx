"use client"

import React from 'react'
import { useLanguage } from '../i18n/LanguageProvider'

type Props = {
  compact?: boolean
  mobile?: boolean
}

export default function LanguageSwitcher({ compact = false, mobile = false }: Props) {
  const { locale, setLocale } = useLanguage()
  const toggleLocale = () => setLocale(locale === 'es' ? 'en' : 'es')
  // Ensure touch targets >= 44px and readable labels on mobile
  const base = compact ? 'w-10 h-10 flex items-center justify-center text-sm rounded-full' : 'px-4 py-2 text-sm min-w-[48px]'

  // Mobile single-button variant (use when space is tight)
  if (mobile) {
    return (
      <button
        onClick={toggleLocale}
        className={`w-full h-full rounded-full flex items-center justify-center ${locale === 'es' ? 'bg-[#1da1f2] text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'} shadow-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1da1f2] transition-colors duration-150`}
        aria-pressed={true}
        aria-label={locale === 'es' ? 'Idioma: Español (tocar para cambiar a inglés)' : 'Language: English (tap to switch to Spanish)'}
        title={locale === 'es' ? 'Español' : 'English'}
      >
        <span className="font-medium">{locale === 'es' ? 'ES' : 'EN'}</span>
      </button>
    )
  }

  return (
    <div className={`inline-flex ${compact ? 'items-center gap-2' : 'items-center rounded-full overflow-hidden bg-white/70 dark:bg-slate-900/60 shadow-sm'} `}>
      <button
        onClick={() => setLocale('es')}
        className={`${base} ${locale === 'es' ? 'bg-[#1da1f2] text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'} transition-colors duration-150 shadow-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1da1f2]`}
        aria-pressed={locale === 'es'}
        aria-label={locale === 'es' ? 'Idioma: Español (activo)' : 'Switch to Spanish'}
        title={locale === 'es' ? 'Español' : 'Spanish'}
      >
        <span className="font-medium">ES</span>
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`${base} ${locale === 'en' ? 'bg-[#1da1f2] text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'} transition-colors duration-150 shadow-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1da1f2]`}
        aria-pressed={locale === 'en'}
        aria-label={locale === 'en' ? 'Language: English (active)' : 'Switch to English'}
        title={locale === 'en' ? 'English' : 'Inglés'}
      >
        <span className="font-medium">EN</span>
      </button>
    </div>
  )
}
