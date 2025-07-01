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
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Gravedad:</span>
                    <span className={`medical-badge ${getSeverityClass(result.gravedad)}`}>
                      {result.gravedad}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Explicación */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
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
                  // Etiquetas amigables para los síntomas
                  const etiquetas: Record<string, string> = {
                    'Fiebre': 'Fiebre (°C)',
                    'Tos': 'Tos',
                    'Dolor toracico': 'Dolor torácico',
                    'Falta de aire': 'Falta de aire (disnea)',
                    'Sibilancias': '¿Silbido al respirar (sibilancias)?',
                    'Pecho apretado': '¿Sensación de pecho apretado?',
                    'Malestar general': '¿Malestar general / cansancio?',
                    'Confusion': '¿Confusión / desorientación?',
                    'Edad': 'Edad',
                    'Fumador': 'Hábito de fumar',
                    'Antecedentes asma': '¿Antecedentes de asma?',
                    'Antecedentes alergias': '¿Antecedentes de alergias/rinitis?'
                  };
                  return (
                    <>
                      <div className="mb-2 text-blue-900 whitespace-pre-line">{cabecera.trim()}</div>
                      <ul className="mb-3 list-disc list-inside text-blue-900">
                        {sintomas.map((s, idx) => {
                          const [campo, valorRaw] = s.replace('- ', '').split(':').map(x => x.trim());
                          let valor = valorRaw;
                          if (valor === 'True') valor = 'Sí';
                          else if (valor === 'False') valor = 'No';
                          return (
                            <li key={idx}><span className="font-semibold">{etiquetas[campo] || campo}:</span> {valor}</li>
                          );
                        })}
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
                  // Nuevo: parsear condiciones para mostrar con iconos y colores
                  const parseCondicion = (cond: string) => {
                    // Ejemplo: "sibilancias = True (sibilancias == True)"
                    const match = cond.match(/(.+?) = (.+?) \((.+?)\)/);
                    if (!match) return { hecho: cond, valor: '', esperado: '', cumple: true };
                    const hecho = match[1].trim();
                    const valor = match[2].trim();
                    const esperadoMatch = match[3].match(/== (.+)/) || match[3].match(/uno de (\[.*\])/);
                    let esperado = esperadoMatch ? esperadoMatch[1] : match[3];
                    // Determinar si cumple (solo para == y in)
                    let cumple = false;
                    if (match[3].includes('==')) {
                      cumple = valor === esperado || valor === 'Sí' && esperado === 'True' || valor === 'No' && esperado === 'False';
                    } else if (match[3].includes('uno de')) {
                      try {
                        const arr = JSON.parse(esperado.replace(/'/g, '"'));
                        cumple = arr.includes(valor);
                      } catch { cumple = false; }
                    }
                    return { hecho, valor, esperado, cumple };
                  };
                  const todasCumplen = condiciones.every((cond) => parseCondicion(cond).cumple);
                  return (
                    <>
                      {!todasCumplen && (
                        <ul className="mb-3 space-y-2">
                          {condiciones.map((cond, idx) => {
                            const { hecho, valor, esperado, cumple } = parseCondicion(cond);
                            let valorMostrar = valor === 'True' ? 'Sí' : valor === 'False' ? 'No' : valor;
                            let esperadoMostrar = esperado === 'True' ? 'Sí' : esperado === 'False' ? 'No' : esperado;
                            if (Array.isArray(esperadoMostrar) || (typeof esperadoMostrar === 'string' && esperadoMostrar.startsWith('['))) {
                              try {
                                const arr = typeof esperadoMostrar === 'string' ? JSON.parse(esperadoMostrar.replace(/'/g, '"')) : esperadoMostrar;
                                esperadoMostrar = arr.join(' o ');
                              } catch {}
                            }
                            return (
                              <li key={idx} className={`flex flex-wrap items-center gap-2 p-2 rounded-lg ${cumple ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'}`}>
                                {cumple ? (
                                  <span className="text-green-600 font-bold">✔️</span>
                                ) : (
                                  <span className="text-red-600 font-bold">❌</span>
                                )}
                                <span className="font-semibold text-gray-800">{hecho}:</span>
                                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs">{valorMostrar}</span>
                                {esperadoMostrar && (
                                  <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs">Valor esperado: {esperadoMostrar}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
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
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
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
              className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-500 hover:to-blue-700 transition-all duration-200 mt-2"
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
