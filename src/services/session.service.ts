
import Sessions from "../models/Sessions"
import { SessionsTable } from "../db/ColumnNames"
import { request } from "http"
import jwt from 'jsonwebtoken'


export const generateToken = (payload: Object) => {
    const options = {
        expiresIn: '1h'
    }
    const secretKey = process.env.TOKEN_SECRET_KEY
    if (!secretKey) {
        return null
    }
    return jwt.sign(payload, secretKey, options)
}

export const updateSessionByUserId = async (userId: Number, token: String) => {
    try {
        const session = await Sessions.findOne({
            where:{
                [SessionsTable.user_id]: userId
            }
        })
        if(!session){
            const payload = {
                [SessionsTable.token]: token,
                [SessionsTable.user_id]: userId
            }
            const createdSession = await Sessions.create(payload)
            console.log('SESSION CREATED')
            console.log(createdSession)
            return token;
        }
        else{            
            const updatedSession = await Sessions.update(
                {
                    [SessionsTable.token]: token
                },
                {
                    where:{
                        [SessionsTable.user_id]: userId
                    }
                }
            )
            console.log("SESSION UPDATED")
            console.log(updatedSession)
            return token
        }
    } catch (error) {
        console.log(`Error when getting user ${userId} session`)
        console.log(error)
        return null
    }
    return false
}


export const validateToken = (token: string) => {
    try {
        const secretKey = process.env.TOKEN_SECRET_KEY;
        if (!secretKey) {
            return false;
        }
        const decoded = jwt.verify(token, secretKey); // Sin callback
        console.log('El token es válido:', decoded);
        return true;
    } catch (error) {
        if ((error as any).name === 'TokenExpiredError') {
            console.log('El token ha expirado.');
        } else {
            console.log('El token no es válido.');
        }
        return false;
    }
}