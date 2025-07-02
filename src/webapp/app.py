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
        # Explicación amigable para ML
        sintomas = []
        for k, v in datos.items():
            sintomas.append(f"{k.replace('_', ' ').capitalize()}: {v}")
        sintomas_str = '\n'.join(f"- {s}" for s in sintomas)
        explicacion_ml = (
            f"Predicción ML (probabilidad: {proba:.2f})\n"
            "No se encontró una regla explícita para su caso, por lo que se utilizó el modelo de aprendizaje automático.\n"
            f"\nSíntomas analizados:\n{sintomas_str}\n\n"
            "Nota: El modelo ML no puede explicar el diagnóstico como un médico, pero utiliza patrones aprendidos de muchos casos reales."
        )
        return jsonify({
            'diagnostico': diag_ml,
            'explicacion': explicacion_ml,
            'regla_disparada': None,
            'gravedad': 'moderado'
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
