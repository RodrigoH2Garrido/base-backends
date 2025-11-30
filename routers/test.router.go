package routers

import (
	"github.com/gin-gonic/gin"
    "github.com/gin-gonic/gin/binding"
)

type fomrA struct {
	Foo string `json:"foo" binding:"required"`
}

type formB struct {
	Bar string `json:"bar" binding:"required"`
}

func TestRouter(r *gin.RouterGroup){
	router := r.Group("/test")
	{
		router.GET("/test1", test1Handler)
		router.GET("/test2", test2Handler)
		router.POST("/test3", test3Handler)
	}
}

func test1Handler(c *gin.Context){
	c.JSON(200, gin.H{"message": "test1"})
}

func test2Handler(c *gin.Context){
	c.JSON(200, gin.H{"message": "test2"})
}

func test3Handler(c *gin.Context){
	objA := fomrA{}
	objB := formB{}
	
	if errA := c.ShouldBindWith(&objA, binding.JSON); errA == nil {
		c.JSON(200, gin.H{"message": objA.Foo})
	} else if errB := c.ShouldBindWith(&objB, binding.JSON); errB == nil {  // ✅ Correcto
		c.JSON(200, gin.H{"message": objB.Bar})
	} else {  // ✅ Correcto
		c.JSON(200, gin.H{"message": "test3"})
	}

}