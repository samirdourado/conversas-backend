import { z } from 'zod'
import { allUsersReturnSchema, userEditReturnSchema, userEditSchema, userReturnSchema, userSchema } from '../schemas/user.schema'
import { DeepPartial } from 'typeorm'

export type IUser = z.infer<typeof userSchema>
export type IUserPartial = DeepPartial<IUser>
export type IUserReturn = z.infer<typeof userReturnSchema>
export type IUsersReturn = z.infer<typeof allUsersReturnSchema>

export type IUpdate = z.infer<typeof userEditSchema>
export type IUpdatePartial = DeepPartial<IUser>
export type IUpdateReturn = z.infer<typeof userEditReturnSchema>