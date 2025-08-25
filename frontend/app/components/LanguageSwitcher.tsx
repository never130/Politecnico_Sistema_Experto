"use client"

import React from 'react'
import { useLanguage } from '../i18n/LanguageProvider'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  return (
    <div className="inline-flex items-center space-x-2">
      <button onClick={() => setLocale('es')} className={`px-2 py-1 rounded ${locale === 'es' ? 'bg-[#1da1f2] text-white' : 'bg-transparent text-[#1a2733]'}`}>
        ES
      </button>
      <button onClick={() => setLocale('en')} className={`px-2 py-1 rounded ${locale === 'en' ? 'bg-[#1da1f2] text-white' : 'bg-transparent text-[#1a2733]'}`}>
        EN
      </button>
    </div>
  )
}
