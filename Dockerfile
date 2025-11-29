FROM golang:1.22

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalamos Air (hot reload)
RUN go install github.com/air-verse/air@latest

# Copiamos los archivos de dependencias primero (mejor cache)
COPY go.mod go.sum ./
RUN go mod download

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto donde corre Gin
EXPOSE 8080

# Comando de desarrollo con hot reload
CMD ["air"]