import { Request, Response } from "express";
import Users from "../models/Users";

export const getUsers = async (request: Request, response: Response) => {
    const users = Users.findAll()
    return response.status(200).json({
        message: "Getting Users",
        users: users
    })
}

export const createUser = async (request: Request, response: Response) => {
    
}