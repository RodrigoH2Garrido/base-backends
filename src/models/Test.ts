import { Sequelize, DataTypes } from "sequelize";
import dbConnection from "../db/db";

const Test = dbConnection.define("Test",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})


Test.sync({force:true})

export default Test