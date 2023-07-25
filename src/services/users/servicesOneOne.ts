import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { OneOne, TalkingPoints, User } from "../../database";
import { AppError } from "../../errors";
import { IOneOne, IOneOneEdit, IOneOneEditReturn, IOneOneReturn, IOneOneUpdatePartial } from "../../interfaces/oneOneInterface";
import { allOneOneUserSchema, oneOneEditReturnSchema, oneOneEditedSchema, oneOneReturnSchema } from "../../schemas/oneOneSchema";
import { IUpdateReturn } from "../../interfaces/user.interface";

export const createOneOneService = async (oneOneData: IOneOne, organizerUUID: string) => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const oneOneRepository: Repository<OneOne> = AppDataSource.getRepository(OneOne)

    const organizerUser = await userRepository.findOneBy({
        uuid: organizerUUID
    })
    
    const guestUser = await userRepository.findOneBy({
        uuid: oneOneData.guestUUID!
    })

    if (!organizerUser || !guestUser) {
        throw new AppError("User not found!", 404)
    }
    
    delete oneOneData.guestUUID
    
    const oneOne = oneOneRepository.create({
        ...oneOneData,
        organizerUUID: organizerUser,
        guestUUID: guestUser,
    })
    
    await oneOneRepository.save(oneOne)

    return oneOneReturnSchema.parse(oneOne)
}

export const listAllOneOneUserService = async (uuidUser: string) => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const oneOneRepository: Repository<OneOne> = AppDataSource.getRepository(OneOne);

    const oneOneInfos: OneOne[] = await oneOneRepository
        .createQueryBuilder('oneone')
        .leftJoinAndSelect('oneone.organizerUUID', 'organizerUUID')
        .leftJoinAndSelect('oneone.guestUUID', 'guestUUID')
        .leftJoinAndSelect('oneone.talking_points', 'talking_points')
        .leftJoinAndSelect('oneone.notes', 'notes')
        .where('oneone.organizerUUID.uuid = :uuidUser OR oneone.guestUUID.uuid = :uuidUser', {
            uuidUser: uuidUser,            
    })
    .getMany();    

    return allOneOneUserSchema.parse(oneOneInfos)
}

// export const listSpecificOneOneUserService = async (uuidOneOne: string) => {    
    
//     const oneOneRepository: Repository<OneOne> = AppDataSource.getRepository(OneOne);

//     const oneOneInfos: OneOne | null = await oneOneRepository.findOne({
//         where: {uuid: uuidOneOne },
//         relations: {
//             organizerUUID: true,
//             guestUUID: true,
//         }
//     });

//     console.log(oneOneInfos)

//     // const oneOneInfos: OneOne[] = await oneOneRepository
//     //     .createQueryBuilder('oneone')
//     //     .leftJoinAndSelect('oneone.organizerUUID', 'organizerUUID')
//     //     .leftJoinAndSelect('oneone.guestUUID', 'guestUUID')
//     //     .where('oneone.organizerUUID.uuid = :uuidUser OR oneone.guestUUID.uuid = :uuidUser', {
//     //         uuidUser: uuidUser,            
//     // })
//     // .getMany();    

//     // return allOneOneUserSchema.parse(oneOneInfos)
// }

export const editOneOneService = async (oneOneData: IOneOneEdit, uuidOneOne: string) => {    
    
    const oneOneRepository: Repository<OneOne> = AppDataSource.getRepository(OneOne);    

    let oneOneInfos: OneOne | null = await oneOneRepository.findOne({
        where: {uuid: uuidOneOne},
        relations: {
            organizerUUID: true,
            guestUUID: true,
        }
    })
    
    oneOneInfos = oneOneRepository.create({...oneOneInfos, ...oneOneData})
    
    await oneOneRepository.save(oneOneInfos)

    const updatedOneOne = oneOneEditedSchema.parse(oneOneInfos)

    return updatedOneOne
}

export const deleteOneOneService = async (uuidOneOne: string) => {    
    
    const oneOneRepository: Repository<OneOne> = AppDataSource.getRepository(OneOne);    

    const oneOneInfos = await oneOneRepository.findOne({
        where: {uuid: uuidOneOne},
        relations: {
            organizerUUID: true,
            guestUUID: true,
        }
    });
    
    await oneOneRepository.remove(oneOneInfos!)
}