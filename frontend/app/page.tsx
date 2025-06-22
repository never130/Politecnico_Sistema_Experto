'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon, UserIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import DiagnosticForm from './components/DiagnosticForm'
import ResultCard from './components/ResultCard'

interface DiagnosticResult {
  diagnostico: string
  gravedad: string
  explicacion: string
}

export default function Home() {
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDiagnostic = async (formData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/diagnosticar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <HeartIcon className="h-12 w-12 text-medical-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sistema Experto para Diagnóstico Respiratorio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Basado en el conocimiento de un agente experto
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Tierra del Fuego, Argentina
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <div className="medical-card text-center">
            <UserIcon className="h-8 w-8 text-medical-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Atención Primaria</h3>
            <p className="text-sm text-gray-600">Apoyo a la toma de decisiones</p>
          </div>
          <div className="medical-card text-center">
            <ClipboardDocumentListIcon className="h-8 w-8 text-medical-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">7 Enfermedades</h3>
            <p className="text-sm text-gray-600">Sistema experto completo</p>
          </div>
          <div className="medical-card text-center">
            <HeartIcon className="h-8 w-8 text-medical-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">95% Precisión</h3>
            <p className="text-sm text-gray-600">Basado en ML + Reglas</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DiagnosticForm onSubmit={handleDiagnostic} isLoading={isLoading} />
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ResultCard result={result} isLoading={isLoading} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
