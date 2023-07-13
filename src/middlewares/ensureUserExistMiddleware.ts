import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../database"
import { AppError } from "../errors"

export const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        
        const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
        const findUser = await userRepository.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
    
        if (!findUser) {
            throw new AppError("User not found", 404)
        }
    
        return next()

    } catch (error) {
        console.log(error)
        throw new AppError("User not found", 404)
        
    }


}
