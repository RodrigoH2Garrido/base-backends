import { Router } from "express";

import { 
    getUsers,
    createUser,
    updateUserById,
    getUserById
} from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/users',getUsers)
userRouter.post('/users',createUser)
userRouter.patch('/users/:userId',updateUserById)
userRouter.get('/users/:userId',getUserById)

export default userRouter
