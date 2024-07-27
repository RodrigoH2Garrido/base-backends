import { Request, Response } from "express"
import GroupInvitations from "../models/GroupInvitations"
import httpStatus from 'http-status-codes'
import { GroupInvitationTable, InvitationStatusesTable, UserTable } from "../db/ColumnNames"
import Joi from "joi"
import Users from "../models/Users"
import InvitationStatuses from "../models/InvitationStatuses"

export const sendGroupInvitation = async (request: Request, response: Response) => {
    const userId = Number(request.params.userId)

    const user = await Users.findOne({
        where:{
            [UserTable.id]: userId
        }
    })

    if(!user){
        return response.status(httpStatus.NOT_FOUND).json({
            message:`user ${userId} not found`
        })
    }

    const body = request.body
    console.log('body: ', body)
    const schema = Joi.object({
        [GroupInvitationTable.from_user]: Joi.number().required(),
        // [GroupInvitationTable.to_user]: Joi.number().required(),
        [GroupInvitationTable.group_id]: Joi.number().required(),
        [GroupInvitationTable.status_id]: Joi.number().required(),
    })

    try {
        const validation = await schema.validateAsync(body)
        console.log('VALIDATION: ', validation)
    } catch (error) {
        return response.status(httpStatus.PRECONDITION_FAILED).json({
            error: error
        })
    }

    const data = {
        ...body,
        [GroupInvitationTable.to_user]: userId
    }
    console.log('Data: ', data)

    try {
        const prevInvitation = await GroupInvitations.findOne({
            where:{
                [GroupInvitationTable.from_user]: body.from_user,
                [GroupInvitationTable.to_user]: userId,
                [GroupInvitationTable.group_id]: body.group_id,
                [GroupInvitationTable.status_id]: 1
            }
        })
        console.log(prevInvitation)
        if(prevInvitation){
            return response.status(httpStatus.CONFLICT).json({
                message: `Invitation already sent to user ${userId}`,
                repeatedInvitation: prevInvitation
            })
        }
        const invitation = await GroupInvitations.create(data)
        return response.status(httpStatus.OK).json({
            message: 'Invitation Created',
            invitation: invitation
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong went creating an invitation',
            error: error
        })
    }

}


export const getAllGroupInvitations = async(request: Request, response: Response) => {
    try {
        const invitations = await GroupInvitations.findAll({
            include: [InvitationStatuses]
        })
        return response.status(httpStatus.OK).json({
            message: 'Obtaining All invitations',
            invitations: invitations
        })
    } catch (error) {
        console.log(error)
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when getting invitations',
            error: error
        })
    }
}

export const getInvitationsByGroupId = async(request: Request, response:Response) => {
    const groupId = request.params.groupId
    try {
        console.log(`GROUPID: ${groupId}`)
        const invitations = await GroupInvitations.findAll({
            where:{
                [GroupInvitationTable.group_id]: groupId 
            }
        })
        return response.status(httpStatus.OK).json({
            message: `Getting all invitations to group ${groupId}`,
            invitations: invitations
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when getting invitations by groupId',
            error: error
        })
    }
}
export const updateGroupInvitation = async(request: Request, response: Response) => {
    const groupInvitationId = Number(request.params.groupInvitationId)
    const statusId = Number(request.params.statusId)

    try {
        const invitation = await GroupInvitations.findOne({
            where:{
                [GroupInvitationTable.id]: groupInvitationId
            }
        })

        if(!invitation){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `Invitation ${groupInvitationId} doesn't exist`
            })
        }

        const updatedInvitation = await invitation.update({
            [GroupInvitationTable.status_id]: statusId
        },{
            where:{
                [GroupInvitationTable.id]: groupInvitationId
            }
        })
        return response.status(httpStatus.OK).json({
            message: `Invitation ${groupInvitationId} updated`,
            update: updatedInvitation
        })

    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: `Something went wrong when updating groupInvitation ${groupInvitationId}`,
            error: error
        })
    }
    
}
