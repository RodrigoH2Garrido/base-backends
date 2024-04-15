import { Router } from "express";
import { 
    getRoles
} from "../controllers/role.controller";

const roleRouter = Router()

roleRouter.get('/roles',getRoles)

export default roleRouter
