# Base de reglas SI-ENTONCES para diagnóstico respiratorio
# Cada regla es un diccionario con 'condicion' y 'diagnostico'

reglas = [
    {
        'nombre': 'Gripe',
        'condicion': lambda hechos: hechos.get('fiebre', 0) > 38.5 and hechos.get('tos', '') == 'seca' and hechos.get('malestar_general', False),
        'diagnostico': 'Gripe',
        'explicacion': 'Fiebre alta, tos seca y malestar general.'
    },
    {
        'nombre': 'Neumonía',
        'condicion': lambda hechos: hechos.get('fiebre', 0) > 39 and hechos.get('dolor_toracico', '') == 'puntada_al_respirar' and hechos.get('falta_de_aire', '') == 'agotado',
        'diagnostico': 'Neumonía',
        'explicacion': 'Fiebre muy alta, dolor torácico y falta de aire grave.'
    },
    {
        'nombre': 'Bronquitis Aguda',
        'condicion': lambda hechos: hechos.get('tos', '') in ['seca', 'con_flema_transparente_verdosa'] and hechos.get('fiebre', 0) < 38.5 and hechos.get('malestar_general', False),
        'diagnostico': 'Bronquitis Aguda',
        'explicacion': 'Tos persistente, fiebre baja o ausente, malestar general.'
    },
    {
        'nombre': 'Crisis Asmática',
        'condicion': lambda hechos: hechos.get('sibilancias', False) and hechos.get('falta_de_aire', '') in ['repentina', 'al_caminar_rapido'] and hechos.get('antecedentes_asma', True),
        'diagnostico': 'Crisis Asmática',
        'explicacion': 'Sibilancias, disnea súbita y antecedentes de asma.'
    },
    {
        'nombre': 'EPOC',
        'condicion': lambda hechos: hechos.get('fumador', '') in ['si_activo', 'ex_fumador'] and hechos.get('falta_de_aire', '') == 'empeora_con_anios' and hechos.get('edad', 0) > 45,
        'diagnostico': 'EPOC',
        'explicacion': 'Fumador, disnea progresiva y edad mayor.'
    },
    {
        'nombre': 'Resfrío Común',
        'condicion': lambda hechos: hechos.get('fiebre', 0) < 37.5 and hechos.get('tos', '') in ['ninguna', 'seca'] and not hechos.get('malestar_general', False),
        'diagnostico': 'Resfrío Común',
        'explicacion': 'Síntomas leves, sin fiebre ni malestar importante.'
    },
    {
        'nombre': 'Bronquiolitis',
        'condicion': lambda hechos: hechos.get('edad', 0) < 2 and hechos.get('falta_de_aire', '') == 'repentina' and hechos.get('sibilancias', False),
        'diagnostico': 'Bronquiolitis',
        'explicacion': 'Lactante con disnea súbita y sibilancias.'
    },
]
