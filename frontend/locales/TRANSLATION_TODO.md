# TODO — terminar traducción completa (frontend)

Lista concentrada de tareas que faltan únicamente para completar la traducción del proyecto (frontend-only). Cada ítem indica el archivo(s) implicado(s) y una acción clara.

- [ ] Revisar y aprobar propuestas de traducción automáticas
  - Archivos: `frontend/locales/mapping_es_en_proposals.json`, `frontend/locales/mapping_es_en_extended.json`
  - Acción: revisar cada entrada marcada `auto:true` y mover/aprobar las que corresponda a `frontend/locales/mapping_es_en.json` como `"clave": "translation"`.

- [ ] Completar mapping de salidas del backend (diagnostico / explicacion / textos libres)
  - Archivos: `data/processed/dataset_respiratorio.csv`, `frontend/locales/mapping_es_en.json`
  - Acción: extraer valores únicos de `diagnostico` y cualquier campo de texto libre que el backend pueda devolver; añadir traducciones (preferible revisión humana).

- [ ] Integrar las propuestas en el runtime con bandera de propuesta (opcional)
  - Archivos: `frontend/app/i18n/translateResult.ts`
  - Acción: permitir usar traducciones propuestas en modo provisional (mostrar etiqueta "(propuesta)" o similar) hasta aprobarlas oficialmente.

- [ ] Mejorar cobertura de coincidencia (fallback/fuzzy) para traducciones de backend
  - Archivos: `frontend/app/i18n/translateResult.ts`
  - Acción: añadir heurísticas simples (normalización, substring matching, token matching) para cubrir variaciones o pequeñas parafraseos que no estén en el mapping.

- [ ] Buscar y reemplazar literales restantes fuera de `frontend/app`
  - Archivos/carpetas: `frontend/**` (componentes, public, pages no-app-router si existen), `public/` (alt text), `next.config.js` (si hay texto), `package.json` (scripts visibles)
  - Acción: ejecutar búsqueda de literales (palabras en español) y sustituir por keys de locales; agregar nuevas keys en `frontend/locales/{es,en}.json`.

- [ ] Traducir atributos alternativos y metadatos estáticos
  - Archivos: `frontend/public/*`, `frontend/app/page.tsx`, `frontend/app/layout.tsx`
  - Acción: asegurar `alt`, `title`, `meta` y `og:*` tengan keys en `es.json` y `en.json` y se resuelvan mediante `t(...)`.

- [ ] Revisar y traducir mensajes de error neutrales y códigos
  - Archivos: `frontend/app/api/diagnostico.ts`, `src/**`, `frontend/app/i18n/*`
  - Acción: mantener códigos de error neutrales en backend y mapearlos a mensajes localizados en los locales.

- [ ] Traducir textos en tests y notebooks (si corresponde a entregables)
  - Archivos: `tests/`, `notebooks/1.0-entrenamiento-modelo-diagnostico.ipynb`
  - Acción: opcional — traducir o añadir versiones en inglés de instrucciones y descripciones para presentación/documentación.

- [ ] Traducir docs y README
  - Archivos: `README.md`, `docs/**`
  - Acción: añadir sección en inglés o archivo `README.en.md` con los puntos clave traducidos.

- [ ] Limpieza final del sistema de locales
  - Archivos: `frontend/locales/es.json`, `frontend/locales/en.json`, `frontend/locales/mapping_es_en.json`
  - Acción: eliminar duplicados, unificar convención de claves (snake_case vs dot.path), y guardar un único esquema (recomiendo string→string para mapping principal). Documentar en `frontend/locales/README.md` el formato.

- [ ] QA y validación final
  - Comandos a ejecutar después de los cambios:
    - `cd frontend; npm run build` (verificar build en ambas locales)
    - Probar la UI en ambos idiomas y validar traducciones de diagnósticos devueltos por el backend.
  - Acción: ejecutar pruebas y validar casos edge (diagnóstico desconocido, textos con acentos/variantes).

Notas rápidas
- Prioridad inmediata: aprobar/mergear `mapping_es_en_proposals.json` → impacta directamente en traducción de resultados del backend.
- Opcional pero recomendado: añadir una pequeña prueba automatizada que falle si aparecen literales concretos en español en archivos .tsx/.ts (simple grep en CI).

Si quieres, procedo a:
- (A) aplicar automáticamente las propuestas aprobadas (hazme saber que acepte todo), o
- (B) generar la lista de propuestas en formato tabla para revisión manual, con conteo y ejemplos.

