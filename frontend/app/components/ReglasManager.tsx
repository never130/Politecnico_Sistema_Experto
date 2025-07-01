import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Regla {
  id?: number;
  condiciones: Record<string, any>;
  diagnostico: string;
  explicacion: string;
  gravedad?: 'grave' | 'moderado' | 'leve';
}

export default function ReglasManager() {
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
      setError('Error al cargar reglas');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevaRegla((prev) => ({ ...prev, [name]: value }));
  };

  const handleCondicionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      if (!res.ok) throw new Error('Error al agregar regla');
      setMensaje('Regla agregada exitosamente');
      setNuevaRegla({ condiciones: {} });
      fetchReglas();
    } catch (e) {
      setError('Error al agregar regla');
    }
  };

  // Definir el tipo de etiquetas para evitar el error de tipado
  const etiquetas: Record<string, string> = {
    'fiebre': 'Fiebre (°C)',
    'tos': 'Tos',
    'dolor_toracico': 'Dolor torácico',
    'falta_de_aire': 'Falta de aire (disnea)',
    'sibilancias': '¿Silbido al respirar (sibilancias)?',
    'pecho_apretado': '¿Sensación de pecho apretado?',
    'malestar_general': '¿Malestar general / cansancio?',
    'confusion': '¿Confusión / desorientación?',
    'edad': 'Edad',
    'fumador': 'Hábito de fumar',
    'antecedentes_asma': '¿Antecedentes de asma?',
    'antecedentes_alergias': '¿Antecedentes de alergias/rinitis?'
  };

  return (
    <motion.div 
      className="medical-card p-2 sm:p-4 md:p-6 lg:p-8 max-w-full md:max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center flex-wrap">
        <span className="bg-blue-100 p-2 rounded-lg mr-3 mb-2 sm:mb-0" />
        Gestión de Reglas SI-ENTONCES
      </h2>
      <div className="mb-6 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-blue-900 text-sm">
        <b>¿Cómo usar?</b> Visualiza las reglas activas. Para agregar una regla, completa las condiciones, el diagnóstico y la explicación, y haz clic en <b>Agregar Regla</b>. Las reglas nuevas se aplican de inmediato al sistema. Ejemplo:<br/>
        <span className="block mt-2 italic text-blue-800">SI Fiebre (°C) es mayor que 38.5 Y Tos es igual a seca ENTONCES Gripe<br/>Explicación: Fiebre alta, tos seca y malestar general.</span>
      </div>
      {loading ? <p>Cargando reglas...</p> : (
        <ul className="mb-4 max-h-40 overflow-y-auto text-sm">
          {reglas.map((regla, idx) => (
            <li key={idx} className="mb-4 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border border-blue-200">
              <div className="mb-1 flex flex-col sm:flex-row sm:items-center gap-2">
                <b>SI</b> {Array.isArray(regla.condiciones) ? regla.condiciones.map((cond, i) => {
                  let valor = cond.valor;
                  let operador = cond.operador;
                  if (typeof valor === 'boolean') valor = valor ? 'Sí' : 'No';
                  if (Array.isArray(valor)) valor = valor.map(v => typeof v === 'boolean' ? (v ? 'Sí' : 'No') : v).join(' o ');
                  // Operadores en lenguaje natural
                  let opNat = '';
                  switch (operador) {
                    case '==': opNat = 'es igual a'; break;
                    case '>': opNat = 'es mayor que'; break;
                    case '<': opNat = 'es menor que'; break;
                    case 'in': opNat = 'es uno de'; break;
                    default: opNat = operador;
                  }
                  return (
                    <span key={i}>
                      <span className="font-semibold text-blue-900">{etiquetas[cond.hecho] || cond.hecho}</span> {opNat} <span className="bg-blue-100 text-blue-800 px-1 rounded text-xs">{valor}</span>{i < regla.condiciones.length - 1 ? <span className="text-blue-700 font-bold"> Y </span> : ''}
                    </span>
                  );
                }) : ''} <b>ENTONCES</b> <span className="font-bold text-indigo-700">{regla.diagnostico}</span>
                {regla.gravedad && (
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${regla.gravedad === 'grave' ? 'bg-red-100 text-red-700' : regla.gravedad === 'moderado' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'}`}>Gravedad: {regla.gravedad}</span>
                )}
              </div>
              <div className="text-gray-700 text-sm italic mt-1">{regla.explicacion}</div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAgregarRegla} className="space-y-2 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input type="number" name="fiebre" placeholder="Fiebre (ej: 38.5)" step="0.1" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" />
          <select name="tos" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">Tos</option>
            <option value="seca">Seca</option>
            <option value="con_flema_transparente_verdosa">Con flema transparente/verdosa</option>
            <option value="ninguna">Ninguna</option>
          </select>
          <select name="dolor_toracico" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">Dolor torácico</option>
            <option value="puntada_al_respirar">Puntada al respirar</option>
            <option value="opresivo">Opresivo</option>
            <option value="ninguno">Ninguno</option>
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
            <option value="">¿Silbido al respirar?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <select name="pecho_apretado" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">¿Pecho apretado?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <select name="malestar_general" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">¿Malestar general/cansancio?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <select name="confusion" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">¿Confusión/desorientación?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <input type="number" name="edad" placeholder="Edad (ej: 45)" min="0" max="120" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" />
          <select name="fumador" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">Hábito de fumar</option>
            <option value="si_activo">Sí, activo</option>
            <option value="ex_fumador">Ex fumador</option>
            <option value="no">No</option>
          </select>
          <select name="antecedentes_asma" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">¿Antecedentes de asma?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <select name="antecedentes_alergias" onChange={handleCondicionChange} className="medical-input mt-1 mr-2 w-full" defaultValue="">
            <option value="">¿Antecedentes de alergias/rinitis?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Diagnóstico:</label>
          <input type="text" name="diagnostico" value={nuevaRegla.diagnostico || ''} onChange={handleInputChange} className="medical-input mt-1 w-full" required />
        </div>
        <div>
          <label className="block font-medium">Explicación:</label>
          <textarea name="explicacion" value={nuevaRegla.explicacion || ''} onChange={handleInputChange} className="medical-input mt-1 w-full" required />
        </div>
        <button type="submit" className="medical-button w-full text-base py-3">Agregar Regla</button>
      </form>
      {mensaje && <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-400 rounded text-green-900 text-sm">{mensaje}</div>}
      {error && <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded text-red-900 text-sm">{error}</div>}
    </motion.div>
  );
}
