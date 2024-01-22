import { z } from 'zod'
import { oneOneArray } from './oneOneSchema'

export const userSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string().max(120),    
})

export const userReturnSchema = userSchema.extend({
    uuid: z.string(),    
    profileImage: z.string().nullable(),
    one_one_organizer: oneOneArray,
    one_one_guest: oneOneArray,
}).omit({password: true}).partial()

export const allUsersReturnSchema = userReturnSchema.array()

export const userEditSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string().max(120),
    profileImage: z.string(),
})

export const userEditReturnSchema = userSchema.extend({
    uuid: z.string(),  
    profileImage: z.string(),      
}).omit({password: true})

export const userUpdateSchema = userEditSchema.partial()
