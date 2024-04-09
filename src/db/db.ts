import { Sequelize } from 'sequelize'


const dbConnection = new Sequelize({
    dialect: 'postgres',
    host: 'db',
    username: 'node',
    password: 'node',
    database: 'base-node'
})

export default dbConnection