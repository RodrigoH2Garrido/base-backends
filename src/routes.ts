import { Router } from "express";
import roleRouter from "./routes/role.routes";
import userRouter from "./routes/user.routes";
import groupRouter from "./routes/group.routes";

const router = Router()

router.use(roleRouter)
router.use(userRouter)
router.use(groupRouter)

export default router