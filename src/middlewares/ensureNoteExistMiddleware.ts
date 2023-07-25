import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Notes } from "../database"
import { AppError } from "../errors"

export const ensureNoteExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        
        const notesRepository: Repository<Notes> = AppDataSource.getRepository(Notes)
    
        const findNote = await notesRepository.findOne({
            where: {
                uuid: req.params.uuid
            }
        })        
    
        if (!findNote) {
            throw new AppError("Talking point not found", 404)
        }
    
        return next()

    } catch (error) {
        console.log(error)
        throw new AppError("Talking point not found", 404)        
    }
}
