import { z } from 'zod'
import { DeepPartial } from 'typeorm';
import { noteEditedSchema, noteReturnSchema, noteSchema } from '../schemas/notesSchema';

export type INote = z.infer<typeof noteSchema>
export type INotePartial = DeepPartial<INote>
export type INoteReturn = z.infer<typeof noteReturnSchema>

export type INoteEdit = DeepPartial<typeof noteEditedSchema>
export type IOneOneUpdatePartial = DeepPartial<INoteEdit>
export type INoteEditReturn = z.infer<typeof noteReturnSchema>