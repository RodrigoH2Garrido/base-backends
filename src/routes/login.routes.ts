import { Router } from "express";

import { login } from "../controllers/login.controller";

const loginRouter = Router()

loginRouter.post('/login',login)

export default loginRouter