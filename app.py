
from flask import Flask, render_template_string, request
import sys
import os

# Añadir el directorio src al path para poder importar el motor de diagnóstico
SRC_DIR = os.path.join(os.path.dirname(__file__), 'src')
sys.path.append(SRC_DIR)

from models.predict_model import MotorDiagnostico

app = Flask(__name__)

# Inicializar el motor de diagnóstico
motor = MotorDiagnostico()

# --- Plantilla HTML para el formulario ---
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Experto - Diagnóstico Respiratorio TDF</title>
    <style>
        body { font-family: sans-serif; background-color: #f4f4f9; color: #333; margin: 20px; }
        .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1, h2 { color: #0056b3; }
        form { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; }
        label { font-weight: bold; margin-bottom: 5px; }
        input[type="text"], input[type="number"], select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        .checkbox-group { display: flex; align-items: center; }
        .checkbox-group input { margin-right: 10px; }
        .btn-submit { grid-column: 1 / -1; padding: 12px; background-color: #0056b3; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
        .btn-submit:hover { background-color: #004494; }
        .result { margin-top: 20px; padding: 15px; border-radius: 5px; }
        .result.Grave { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .result.Moderado { background-color: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
        .result.Leve { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Sistema Experto para Diagnóstico Respiratorio</h1>
        <p>Basado en el conocimiento del Agente Sanitario Daniel Pressacco (Tierra del Fuego).</p>
        
        <form action="/diagnosticar" method="post">
            <!-- Síntomas -->
            <div class="form-group">
                <label for="tos">Tipo de Tos</label>
                <select id="tos" name="tos">
                    <option value="ninguna">Ninguna</option>
                    <option value="seca">Seca</option>
                    <option value="con_flema_transparente_verdosa">Con Flema (Clara/Verdosa)</option>
                    <option value="con_flema_purulenta_sangre">Con Flema (Purulenta/Sangre)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="fiebre">Fiebre (°C)</label>
                <input type="number" id="fiebre" name="fiebre" step="0.1" value="36.5">
            </div>

            <div class="form-group">
                <label for="dolor_toracico">Dolor Torácico</label>
                <select id="dolor_toracico" name="dolor_toracico">
                    <option value="ninguno">Ninguno</option>
                    <option value="molestia_leve">Molestia Leve</option>
                    <option value="puntada_al_respirar">Puntada al Respirar/Toser</option>
                </select>
            </div>

            <div class="form-group">
                <label for="falta_de_aire">Falta de Aire (Disnea)</label>
                <select id="falta_de_aire" name="falta_de_aire">
                    <option value="ninguna">Ninguna</option>
                    <option value="repentina">Repentina</option>
                    <option value="empeora_con_anios">Empeora con los Años</option>
                    <option value="al_caminar_rapido">Al Caminar Rápido</option>
                    <option value="agotado">Agotado/En Reposo</option>
                </select>
            </div>

            <div class="checkbox-group">
                <input type="checkbox" id="sibilancias" name="sibilancias">
                <label for="sibilancias">¿Silbido al respirar (sibilancias)?</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="pecho_apretado" name="pecho_apretado">
                <label for="pecho_apretado">¿Sensación de pecho apretado?</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="malestar_general" name="malestar_general">
                <label for="malestar_general">¿Malestar general / Cansancio?</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="confusion" name="confusion">
                <label for="confusion">¿Confusión / Desorientación (especialmente en mayores)?</label>
            </div>

            <!-- Antecedentes y Contexto -->
            <div class="form-group">
                <label for="edad">Edad</label>
                <input type="number" id="edad" name="edad" value="40">
            </div>

            <div class="form-group">
                <label for="fumador">Hábito de Fumar</label>
                <select id="fumador" name="fumador">
                    <option value="no">No fumador</option>
                    <option value="ex_fumador">Ex-fumador</option>
                    <option value="si_activo">Fumador Activo</option>
                    <option value="de_toda_la_vida">Fumador de toda la vida</option>
                </select>
            </div>

            <div class="checkbox-group">
                <input type="checkbox" id="antecedentes_asma" name="antecedentes_asma">
                <label for="antecedentes_asma">¿Antecedentes de Asma?</label>
            </div>            <div class="checkbox-group">
                <input type="checkbox" id="antecedentes_alergias" name="antecedentes_alergias">
                <label for="antecedentes_alergias">¿Antecedentes de Alergias/Rinitis?</label>
            </div>

            <button type="submit" class="btn-submit">Obtener Diagnóstico</button>
        </form>

        {% if resultado %}
        <div class="result {{ resultado.gravedad }}">
            <h2>Resultado del Diagnóstico</h2>
            <p><strong>Diagnóstico:</strong> {{ resultado.diagnostico }}</p>
            <p><strong>Gravedad:</strong> {{ resultado.gravedad }}</p>
            <p><strong>Explicación:</strong> {{ resultado.explicacion }}</p>
        </div>
        {% endif %}
    </div>
</body>
</html>
'''

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route('/diagnosticar', methods=['POST'])
def diagnosticar():    # Recolectar datos del formulario
    datos_paciente = {
        'tos': request.form['tos'],
        'fiebre': float(request.form['fiebre']),
        'dolor_toracico': request.form['dolor_toracico'],
        'falta_de_aire': request.form['falta_de_aire'],
        'sibilancias': 'sibilancias' in request.form,
        'pecho_apretado': 'pecho_apretado' in request.form,
        'malestar_general': 'malestar_general' in request.form,
        'confusion': 'confusion' in request.form,
        'edad': int(request.form['edad']),
        'fumador': request.form['fumador'],
        'antecedentes_asma': 'antecedentes_asma' in request.form,
        'antecedentes_alergias': 'antecedentes_alergias' in request.form
    }

    # Obtener diagnóstico del motor
    diagnostico, gravedad, explicacion = motor.diagnosticar_paciente(datos_paciente)

    resultado = {
        'diagnostico': diagnostico,
        'gravedad': gravedad,
        'explicacion': explicacion
    }

    return render_template_string(HTML_TEMPLATE, resultado=resultado)

if __name__ == '__main__':
    # Para desarrollo, puedes ejecutarlo así.
    # Para producción, usa un servidor WSGI como Gunicorn.
    app.run(debug=True, port=5001)
