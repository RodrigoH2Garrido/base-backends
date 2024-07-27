import { Router } from "express";

import {
    assignTaskToUsers,
    createTask,
    deleteTaskById,
    getAllTasks,
    updateTaskStatusById
} from '../controllers/task.controller'

const taskRouter = Router()

taskRouter.get('/tasks',getAllTasks)
taskRouter.post('/tasks',createTask)
taskRouter.delete('/tasks/:taskId',deleteTaskById)
taskRouter.post('/tasks/assignation',assignTaskToUsers)
taskRouter.patch('/tasks/:taskId/:statusId', updateTaskStatusById)

export default taskRouter