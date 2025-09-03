# Usa una imagen base de Python ligera y oficial
FROM python:3.10-slim

# Evita que Python almacene en búfer la salida, facilitando los logs
ENV PYTHONUNBUFFERED=1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de requerimientos e instala las dependencias
# Esto se hace por separado para aprovechar el almacenamiento en caché de Docker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de los archivos necesarios para la aplicación
# Se copian las carpetas que contienen la lógica, el modelo y las reglas
COPY ./src ./src
COPY ./models ./models
COPY ./data ./data

# Expone el puerto en el que gunicorn se ejecutará dentro del contenedor
EXPOSE 8080

# Comando para iniciar la aplicación en producción
# Se ejecuta gunicorn, apuntando al objeto 'app' dentro de 'src/webapp/app.py'
# --workers 2: Inicia dos procesos para manejar peticiones
# --bind 0.0.0.0:8080: Escucha en todas las interfaces de red en el puerto 8080
CMD ["gunicorn", "--workers", "2", "--bind", "0.0.0.0:8080", "src.webapp.app:app"]
