import { z } from 'zod';
import { oneOneSchema } from './oneOneSchema';

export const noteSchema = z.object({
    uuid: z.string(),
    oneOneUUID: z.string(),
    note: z.string().max(127),
});

export const newNoteSchema = noteSchema.omit({
    uuid: true
});

export const noteEditedSchema = noteSchema.partial();

export const noteReturnSchema = z.object({
    uuid: z.string(),
    note: z.string().max(127),
    // oneOneUUID: z.lazy(() => oneOneSchema)
    // organizerUUID: z.lazy(() => userSchema)
});

export const notesArray = noteReturnSchema.array()

export const editNoteSchema = noteSchema.partial()
