import UserGroup from "../models/UserGroup"
import { GroupTable, UserGroupTable } from "../db/ColumnNames"
import httpStatus from "http-status-codes"

export const assignUserToGroup = async (userId:Number, groupId:Number) => {
    try {
        const assignation =  await UserGroup.create({
            [UserGroupTable.user_id]: userId,
            [UserGroupTable.group_id]: groupId
        })
        return true
    } catch (error) {
        console.log(`Error when assignin user ${userId} to group ${groupId}`)
        console.log(error)
        return false
    }
}

export const deleteGroupToUserAssignation = async (groupId: Number) => {
    try {
        const deletedAssignation = await UserGroup.destroy({
            where:{
                [UserGroupTable.group_id]: groupId
            }
        })
        console.log('DELETED ASSIGNATION')
        console.log(deletedAssignation)
        return true
    } catch (error) {
        return false
    }
}

export const deleteUserToGroupAssignation = async(userId: Number) => {
    try {
        const deletedAssignation = await UserGroup.destroy({
            where:{
                [UserGroupTable.user_id]: userId
            }
        })
        return true
    } catch (error) {
        return false
    }
}