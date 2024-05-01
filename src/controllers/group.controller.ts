import { Request, Response } from "express";
import Joi from "joi";
import Groups from "../models/Groups";
import UserGroup from "../models/UserGroup";
import { GroupTable, UserGroupTable } from "../db/ColumnNames";
import httpStatus from "http-status-codes";
import { assignUserToGroup, deleteGroupToUserAssignation } from "../services/user.group.assignation.service";
export const getGroups = async (request: Request, response: Response) => {
    const groups = await Groups.findAll()
    return response.status(httpStatus.OK).json({
        message: "Getting Groups",
        groups: groups   
    })
}

export const createGroup = async (request: Request, response: Response) => {
    const body = request.body
    console.log(body.created_by)
    const schema = Joi.object({
        [GroupTable.name]: Joi.string().required(),
        [GroupTable.created_by]: Joi.number().required(),
        [GroupTable.topic]: Joi.string(),
    })
    try {
        const validation = await schema.validateAsync(body)
    } catch (error) {
        return response.status(httpStatus.PRECONDITION_FAILED).json({
            error:error
        })
    }
    try {
        const createdGroup = (await Groups.create(body)).toJSON()
        console.log('CREATED GROUP')
        console.log(createdGroup)
        await assignUserToGroup(Number(body.created_by),createdGroup[GroupTable.id])
        return response.status(httpStatus.CREATED).json({
            message: 'CREATING GROUP',
            group: createdGroup[GroupTable.id]
        })
    } catch (error) {
        console.log(error)
        return response.status(httpStatus.BAD_REQUEST).json({
            error: error,
            message: 'Something went wrong when creating a new group'
        })
    }
}

export const updateGroupById = async(request: Request, response: Response) => {
    const groupId = request.params.groupId
    try {
        const group = await Groups.findOne({
            where:{
                [GroupTable.id]: groupId
            }
        })
        if(!group){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `Group ${groupId} doesn't exists`
            })
        }
        const body = request.body
        const schema = Joi.object({
            [GroupTable.name]: Joi.string(),
            [GroupTable.topic]: Joi.string(),
        })
        try {
            const validation = await schema.validateAsync(body)
        } catch (error) {
            return response.status(httpStatus.PRECONDITION_FAILED).json({
                error:error
            })
        }
        const updatedGroup = await Groups.update(
            { ...body },
            {
                where:{
                    [GroupTable.id]: groupId
                }
            }
        )
        console.log('Updated Group: ', updatedGroup)
        return response.status(httpStatus.OK).json({
            message: `Updating Group by id`,
            foundGroup: group,
            update: updatedGroup
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST). json({
            message: `Something went wrong when updating user`,
            error: error
        })
    }
}

export const deleteGroupById = async (request: Request, response: Response) => {
    const groupId = Number(request.params.groupId)
    
    try {
        const group =  await Groups.findOne({
            where:{
                [GroupTable.id]: groupId
            }
        })
        if(!group){
            return response.status(httpStatus.NOT_FOUND).json({
                message:`Group ${groupId} doens't exists`
            })
        }

        const removedGroup = await group.destroy();
        await deleteGroupToUserAssignation(groupId)
        return response.status(httpStatus.OK).json({
            message: `Group ${groupId} removed`,
            group: removedGroup
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message:'Something went wrong when deleting group',
            error: error
        })
    }
}

export const findGroupById = async (request: Request, response: Response) => {
    const groupId = Number(request.params.groupId)
    try {
        const group = await Groups.findOne({
            where:{
                [GroupTable.id]: groupId
            }
        })
        if(!group){
            return response.status(httpStatus.NOT_FOUND).json({
                message: `Group ${groupId} doens't exists`
            })
        }
        return response.status(httpStatus.OK).json({
            message:'looking for a group',
            group: group
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when looking for a group'
        })
    }
}