#!/usr/bin/env python3
"""
Script de prueba para verificar que todas las reglas funcionan correctamente
"""

import json
import sys
import os

# Agregar el directorio src al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from engine.motor_inferencia import inferir, reglas

def test_casos_ejemplo():
    """Prueba casos típicos para cada enfermedad"""
    
    casos_prueba = [
        {
            "nombre": "Caso Gripe",
            "datos": {
                "fiebre": 39.0,
                "tos": "seca",
                "dolor_toracico": "ninguno",
                "falta_de_aire": "ninguna",
                "sibilancias": False,
                "pecho_apretado": False,
                "malestar_general": True,
                "confusion": False,
                "edad": 30,
                "fumador": "no",
                "antecedentes_asma": False,
                "antecedentes_alergias": False
            },
            "esperado": "Gripe (Influenza)"
        },
        {
            "nombre": "Caso Neumonía",
            "datos": {
                "fiebre": 40.0,
                "tos": "con_flema_transparente_verdosa",
                "dolor_toracico": "puntada_al_respirar",
                "falta_de_aire": "agotado",
                "sibilancias": False,
                "pecho_apretado": True,
                "malestar_general": True,
                "confusion": False,
                "edad": 45,
                "fumador": "no",
                "antecedentes_asma": False,
                "antecedentes_alergias": False
            },
            "esperado": "Neumonía"
        },
        {
            "nombre": "Caso Bronquitis",
            "datos": {
                "fiebre": 37.8,
                "tos": "con_flema_transparente_verdosa",
                "dolor_toracico": "ninguno",
                "falta_de_aire": "ninguna",
                "sibilancias": False,
                "pecho_apretado": False,
                "malestar_general": True,
                "confusion": False,
                "edad": 35,
                "fumador": "no",
                "antecedentes_asma": False,
                "antecedentes_alergias": False
            },
            "esperado": "Bronquitis Aguda"
        },
        {
            "nombre": "Caso Crisis Asmática",
            "datos": {
                "fiebre": 36.8,
                "tos": "seca",
                "dolor_toracico": "ninguno",
                "falta_de_aire": "repentina",
                "sibilancias": True,
                "pecho_apretado": True,
                "malestar_general": False,
                "confusion": False,
                "edad": 28,
                "fumador": "no",
                "antecedentes_asma": True,
                "antecedentes_alergias": True
            },
            "esperado": "Crisis Asmática"
        },
        {
            "nombre": "Caso EPOC",
            "datos": {
                "fiebre": 36.5,
                "tos": "con_flema_transparente_verdosa",
                "dolor_toracico": "ninguno",
                "falta_de_aire": "empeora_con_anios",
                "sibilancias": False,
                "pecho_apretado": False,
                "malestar_general": True,
                "confusion": False,
                "edad": 55,
                "fumador": "ex_fumador",
                "antecedentes_asma": False,
                "antecedentes_alergias": False
            },
            "esperado": "EPOC (Enfermedad Pulmonar Obstructiva Crónica)"
        },
        {
            "nombre": "Caso Resfrío",
            "datos": {
                "fiebre": 37.0,
                "tos": "seca",
                "dolor_toracico": "ninguno",
                "falta_de_aire": "ninguna",
                "sibilancias": False,
                "pecho_apretado": False,
                "malestar_general": False,
                "confusion": False,
                "edad": 25,
                "fumador": "no",
                "antecedentes_asma": False,
                "antecedentes_alergias": False
            },
            "esperado": "Resfrío Común"
        },
        {
            "nombre": "Caso Bronquiolitis",
            "datos": {
                "fiebre": 37.5,
                "tos": "seca",
                "dolor_toracico": "ninguno",
                "falta_de_aire": "repentina",
                "sibilancias": True,
                "pecho_apretado": False,
                "malestar_general": True,
                "confusion": False,
                "edad": 1,
                "fumador": "no",
                "antecedentes_asma": False,
                "antecedentes_alergias": False
            },
            "esperado": "Bronquiolitis"
        }
    ]
    
    print("🔍 PRUEBA DE REGLAS DEL SISTEMA EXPERTO")
    print("=" * 50)
    
    total_casos = len(casos_prueba)
    casos_exitosos = 0
    
    for caso in casos_prueba:
        print(f"\n📋 {caso['nombre']}:")
        print(f"   Esperado: {caso['esperado']}")
        
        # Ejecutar inferencia
        resultado = inferir(caso['datos'])
        
        if len(resultado) == 4:
            diagnostico, explicacion, regla, gravedad = resultado
        else:
            diagnostico, explicacion, regla = resultado
            gravedad = 'moderado'
        
        print(f"   Obtenido: {diagnostico}")
        print(f"   Gravedad: {gravedad}")
        print(f"   Regla disparada: {regla}")
        
        if diagnostico == caso['esperado']:
            print("   ✅ CORRECTO")
            casos_exitosos += 1
        else:
            print("   ❌ ERROR")
            print(f"   Explicación: {explicacion}")
        
    print(f"\n📊 RESUMEN:")
    print(f"   Casos exitosos: {casos_exitosos}/{total_casos}")
    print(f"   Porcentaje: {(casos_exitosos/total_casos)*100:.1f}%")
    
    if casos_exitosos == total_casos:
        print("   🎉 TODAS LAS REGLAS FUNCIONAN CORRECTAMENTE")
    else:
        print("   ⚠️  ALGUNAS REGLAS NECESITAN REVISIÓN")

def mostrar_reglas():
    """Muestra todas las reglas cargadas"""
    print("\n📚 REGLAS CARGADAS EN EL SISTEMA:")
    print("=" * 50)
    
    for i, regla in enumerate(reglas, 1):
        print(f"\n{i}. {regla.get('nombre', 'Sin nombre')}")
        print(f"   Diagnóstico: {regla['diagnostico']}")
        print(f"   Gravedad: {regla.get('gravedad', 'No especificada')}")
        print(f"   Condiciones: {len(regla['condiciones'])}")
        print(f"   Explicación: {regla['explicacion'][:100]}...")

if __name__ == "__main__":
    print("🧠 SISTEMA EXPERTO - PRUEBA COMPLETA")
    print("=" * 50)
    
    # Mostrar reglas cargadas
    mostrar_reglas()
    
    # Ejecutar pruebas
    test_casos_ejemplo()
    
    print("\n✅ Prueba completada")
