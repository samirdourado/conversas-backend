import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import { Repository } from "typeorm";
import { ILogin } from "../../interfaces/login.interface";
import { User } from "../../database";
import { AppDataSource } from "../../data-source";
import { AppError } from '../../errors';

export const LoginService = async (loginData: ILogin): Promise<string> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: loginData.email
    })

    if (!user) {
        throw new AppError("Invalid credentials", 401)
    }

    const passwordMatch = await compare(loginData.password, user.password)

    if (!passwordMatch) {
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = jwt.sign(
        {
            uuid: user.uuid,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24hr",
            subject: String(user.uuid)
        }
    )

    return token
}