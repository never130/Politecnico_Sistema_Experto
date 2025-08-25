
"use client"

import { HeartIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../i18n/LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-white dark:bg-[#15202b] border-t border-transparent mt-8 sm:mt-16 w-full">
      <div className="max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-sm">
        <div className="flex items-center text-[#1a2733] dark:text-white">
          <HeartIcon className="h-4 w-4 text-[#1da1f2] mr-2" />
          <span className="font-medium">{t('footer.title')}</span>
          <span className="mx-2 text-[#8899a6]">•</span>
          <span className="text-[#1da1f2]">{t('footer.location')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#1a2733] dark:text-[#e6ecf0]">
            {t('footer.developed_by')} <span className="font-semibold text-[#1da1f2]">Ever Loza</span>
          </span>
          <a 
            href="https://everloza-porfolio.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 bg-[#1da1f2] text-white rounded font-medium text-xs hover:bg-[#1a8cd8] transition-all duration-200"
          >
            {t('footer.portfolio')}
          </a>
        </div>
        <div className="text-[#8899a6] dark:text-[#8899a6] text-xs">
          <span className="font-medium">{t('footer.project')}</span>
          <span className="mx-2">•</span>
          <span>{t('footer.institution')}</span>
        </div>
      </div>
    </footer>
  )
}
