import { DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { TaskTable } from "../db/ColumnNames";

const Tasks = dbConnection.define(TaskTable.table_name,{
    [TaskTable.id] : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    [TaskTable.name]: {
        type: DataTypes.STRING,
        allowNull: false
    },
    [TaskTable.description]: {
        type: DataTypes.STRING
    },
    [TaskTable.quantity]: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [TaskTable.status_id]: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [TaskTable.createdAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [TaskTable.updatedAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

export default Tasks