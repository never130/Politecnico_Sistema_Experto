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
            if op == 'mayor_que':
                paciente[hecho] = valor + np.random.uniform(0.5, 2)
            elif op == 'menor_que':
                paciente[hecho] = valor - np.random.uniform(0.5, 2)
            else:
                paciente[hecho] = valor
        elif ATRIBUTOS.get(hecho) == 'int':
            if op == 'mayor_que':
                paciente[hecho] = valor + np.random.randint(1, 10)
            elif op == 'menor_que':
                paciente[hecho] = max(1, valor - np.random.randint(1, 10))
            else:
                paciente[hecho] = valor
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

    # Condiciones 'ninguno_de' (asegurar que NO se cumplan)
    if 'ninguno_de' in regla['condiciones']:
        for cond in regla['condiciones']['ninguno_de']:
            hecho, op, valor = cond['hecho'], cond['operador'], cond['valor']
            if ATRIBUTOS.get(hecho) == 'bool':
                paciente[hecho] = not valor
            elif hecho not in paciente:  # Solo si no se ha asignado ya
                if ATRIBUTOS.get(hecho) == 'float':
                    paciente[hecho] = round(np.random.uniform(36.0, 37.0), 1)
                else:
                    # Para categóricos, elegir cualquier valor excepto el prohibido
                    opciones_validas = [x for x in ATRIBUTOS[hecho] if x != valor]
                    if opciones_validas:
                        paciente[hecho] = np.random.choice(opciones_validas)

    paciente['diagnostico'] = regla['diagnostico']
    paciente['gravedad'] = regla['gravedad']
    return paciente

# Función eliminada - ya no generamos pacientes aleatorios
# Solo utilizamos las reglas médicas definidas en el JSON

def make_dataset():
    """Crea el dataset sintético y lo guarda en un archivo CSV."""
    
    # Cargar reglas
    with open(RULES_PATH, 'r', encoding='utf-8') as f:
        reglas_json = json.load(f)
    reglas = reglas_json['reglas']
    
    dataset = []
      # Generar datos basados ÚNICAMENTE en reglas (100% de los datos)
    # Esto asegura que todos los casos tengan lógica médica coherente
    for i in range(NUM_SAMPLES):
        regla_a_aplicar = reglas[i % len(reglas)] # Ciclar sobre las reglas
        paciente = aplicar_regla(regla_a_aplicar)
        dataset.append(paciente)

    # Crear DataFrame y rellenar valores faltantes
    df = pd.DataFrame(dataset)
    
    # Rellenar NaNs con valores plausibles
    for col, tipo in ATRIBUTOS.items():
        if col not in df.columns:
            continue
        
        if df[col].isnull().any():
            if tipo == 'bool':
                # Para bool, rellenamos los NaNs con una elección aleatoria para cada fila NaN
                na_mask = df[col].isnull()
                df.loc[na_mask, col] = np.random.choice([True, False], size=na_mask.sum())
                df[col] = df[col].astype(bool)
            elif tipo == 'float':
                df[col] = df[col].fillna(round(np.random.uniform(36.5, 37.5), 1))
            elif tipo == 'int':
                df[col] = df[col].fillna(np.random.randint(20, 60)).astype(int)
            else: # Categórico
                default_value = 'ninguno' if 'ninguno' in tipo else tipo[0]
                df[col] = df[col].fillna(default_value)

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
