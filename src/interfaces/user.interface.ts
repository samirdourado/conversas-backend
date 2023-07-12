import { z } from 'zod'
import { userReturnSchema, userSchema } from '../schemas/user.schema'
import { DeepPartial } from 'typeorm'

export type IUser = z.infer<typeof userSchema>
export type IUserPartial = DeepPartial<IUser>
export type IUserReturn = z.infer<typeof userReturnSchema>