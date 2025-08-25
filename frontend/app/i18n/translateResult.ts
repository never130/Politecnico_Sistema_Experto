import mapping from '../../locales/mapping_es_en.json'
import es from '../../locales/es.json'

type Locale = 'es' | 'en'

function normalize(txt: string) {
  if (!txt) return ''
  // trim, pasar a minúsculas y remover tildes para matching más robusto
  const t = txt.toString().trim().toLowerCase()
  // reemplazar vocales con tilde por su versión sin tilde
  return t
    .normalize('NFD')
    // eliminar marcas diacríticas (tilde, macron, etc.) de forma compatible
    .replace(/[\u0300-\u036f]/g, '')
}

export function translateResult(result: any, locale: Locale) {
  if (!result) return result
  const out = { ...result }
  if (locale === 'en') {
    // intentar traducción del diagnóstico exacto
    const diagRaw = result.diagnostico
    const diag = normalize(diagRaw)
    // buscar mapeo directo (intentar claves originales y normalizadas)
    const mappingLookup = mapping as any
    if (diagRaw && mappingLookup[diagRaw]) {
      out.diagnostico = mappingLookup[diagRaw]
    } else if (diag && mappingLookup[diag]) {
      out.diagnostico = mappingLookup[diag]
    } else {
      // intentar buscar por clave normalizada en el mapping (p. ej. sin tildes)
      const foundKey = Object.keys(mappingLookup).find(k => normalize(k) === diag)
      if (foundKey) out.diagnostico = mappingLookup[foundKey]
    }
    // para explicaciones, si tenemos mapeo exacto, reemplazamos (opcional)
    const expRaw = result.explicacion
    const exp = normalize(expRaw)
    if (expRaw && mappingLookup[expRaw]) {
      out.explicacion = mappingLookup[expRaw]
    } else if (exp && mappingLookup[exp]) {
      out.explicacion = mappingLookup[exp]
    } else {
      const foundKeyExp = Object.keys(mappingLookup).find(k => normalize(k) === exp)
      if (foundKeyExp) out.explicacion = mappingLookup[foundKeyExp]
    }
  }
  return out
}
