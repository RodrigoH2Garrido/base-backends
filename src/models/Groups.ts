import { DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { GroupTable } from "../db/ColumnNames";

const Groups = dbConnection.define(GroupTable.table_name,{
    [GroupTable.id]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    [GroupTable.name]: {
        type: DataTypes.STRING,
        allowNull: false
    },
    [GroupTable.topic]: {
        type: DataTypes.STRING,
        allowNull: true
    },
    [GroupTable.created_by]: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [GroupTable.createdAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [GroupTable.updatedAt]:{
        type: DataTypes.BIGINT,
        allowNull:false,
        defaultValue: () => Date.now()
    }
})


Groups.sync({force:true})

export default Groups