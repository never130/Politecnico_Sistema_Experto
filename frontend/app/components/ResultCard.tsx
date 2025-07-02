'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  ClipboardDocumentCheckIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline'

interface ResultCardProps {
  result: {
    diagnostico: string
    explicacion: string
    gravedad?: string
  } | null
  isLoading: boolean
  onNewConsultation?: () => void // Agregar función para nueva consulta
}

export default function ResultCard({ result, isLoading, onNewConsultation }: ResultCardProps) {
  const getSeverityIcon = (gravedad?: string) => {
    switch (gravedad?.toLowerCase()) {
      case 'grave':
        return <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
      case 'moderado':
        return <InformationCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
      case 'leve':
        return <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
      default:
        return <ClipboardDocumentCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
    }
  }

  const getSeverityClass = (gravedad?: string) => {
    switch (gravedad?.toLowerCase()) {
      case 'grave':
        return 'severity-grave'
      case 'moderado':
        return 'severity-moderado'
      case 'leve':
        return 'severity-leve'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div 
      className="medical-card h-fit p-4 sm:p-6 lg:p-8 max-w-full md:max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <div className="bg-green-100 p-2 rounded-lg mr-3">
          <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-600" />
        </div>
        Resultado del Diagnóstico
      </h2>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analizando síntomas...</p>
            <p className="text-sm text-gray-500 mt-2">Aplicando conocimiento experto</p>
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Diagnóstico Principal */}
            <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-indigo-100 rounded-lg p-4 sm:p-6 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0">
                {getSeverityIcon(result.gravedad)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 truncate">
                  {result.diagnostico}
                </h3>
                {result.gravedad && (
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 mr-2">Gravedad:</span>
                    <span className={`medical-badge ${getSeverityClass(result.gravedad)}`}>
                      {result.gravedad}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Explicación Simplificada */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <InformationCircleIcon className="h-5 w-5 text-gray-600 mr-2" />
                Explicación del Diagnóstico
              </h4>
              <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {result.explicacion}
              </div>
            </div>

            {/* Recomendación */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Recomendación</h4>
              <p className="text-blue-800 text-sm">
                {result.gravedad === 'grave' 
                  ? "🚨 Busque atención médica inmediata. Diríjase al centro de salud más cercano."
                  : result.gravedad === 'moderado'
                  ? "⚠️ Se recomienda consultar con un profesional de la salud para confirmar el diagnóstico."
                  : "✅ Generalmente manejable con cuidados caseros. Consulte si los síntomas empeoran."}
              </p>
            </div>

            {/* Botón Nueva Consulta */}
            {onNewConsultation && (
              <div className="flex justify-center pt-4">
                <motion.button
                  onClick={onNewConsultation}
                  className="medical-button bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🔄 Nueva Consulta
                </motion.button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <ClipboardDocumentCheckIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Complete el formulario para obtener un diagnóstico</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
