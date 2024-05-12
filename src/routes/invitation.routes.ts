import { Router } from "express"
import { 
    sendGroupInvitation,
    getAllGroupInvitations,
    getInvitationsByGroupId,
    updateGroupInvitation
} from "../controllers/invitation.controller"

const invitationRouter = Router()

invitationRouter.post('/invitation/:userId',sendGroupInvitation)
invitationRouter.get('/invitation',getAllGroupInvitations)
invitationRouter.get('/invitation/group/:groupId',getInvitationsByGroupId)
invitationRouter.put('/invitation/:groupInvitationId/:statusId',updateGroupInvitation)

export default invitationRouter