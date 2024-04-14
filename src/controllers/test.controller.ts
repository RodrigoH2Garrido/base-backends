import { Request, Response } from 'express'
import Test from '../models/Test'


export const test1 = async (request: Request, response: Response) => {
    const test =  await Test.findAll()
    return response.status(200).json({
        message: 'Hola desde test1',
        test: test
    })
}

export const test2 = async (request: Request, response: Response) => {
    return response.status(200).json({
        message: 'Hola desde test2'
    })
}