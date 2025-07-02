import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DiagnosticoFormProps {
  onSubmit: (form: any) => void;
  isLoading: boolean;
  resetForm?: boolean; // Prop para reiniciar el formulario
  onReset?: () => void; // Callback cuando se reinicia
}

const initialForm = {
  fiebre: '',
  tos: '',
  dolor_toracico: '',
  falta_de_aire: '',
  sibilancias: false,
  pecho_apretado: false,
  malestar_general: false,
  confusion: false,
  edad: '',
  fumador: '',
  antecedentes_asma: false,
  antecedentes_alergias: false,
};

export default function DiagnosticoForm({ onSubmit, isLoading, resetForm, onReset }: DiagnosticoFormProps) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);

  // Efecto para reiniciar el formulario cuando se solicite
  useEffect(() => {
    if (resetForm) {
      setForm(initialForm);
      setError(null);
      onReset?.(); // Notificar que se completó el reset
    }
  }, [resetForm, onReset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const datos = {
        ...form,
        fiebre: parseFloat(form.fiebre),
        edad: parseInt(form.edad),
        sibilancias: Boolean(form.sibilancias),
        pecho_apretado: Boolean(form.pecho_apretado),
        malestar_general: Boolean(form.malestar_general),
        confusion: Boolean(form.confusion),
        antecedentes_asma: Boolean(form.antecedentes_asma),
        antecedentes_alergias: Boolean(form.antecedentes_alergias),
      };
      await onSubmit(datos);
    } catch (err) {
      setError('Error al obtener diagnóstico');
    }
  };

  return (
    <motion.div
      className="medical-card p-2 sm:p-4 md:p-6 lg:p-8 max-w-full md:max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="bg-blue-100 p-2 rounded-lg mr-3" />
        Complete el formulario para obtener el diagnóstico
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block w-full">
            Fiebre (°C):
            <input type="number" step="0.1" name="fiebre" value={form.fiebre} onChange={handleChange} required disabled={isLoading} className="medical-input mt-1 w-full" />
          </label>
          <label className="block w-full">
            Tos:
            <select name="tos" value={form.tos} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">Seleccione</option>
              <option value="seca">Seca</option>
              <option value="con_flema_transparente_verdosa">Con flema transparente/verdosa</option>
              <option value="con_flema_purulenta_sangre">Con flema purulenta/sangre</option>
              <option value="ninguna">Ninguna</option>
            </select>
          </label>
          <label className="block w-full">
            Dolor torácico:
            <select name="dolor_toracico" value={form.dolor_toracico} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">Seleccione</option>
              <option value="ninguno">Ninguno</option>
              <option value="molestia_leve">Molestia leve</option>
              <option value="puntada_al_respirar">Puntada al respirar/toser</option>
            </select>
          </label>
          <label className="block w-full">
            Falta de aire (disnea):
            <select name="falta_de_aire" value={form.falta_de_aire} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">Seleccione</option>
              <option value="ninguna">Ninguna</option>
              <option value="repentina">Repentina</option>
              <option value="empeora_con_anios">Empeora con los años</option>
              <option value="al_caminar_rapido">Al caminar rápido</option>
              <option value="agotado">Agotado/en reposo</option>
            </select>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="sibilancias" checked={form.sibilancias} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>¿Silbido al respirar (sibilancias)?</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="pecho_apretado" checked={form.pecho_apretado} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>¿Sensación de pecho apretado?</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="malestar_general" checked={form.malestar_general} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>¿Malestar general / cansancio?</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="confusion" checked={form.confusion} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>¿Confusión / desorientación?</span>
          </label>
          <label className="block w-full">
            Edad:
            <input type="number" name="edad" value={form.edad} onChange={handleChange} required disabled={isLoading} className="medical-input mt-1 w-full" />
          </label>
          <label className="block w-full">
            Hábito de fumar:
            <select name="fumador" value={form.fumador} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">Seleccione</option>
              <option value="no">No fumador</option>
              <option value="ex_fumador">Ex-fumador</option>
              <option value="si_activo">Fumador activo</option>
              <option value="de_toda_la_vida">Fumador de toda la vida</option>
            </select>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="antecedentes_asma" checked={form.antecedentes_asma} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>¿Antecedentes de asma?</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="antecedentes_alergias" checked={form.antecedentes_alergias} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>¿Antecedentes de alergias/rinitis?</span>
          </label>
        </div>
        <div className="pt-4">
          <button type="submit" disabled={isLoading} className="medical-button w-full text-base py-3">
            {isLoading ? 'Obteniendo diagnóstico...' : 'Obtener diagnóstico'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </motion.div>
  );
}
