FROM golang:1.25

# Directorio de trabajo dentro del contenedor
WORKDIR /app

RUN mkdir -p /tmp

# Instalamos Air (hot reload)
RUN go install github.com/air-verse/air@latest


COPY . .
RUN if [ -f go.mod ]; then go mod download; fi


# Exponemos el puerto donde corre Gin
EXPOSE 8080

# Comando de desarrollo con hot reload
CMD ["air"]