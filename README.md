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

Este proyecto utiliza un enfoque de Machine Learning para emular el conocimiento experto. Se basa en la plantilla `Cookiecutter Data Science` para una organización clara y modular.

```
.
├── app.py                  # Aplicación web Flask para la interfaz de usuario.
├── data/
│   └── processed/          # Datasets limpios (ej. dataset_respiratorio.csv).
├── models/                 # Modelos entrenados (ej. diagnostico_dt_model.pkl).
├── notebooks/              # Jupyter notebooks para exploración y entrenamiento.
│   └── 1.0-entrenamiento-modelo-diagnostico.ipynb
├── requirements.txt        # Dependencias de Python.
├── src/
│   ├── data/
│   │   └── make_dataset.py # Script para generar el dataset sintético.
│   ├── models/
│   │   └── predict_model.py# Módulo para cargar el modelo y hacer predicciones.
│   └── reglas/
│       └── diagnostico_reglas.json # Base de conocimiento experto en formato JSON.
└── .gitignore              # Archivos a ignorar por Git.
```

### El Modelo: `DecisionTreeClassifier` como Emulador del Conocimiento

Se eligió un **Árbol de Decisión** porque su estructura interna (una serie de preguntas "si/no") se asemeja mucho al proceso de razonamiento diagnóstico de un humano. Al limitar su profundidad, nos aseguramos de que el modelo capture las relaciones más importantes entre síntomas y diagnósticos, tal como lo haría un experto.

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
# 1. Genera el dataset sintético basado en las reglas
python src/data/make_dataset.py

# 2. Entrena el modelo
# Abre el notebook 'notebooks/1.0-entrenamiento-modelo-diagnostico.ipynb'
# en VS Code o Jupyter y ejecuta todas las celdas.
# Esto guardará el modelo entrenado en la carpeta /models.
```

### 4. Ejecutar la Aplicación

Una vez que el modelo esté entrenado y guardado:

```bash
# Inicia el servidor de Flask
python app.py
```
Abre tu navegador web y visita `http://127.0.0.1:5001` para ver la aplicación en funcionamiento.