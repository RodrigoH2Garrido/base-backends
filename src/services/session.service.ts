
import Sessions from "../models/Sessions"
import { SessionsTable } from "../db/ColumnNames"


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