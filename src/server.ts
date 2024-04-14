import express, {Express, Request, Response, Application} from 'express'
import dbConnection from './db/db'
import router from './routes'


const app:Application = express()
const port = 3000

const init = async () => {
    try {
        await dbConnection.authenticate()
        console.log('Db connection success')
        console.log('All models synced')
        app.get('/',(req: Request, res:Response) => {
            res.send("Welcome to Express with Typescript Server :D")
        })

        app.use(router)


        app.listen(port,()=>{
            console.log("SERVER RUNNING ON http:localhost:3002")
        })
        
    } catch (error) {
        console.log('Db connection error', error)
    }
}


init()