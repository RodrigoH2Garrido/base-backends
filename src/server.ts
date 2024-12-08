import express, { Request, Response, Application } from 'express'
import dbConnection from './db/db'
import router from './routes'
import syncAllModels from './db/ModelSync'
import createModelAssociations from './db/ModelAssociations'
import dotenv from 'dotenv'

dotenv.config()
const app:Application = express()
const port = process.env.PORT

app.use(express.json())

const init = async () => {
    try {
        await dbConnection.authenticate()
        console.log('Db connection success')
        console.log('\n Syncing all models \n\n')
        await syncAllModels()
        console.log('\n All models synced \n')
        console.log('\n generating all model associations \n\n\n')
        await createModelAssociations()
        console.log('\n all model associations created \n')
        // await dbConnection.drop()
        app.get('/',(req: Request, res:Response) => {
            res.send("Welcome to Express with Typescript Server :D")
        })

        app.use(router)

        app.listen(port,()=>{
            console.log('INTERNAL PORT: ', port)
            console.log("SERVER RUNNING ON http:localhost:3002")
        })
        
    } catch (error) {
        console.log('Db connection error', error)
    }
}


init()