import express, {Express, Request, Response, Application} from 'express'

const app:Application = express()
const port = 3000


app.get('/',(req: Request, res:Response) => {
    res.send("Welcome to Express with Typescript Server :D")
})

app.listen(port,()=>{
    console.log("SERVER RUNNING ON http:localhost:3002")
})