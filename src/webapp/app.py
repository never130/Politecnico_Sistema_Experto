from flask import Flask, request, jsonify
from flask_cors import CORS
from src.knowledge_base.motor_inferencia import inferir
from src.knowledge_base.predict_model import predecir_ml

app = Flask(__name__)
CORS(app)

@app.route('/diagnostico', methods=['POST'])
def diagnostico():
    datos = request.json
    diagnostico, explicacion, regla = inferir(datos)
    if diagnostico == 'Sin diagnóstico':
        diag_ml, proba = predecir_ml(datos)
        return jsonify({
            'diagnostico': diag_ml,
            'explicacion': f"Predicción ML (probabilidad: {proba:.2f})",
            'regla_disparada': None
        })
    return jsonify({
        'diagnostico': diagnostico,
        'explicacion': explicacion,
        'regla_disparada': regla
    })

if __name__ == '__main__':
    app.run(debug=True)
