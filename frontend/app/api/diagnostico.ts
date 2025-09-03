// Ejemplo de función para llamar al endpoint Flask desde el frontend Next.js/React

// Determina la URL de la API en función del entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function obtenerDiagnostico(datos: Record<string, any>) {
  const response = await fetch(`${API_URL}/diagnostico`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    // Lanza un error genérico para que el cliente pueda mostrar un mensaje localizado
    throw new Error('ERR_FETCH_DIAG');
  }
  return await response.json();
}

// Nueva función para obtener las reglas
export async function obtenerReglas() {
  const response = await fetch(`${API_URL}/reglas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('ERR_FETCH_RULES');
  }
  return await response.json();
}

// Nueva función para agregar una regla
export async function agregarRegla(regla: Record<string, any>) {
  const response = await fetch(`${API_URL}/reglas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(regla),
  });
  if (!response.ok) {
    throw new Error('ERR_ADD_RULE');
  }
  return await response.json();
}

