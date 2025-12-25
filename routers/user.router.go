package routers

import (
	"github.com/gin-gonic/gin"
	"backend/controllers"
)


func UserRouter(r *gin.RouterGroup){
	router := r.Group("/users")
	router.GET("/", controllers.GetUsers)
	router.POST("/", controllers.CreateUser)
}