import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider'
import { motion } from 'framer-motion';

interface Regla {
  id?: number;
  condiciones: Record<string, any>;
  diagnostico: string;
  explicacion: string;
  gravedad?: 'grave' | 'moderado' | 'leve';
}

export default function ReglasManager() {
  const { t } = useLanguage()
  const [reglas, setReglas] = useState<Regla[]>([]);
  const [nuevaRegla, setNuevaRegla] = useState<Partial<Regla>>({ condiciones: {} });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReglas();
  }, []);

  const fetchReglas = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/reglas');
      const data = await res.json();
      setReglas(data);
    } catch (e) {
      setError(t('rules.loading_error'));
    } finally {
      setLoading(false);
    }
  };

  // Inputs que son text o textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    setNuevaRegla((prev) => ({ ...prev, [name]: value }));
  };

  // Cambios en las condiciones (incluye selects y inputs)
  const handleCondicionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setNuevaRegla((prev) => ({
      ...prev,
      condiciones: { ...prev.condiciones, [name]: value },
    }));
  };

  const handleAgregarRegla = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/reglas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaRegla),
      });
  if (!res.ok) throw new Error('API_ERROR');
  setMensaje(t('rules.add_success'));
      setNuevaRegla({ condiciones: {} });
      fetchReglas();
    } catch (e) {
  setError(t('rules.add_error'));
    }
  };

  // Etiquetas localizables para mostrar hechos en las reglas
  const etiquetas: Record<string, string> = {
    'fiebre': t('rules.etiquetas.fiebre'),
    'tos': t('rules.etiquetas.tos'),
    'dolor_toracico': t('rules.etiquetas.dolor_toracico'),
    'falta_de_aire': t('rules.etiquetas.falta_de_aire'),
    'sibilancias': t('rules.etiquetas.sibilancias'),
    'pecho_apretado': t('rules.etiquetas.pecho_apretado'),
    'malestar_general': t('rules.etiquetas.malestar_general'),
    'confusion': t('rules.etiquetas.confusion'),
    'edad': t('rules.etiquetas.edad'),
    'fumador': t('rules.etiquetas.fumador'),
    'antecedentes_asma': t('rules.etiquetas.antecedentes_asma'),
    'antecedentes_alergias': t('rules.etiquetas.antecedentes_alergias')
  };

  return (
    <motion.div 
      className="medical-card p-2 sm:p-4 md:p-6 lg:p-8 max-w-full md:max-w-2xl mx-auto bg-[#f7fafd] dark:bg-[#15202b] border border-gray-200 dark:border-[#22303c] rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
  <h2 className="text-xl sm:text-2xl font-bold text-[#1a2733] dark:text-white mb-4 sm:mb-6 flex items-center flex-wrap">
        <span className="bg-[#e8f5fe] dark:bg-[#22303c] p-2 rounded-lg mr-3 mb-2 sm:mb-0">
          <svg width='22' height='22' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='#1da1f2' /></svg>
        </span>
        {t('rules.header')}
      </h2>
      <div className="mb-6 p-3 bg-[#f7fafd] dark:bg-[#22303c] border-l-4 border-[#1da1f2] dark:border-[#1da1f2] rounded text-[#1a2733] dark:text-white text-sm">
        <b>{t('rules.howto_title')}</b> {t('rules.howto_desc')} <b>{t('rules.add_rule_button')}</b>. {t('rules.howto_apply')}
        <br/>
        <span className="block mt-2 italic text-[#1da1f2]">{t('rules.example')}</span>
      </div>
  {loading ? <p>{t('rules.loading')}</p> : (
  <ul className="mb-4 max-h-40 overflow-y-auto text-sm">
          {reglas.map((regla, idx) => (
            <li key={idx} className="mb-4 p-2 sm:p-3 rounded-xl bg-[#e8f5fe] dark:bg-[#22303c] border-2 border-[#1da1f2] shadow-sm">
              <div className="mb-1 flex flex-col sm:flex-row sm:items-center gap-2">
                <b>{t('rules.si')}</b> {Array.isArray(regla.condiciones) ? regla.condiciones.map((cond, i) => {
                  let valor = cond.valor;
                  let operador = cond.operador;
                  if (typeof valor === 'boolean') valor = valor ? t('common.yes') : t('common.no');
                  if (Array.isArray(valor)) valor = valor.map(v => typeof v === 'boolean' ? (v ? t('common.yes') : t('common.no')) : v).join(` ${t('common.or')} `);
                  // Operadores en lenguaje natural
                  let opNat = '';
                  switch (operador) {
                    case '==': opNat = t('rules.op.eq'); break;
                    case '>': opNat = t('rules.op.gt'); break;
                    case '<': opNat = t('rules.op.lt'); break;
                    case 'in': opNat = t('rules.op.in'); break;
                    default: opNat = operador;
                  }
                  return (
                    <span key={i}>
                      <span className="font-semibold text-[#1da1f2]">{etiquetas[cond.hecho] || cond.hecho}</span> {opNat} <span className="bg-[#1da1f2] text-white px-1 rounded text-xs">{valor}</span>{i < regla.condiciones.length - 1 ? <span className="text-[#1da1f2] font-bold"> {t('common.and')} </span> : ''}
                    </span>
                  );
                }) : ''} <b>{t('rules.entonces')}</b> <span className="font-bold text-[#1da1f2]">{regla.diagnostico}</span>
                {regla.gravedad && (
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold medical-badge ${regla.gravedad === 'grave' ? 'severity-grave' : regla.gravedad === 'moderado' ? 'severity-moderado' : 'severity-leve'}`}>{t('rules.severity')}: {t(`rules.severity_values.${regla.gravedad}`) || regla.gravedad}</span>
                )}
              </div>
                  <div className="text-[#1a2733] dark:text-[#e6ecf0] text-sm italic mt-1">{regla.explicacion}</div>
            </li>
          ))}
        </ul>
      )}
  <form onSubmit={handleAgregarRegla} className="space-y-2 mt-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input type="number" name="fiebre" placeholder={t('rules.placeholders.fiebre')} step="0.1" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" />
          <select name="tos" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.tos')}</option>
            <option value="seca">{t('form.options.tos.seca')}</option>
            <option value="con_flema_transparente_verdosa">{t('form.options.tos.con_flema_transparente_verdosa')}</option>
            <option value="ninguna">{t('form.options.tos.ninguna')}</option>
          </select>
          <select name="dolor_toracico" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.dolor_toracico')}</option>
            <option value="puntada_al_respirar">{t('form.options.dolor_toracico.puntada_al_respirar')}</option>
            <option value="opresivo">{t('form.options.dolor_toracico.opresivo')}</option>
            <option value="ninguno">{t('form.options.dolor_toracico.ninguno')}</option>
          </select>
          <select name="falta_de_aire" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">Falta de aire</option>
            <option value="agotado">Agotado</option>
            <option value="repentina">Repentina</option>
            <option value="al_caminar_rapido">Al caminar rápido</option>
            <option value="empeora_con_anios">Empeora con los años</option>
            <option value="ninguna">Ninguna</option>
          </select>
          <select name="sibilancias" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.sibilancias')}</option>
            <option value="true">{t('common.yes')}</option>
            <option value="false">{t('common.no')}</option>
          </select>
          <select name="pecho_apretado" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.pecho_apretado')}</option>
            <option value="true">{t('common.yes')}</option>
            <option value="false">{t('common.no')}</option>
          </select>
          <select name="malestar_general" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.malestar_general')}</option>
            <option value="true">{t('common.yes')}</option>
            <option value="false">{t('common.no')}</option>
          </select>
          <select name="confusion" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.confusion')}</option>
            <option value="true">{t('common.yes')}</option>
            <option value="false">{t('common.no')}</option>
          </select>
          <input type="number" name="edad" placeholder={t('rules.placeholders.fiebre_example_age')} min="0" max="120" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" />
          <select name="fumador" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.fumador')}</option>
            <option value="si_activo">{t('form.options.fumador.si_activo')}</option>
            <option value="ex_fumador">{t('form.options.fumador.ex_fumador')}</option>
            <option value="no">{t('form.options.fumador.no')}</option>
          </select>
          <select name="antecedentes_asma" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.antecedentes_asma')}</option>
            <option value="true">{t('common.yes')}</option>
            <option value="false">{t('common.no')}</option>
          </select>
          <select name="antecedentes_alergias" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">{t('form.antecedentes_alergias')}</option>
            <option value="true">{t('common.yes')}</option>
            <option value="false">{t('common.no')}</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">{t('rules.labels.diagnostico')}</label>
          <input type="text" name="diagnostico" value={nuevaRegla.diagnostico || ''} onChange={handleInputChange} className="medical-input mt-1 w-full" required />
        </div>
        <div>
          <label className="block font-medium">{t('rules.labels.gravedad')}</label>
          <select name="gravedad" value={nuevaRegla.gravedad || ''} onChange={handleInputChange} className="medical-input mt-1 w-full" required>
            <option value="">{t('rules.select_severity')}</option>
            <option value="leve">{t('rules.severity_values.leve')}</option>
            <option value="moderado">{t('rules.severity_values.moderado')}</option>
            <option value="grave">{t('rules.severity_values.grave')}</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">{t('rules.labels.explicacion')}</label>
          <textarea name="explicacion" value={nuevaRegla.explicacion || ''} onChange={handleInputChange} className="medical-input mt-1 w-full" rows={3} required />
        </div>
  <button type="submit" className="medical-button w-full text-base py-3">{t('rules.add')}</button>
      </form>
  {mensaje && <div className="mt-4 p-3 bg-transparent border-l-4 border-[#1da1f2] rounded text-[#1a2733] dark:text-white text-sm">{mensaje}</div>}
  {error && <div className="mt-4 p-3 bg-transparent border-l-4 border-[#1da1f2] rounded text-[#1a2733] dark:text-white text-sm">{error}</div>}
    </motion.div>
  );
}
