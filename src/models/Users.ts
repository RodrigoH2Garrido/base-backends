import { DataTypes } from "sequelize";

import dbConnection from "../db/db";
import { UserTable} from "../db/ColumnNames";

const Users = dbConnection.define(UserTable.table_name,{
    [UserTable.id]:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    [UserTable.name]:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    [UserTable.last_name]:{
        type: DataTypes.STRING,
        allowNull: false
    },
    [UserTable.nickname]:{
        type: DataTypes.STRING,
        allowNull: true
    },
    [UserTable.phone]:{
        type: DataTypes.STRING,
        allowNull: true
    },
    [UserTable.email]:{
        type: DataTypes.STRING,
        allowNull: false
    },
    [UserTable.password]:{
        type: DataTypes.STRING,
        allowNull: false
    },
    [UserTable.createdAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [UserTable.updatedAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

export default Users