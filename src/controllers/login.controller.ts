import { Response, Request } from "express"
import Joi from "joi"
import Sessions from "../models/Sessions"
import Users from "../models/Users"
import { updateSessionByUserId } from "../services/session.service"
import { SessionsTable, UserTable } from "../db/ColumnNames"
import httpStatus from "http-status-codes"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const login = async (request: Request , response: Response) => {
    const schema = Joi.object({
        [UserTable.email]: Joi.string().required(),
        [UserTable.password]: Joi.string().required()
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
        
        const secretKey = process.env.TOKEN_SECRET_KEY
        if (!secretKey) {
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error: JWT secret key not defined in environment variables'
            })
        }
        const options = {
            expiresIn: '1h'
        }
        const token = jwt.sign(body, secretKey, options)

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