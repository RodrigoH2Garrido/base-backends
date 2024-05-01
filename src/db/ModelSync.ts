import Users from "../models/Users"
import Groups from "../models/Groups"
import Roles from "../models/Roles"
import { RolTable } from "./ColumnNames"
import UserGroup from "../models/UserGroup"

const syncAllModels = async () => {
    // Sincroniza los modelos sin forzar la creación de tablas
    await Users.sync({ force: false });
    await Groups.sync({ force: false });
    await UserGroup.sync({ force: false });

    // Define los roles a ser creados
    const roles = [
        { [RolTable.name]: 'Admin' },
        { [RolTable.name]: 'User' },
        { [RolTable.name]: 'Guest' }
    ];

    // Sincroniza la tabla de roles y crea los roles
    await Roles.sync({ force: false });
    await Roles.bulkCreate(roles);
};

// Exporta el método syncAllModels
export default syncAllModels;
