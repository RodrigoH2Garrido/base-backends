import Users from "../models/Users"
import Groups from "../models/Groups"
import Roles from "../models/Roles"
import UserGroup from "../models/UserGroup"
import InvitationStatuses from "../models/InvitationStatuses"
import GroupInvitations from "../models/GroupInvitations"
import { InvitationStatusesTable, RolTable } from "./ColumnNames"
import dbConnection from "./db"

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
    /* await dbConnection.sync({force:false})
    await Roles.bulkCreate(roles); */
};

// Exporta el método syncAllModels
export default syncAllModels;
