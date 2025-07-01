# Archivo movido desde knowledge_base
import joblib
import os
import numpy as np
import pandas as pd

MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../models/diagnostico_dt_model.pkl'))
modelo = joblib.load(MODEL_PATH)

FEATURES = [
    'fiebre', 'tos', 'dolor_toracico', 'falta_de_aire', 'sibilancias', 'pecho_apretado',
    'malestar_general', 'confusion', 'edad', 'fumador', 'antecedentes_asma', 'antecedentes_alergias'
]

def hechos_a_dataframe(hechos):
    return pd.DataFrame([{k: hechos.get(k, None) for k in FEATURES}])

def predecir_ml(hechos):
    x = hechos_a_dataframe(hechos)
    pred = modelo.predict(x)[0]
    proba = float(np.max(modelo.predict_proba(x)))
    return pred, proba
