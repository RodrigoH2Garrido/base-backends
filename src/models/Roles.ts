import { Sequelize, DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { RolTable } from "../db/ColumnNames";

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

const roles = [
    {[RolTable.name]: 'Admin'},
    {[RolTable.name]: 'User'},
    {[RolTable.name]: 'Guest'}
]

const  init = async () => {    
    await Roles.sync({force: true})
    await Roles.bulkCreate(roles)
}

init()

export default Roles