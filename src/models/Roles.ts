import { Sequelize, DataTypes } from "sequelize";
import dbConnection from "../db/db";

const Roles = dbConnection.define("roles",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

const roles = [
    {name: 'Admin'},
    {name: 'User'},
    {name: 'Guest'}
]

const  init = async () => {    
    await Roles.sync({force: true})
    await Roles.bulkCreate(roles)
}

init()

export default Roles