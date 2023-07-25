import { z } from 'zod'
import { DeepPartial } from 'typeorm';
import { talkingPointEditedSchema, talkingPointReturnSchema, talkingPointSchema } from '../schemas/talkingPointsSchema';


export type ITalkingPoint = z.infer<typeof talkingPointSchema>
export type ITalkingPointPartial = DeepPartial<ITalkingPoint>
export type ITalkingPointReturn = z.infer<typeof talkingPointReturnSchema>

export type ITalkingPointEdit = DeepPartial<typeof talkingPointEditedSchema>
export type IOneOneUpdatePartial = DeepPartial<ITalkingPointEdit>
export type ITalkingPointEditReturn = z.infer<typeof talkingPointReturnSchema>