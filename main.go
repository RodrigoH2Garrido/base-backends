package main

import (
	"github.com/gin-gonic/gin"
	"backend/routers"
)

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "Hola Rodrigo!",
        })
    })

	routers.GeneralRouter(r)
    r.Run(":8080")
}