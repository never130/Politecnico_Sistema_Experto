"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageProvider'
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
  const { t } = useLanguage()
  const iconColor = '#1da1f2'
  const getSeverityIcon = () => <ClipboardDocumentCheckIcon className="h-6 w-6" style={{ color: iconColor }} />

  return (
    <motion.div 
      className="medical-card h-fit p-4 sm:p-6 lg:p-8 max-w-full md:max-w-2xl mx-auto"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
  <h2 className="text-2xl font-bold text-[#1a2733] dark:text-white mb-6 flex items-center">
        <div className="bg-transparent p-2 rounded-lg mr-3">
          <ClipboardDocumentCheckIcon className="h-6 w-6" style={{ color: iconColor }} />
        </div>
  {t('result.title')}
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
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-14 w-14 border-4 mx-auto mb-4" style={{borderColor:'#1da1f2', borderTopColor:'#0f91d6'}}></div>
              <p className="font-semibold" style={{color:'#1da1f2'}}>{t('result.analyzing')}</p>
              <p className="text-sm mt-2" style={{color:'#8899a6'}}>{t('result.applying')}</p>
            </div>
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
            <div className="rounded-xl p-4 sm:p-6 border border-transparent flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-none">
              <div className="flex-shrink-0">
                {getSeverityIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-[#1a2733] dark:text-white truncate">
                  {result.diagnostico}
                </h3>
                {result.gravedad && (
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-[#8899a6] dark:text-[#8899a6] mr-2">{t('result.severity_label')}</span>
                    <span className={`medical-badge`}>{t(`result.severity_values.${result.gravedad}`) || result.gravedad}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Explicación Simplificada */}
            <div className="rounded-xl p-4 sm:p-6 border border-transparent">
              <h4 className="font-semibold text-[#1a2733] dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="h-5 w-5 mr-2" style={{ color: iconColor }} />
                {t('result.title')}
              </h4>
              <div className="text-[#1a2733] dark:text-[#e6ecf0] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {result.explicacion}
              </div>
            </div>

            {/* Recomendación */}
            <div className="rounded-xl p-4 border border-transparent">
              <h4 className="font-semibold text-[#1a2733] dark:text-white mb-2">💡 {t('result.recommendation')}</h4>
              <p className="text-[#1a2733] dark:text-[#e6ecf0] text-sm">
                {result.gravedad === 'grave' 
                  ? t('result.recommendations.grave')
                  : result.gravedad === 'moderado'
                  ? t('result.recommendations.moderado')
                  : t('result.recommendations.leve')}
              </p>
            </div>

            {/* Botón Nueva Consulta */}
        {onNewConsultation && (
              <div className="flex justify-center pt-4">
                <motion.button
                  onClick={onNewConsultation}
                  className="medical-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  tabIndex={0}
                >
          🔄 {t('result.new_consultation')}
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
            <p>{t('result.empty')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
