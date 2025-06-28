import unittest
from src.knowledge_base.motor_inferencia import inferir

class TestMotorInferencia(unittest.TestCase):
    def test_gripe(self):
        hechos = {'fiebre': 39, 'tos': 'seca', 'malestar_general': True}
        diag, expl, regla = inferir(hechos)
        self.assertEqual(diag, 'Gripe')
    def test_neumonia(self):
        hechos = {'fiebre': 40, 'dolor_toracico': 'puntada_al_respirar', 'falta_de_aire': 'agotado'}
        diag, expl, regla = inferir(hechos)
        self.assertEqual(diag, 'Neumonía')
    def test_sin_diagnostico(self):
        hechos = {'fiebre': 36, 'tos': 'ninguna'}
        diag, expl, regla = inferir(hechos)
        self.assertEqual(diag, 'Sin diagnóstico')

if __name__ == '__main__':
    unittest.main()
