import { Request, Response } from "express";
import httpStatus from 'http-status-codes'

import Sessions from "../models/Sessions";
import { SessionsTable } from "../db/ColumnNames";

export const getSessions = async( request: Request, response: Response) => {
    try {
        const sessions = await  Sessions.findAll();
        return response.status(httpStatus.OK).json({
            sessions: sessions
        })
    } catch (error) {
        return response.status(httpStatus.BAD_REQUEST).json({
            message: 'Something went wrong when getting sessions'
        })
    }
}
