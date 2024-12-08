import { Router } from "express";

import { getSessions } from "../controllers/session.controller";


const sessionRouter = Router()

sessionRouter.get('/sessions',getSessions)

export default sessionRouter