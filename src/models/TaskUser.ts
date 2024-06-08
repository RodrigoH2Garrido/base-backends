import { DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { TaskUserTable } from "../db/ColumnNames";

const TaskUser = dbConnection.define(TaskUserTable.table_name,{
    [TaskUserTable.id]: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    [TaskUserTable.task_id]: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    [TaskUserTable.user_id]: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [TaskUserTable.createdAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [TaskUserTable.updatedAt]: {
        type: DataTypes.BIGINT,
        allowNull:false,
        defaultValue: () => Date.now()
    }
})

export default TaskUser