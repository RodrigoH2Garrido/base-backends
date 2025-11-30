package routers

import (
	"github.com/gin-gonic/gin"
)

func GeneralRouter(r *gin.Engine){
	api := r.Group("/api")
	TestRouter(api)
}