import { Router } from 'express'
import {
    test1,
    test2
} from '../controllers/test.controller'

const testRouter = Router()


testRouter.get('/test1',test1)
testRouter.get('/test2',test2)

export default testRouter
