import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageProvider'
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
  const { t } = useLanguage()

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
      setError(t('form.error_fetching'));
    }
  };

  return (
    <motion.div
      className="medical-card p-2 sm:p-4 md:p-6 lg:p-8 max-w-full md:max-w-2xl mx-auto bg-[#f7fafd] dark:bg-[#15202b] border border-gray-200 dark:border-[#22303c] rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
  <h2 className="text-2xl font-bold text-[#1a2733] dark:text-white mb-6 flex items-center">
        <span className="bg-[#e8f5fe] dark:bg-[#22303c] p-2 rounded-lg mr-3">
          <svg width='24' height='24' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='#1da1f2' /></svg>
        </span>
  {t('form.header')}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block w-full">
            {t('form.fiebre')}
            <input type="number" step="0.1" name="fiebre" value={form.fiebre} onChange={handleChange} required disabled={isLoading} className="medical-input mt-1 w-full" />
          </label>
          <label className="block w-full">
            {t('form.tos')}
            <select name="tos" value={form.tos} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">{t('form.select')}</option>
              <option value="seca">{t('form.options.tos.seca')}</option>
              <option value="con_flema_transparente_verdosa">{t('form.options.tos.con_flema_transparente_verdosa')}</option>
              <option value="con_flema_purulenta_sangre">{t('form.options.tos.con_flema_purulenta_sangre')}</option>
              <option value="ninguna">{t('form.options.tos.ninguna')}</option>
            </select>
          </label>
          <label className="block w-full">
            {t('form.dolor_toracico')}
            <select name="dolor_toracico" value={form.dolor_toracico} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">{t('form.select')}</option>
              <option value="ninguno">{t('form.options.dolor_toracico.ninguno')}</option>
              <option value="molestia_leve">{t('form.options.dolor_toracico.molestia_leve')}</option>
              <option value="puntada_al_respirar">{t('form.options.dolor_toracico.puntada_al_respirar')}</option>
            </select>
          </label>
          <label className="block w-full">
            {t('form.falta_de_aire')}
            <select name="falta_de_aire" value={form.falta_de_aire} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">{t('form.select')}</option>
              <option value="ninguna">{t('form.options.falta_de_aire.ninguna')}</option>
              <option value="repentina">{t('form.options.falta_de_aire.repentina')}</option>
              <option value="empeora_con_anios">{t('form.options.falta_de_aire.empeora_con_anios')}</option>
              <option value="al_caminar_rapido">{t('form.options.falta_de_aire.al_caminar_rapido')}</option>
              <option value="agotado">{t('form.options.falta_de_aire.agotado')}</option>
            </select>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="sibilancias" checked={form.sibilancias} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>{t('form.sibilancias')}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="pecho_apretado" checked={form.pecho_apretado} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>{t('form.pecho_apretado')}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="malestar_general" checked={form.malestar_general} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>{t('form.malestar_general')}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="confusion" checked={form.confusion} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>{t('form.confusion')}</span>
          </label>
          <label className="block w-full">
            {t('form.edad')}
            <input type="number" name="edad" value={form.edad} onChange={handleChange} required disabled={isLoading} className="medical-input mt-1 w-full" />
          </label>
          <label className="block w-full">
            {t('form.fumador')}
            <select name="fumador" value={form.fumador} onChange={handleChange} required disabled={isLoading} className="medical-select mt-1 w-full">
              <option value="">{t('form.select')}</option>
              <option value="no">{t('form.options.fumador.no')}</option>
              <option value="ex_fumador">{t('form.options.fumador.ex_fumador')}</option>
              <option value="si_activo">{t('form.options.fumador.si_activo')}</option>
              <option value="de_toda_la_vida">{t('form.options.fumador.de_toda_la_vida')}</option>
            </select>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="antecedentes_asma" checked={form.antecedentes_asma} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>{t('form.antecedentes_asma')}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="antecedentes_alergias" checked={form.antecedentes_alergias} onChange={handleChange} disabled={isLoading} className="form-checkbox" />
            <span>{t('form.antecedentes_alergias')}</span>
          </label>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="medical-button w-full text-base py-3 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 active:scale-95"
            tabIndex={0}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2" style={{borderColor: '#1da1f2', borderTopColor: '#0f91d6', borderRadius: '9999px'}}></span>
                {t('form.obteniendo')}
              </span>
            ) : t('form.obtener')}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-transparent border-l-4" style={{borderColor:'#1da1f2'}}>
          <span className="font-semibold text-[#1a2733] dark:text-white">{t('result.error')}</span> <span className="text-[#1a2733] dark:text-white">{error}</span>
        </div>
      )}
    </motion.div>
  );
}
