import React, { useState } from 'react';

interface DiagnosticoFormProps {
  onSubmit: (form: any) => void;
  isLoading: boolean;
}

export default function DiagnosticoForm({ onSubmit, isLoading }: DiagnosticoFormProps) {
  const [form, setForm] = useState({ fiebre: '', tos: '', malestar_general: false });
  const [error, setError] = useState<string | null>(null);

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
        malestar_general: Boolean(form.malestar_general),
      };
      await onSubmit(datos);
    } catch (err) {
      setError('Error al obtener diagnóstico');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Fiebre (°C):
          <input type="number" step="0.1" name="fiebre" value={form.fiebre} onChange={handleChange} required disabled={isLoading} />
        </label>
        <label>
          Tos:
          <select name="tos" value={form.tos} onChange={handleChange} required disabled={isLoading}>
            <option value="">Seleccione</option>
            <option value="seca">Seca</option>
            <option value="con_flema_transparente_verdosa">Con flema transparente/verdosa</option>
            <option value="con_flema_purulenta_sangre">Con flema purulenta/sangre</option>
            <option value="ninguna">Ninguna</option>
          </select>
        </label>
        <label>
          Malestar general:
          <input type="checkbox" name="malestar_general" checked={form.malestar_general} onChange={handleChange} disabled={isLoading} />
        </label>
        <button type="submit" disabled={isLoading}>Obtener diagnóstico</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
