// Ejemplo de función para llamar al endpoint Flask desde el frontend Next.js/React

export async function obtenerDiagnostico(datos: Record<string, any>) {
  const response = await fetch('http://localhost:5000/diagnostico', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error('Error al obtener diagnóstico');
  }
  return await response.json();
}
