import { Router } from "express";
import testRouter from "./routes/test.routes";
const router = Router()

router.use(testRouter)

export default router