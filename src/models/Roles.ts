import { Sequelize, DataTypes } from "sequelize";
import dbConnection from "../db/db";

const Roles = dbConnection.define("Roles",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

Roles.sync({force: true})


export default Roles