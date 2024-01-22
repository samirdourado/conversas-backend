import { Request, Response, NextFunction } from "express"
import { AppError  } from "../errors"

export const ensureIsLoggedIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userUuid = req.user.uuid
    
        const paramUuid = req.params.uuid
    
        if (userUuid === paramUuid) {
            return next()
        } else {
            throw new AppError("Permissão insuficiente!", 403)
        }
        
    } catch (error) {
        console.log(error)
        return res.status(403).json({message: "Permissão insuficiente!"})
        
    }
}