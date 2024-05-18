import { Request, Response } from "express";
import Joi from "joi";
import Users from "../models/Users";
import { UserTable } from "../db/ColumnNames";
import httpStatus from "http-status-codes";
import { deleteUserToGroupAssignation } from "../services/user.group.assignation.service";
import bcrypt from 'bcrypt'

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
        [UserTable.email]: Joi.string().required(),
        [UserTable.password]: Joi.string().required()
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
        const saltRounds = 10
        const hashedPwd = await bcrypt.hash(body.password,saltRounds)
        const data = {...body, [UserTable.password]: hashedPwd}
        const createdUser = (await Users.create(data)).toJSON() // no se si esto funciona
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

export const updateUserById = async(request: Request, response: Response) => {
    const userId = request.params.userId
    const body = request.body
    try {
        const user = await Users.findOne({
            where:{
                [UserTable.id]: userId
            }
        })
        if(!user){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `User ${userId} doesn't exists`
            })
        }

        const schema = Joi.object({
            [UserTable.name]: Joi.string(),
            [UserTable.last_name]: Joi.string(),
            [UserTable.nickname]: Joi.string(),
            [UserTable.phone]: Joi.string(),
            [UserTable.email]: Joi.string()
        }).or(UserTable.name,UserTable.last_name,UserTable.nickname,UserTable.phone,UserTable.email)
    
        try {
            const validation = await schema.validateAsync(body)
            console.log(`Validation: `, validation)
        } catch (error) {
            return response.status(httpStatus.PRECONDITION_FAILED).json({
                error: error
            })        
        }

        const updatedUser = await Users.update(
            { ...body },
            {
                where:{
                    [UserTable.id]: userId
                }
            }
        )
        console.log('UPDATED USER: ', updatedUser)
        return response.status(httpStatus.OK).json({
            message: 'updating User by id',
            foundUser:  user,
            update: updatedUser
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: "error updating",
            error: error
        })
    }
}

export const getUserById = async(request:Request, response:Response) => {
    const userId = request.params.userId
    try {
        const user = await Users.findOne(
            {
                where:{
                    [UserTable.id]: userId
                }
            }
        )
    
        if(user){
            return response.status(httpStatus.OK).json({
                message: 'Getting User by id',
                user: user
            })
        }else {
            return response.status(httpStatus.NOT_FOUND).json({
                message: `User ${userId} doesn't exists`
            })
        }
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when getting user by id'
        })
    }
}

export const deleteUserById = async(request:Request, response:Response) => {
    const userId = Number(request.params.userId)
    try {
        const user = await Users.findOne({
            where:{
                [UserTable.id]: userId
            }
        })

        if(!user){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `User ${userId} not found`
            })
        }

        const deletedUser = await user.destroy()
        console.log('DELETED USER: ', deletedUser)
        const deletedAssignation = await deleteUserToGroupAssignation(userId)
        console.log(`Deleted Assignation: ${deletedAssignation}`)
        return response.status(httpStatus.OK).json({
            message:`User ${userId} deleted`,
            user: user,
            deletedUser: deletedUser
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when deleting a user',
            error: error
        })
    }
}

export const validateUserPwd = async (request: Request, response: Response) => {
    const userId = Number(request.params.userId)
    const userPwd = request.params.userPwd
    try {
        const user = await Users.findOne({
            where:{
                [UserTable.id]: userId
            }
        })
        if(!user){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `User ${userId} doesn't exist`,
            })
        }
        const userFound = user.toJSON()
        const validation = await bcrypt.compare(userPwd,userFound[UserTable.password])
        return response.status(httpStatus.OK).json({
            user: userFound,
            validation: validation
        })
    } catch (error) {
        console.log(error)
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when validating pwd',
            error: error
        })
    }
}