# Archivo movido desde knowledge_base
import json
import operator
import os

OPERADORES = {
    '==': operator.eq,
    '!=': operator.ne,
    '>': operator.gt,
    '<': operator.lt,
    '>=': operator.ge,
    '<=': operator.le,
    'in': lambda a, b: a in b,
    'not in': lambda a, b: a not in b
}

RUTA_REGLAS = os.path.abspath(os.path.join(os.path.dirname(__file__), '../knowledge_base/reglas.json'))
with open(RUTA_REGLAS, 'r', encoding='utf-8') as f:
    reglas = json.load(f)

def evaluar_regla(regla, hechos):
    for cond in regla['condiciones']:
        hecho = hechos.get(cond['hecho'])
        if hecho is None:
            return False  # Si falta el hecho, la condición no se cumple
        op = OPERADORES[cond['operador']]
        if not op(hecho, cond['valor']):
            return False
    return True

def explicar_regla(regla, hechos):
    """Genera una explicación simple y amigable para el usuario"""
    # Solo retornamos la explicación médica de la regla, sin detalles técnicos
    return regla['explicacion']

def inferir(hechos):
    for regla in reglas:
        if evaluar_regla(regla, hechos):
            explicacion_detallada = explicar_regla(regla, hechos)
            gravedad = regla.get('gravedad', 'moderado')  # Valor por defecto si no existe
            return regla['diagnostico'], explicacion_detallada, regla['nombre'], gravedad
    return 'Sin diagnóstico', 'No se encontró una regla que explique los síntomas ingresados.', None, 'leve'
