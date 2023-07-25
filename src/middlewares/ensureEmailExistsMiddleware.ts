import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { User } from "../database"

const ensureEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {     

    try {
        const userRepository: Repository<User> = AppDataSource.getRepository(User)    
        
        if (req.body.email) {
        
            const findUser = await userRepository.findOne({
                where: {
                    email: req.body.email
                },
                withDeleted: true
            })    
        
            if (findUser) {
                throw new AppError("Email already exists", 409)
            }
            
        } 
        next()        
    } catch (error) {
        console.log(error)        
        return res.status(409).json({message: "Email already exists"})
    }

}

export default ensureEmailExistsMiddleware