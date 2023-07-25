import { z } from 'zod';
import { oneOneReturnSchema, oneOneSchema } from './oneOneSchema';

export const talkingPointSchema = z.object({
    uuid: z.string(),
    oneOneUUID: z.string(),
    point: z.string().max(127),
});

export const newTalkingPointSchema = talkingPointSchema.omit({
    uuid: true
});

export const talkingPointEditedSchema = talkingPointSchema.partial();


export const talkingPointReturnSchema = z.object({
    uuid: z.string(),
    point: z.string().max(127),
    // oneOneUUID: z.lazy(() => oneOneSchema ),
});

export const talkingPointArray = talkingPointReturnSchema.array();