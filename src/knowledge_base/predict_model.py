import joblib
import os
import numpy as np
import pandas as pd

# Ruta al modelo entrenado
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../models/diagnostico_dt_model.pkl'))

# Cargar el modelo ML
modelo = joblib.load(MODEL_PATH)

# Definir el orden de los features esperado por el modelo
FEATURES = [
    'fiebre', 'tos', 'dolor_toracico', 'falta_de_aire', 'sibilancias', 'pecho_apretado',
    'malestar_general', 'confusion', 'edad', 'fumador', 'antecedentes_asma', 'antecedentes_alergias'
]

def hechos_a_dataframe(hechos):
    """Convierte el diccionario de hechos a un DataFrame para el modelo ML."""
    return pd.DataFrame([{k: hechos.get(k, None) for k in FEATURES}])

def predecir_ml(hechos):
    """Devuelve el diagnóstico ML y la probabilidad asociada."""
    x = hechos_a_dataframe(hechos)
    pred = modelo.predict(x)[0]
    proba = float(np.max(modelo.predict_proba(x)))
    return pred, proba
