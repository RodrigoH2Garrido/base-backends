import express, {Express, Request, Response, Application} from 'express'
import dbConnection from './db/db'
import { TSVECTOR } from 'sequelize'

const app:Application = express()
const port = 3000

const testDBConnection = async () => {
    try {
        await dbConnection.authenticate()
        console.log("DB CONNECTION SUCCESS")
        app.get('/',(req: Request, res:Response) => {
            res.send("Welcome to Express with Typescript Server :D")
        })
        
        app.listen(port,()=>{
            console.log("SERVER RUNNING ON http:localhost:3002")
        })
    } catch (error) {
        console.log('SOMETHING WENT WRONG ON DB CONNECTION')
        console.log(error)
    }
}


testDBConnection()

