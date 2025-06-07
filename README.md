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

## 🛠️ Implementación
El sistema fue desarrollado en Python. Utiliza:
- Motor de inferencia por encadenamiento hacia adelante
- Reglas almacenadas en JSON
- Interfaz (por desarrollar) basada en Flask o consola
- Persistencia opcional con CSV o SQLite

## 📁 Estructura del Proyecto
- `entrevista/`: archivo de entrevista al experto
- `conocimiento/`: reglas y arquitectura del conocimiento
- `implementacion/`: código del sistema experto
- `documentacion/`: entregas académicas
- `reglas.json`: base de reglas en formato estructurado

## 📦 Requisitos