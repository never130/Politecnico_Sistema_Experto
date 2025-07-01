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

RUTA_REGLAS = os.path.abspath(os.path.join(os.path.dirname(__file__), 'reglas.json'))
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
    partes = []
    for cond in regla['condiciones']:
        hecho_val = hechos.get(cond['hecho'])
        operador = cond['operador']
        valor = cond['valor']
        # Formato amigable para el usuario
        if operador == 'in':
            partes.append(f"{cond['hecho']} = {hecho_val} (esperado: uno de {valor})")
        elif operador == 'not in':
            partes.append(f"{cond['hecho']} = {hecho_val} (esperado: distinto de {valor})")
        else:
            partes.append(f"{cond['hecho']} = {hecho_val} ({cond['hecho']} {operador} {valor})")
    condiciones_str = '; '.join(partes)
    return (
        f"Se detectó: {condiciones_str}.\n"
        f"Explicación médica: {regla['explicacion']}"
    )

def inferir(hechos):
    for regla in reglas:
        if evaluar_regla(regla, hechos):
            explicacion_detallada = explicar_regla(regla, hechos)
            return regla['diagnostico'], explicacion_detallada, regla['nombre']
    return 'Sin diagnóstico', 'No se encontró una regla que explique los síntomas ingresados.', None
