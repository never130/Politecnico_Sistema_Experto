import React, { useEffect, useState } from 'react';

interface Regla {
  id?: number;
  condiciones: Record<string, any>;
  diagnostico: string;
  explicacion: string;
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

  return (
    <div className="medical-card p-4 mt-8">
      <h2 className="text-xl font-bold mb-4">Gestión de Reglas SI-ENTONCES</h2>
      {loading ? <p>Cargando reglas...</p> : (
        <ul className="mb-4 max-h-40 overflow-y-auto text-sm">
          {reglas.map((regla, idx) => (
            <li key={idx} className="mb-2 border-b pb-1">
              <b>SI</b> {Array.isArray(regla.condiciones) ? regla.condiciones.map((cond, i) => (
                <span key={i}>
                  {cond.hecho} {cond.operador} {typeof cond.valor === 'object' ? JSON.stringify(cond.valor) : cond.valor}{i < regla.condiciones.length - 1 ? ' Y ' : ''}
                </span>
              )) : ''} <b>ENTONCES</b> {regla.diagnostico}
              <br /><span className="text-gray-500">{regla.explicacion}</span>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAgregarRegla} className="space-y-2">
        <div>
          <label className="block font-medium">Condiciones (ej: fiebre, tos...):</label>
          <input type="text" name="fiebre" placeholder="Fiebre (ej: 38)" onChange={handleCondicionChange} className="medical-input mt-1 mr-2" />
          <input type="text" name="tos" placeholder="Tos (ej: seca)" onChange={handleCondicionChange} className="medical-input mt-1 mr-2" />
          {/* Agrega más campos según tus variables */}
        </div>
        <div>
          <label className="block font-medium">Diagnóstico:</label>
          <input type="text" name="diagnostico" value={nuevaRegla.diagnostico || ''} onChange={handleInputChange} className="medical-input mt-1" required />
        </div>
        <div>
          <label className="block font-medium">Explicación:</label>
          <textarea name="explicacion" value={nuevaRegla.explicacion || ''} onChange={handleInputChange} className="medical-input mt-1" required />
        </div>
        <button type="submit" className="medical-button">Agregar Regla</button>
      </form>
      {mensaje && <p className="text-green-600 mt-2">{mensaje}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
