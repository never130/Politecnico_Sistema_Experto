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
    gravedad?: string // ahora opcional
  } | null
  isLoading: boolean
}

export default function ResultCard({ result, isLoading }: ResultCardProps) {
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
      className="medical-card h-fit p-4 sm:p-6 lg:p-8"
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center mb-3">
                {getSeverityIcon(result.gravedad)}
                <h3 className="text-xl font-bold text-gray-900 ml-3">
                  {result.diagnostico}
                </h3>
              </div>
              {result.gravedad && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Gravedad:</span>
                  <span className={`medical-badge ${getSeverityClass(result.gravedad)}`}>
                    {result.gravedad}
                  </span>
                </div>
              )}
            </div>

            {/* Explicación */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <InformationCircleIcon className="h-5 w-5 text-gray-600 mr-2" />
                Explicación del Diagnóstico
              </h4>
              {/* Explicación para ML y reglas */}
              {result.explicacion.includes('Síntomas analizados:') ? (
                (() => {
                  // Separar partes de la explicación ML
                  const [cabecera, ...resto] = result.explicacion.split('Síntomas analizados:');
                  const sintomasYnota = resto.join('Síntomas analizados:').split('Nota:');
                  const sintomas = sintomasYnota[0]
                    .split('\n')
                    .map(s => s.trim())
                    .filter(s => s.startsWith('- '));
                  const nota = sintomasYnota[1]?.trim();
                  return (
                    <>
                      <div className="mb-2 text-blue-900 whitespace-pre-line">{cabecera.trim()}</div>
                      <ul className="mb-3 list-disc list-inside text-blue-900">
                        {sintomas.map((s, idx) => (
                          <li key={idx}>{s.replace('- ', '')}</li>
                        ))}
                      </ul>
                      {nota && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-blue-800 mt-2">
                          {nota}
                        </div>
                      )}
                    </>
                  );
                })()
              ) : result.explicacion.includes('Se detectó:') ? (
                (() => {
                  // Separar condiciones y explicación médica
                  const partes = result.explicacion.split('Explicación médica:');
                  const condiciones = partes[0].replace('Se detectó:', '').replace(/\n/g, '').split(';').map(s => s.trim()).filter(Boolean);
                  const explicacionMedica = partes[1]?.trim();
                  return (
                    <>
                      <ul className="mb-3 list-disc list-inside text-blue-900">
                        {condiciones.map((cond, idx) => (
                          <li key={idx} className="mb-1"><span className="font-semibold">{cond}</span></li>
                        ))}
                      </ul>
                      {explicacionMedica && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-blue-800">
                          {explicacionMedica}
                        </div>
                      )}
                    </>
                  );
                })()
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{result.explicacion}</p>
              )}
            </div>

            {/* Recomendaciones */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mr-2" />
                Recomendaciones Importantes
              </h4>
              <ul className="text-amber-700 space-y-2 text-sm">
                <li>• Este sistema es una herramienta de apoyo diagnóstico</li>
                <li>• Siempre consulte con un profesional médico</li>
                <li>• En caso de gravedad, busque atención médica inmediata</li>
                <li>• Mantenga un registro de síntomas para seguimiento</li>
              </ul>
            </div>

            {/* Botón Nueva Consulta */}
            <motion.button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Nueva Consulta
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <ClipboardDocumentCheckIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Esperando evaluación</p>
            <p className="text-sm mt-2">Complete el formulario para obtener el diagnóstico</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
