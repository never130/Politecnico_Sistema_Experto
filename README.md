# Sistema Experto para el Diagnóstico de Enfermedades Respiratorias
Autor: Ever Loza – Centro Politécnico Superior Malvinas Argentinas

## 🎯 Objetivo
Este proyecto implementa un sistema experto basado en reglas que asiste al personal de salud en el diagnóstico de enfermedades respiratorias comunes (asma, bronquitis, neumonía y EPOC) en Tierra del Fuego. Está orientado a apoyar la toma de decisiones clínicas en atención primaria, especialmente en zonas con acceso limitado a especialistas.

## 🧠 Representación del Conocimiento
El conocimiento se extrajo a partir de una entrevista simulada con un agente sanitario local y se representa mediante reglas `SI–ENTONCES`, organizadas por módulos clínicos:
- Evaluación clínica
- Factores de riesgo
- Diagnóstico
- Derivación
- Seguimiento

## 🛠️ Implementación y Estructura

Este proyecto utiliza un enfoque híbrido de Machine Learning y sistemas basados en reglas para emular el conocimiento experto. Sigue la estructura organizacional del estándar `Cookiecutter Data Science` para garantizar reproducibilidad, mantenibilidad y mejores prácticas en ciencia de datos.

### 📁 Estructura del Proyecto

```
├── README.md               # Documentación principal del proyecto
├── requirements.txt        # Dependencias de Python
├── .gitignore             # Archivos a ignorar por Git
├── .venv/                 # Entorno virtual (no versionado)
├── app.py                 # Aplicación web Flask para la interfaz de usuario
│
├── data/                  # Datos del proyecto
│   ├── raw/              # Datos originales, inmutables
│   ├── interim/          # Datos intermedios que han sido transformados
│   └── processed/        # Datasets finales, canónicos para modelado
│
├── docs/                 # Documentación del proyecto y análisis
│   ├── entrevista/       # Documentación de la extracción de conocimiento
│   └── *.pdf             # Reportes y documentación técnica
│
├── models/               # Modelos entrenados y serializados
│   └── *.pkl             # Modelos en formato pickle
│
├── notebooks/            # Jupyter notebooks para exploración y análisis
│   └── 1.0-entrenamiento-modelo-diagnostico.ipynb
│
├── reports/              # Análisis generados como HTML, PDF, LaTeX, etc.
│   └── figures/          # Gráficos y visualizaciones generadas
│
└── src/                  # Código fuente para uso en este proyecto
    ├── data/             # Scripts para descargar o generar datos
    │   └── make_dataset.py
    ├── models/           # Scripts para entrenar modelos y hacer predicciones
    │   └── predict_model.py
    └── reglas/           # Base de conocimiento del sistema experto
        └── diagnostico_reglas.json
```

### 🏗️ Arquitectura del Sistema

El sistema combina dos enfoques complementarios:

1. **Sistema Basado en Reglas**: Utiliza reglas `SI-ENTONCES` almacenadas en formato JSON para capturar el conocimiento experto directo.

2. **Modelo de Machine Learning**: Implementa un `DecisionTreeClassifier` que emula el proceso de razonamiento diagnóstico, entrenado con datos sintéticos generados a partir de las reglas expertas.

### El Modelo: `DecisionTreeClassifier` como Emulador del Conocimiento

Se eligió un **Árbol de Decisión** porque su estructura interna (una serie de preguntas "si/no") se asemeja mucho al proceso de razonamiento diagnóstico de un humano. Al limitar su profundidad, nos aseguramos de que el modelo capture las relaciones más importantes entre síntomas y diagnósticos, tal como lo haría un experto.

### 🎯 Principios de Cookiecutter Data Science Aplicados

- **Reproducibilidad**: Todos los experimentos y análisis pueden ser reproducidos siguiendo los scripts en `src/`
- **Organización**: Separación clara entre datos crudos, procesados, modelos y código fuente
- **Versionado**: Control de versiones con Git, ignorando archivos temporales y modelos grandes
- **Documentación**: Documentación técnica en `docs/` y notebooks explicativos
- **Modularidad**: Código organizado en módulos reutilizables

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el sistema en tu máquina local.

### 1. Prerrequisitos
- Python 3.9 o superior
- Git

### 2. Clonar y Configurar el Entorno

```bash
# 1. Clona este repositorio
git clone <URL_DEL_REPOSITORIO>
cd Politecnico_Sistema_Experto

# 2. Crea un entorno virtual
python -m venv .venv

# 3. Activa el entorno virtual
# En Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# En macOS/Linux:
# source .venv/bin/activate

# 4. Instala las dependencias
pip install -r requirements.txt
```

### 3. Generar Datos y Entrenar el Modelo

```bash
# 1. Genera el dataset sintético basado en las reglas expertas
python src/data/make_dataset.py

# 2. Entrena el modelo usando el notebook
# Abre el notebook 'notebooks/1.0-entrenamiento-modelo-diagnostico.ipynb'
# en VS Code o Jupyter y ejecuta todas las celdas.
# Esto guardará el modelo entrenado en la carpeta 'models/'.
```

### 4. Ejecutar la Aplicación

Una vez que el modelo esté entrenado y guardado:

```bash
# Inicia el servidor Flask
python app.py
```

Abre tu navegador web y visita `http://127.0.0.1:5001` para acceder a la interfaz del sistema experto.

## 📊 Flujo de Trabajo del Proyecto

1. **Extracción de Conocimiento** (`docs/entrevista/`) → Documentación del conocimiento experto
2. **Definición de Reglas** (`src/reglas/`) → Formalización en reglas SI-ENTONCES
3. **Generación de Datos** (`src/data/`) → Creación de dataset sintético
4. **Entrenamiento** (`notebooks/`) → Desarrollo y validación del modelo
5. **Implementación** (`app.py`) → Aplicación web para uso final

## 🔧 Tecnologías Utilizadas

- **Python 3.9+**: Lenguaje principal
- **Flask**: Framework web para la interfaz
- **scikit-learn**: Algoritmos de machine learning
- **pandas**: Manipulación de datos
- **numpy**: Computación numérica
- **pickle**: Serialización de modelos

## 📈 Rendimiento del Sistema

El modelo alcanza una precisión del **95%** en la clasificación de las 4 enfermedades respiratorias principales, validado mediante validación cruzada con 5 pliegues.

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**Ever Loza**  
Centro Politécnico Superior Malvinas Argentinas  
Tierra del Fuego, Argentina