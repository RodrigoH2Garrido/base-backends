import { Router } from "express";
import roleRouter from "./routes/role.routes";
import userRouter from "./routes/user.routes";
import groupRouter from "./routes/group.routes";
import invitationRouter from "./routes/invitation.routes";
import taskRouter from "./routes/task.routes";
import loginRouter from "./routes/login.routes";
import sessionRouter from "./routes/session.routes";

const router = Router()

router.use(roleRouter)
router.use(userRouter)
router.use(groupRouter)
router.use(invitationRouter)
router.use(taskRouter)
router.use(loginRouter)
router.use(sessionRouter)


export default router