
import joblib
import pandas as pd
import json
import os

# --- Rutas ---
# Rutas relativas desde src/models/ hacia la raíz del proyecto
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'diagnostico_dt_model.pkl')
RULES_PATH = os.path.join(BASE_DIR, 'src', 'reglas', 'diagnostico_reglas.json')

class MotorDiagnostico:
    def __init__(self):
        """Inicializa el motor cargando el modelo y las reglas."""
        try:
            self.model = joblib.load(MODEL_PATH)
            with open(RULES_PATH, 'r', encoding='utf-8') as f:
                self.reglas = json.load(f)['reglas']
            print("Motor de diagnóstico inicializado correctamente.")
        except FileNotFoundError as e:
            print(f"Error al cargar archivos: {e}. Asegúrate de que el modelo y las reglas existan.")
            self.model = None
            self.reglas = []

    def _aplicar_logica_clinica(self, datos_paciente, diagnostico_ml):
        """
        Aplica lógica clínica para ajustar el diagnóstico del ML cuando sea necesario.
        Prioriza diagnósticos más comunes cuando hay síntomas ambiguos.
        """
        fiebre = datos_paciente.get('fiebre', 36.5)
        tos = datos_paciente.get('tos', '')
        malestar = datos_paciente.get('malestar_general', False)
        confusion = datos_paciente.get('confusion', False)
        edad = datos_paciente.get('edad', 30)
        dolor_toracico = datos_paciente.get('dolor_toracico', '')
        falta_aire = datos_paciente.get('falta_de_aire', '')
        
        # Regla 1: Si hay fiebre alta + malestar + tos, pero sin síntomas graves específicos -> GRIPE
        if (fiebre > 38.0 and malestar and 
            not confusion and edad < 65 and 
            dolor_toracico != 'puntada_al_respirar' and 
            falta_aire != 'agotado'):
            return "Gripe"
        
        # Regla 2: Neumonía solo si hay síntomas realmente graves
        if (diagnostico_ml == "Neumonía" and 
            not (fiebre > 39.0 or confusion or 
                 (dolor_toracico == 'puntada_al_respirar' and falta_aire == 'agotado'))):
            # Si el ML dice neumonía pero no hay síntomas graves, cambiar a gripe
            if fiebre > 38.0 and malestar:
                return "Gripe"
        
        # Regla 3: Mantener diagnóstico original si los síntomas son claros
        return diagnostico_ml

    def _encontrar_regla_explicativa(self, datos_paciente, diagnostico_predicho):
        """
        Busca en las reglas JSON una que coincida con el diagnóstico y los síntomas 
        para dar una explicación simple.
        """
        for regla in self.reglas:
            if regla['diagnostico'] == diagnostico_predicho:
                # Aquí se podría implementar una lógica más compleja para ver qué tan bien "encaja" la regla.
                # Por ahora, devolvemos la descripción de la primera regla que coincida con el diagnóstico.
                return regla['descripcion']
        return "No se encontró una regla explicativa específica, pero el modelo se basó en patrones de síntomas similares."
    
    def diagnosticar_paciente(self, sintomas_paciente: dict):
        """
        Realiza un diagnóstico para un paciente dado.

        Args:
            sintomas_paciente (dict): Un diccionario con los atributos del paciente.

        Returns:
            tuple: Una tupla con (diagnóstico, gravedad, explicación).
        """
        if not self.model:
            return "Error", "Indeterminado", "El modelo no está cargado."

        try:            # Obtener las características que espera el modelo (en el orden correcto)
            expected_features = self.model.feature_names_in_
            
            # Filtrar y reordenar los datos para que coincidan con lo que espera el modelo
            filtered_data = {}
            for feature in expected_features:
                if feature in sintomas_paciente:
                    filtered_data[feature] = sintomas_paciente[feature]
                else:
                    # Asignar un valor por defecto según el tipo de característica
                    if feature in ['sibilancias', 'pecho_apretado', 'malestar_general', 'confusion', 
                                   'antecedentes_asma', 'antecedentes_alergias']:
                        filtered_data[feature] = False
                    elif feature == 'edad':
                        filtered_data[feature] = 40
                    elif feature == 'fiebre':
                        filtered_data[feature] = 36.5
                    elif feature == 'tos':
                        filtered_data[feature] = 'ninguna'
                    elif feature == 'dolor_toracico':
                        filtered_data[feature] = 'ninguno'
                    elif feature == 'falta_de_aire':
                        filtered_data[feature] = 'ninguna'
                    elif feature == 'fumador':
                        filtered_data[feature] = 'no'
                    else:
                        filtered_data[feature] = None
            
            # Convertir a DataFrame manteniendo el orden correcto
            input_df = pd.DataFrame([filtered_data])            # Predecir el diagnóstico inicial con ML
            diagnostico_ml = self.model.predict(input_df)[0]
            
            # Aplicar lógica clínica para refinar el diagnóstico
            diagnostico_final = self._aplicar_logica_clinica(sintomas_paciente, diagnostico_ml)
            
            # Lógica simple para determinar la gravedad basada en el diagnóstico final
            gravedad = "Indeterminada"
            for regla in self.reglas:
                if regla['diagnostico'] == diagnostico_final:
                    gravedad = regla['gravedad']
                    break

            # Generar una explicación
            explicacion = self._encontrar_regla_explicativa(sintomas_paciente, diagnostico_final)

            return diagnostico_final, gravedad, explicacion

        except Exception as e:
            print(f"ERROR en el motor de diagnóstico: {e}")
            import traceback
            traceback.print_exc()
            return "Error", "Indeterminado", f"Ocurrió un error durante la predicción: {e}"

# Ejemplo de uso (para probar el módulo directamente)
if __name__ == '__main__':
    # Crear un paciente de ejemplo que podría tener neumonía
    paciente_ejemplo = {
        'tos': 'con_flema_purulenta_sangre',
        'fiebre': 39.5,
        'dolor_toracico': 'puntada_al_respirar',
        'falta_de_aire': 'agotado',
        'sibilancias': False,
        'pecho_apretado': False,
        'malestar_general': True,
        'confusion': True, # Síntoma clave en abuelos
        'edad': 80,
        'fumador': 'ex_fumador',
        'antecedentes_asma': False,
        'antecedentes_alergias': False,
        'exposicion_humo_lenia': False,
        'vivienda_mal_ventilada': True
    }

    motor = MotorDiagnostico()
    if motor.model:
        diag, grav, expl = motor.diagnosticar_paciente(paciente_ejemplo)
        print("--- RESULTADO DEL DIAGNÓSTICO ---")
        print(f"Diagnóstico Predicho: {diag}")
        print(f"Gravedad Estimada: {grav}")
        print(f"Explicación: {expl}")
