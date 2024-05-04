import Roles from "../models/Roles"
import Groups from "../models/Groups"
import Users from "../models/Users"
import UserGroup from "../models/UserGroup"
import InvitationStatuses from "../models/InvitationStatuses"
import GroupInvitations from "../models/GroupInvitations"
import { GroupInvitationTable, GroupTable, UserGroupTable } from "./ColumnNames"
import dbConnection from "./db"

const createModelAssociations = async () => {
    Roles.hasMany(UserGroup,{
        foreignKey: UserGroupTable.role_id
    })
    Groups.belongsTo(Users, {
        foreignKey: GroupTable.created_by,
        targetKey: 'id'
    });
    Groups.belongsToMany(Users,{ through: UserGroupTable.table_name, foreignKey:UserGroupTable.group_id})
    Users.belongsToMany(Groups,{ through: UserGroupTable.table_name, foreignKey: UserGroupTable.user_id })
    InvitationStatuses.hasMany(GroupInvitations,{ foreignKey: GroupInvitationTable.status_id })
    Users.hasMany(GroupInvitations,{ foreignKey: GroupInvitationTable.from_user })
    Users.hasMany(GroupInvitations,{ foreignKey: GroupInvitationTable.to_user })
    Groups.hasMany(GroupInvitations, { foreignKey: GroupInvitationTable.group_id })
    /* UserGroup.hasOne(Roles, {    
        foreignKey: UserGroupTable.role_id,
    }) */

    await dbConnection.sync({alter:true})

}   

export default createModelAssociations