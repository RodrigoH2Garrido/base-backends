FROM nginx
ARG user
ARG uid

# Instalar Node.js y npm
RUN apt-get update && apt-get install -y nodejs npm

# Crear el grupo 'app'
RUN groupadd -r app

# Crear el usuario y agregarlo al grupo 'app'
RUN useradd -m -u $uid -g app $user

# Copiar los archivos de la aplicación al contenedor
COPY . /app

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Asignar permisos al usuario y grupo 'app' para la carpeta /app
RUN chown -R $user:app /app
RUN chmod -R 755 /app

# Copiar la configuración de Nginx al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Comando de inicio de Nginx
CMD ["nginx", "-g", "daemon off;"]
