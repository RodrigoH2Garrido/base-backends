import Users from "../models/Users"
import Groups from "../models/Groups"
import Roles from "../models/Roles"
import UserGroup from "../models/UserGroup"
import InvitationStatuses from "../models/InvitationStatuses"
import GroupInvitations from "../models/GroupInvitations"

import Tasks from "../models/Tasks"
import TaskUser from "../models/TaskUser"
import { InvitationStatusesTable, RolTable, TaskStatusesTable } from "./ColumnNames"
import dbConnection from "./db"
import TaskStatuses from "../models/TaskStatuses"
import Sessions from "../models/Sessions"

const syncAllModels = async () => {
    // Sincroniza los modelos sin forzar la creación de tablas
    // Define los roles a ser creados
    const roles = [
        { [RolTable.name]: 'Admin' },
        { [RolTable.name]: 'Super User' },
        { [RolTable.name]: 'User' },
        { [RolTable.name]: 'Guest' }
    ];

    // Sincroniza la tabla de roles y crea los roles
    await Groups.sync({ force: false }); 
    await Users.sync({ force: false });
    await Roles.sync({ force: true });
    await Roles.bulkCreate(roles);
    await UserGroup.sync({ force: false });
    const invitation_statuses = [
        { [InvitationStatusesTable.name]: 'Sent' },
        { [InvitationStatusesTable.name]: 'Read' },
        { [InvitationStatusesTable.name]: 'Accepted' },
        { [InvitationStatusesTable.name]: 'Denied' },
        { [InvitationStatusesTable.name]: 'Expired' },
        { [InvitationStatusesTable.name]: 'Cancelled' },
    ]

    await InvitationStatuses.sync({force:true})
    await InvitationStatuses.bulkCreate(invitation_statuses)
    await GroupInvitations.sync({force: false})
    await Tasks.sync({force:false})
    await TaskStatuses.sync({force:  true})

    const task_statuses = [
        { [TaskStatusesTable.name]: 'Created' },
        { [TaskStatusesTable.name]: 'In Progress' },
        { [TaskStatusesTable.name]: 'Canceled' },
        { [TaskStatusesTable.name]: 'Completed' },
        { [TaskStatusesTable.name]: 'Paused' }
    ]
    await TaskStatuses.bulkCreate(task_statuses)

    await TaskUser.sync({force: false})

    await Sessions.sync({force: false})
    /* await dbConnection.sync({force:false})
    await Roles.bulkCreate(roles); */
};

// Exporta el método syncAllModels
export default syncAllModels;
