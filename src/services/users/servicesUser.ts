import { Repository } from "typeorm"
import { IUser, IUserReturn, IUpdate, IUsersReturn, IUpdatePartial } from "../../interfaces/user.interface"
import { AppDataSource } from "../../data-source"
import { User } from "../../database"
import { AppError } from "../../errors"
import { allUsersReturnSchema, userEditReturnSchema, userReturnSchema } from "../../schemas/user.schema"


export const createUserService = async (userData: IUser) => {    

    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const user = userRepository.create(userData)

    if (!user) {
        throw new AppError('Not create!', 400)
    }

    await userRepository.save(user)

    const newUser = userReturnSchema.parse(user)

    return newUser
}

export const listUserService = async (): Promise<IUsersReturn> => {

    const usersRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUsers: Array<User> = await usersRepository.find({
        withDeleted: true,
        relations: {
            one_one_organizer: true,
            one_one_guest: true,
        }
    });

    const users = allUsersReturnSchema.parse(findUsers);

    return users
}

export const listEspecificUserService = async (uuidUser: string): Promise<IUserReturn> => {    

    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    
    const userInfos: User | null = await userRepository.findOne({
        where: {uuid: uuidUser}, 
        relations: {
            one_one_organizer: true,
            one_one_guest: true,
        }     
    })    

    const user = userReturnSchema.parse(userInfos);

    return user
}

export const updateUserService = async (userData: IUpdatePartial, uuidUser: string): Promise<IUserReturn> => { 
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    let userInfos: User | null = await userRepository.findOneBy({
        uuid: uuidUser
    })    

    userInfos = userRepository.create({...userInfos, ...userData})    

    await userRepository.save(userInfos)

    const updatedUser = userEditReturnSchema.parse(userInfos)

    return updatedUser
}

export const deleteUserService = async (uuidUser: string): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            uuid: uuidUser
        }
    })
    
    await userRepository.remove(user!)
}