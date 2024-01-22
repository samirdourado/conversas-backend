import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { TalkingPoints } from "../database"
import { AppError } from "../errors"

export const ensureTalkingPointExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        
        const talkingPointRepository: Repository<TalkingPoints> = AppDataSource.getRepository(TalkingPoints)
    
        const findTalkingPoint = await talkingPointRepository.findOne({
            where: {
                uuid: req.params.uuid
            }
        })        
    
        if (!findTalkingPoint) {
            throw new AppError("Talking point not found", 404)
        }
    
        return next()

    } catch (error) {
        console.log(error)
        throw new AppError("Talking point not found", 404)        
    }
}
