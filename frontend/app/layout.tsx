import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import es from '../locales/es.json'
import en from '../locales/en.json'
import './globals.css'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import { LanguageProvider } from './i18n/LanguageProvider'

export function generateMetadata(): Metadata {
  try {
    const cookieStore = cookies()
    const locale = cookieStore.get('locale')?.value || 'es'
    const resources: Record<string, any> = { es, en }
    const res = resources[locale] || resources['es']
    return {
      title: res.title || 'Sistema Experto - Diagnóstico Respiratorio',
      description: res.description || 'Sistema experto para el diagnóstico de enfermedades respiratorias en Tierra del Fuego',
    }
  } catch (e) {
    return {
      title: 'Sistema Experto - Diagnóstico Respiratorio',
      description: 'Sistema experto para el diagnóstico de enfermedades respiratorias en Tierra del Fuego',
    }
  }
}

function InnerApp({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeToggle />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {/* LanguageProvider must wrap early; InnerApp reads locale */}
      <InnerApp>
        {children}
      </InnerApp>
    </LanguageProvider>
  )
}
