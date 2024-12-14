import { Response, Request } from "express"
import Joi from "joi"
import Sessions from "../models/Sessions"
import Users from "../models/Users"
import { updateSessionByUserId, generateToken, validateToken } from "../services/session.service"
import { SessionsTable, UserTable } from "../db/ColumnNames"
import httpStatus from "http-status-codes"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const login = async (request: Request , response: Response) => {
    const schema = Joi.object({
        [UserTable.email]: Joi.string().required(),
        [UserTable.password]: Joi.string().required(),
        [SessionsTable.token]: Joi.string()
    })
    const body = request.body
    try {
        const a = await schema.validateAsync(body)
        console.log('Validation: ' , a)
    } catch (error) {
        return response.status(httpStatus.PRECONDITION_FAILED).json({
            error: error
        })
    }

    if(body.token){
        const val = validateToken(body.token)
        return response.status(200).json({
            validation: val
        })
    }

    const userEmail = body[UserTable.email]
    const userPwd = body[UserTable.password]
    try {
        const user = await Users.findOne({
            where: {
                [UserTable.email]: userEmail  
            }
        })
        if(!user){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `User with email ${userEmail} not Found`
            })
        }        
        const userFound = user.toJSON()
        const validation = await bcrypt.compare(userPwd,userFound[UserTable.password])
        if(!validation){
            return response.status(httpStatus.UNAUTHORIZED).json({
                message: 'Incorrect email or password'
            })
        }
        const payload = {
            [UserTable.email]: userEmail,
            [UserTable.password]: userPwd
        }
        const token = generateToken(payload)
        console.log('TOKEN')
        console.log(token)
        if(!token){
            return response.status(500).json({
                message: 'ERROR WHEN GENERATING TOKEN'
            })
        }
        const srvRes = await updateSessionByUserId(userFound[UserTable.id],token)

        return response.status(httpStatus.OK).json({
            session: srvRes
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when loging in.',
            error: error
        })        
    }

}