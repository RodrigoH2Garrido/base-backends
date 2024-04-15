import { Request, Response } from "express";

import Roles from "../models/Roles";

export const getRoles = async  (request: Request, response: Response) => {
    const roles = await Roles.findAll()
    return response.status(200).json({
        message: "Getting Roles",
        roles: roles
    })
}