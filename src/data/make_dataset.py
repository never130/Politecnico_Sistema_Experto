
import pandas as pd
import numpy as np
import json
import os

# --- Configuración ---
NUM_SAMPLES = 1000
OUTPUT_PATH = "c:/Users/NEVER/OneDrive/Documentos/VSCode/MisProyectos/Politecnico_Sistema_Experto/data/processed/dataset_respiratorio.csv"
RULES_PATH = "c:/Users/NEVER/OneDrive/Documentos/VSCode/MisProyectos/Politecnico_Sistema_Experto/src/reglas/diagnostico_reglas.json"

# --- Atributos y sus posibles valores ---
# Estos deben coincidir con los 'hechos' en las reglas JSON
ATRIBUTOS = {
    # Síntomas
    'tos': ['seca', 'con_flema_transparente_verdosa', 'con_flema_purulenta_sangre', 'ninguna'],
    'fiebre': 'float', # Valor numérico
    'dolor_toracico': ['puntada_al_respirar', 'molestia_leve', 'ninguno'],
    'falta_de_aire': ['repentina', 'empeora_con_anios', 'al_caminar_rapido', 'agotado', 'ninguna'],
    'sibilancias': 'bool',
    'pecho_apretado': 'bool',
    'malestar_general': 'bool',
    'confusion': 'bool',
    # Antecedentes y Contexto
    'edad': 'int', # Valor numérico
    'fumador': ['si_activo', 'ex_fumador', 'de_toda_la_vida', 'no'],
    'antecedentes_asma': 'bool',
    'antecedentes_alergias': 'bool',
    'exposicion_humo_lenia': 'bool',
    'vivienda_mal_ventilada': 'bool'
}

def aplicar_regla(regla):
    """Genera un paciente que cumple con una regla específica."""
    paciente = {}
    
    # Condiciones 'todos'
    for cond in regla['condiciones'].get('todos', []):
        hecho, op, valor = cond['hecho'], cond['operador'], cond['valor']
        if ATRIBUTOS.get(hecho) == 'bool':
            paciente[hecho] = valor
        elif ATRIBUTOS.get(hecho) == 'float':
            paciente[hecho] = valor + np.random.uniform(0.5, 2) if op == 'mayor_que' else valor - np.random.uniform(0.5, 2)
        elif ATRIBUTOS.get(hecho) == 'int':
             paciente[hecho] = valor + np.random.randint(1, 10) if op == 'mayor_que' else valor - np.random.randint(1, 10)
        else: # Categórico
            paciente[hecho] = valor

    # Condiciones 'alguno_de' (seleccionamos una al azar)
    if 'alguno_de' in regla['condiciones']:
        cond = np.random.choice(regla['condiciones']['alguno_de'])
        hecho, op, valor = cond['hecho'], cond['operador'], cond['valor']
        if ATRIBUTOS.get(hecho) == 'bool':
            paciente[hecho] = valor
        else:
            paciente[hecho] = valor

    paciente['diagnostico'] = regla['diagnostico']
    paciente['gravedad'] = regla['gravedad']
    return paciente

def generar_paciente_aleatorio():
    """Genera un paciente con atributos completamente aleatorios."""
    paciente = {}
    for attr, tipo in ATRIBUTOS.items():
        if tipo == 'bool':
            paciente[attr] = np.random.choice([True, False])
        elif tipo == 'float':
            paciente[attr] = round(np.random.uniform(36.0, 40.0), 1)
        elif tipo == 'int':
            paciente[attr] = np.random.randint(1, 90)
        else: # Categórico
            paciente[attr] = np.random.choice(tipo)
    
    # Diagnóstico y gravedad por defecto para casos aleatorios
    paciente['diagnostico'] = 'Resfrio_Comun'
    paciente['gravedad'] = 'Leve'
    return paciente

def make_dataset():
    """Crea el dataset sintético y lo guarda en un archivo CSV."""
    
    # Cargar reglas
    with open(RULES_PATH, 'r', encoding='utf-8') as f:
        reglas_json = json.load(f)
    reglas = reglas_json['reglas']
    
    dataset = []
    
    # Generar datos basados en reglas (70% de los datos)
    num_rule_based = int(NUM_SAMPLES * 0.7)
    for i in range(num_rule_based):
        regla_a_aplicar = reglas[i % len(reglas)] # Ciclar sobre las reglas
        paciente = aplicar_regla(regla_a_aplicar)
        dataset.append(paciente)
        
    # Generar datos aleatorios (30% de los datos)
    num_random = NUM_SAMPLES - num_rule_based
    for _ in range(num_random):
        dataset.append(generar_paciente_aleatorio())

    # Crear DataFrame y rellenar valores faltantes
    df = pd.DataFrame(dataset)
    
    # Rellenar NaNs con valores plausibles
    for col, tipo in ATRIBUTOS.items():
        if col not in df.columns:
            continue
        if tipo == 'bool':
            df[col].fillna(np.random.choice([True, False]), inplace=True)
        elif tipo == 'float':
            df[col].fillna(round(np.random.uniform(36.5, 37.5), 1), inplace=True)
        elif tipo == 'int':
            df[col].fillna(np.random.randint(20, 60), inplace=True)
        else: # Categórico
            # Rellenar con el valor más común o uno por defecto
            default_value = 'ninguno' if 'ninguno' in tipo else tipo[0]
            df[col].fillna(default_value, inplace=True)

    # Asegurar que el directorio de salida exista
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    
    # Guardar el dataset
    df.to_csv(OUTPUT_PATH, index=False)
    print(f"Dataset sintético con {len(df)} filas generado en: {OUTPUT_PATH}")
    print("\nPrimeras 5 filas del dataset:")
    print(df.head())
    print("\nDistribución de diagnósticos:")
    print(df['diagnostico'].value_counts())

if __name__ == '__main__':
    make_dataset()
