import { z } from 'zod'
import { DeepPartial } from 'typeorm';
import { oneOneEditReturnSchema, oneOneEditSchema, oneOneReturnSchema, oneOneSchema } from '../schemas/oneOneSchema';

export type IOneOne = z.infer<typeof oneOneSchema>
export type IOneOnePartial = DeepPartial<IOneOne>
export type IOneOneReturn = z.infer<typeof oneOneReturnSchema>

// export type IOneOneEdit = z.infer<typeof oneOneEditSchema>
export type IOneOneEdit = DeepPartial<typeof oneOneEditSchema>
export type IOneOneUpdatePartial = DeepPartial<IOneOneEdit>
export type IOneOneEditReturn = z.infer<typeof oneOneReturnSchema>