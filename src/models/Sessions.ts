import { DataType, DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { SessionsTable } from "../db/ColumnNames";

const Sessions = dbConnection.define(SessionsTable.table_name,{
    [SessionsTable.user_id]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    [SessionsTable.token]:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    [SessionsTable.device_info]:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    [SessionsTable.createdAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [SessionsTable.updatedAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [SessionsTable.expiresAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

export default Sessions