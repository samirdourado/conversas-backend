import { Repository } from "typeorm"
import { IUser } from "../../interfaces/user.interface"
import { AppDataSource } from "../../data-source"
import { User } from "../../database"
import { AppError } from "../../errors"
import { userReturnSchema } from "../../schemas/user.schema"


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