from .reglas import reglas

def inferir(hechos):
    for regla in reglas:
        if regla['condicion'](hechos):
            return regla['diagnostico'], regla['explicacion'], regla['nombre']
    return 'Sin diagnóstico', 'No se encontró una regla que explique los síntomas.', None
