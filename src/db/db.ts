import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const dbConnection = new Sequelize({
    dialect: 'postgres',
    host: 'db',
    username: process.env.PG_USER,
    password: process.env.PG_PWD,
    database: process.env.PG_DBNAME,
    timezone: 'UTC'
})

export default dbConnection