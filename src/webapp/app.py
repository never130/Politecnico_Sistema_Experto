from flask import Flask, request, jsonify
from src.knowledge_base.motor_inferencia import inferir

app = Flask(__name__)

@app.route('/diagnostico', methods=['POST'])
def diagnostico():
    datos = request.json
    diagnostico, explicacion, regla = inferir(datos)
    return jsonify({
        'diagnostico': diagnostico,
        'explicacion': explicacion,
        'regla_disparada': regla
    })

if __name__ == '__main__':
    app.run(debug=True)
