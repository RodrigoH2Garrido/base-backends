import { Router } from "express";

import {
    assignTaskToUsers,
    createTask,
    deleteTaskById,
    getAllTasks
} from '../controllers/task.controller'

const taskRouter = Router()

taskRouter.get('/tasks',getAllTasks)
taskRouter.post('/tasks',createTask)
taskRouter.delete('/tasks/:taskId',deleteTaskById)
taskRouter.post('/tasks/assignation',assignTaskToUsers)

export default taskRouter