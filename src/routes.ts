import { Router } from "express";
import testRouter from "./routes/test.routes";
import roleRouter from "./routes/role.routes";
import userRouter from "./routes/user.routes";

const router = Router()

router.use(testRouter)
router.use(roleRouter)
router.use(userRouter)

export default router