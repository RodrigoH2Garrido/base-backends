package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"backend/models/user"
)


var users = []User{
	{Username: "XXXXX", Password: "password1", Email: "user1@example.com"},
	{Username: "XXXXX", Password: "password2", Email: "user2@example.com"},
}

func GetUsers(c *gin.Context){
	c.IndentedJSON(http.StatusOK, users)
}


func CreateUser(c *gin.Context){
    var newUser CreateUserRequest    
    if err := c.ShouldBindWith(&newUser, binding.JSON); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    users = append(users, newUser)
    c.IndentedJSON(http.StatusCreated, newUser)
}