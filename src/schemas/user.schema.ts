import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string().max(120),
    // profileImage: z.string().optional(),
})

export const userReturnSchema = userSchema.extend({
    uuid: z.string(),    
    profileImage: z.string().nullable(),
}).omit({password: true}).partial()