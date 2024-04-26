import { Request, Response } from "express";
import Joi from "joi";
import Users from "../models/Users";
import { UserTable } from "../db/ColumnNames";

export const getUsers = async (request: Request, response: Response) => {
    const users = await Users.findAll()
    return response.status(200).json({
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
        return response.status(500).json({
            error: error
        })
    }

    try {

        const createdUser = await (await Users.create(body)).toJSON()
        console.log('CREATED USER: ',createdUser)
        return response.status(200).json({
            message: 'Creating User',
            user: createdUser[UserTable.id]
        })
    } catch (error) {
        return response.status(500).json({
            error: error,
            message: 'Something went wrong when creating a user'
        })
    }

}