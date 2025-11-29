CONTAINER=go-gin-backend

# Crear módulo Go (solo si no existe)
docker exec -it $CONTAINER bash -c "[ ! -f go.mod ] && go mod init backend || echo 'go.mod ya existe'"

# Descargar Gin
docker exec -it $CONTAINER bash -c "go get github.com/gin-gonic/gin"

# Evitar error de VCS
docker exec -it $CONTAINER bash -c "go env -w GOFLAGS='-buildvcs=false'"

# Ordenar dependencias
docker exec -it $CONTAINER bash -c "go mod tidy"