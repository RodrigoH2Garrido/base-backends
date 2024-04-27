import { Router } from "express";
import roleRouter from "./routes/role.routes";
import userRouter from "./routes/user.routes";

const router = Router()

router.use(roleRouter)
router.use(userRouter)

export default router