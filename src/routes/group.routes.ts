import { Router } from "express";
import {
    getGroups,
    createGroup,
    updateGroupById,
    deleteGroupById,
    findGroupById
} from "../controllers/group.controller"

const groupRouter = Router()

groupRouter.get('/groups',getGroups)
groupRouter.post('/groups',createGroup)
groupRouter.patch('/groups/:groupId',updateGroupById)
groupRouter.delete('/groups/:groupId',deleteGroupById)
groupRouter.get('/groups/:groupId',findGroupById)

export default groupRouter