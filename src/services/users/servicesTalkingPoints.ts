import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { OneOne, TalkingPoints } from "../../database";
import { AppError } from "../../errors";
import { talkingPointArray, talkingPointEditedSchema, talkingPointSchema } from "../../schemas/talkingPointsSchema";
import { ITalkingPointEdit } from "../../interfaces/talkingPointInterface";

export const createTalkingPointService = async (talkingPointData: any) => {    
    
    if (!talkingPointData.oneOneUUID) {
        throw new AppError("One one not found!", 404)
    };

    const talkingPointsRepository = AppDataSource.getRepository(TalkingPoints)

    const talkingPoint = talkingPointsRepository.create({
        ...talkingPointData,        
    });

    await talkingPointsRepository.save(talkingPoint)
    
    return talkingPointSchema.parse(talkingPoint)
};

export const listAllTalkingPointsService = async (uuidTalkingPoint: string) => {
    
    const talkingPointsRepository: Repository<TalkingPoints> = AppDataSource.getRepository(TalkingPoints)    
    const oneOneRepository: Repository<OneOne> = AppDataSource.getRepository(OneOne);

    const talkingPointsInfos: TalkingPoints[] = await talkingPointsRepository
        .createQueryBuilder('talkingpoints')
        .leftJoinAndSelect('talkingpoints.oneOneUUID', 'oneOneUUID')
        .where('talkingpoints.oneOneUUID.uuid = :uuidTalkingPoint', {
            uuidTalkingPoint: uuidTalkingPoint,
    })
    .getMany();
    
    return talkingPointArray.parse(talkingPointsInfos);    
};

export const listEspecificTalkingPointsService = async () => {};

export const editTalkingPointsService = async (talkingPointsData: ITalkingPointEdit, uuidTalkingPoint: string) => {    
    
    const talkingPointsRepository: Repository<TalkingPoints> = AppDataSource.getRepository(TalkingPoints);

    let talkingPointInfos: TalkingPoints | null = await talkingPointsRepository.findOne({
        where: {uuid: uuidTalkingPoint},
    });

    talkingPointInfos = talkingPointsRepository.create({...talkingPointInfos, ...talkingPointsData});

    await talkingPointsRepository.save(talkingPointInfos);

    const updatedTalkingPoint = talkingPointEditedSchema.parse(talkingPointInfos);

    return updatedTalkingPoint;

};

export const deleteTalkingPointsService = async (uuidTalkingPoint: string) => {

    const talkingPointsRepository: Repository<TalkingPoints> = AppDataSource.getRepository(TalkingPoints)

    const talkingPointsInfos = await talkingPointsRepository.findOne({
        where: {uuid: uuidTalkingPoint},
    });    

    await talkingPointsRepository.remove(talkingPointsInfos!)
};