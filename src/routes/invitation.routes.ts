import { Router } from "express"
import { 
    sendGroupInvitation,
    getAllGroupInvitations,
    getInvitationsByGroupId
} from "../controllers/invitation.controller"

const invitationRouter = Router()
// cambiar este m etodo por send goroub invitgation to a single user, isiong userId as param request
invitationRouter.post('/invitation/:userId',sendGroupInvitation)
invitationRouter.get('/invitation',getAllGroupInvitations)
invitationRouter.get('/invitation/group/:groupId',getInvitationsByGroupId)
export default invitationRouter