'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface DiagnosticFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export default function DiagnosticForm({ onSubmit, isLoading }: DiagnosticFormProps) {
  const [formData, setFormData] = useState({
    tos: '',
    fiebre: 36.5,
    dolor_toracico: '',
    falta_de_aire: '',
    sibilancias: false,
    pecho_apretado: false,
    malestar_general: false,
    confusion: false,
    edad: 30,
    fumador: '',
    antecedentes_asma: false,
    antecedentes_alergias: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <motion.div 
      className="medical-card"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <div className="bg-medical-100 p-2 rounded-lg mr-3">
          <PaperAirplaneIcon className="h-6 w-6 text-medical-600" />
        </div>
        Evaluación Clínica
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Tos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Tos
          </label>
          <select
            className="medical-select"
            value={formData.tos}
            onChange={(e) => handleChange('tos', e.target.value)}
            required
          >
            <option value="">Seleccione el tipo de tos</option>
            <option value="seca">Tos Seca</option>
            <option value="con_flema_transparente_verdosa">Con Flema (Transparente/Verdosa)</option>
            <option value="con_flema_purulenta_sangre">Con Flema (Purulenta/Sangre)</option>
          </select>
        </div>

        {/* Fiebre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fiebre (°C)
          </label>
          <input
            type="number"
            step="0.1"
            min="35"
            max="42"
            className="medical-input"
            value={formData.fiebre}
            onChange={(e) => handleChange('fiebre', parseFloat(e.target.value))}
          />
        </div>

        {/* Dolor Torácico */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dolor Torácico
          </label>
          <select
            className="medical-select"
            value={formData.dolor_toracico}
            onChange={(e) => handleChange('dolor_toracico', e.target.value)}
            required
          >
            <option value="">Seleccione el tipo de dolor</option>
            <option value="no_dolor">Sin Dolor</option>
            <option value="opresivo_general">Opresivo/General</option>
            <option value="puntada_al_respirar">Puntada al Respirar/Toser</option>
          </select>
        </div>

        {/* Falta de Aire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Falta de Aire (Disnea)
          </label>
          <select
            className="medical-select"
            value={formData.falta_de_aire}
            onChange={(e) => handleChange('falta_de_aire', e.target.value)}
            required
          >
            <option value="">Seleccione el nivel de disnea</option>
            <option value="no_disnea">Sin Dificultad</option>
            <option value="leve_actividad">Leve (Solo con Actividad)</option>
            <option value="moderada_caminar">Moderada (al Caminar)</option>
            <option value="repentina">Repentina/Súbita</option>
            <option value="empeora_con_anios">Empeora con los Años</option>
            <option value="agotado">Agotado/En Reposo</option>
          </select>
        </div>

        {/* Checkboxes en Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sibilancias"
                className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                checked={formData.sibilancias}
                onChange={(e) => handleChange('sibilancias', e.target.checked)}
              />
              <label htmlFor="sibilancias" className="ml-2 text-sm text-gray-700">
                ¿Silbido al respirar (sibilancias)?
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="pecho_apretado"
                className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                checked={formData.pecho_apretado}
                onChange={(e) => handleChange('pecho_apretado', e.target.checked)}
              />
              <label htmlFor="pecho_apretado" className="ml-2 text-sm text-gray-700">
                ¿Sensación de pecho apretado?
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="malestar_general"
                className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                checked={formData.malestar_general}
                onChange={(e) => handleChange('malestar_general', e.target.checked)}
              />
              <label htmlFor="malestar_general" className="ml-2 text-sm text-gray-700">
                ¿Malestar general / Cansancio?
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="confusion"
                className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                checked={formData.confusion}
                onChange={(e) => handleChange('confusion', e.target.checked)}
              />
              <label htmlFor="confusion" className="ml-2 text-sm text-gray-700">
                ¿Confusión / Desorientación?
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="antecedentes_asma"
                className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                checked={formData.antecedentes_asma}
                onChange={(e) => handleChange('antecedentes_asma', e.target.checked)}
              />
              <label htmlFor="antecedentes_asma" className="ml-2 text-sm text-gray-700">
                ¿Antecedentes de Asma?
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="antecedentes_alergias"
                className="h-4 w-4 text-medical-600 focus:ring-medical-500 border-gray-300 rounded"
                checked={formData.antecedentes_alergias}
                onChange={(e) => handleChange('antecedentes_alergias', e.target.checked)}
              />
              <label htmlFor="antecedentes_alergias" className="ml-2 text-sm text-gray-700">
                ¿Antecedentes de Alergias/Rinitis?
              </label>
            </div>
          </div>
        </div>

        {/* Edad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edad
          </label>
          <input
            type="number"
            min="1"
            max="120"
            className="medical-input"
            value={formData.edad}
            onChange={(e) => handleChange('edad', parseInt(e.target.value))}
          />
        </div>

        {/* Hábito de Fumar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hábito de Fumar
          </label>
          <select
            className="medical-select"
            value={formData.fumador}
            onChange={(e) => handleChange('fumador', e.target.value)}
            required
          >
            <option value="">Seleccione el hábito de fumar</option>
            <option value="nunca_fumo">Nunca Fumó</option>
            <option value="ex_fumador">Ex-Fumador</option>
            <option value="ocasional">Ocasional</option>
            <option value="de_toda_la_vida">Fumador de Toda la Vida</option>
          </select>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="medical-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Analizando...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              Obtener Diagnóstico
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
