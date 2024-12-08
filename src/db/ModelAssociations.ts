import Roles from "../models/Roles"
import Groups from "../models/Groups"
import Users from "../models/Users"
import UserGroup from "../models/UserGroup"
import InvitationStatuses from "../models/InvitationStatuses"
import GroupInvitations from "../models/GroupInvitations"

import Tasks from "../models/Tasks"

import TaskUser from "../models/TaskUser"


import { GroupInvitationTable, GroupTable, SessionsTable, TaskStatusesTable, TaskTable, TaskUserTable, UserGroupTable } from "./ColumnNames"
import dbConnection from "./db"
import TaskStatuses from "../models/TaskStatuses"
import Sessions from "../models/Sessions"

const createModelAssociations = async () => {
    Roles.hasMany(UserGroup, {
        foreignKey: UserGroupTable.role_id
    })
    Groups.belongsTo(Users, {
        foreignKey: GroupTable.created_by,
        targetKey: 'id'
    });
    Groups.belongsToMany(Users, { through: UserGroupTable.table_name, foreignKey: UserGroupTable.group_id })
    Users.belongsToMany(Groups, { through: UserGroupTable.table_name, foreignKey: UserGroupTable.user_id })
    
    InvitationStatuses.hasMany(GroupInvitations, { foreignKey: GroupInvitationTable.status_id })
    GroupInvitations.belongsTo(InvitationStatuses, { foreignKey: GroupInvitationTable.status_id });

    Users.hasMany(GroupInvitations, { foreignKey: GroupInvitationTable.from_user })
    Users.hasMany(GroupInvitations, { foreignKey: GroupInvitationTable.to_user })
    Groups.hasMany(GroupInvitations, { foreignKey: GroupInvitationTable.group_id })

    Groups.hasMany(Tasks, { foreignKey: TaskTable.group_id })

    Users.belongsToMany(Tasks, { through: TaskUserTable.table_name, foreignKey: TaskUserTable.user_id })
    Tasks.belongsToMany(Users, { through: TaskUserTable.table_name, foreignKey: TaskUserTable.task_id })
    
    TaskStatuses.hasMany(Tasks, {foreignKey: TaskTable.status_id})

    Users.hasMany(Sessions, { foreignKey: SessionsTable.user_id })
    Sessions.belongsTo(Users, { foreignKey: SessionsTable.user_id })

    /* UserGroup.hasOne(Roles, {    
        foreignKey: UserGroupTable.role_id,
    }) */
    await dbConnection.sync({ alter: true })
}

export default createModelAssociations