import { DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { RolTable } from "../db/ColumnNames";
import UserGroup from "./UserGroup";


const Roles = dbConnection.define(RolTable.table_name,{
    [RolTable.id]:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    [RolTable.name]:{
        type: DataTypes.STRING,
        allowNull:false
    },
    [RolTable.createdAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [RolTable.updatedAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

/* Roles.hasMany(UserGroup)
 */
export default Roles