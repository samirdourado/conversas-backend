import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { OneOne } from "../database"
import { AppError } from "../errors"

export const ensureOneOneExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        
        const oneOneRepository: Repository<OneOne> = AppDataSource.getRepository(OneOne)
    
        const findOneOne = await oneOneRepository.findOne({
            where: {
                uuid: req.params.uuid
            }
        })

        
    
        if (!findOneOne) {
            throw new AppError("One One not found", 404)
        }
    
        return next()

    } catch (error) {
        console.log(error)
        throw new AppError("One One not found", 404)
        
    }


}
