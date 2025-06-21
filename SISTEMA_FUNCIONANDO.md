# Sistema Experto para Diagnóstico Respiratorio - Tierra del Fuego

## 🎉 **¡PROBLEMA RESUELTO!**

El sistema experto ahora funciona correctamente y diagnostica enfermedades respiratorias según los síntomas ingresados.

## ✅ **Estado Actual**

- **Frontend**: Formulario web funcional en http://127.0.0.1:5001
- **Backend**: Motor de diagnóstico con DecisionTreeClassifier entrenado
- **Modelo**: Entrenado con 7 enfermedades respiratorias
- **Explicabilidad**: Proporciona diagnóstico, gravedad y explicación

## 🏥 **Enfermedades que Diagnostica**

1. **Neumonía** (Grave)
2. **Bronquitis Aguda** (Leve)
3. **Crisis Asmática** (Moderado)
4. **EPOC** (Grave)
5. **Gripe** (Moderado)
6. **Bronquiolitis** (Moderado)
7. **Resfrio Común** (Leve)

## 🚀 **Cómo Usar el Sistema**

### 1. Ejecutar la Aplicación
```bash
python app.py
```

### 2. Abrir el Navegador
Ir a: http://127.0.0.1:5001

### 3. Completar el Formulario
- **Síntomas**: Tipo de tos, fiebre, dolor torácico, disnea
- **Signos**: Sibilancias, pecho apretado, malestar, confusión
- **Antecedentes**: Edad, hábito de fumar, asma, alergias

### 4. Obtener Diagnóstico
El sistema retorna:
- **Diagnóstico**: La enfermedad más probable
- **Gravedad**: Leve, Moderado o Grave
- **Explicación**: Razonamiento basado en reglas clínicas

## 🔧 **Problema Que Se Solucionó**

**Problema Original**: El sistema siempre devolvía "Resfrio Común" independientemente de los síntomas ingresados.

**Causa Identificada**: 
1. El modelo esperaba 12 características específicas en un orden determinado
2. El formulario web enviaba 14 características, incluyendo dos que no estaban en el modelo entrenado
3. Esto causaba una desalineación entre los datos del formulario y las expectativas del modelo

**Solución Implementada**:
1. **Filtrado de características**: El motor de diagnóstico ahora filtra solo las 12 características que el modelo reconoce
2. **Reordenamiento de datos**: Los datos se reorganizan en el orden exacto que espera el modelo
3. **Eliminación de campos no utilizados**: Se quitaron del formulario los campos que no usa el modelo actual

## 🧪 **Casos de Prueba Exitosos**

### Síntomas Severos de Neumonía
- Tos con flema purulenta/sangre
- Fiebre > 39°C  
- Dolor torácico al respirar
- Disnea severa
- Confusión (en adultos mayores)

**Resultado**: ✅ **Neumonía - Grave**

### Síntomas Mixtos
- Diferentes combinaciones de síntomas
- El modelo clasifica según patrones aprendidos

**Resultado**: ✅ **Diagnósticos variados según síntomas**

## 📁 **Estructura del Proyecto**

```
Politecnico_Sistema_Experto/
├── app.py                          # Aplicación Flask (frontend)
├── src/
│   ├── models/predict_model.py     # Motor de diagnóstico
│   ├── reglas/diagnostico_reglas.json  # Reglas clínicas
│   └── data/make_dataset.py        # Generador de dataset
├── models/diagnostico_dt_model.pkl # Modelo entrenado
├── data/processed/dataset_respiratorio.csv  # Dataset sintético
└── notebooks/1.0-entrenamiento-modelo-diagnostico.ipynb  # Entrenamiento
```

## 🎯 **Características Técnicas**

- **Algoritmo**: DecisionTreeClassifier (scikit-learn)
- **Características**: 12 variables clínicas
- **Dataset**: 1000 casos sintéticos basados en reglas clínicas
- **Precisión**: Excelente para casos típicos según reglas del experto
- **Explicabilidad**: Cada diagnóstico incluye explicación clínica

## 👨‍⚕️ **Basado en Conocimiento Experto**

Sistema desarrollado con el conocimiento del **Agente Sanitario Daniel Pressacco** (CAPS 2, Tierra del Fuego), especializado en diagnóstico respiratorio en condiciones climáticas y sociales específicas de la región.

---

**¡El sistema está listo para su uso!** 🎉
