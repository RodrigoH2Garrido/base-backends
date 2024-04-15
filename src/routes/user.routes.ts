import { Router } from "express";
import { 
    getUsers
} from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/users',getUsers)

export default userRouter
