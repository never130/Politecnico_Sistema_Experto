'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon, UserIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import DiagnosticoForm from './components/DiagnosticoForm'
import ResultCard from './components/ResultCard'
import ReglasManager from './components/ReglasManager'
import { obtenerDiagnostico } from './api/diagnostico'

interface DiagnosticResult {
  diagnostico: string
  explicacion: string
  regla_disparada: string
}

export default function Home() {
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resetForm, setResetForm] = useState(false)

  const handleDiagnostic = async (formData: any) => {
    setIsLoading(true)
    try {
      const data = await obtenerDiagnostico(formData)
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewConsultation = () => {
    setResult(null)
    setIsLoading(false)
    setResetForm(true) // Solicitar reset del formulario
  }

  const handleFormReset = () => {
    setResetForm(false) // Resetear la bandera después de que el formulario se reinicie
  }
  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-white p-3 sm:p-4 rounded-full shadow-lg">
              <HeartIcon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-medical-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 px-2">
            Sistema Experto para Diagnóstico Respiratorio
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Basado en el conocimiento de un agente experto
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">
            Tierra del Fuego, Argentina
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10"
        >
          <div className="medical-card text-center p-4 sm:p-6">
            <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 text-medical-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Atención Primaria</h3>
            <p className="text-xs sm:text-sm text-gray-600">Apoyo a la toma de decisiones</p>
          </div>
          <div className="medical-card text-center p-4 sm:p-6">
            <ClipboardDocumentListIcon className="h-6 w-6 sm:h-8 sm:w-8 text-medical-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">7 Enfermedades</h3>
            <p className="text-xs sm:text-sm text-gray-600">Sistema experto completo</p>
          </div>
          <div className="medical-card text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <HeartIcon className="h-6 w-6 sm:h-8 sm:w-8 text-medical-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">95% Precisión</h3>
            <p className="text-xs sm:text-sm text-gray-600">Basado en ML + Reglas</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="order-2 xl:order-1"
          >
            <DiagnosticoForm 
              onSubmit={handleDiagnostic} 
              isLoading={isLoading}
              resetForm={resetForm}
              onReset={handleFormReset}
            />
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="order-1 xl:order-2"
          >
            <ResultCard 
              result={result} 
              isLoading={isLoading} 
              onNewConsultation={handleNewConsultation}
            />
          </motion.div>
        </div>
      </div>
      {/* Sección de gestión de reglas con imagen al lado derecho, perfectamente alineados y con medidas sincronizadas */}
      <div className="max-w-7xl mx-auto mt-10 sm:mt-14 lg:mt-20 mb-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Gestor de reglas, igual ancho que DiagnosticoForm */}
          <div className="order-2 xl:order-1 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <ReglasManager />
            </div>
          </div>
          {/* Imagen decorativa, igual ancho que ResultCard, animada y más alargada */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
            className="order-1 xl:order-2 hidden md:flex items-center justify-center w-full max-w-2xl mx-auto"
          >
            <img
              src="/image.jpeg"
              alt="Ilustración médica"
              className="rounded-2xl shadow-2xl object-cover w-full h-[420px] lg:h-[540px] xl:h-[620px] border border-blue-100 transition-all duration-300"
              style={{ minHeight: '420px', maxHeight: '620px' }}
              loading="lazy"
              draggable="false"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
