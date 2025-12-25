package models

package models

type CreateUserRequest struct {
    Username string `json:"username" binding:"required,min=3,max=20"`
    Password string `json:"password" binding:"required,min=6"`
    Email    string `json:"email" binding:"required,email"`
}


type UpdateUserRequest struct {
    Username string `json:"username,omitempty" binding:"omitempty,min=3,max=20"`
    Password string `json:"password,omitempty" binding:"omitempty,min=6"`
    Email    string `json:"email,omitempty" binding:"omitempty,email"`
}


type LoginRequest struct {
    Username string `json:"username" binding:"required"`
    Password string `json:"password" binding:"required"`
}
