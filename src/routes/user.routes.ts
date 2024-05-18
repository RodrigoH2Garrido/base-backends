import { Router } from "express";

import { 
    getUsers,
    createUser,
    updateUserById,
    getUserById,
    deleteUserById,
    validateUserPwd
} from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/users',getUsers)
userRouter.post('/users',createUser)
userRouter.patch('/users/:userId',updateUserById)
userRouter.get('/users/:userId',getUserById)
userRouter.delete('/users/:userId',deleteUserById)
userRouter.post('/users/validation/:userId/:userPwd',validateUserPwd)
export default userRouter
