import { z } from 'zod'

export const oneOneSchema = z.object({
    title: z.string().max(127),
    date: z.string(),
    hour: z.string(),
    done: z.boolean().default(false),
    organizerUUID: z.string(),
    guestUUID: z.string(),    
})

export const oneOneArray = oneOneSchema.array()