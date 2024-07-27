import { Request, Response } from "express"
import Joi from "joi"
import httpStatus from "http-status-codes"
import Tasks from "../models/Tasks"
import TaskUser from "../models/TaskUser"
import { TaskTable, TaskUserTable } from "../db/ColumnNames"
import { where } from "sequelize"

export const getAllTasks = async (request: Request, response: Response) => {
    try {
        const tasks = await Tasks.findAll()
        return response.status(httpStatus.OK).json({
            message: 'Tasks',
            tasks: tasks
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            messaje: 'Something went Wrong when getting tasks',
            error: error
        })
    }
}

export const createTask = async (request: Request, response: Response) => {
    /**not validating the status because its a fixed value on task creation */
    const schema = Joi.object({
        [TaskTable.name]: Joi.string().required(),
        [TaskTable.description]: Joi.string(),
        [TaskTable.quantity]: Joi.number().required(),
        [TaskTable.group_id]: Joi.number().required()
    })

    const body = request.body
    try {
        const validation = await schema.validateAsync(body)
    } catch (error) {
        return response.status(httpStatus.PRECONDITION_FAILED).json({
            error: error
        })
    }

    const creationStatusId = 1 //created
    const data = {...body, [TaskTable.status_id]: creationStatusId}
 
    try {
        const createdTask = await Tasks.create(data)
        console.log('CREATED TASK: ', createdTask)       
        return response.status(httpStatus.CREATED).json({
            message: `Task Created`,
            task: createdTask
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when creating a task',
            error: error
        })
    }

}

export const assignTaskToUsers = async (request: Request, response: Response ) => {
    const schema = Joi.object({
        [TaskUserTable.task_id]: Joi.number().required(),
        [TaskUserTable.user_id]: Joi.array().items(Joi.number()).required()
    })
    const body = request.body
    try {
        const validation = await schema.validateAsync(body)
        console.log('VALIDATION: ',validation)       
    } catch (error) {
        return response.status(httpStatus.PRECONDITION_FAILED).json({
            error:error
        })
    }

    try {
        const userIds = body[TaskUserTable.user_id]
        const taskId = body[TaskUserTable.task_id]

        const assignations = []
        for(const id of userIds){
            assignations.push({
                [TaskUserTable.user_id]: id,
                [TaskUserTable.task_id]: taskId
            })
        }
        const createdAssignations = await TaskUser.bulkCreate(assignations)
        return response.status(httpStatus.OK).json({
            assignations: createdAssignations
        })

    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when assigning task to users',
            error: error
        })
    }

}

export const deleteTaskById = async (request: Request, response: Response) => {
    const taskId = request.params.taskId
    try {
        const deletedTask = await Tasks.destroy({
            where:{
                [TaskTable.id]: taskId
            }
        })

        const deletedAssignations = await TaskUser.destroy({
            where:{
                [TaskUserTable.task_id]: taskId
            }
        })
        return response.status(httpStatus.OK).json({
            message: 'Task deleted',
            task: deletedTask,
            assignations: deletedAssignations
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when deleting task'
        })
    }
}

export const updateTaskStatusById = async (request: Request, response: Response) =>{
    const taskId = request.params.taskId
    const statusId = request.params.statusId

    try {
        const task = await Tasks.findOne({
            where:{
                [TaskTable.id]: taskId
            }
        })
        if(!task){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `Task: ${taskId} Not Found`
            })
        }

        // const updatedTask = await Tasks.update(
        //     { [TaskTable.status_id]: statusId },
        //     {
        //         where:{
        //             [TaskTable.id]: taskId
        //         }
        //     }
        // )

        const updatedTask = task.update(
            {
                [TaskTable.status_id]: statusId
            },
            {
                where:{
                    [TaskTable.id]: taskId
                }
            }
        )
        return response.status(httpStatus.OK).json({
            message: `Task: ${taskId} status updated to status: ${statusId}`,
            task: updatedTask
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: `Something whent wrong when updating task ${taskId}`
        })
    }
} 