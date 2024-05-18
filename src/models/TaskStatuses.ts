import { DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { TaskStatusesTable } from "../db/ColumnNames";


const TaskStatuses = dbConnection.define(TaskStatusesTable.table_name,{
    [TaskStatusesTable.id]: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    [TaskStatusesTable.name]: {
        type: DataTypes.STRING,
        allowNull: false
    },
    [TaskStatusesTable.createdAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [TaskStatusesTable.updatedAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

export default TaskStatuses