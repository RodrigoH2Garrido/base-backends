import { Request, Response } from "express";
import Joi from "joi";
import Users from "../models/Users";
import { UserTable } from "../db/ColumnNames";
import httpStatus from "http-status-codes";
export const getUsers = async (request: Request, response: Response) => {
    const users = await Users.findAll()
    return response.status(httpStatus.OK).json({
        message: "Getting Users",
        users: users
    })
}

export const createUser = async (request: Request, response: Response) => {
    const schema = Joi.object({
        [UserTable.name]: Joi.string().required(),
        [UserTable.last_name]: Joi.string().required(),
        [UserTable.nickname]: Joi.string(),
        [UserTable.phone]: Joi.string(),
        [UserTable.email]: Joi.string().required()
    })
    const body = request.body
    try {
        const a = await schema.validateAsync(body)
        console.log('VALIDATION: ', a)
    } catch (error) {
        return response.status(httpStatus.PRECONDITION_FAILED).json({
            error: error
        })
    }

    try {

        const createdUser = await (await Users.create(body)).toJSON()
        console.log('CREATED USER: ',createdUser)
        return response.status(httpStatus.CREATED).json({
            message: 'Creating User',
            user: createdUser[UserTable.id]
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            error: error,
            message: 'Something went wrong when creating a user'
        })
    }

}