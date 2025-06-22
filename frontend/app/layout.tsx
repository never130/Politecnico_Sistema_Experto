import type { Metadata } from 'next'
import './globals.css'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Sistema Experto - Diagnóstico Respiratorio',
  description: 'Sistema experto para el diagnóstico de enfermedades respiratorias en Tierra del Fuego',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col antialiased">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
