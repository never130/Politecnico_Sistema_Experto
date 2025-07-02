from flask import Flask, request, jsonify
from flask_cors import CORS
from src.engine.motor_inferencia import inferir
from src.ml_model.predict_model import predecir_ml
import os
import json

app = Flask(__name__)
CORS(app)

REGLAS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../knowledge_base/reglas.json'))

@app.route('/diagnostico', methods=['POST'])
def diagnostico():
    datos = request.json
    resultado = inferir(datos)
    
    # Verificar si inferir retorna 4 elementos (incluye gravedad) o 3 elementos (sin gravedad)
    if len(resultado) == 4:
        diagnostico, explicacion, regla, gravedad = resultado
    else:
        diagnostico, explicacion, regla = resultado
        gravedad = 'moderado'  # Valor por defecto
    
    if diagnostico == 'Sin diagnóstico':
        diag_ml, proba = predecir_ml(datos)
        
        # Obtener gravedad correcta desde las reglas para el diagnóstico ML
        gravedad_ml = 'moderado'  # Valor por defecto
        with open(REGLAS_PATH, 'r', encoding='utf-8') as f:
            reglas_lista = json.load(f)
            for regla in reglas_lista:
                if regla['diagnostico'].lower() == diag_ml.lower():
                    gravedad_ml = regla['gravedad']
                    break
        
        # Explicación simple y amigable para ML
        explicacion_ml = (
            f"Basándose en el análisis de sus síntomas, el sistema sugiere: {diag_ml}.\n\n"
            "Esta predicción se basa en patrones aprendidos de casos médicos similares. "
            "Se recomienda consultar con un profesional de la salud para confirmar el diagnóstico "
            "y recibir el tratamiento adecuado."
        )
        return jsonify({
            'diagnostico': diag_ml,
            'explicacion': explicacion_ml,
            'regla_disparada': None,
            'gravedad': gravedad_ml
        })
    return jsonify({
        'diagnostico': diagnostico,
        'explicacion': explicacion,
        'regla_disparada': regla,
        'gravedad': gravedad
    })

@app.route('/reglas', methods=['GET'])
def listar_reglas():
    with open(REGLAS_PATH, 'r', encoding='utf-8') as f:
        reglas = json.load(f)
    return jsonify(reglas)

@app.route('/reglas', methods=['POST'])
def agregar_regla():
    nueva_regla = request.json
    with open(REGLAS_PATH, 'r', encoding='utf-8') as f:
        reglas = json.load(f)
    reglas.append(nueva_regla)
    with open(REGLAS_PATH, 'w', encoding='utf-8') as f:
        json.dump(reglas, f, ensure_ascii=False, indent=2)
    return jsonify({'mensaje': 'Regla agregada exitosamente', 'regla': nueva_regla}), 201

if __name__ == '__main__':
    app.run(debug=True)
