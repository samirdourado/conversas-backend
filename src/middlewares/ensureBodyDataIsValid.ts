import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { IUser } from "../interfaces/user.interface";

export const ensureBodyDataIsValidMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const validateData: Partial<IUser> = schema.parse(req.body)
        
        req.body = validateData
    
        return next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})        
    }

}