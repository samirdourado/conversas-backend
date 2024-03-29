import { z } from 'zod'
import { userReturnSchema } from './user.schema'
import { talkingPointArray, talkingPointReturnSchema } from './talkingPointsSchema';
import { noteReturnSchema, notesArray } from './notesSchema';

export const oneOneSchema = z.object({
    title: z.string().max(127),
    date: z.string(),
    hour: z.string(),
    done: z.boolean().default(false),
    guestUUID: z.string().optional()
});

export const oneOneArray = oneOneSchema.array()

export const oneOneCreateReturnSchema = z.object({
    uuid: z.string(),
    title: z.string().max(127),
    date: z.string(),
    hour: z.string(),
    done: z.boolean().default(false),    
    organizerUUID: z.lazy(() => userReturnSchema),
    guestUUID: z.lazy(() => userReturnSchema),    
});

export const oneOneReturnSchema = z.object({
    uuid: z.string(),
    title: z.string().max(127),
    date: z.string(),
    hour: z.string(),
    done: z.boolean().default(false),    
    organizerUUID: z.lazy(() => userReturnSchema),
    guestUUID: z.lazy(() => userReturnSchema),
    talking_points: z.lazy(() => talkingPointArray),
    notes: z.lazy(() => notesArray),
});

export const oneOneEditedSchema = oneOneReturnSchema.partial()

export const allOneOneUserSchema = oneOneReturnSchema.array();

export const  oneOneEditSchema = oneOneSchema.extend({
    uuid: z.string(),
    
}).partial();

export const oneOneEditReturnSchema = oneOneEditSchema.partial()
