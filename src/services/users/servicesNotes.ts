import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Notes } from "../../database";
import { AppError } from "../../errors";
import { INoteEdit } from "../../interfaces/note.interface";
import { noteEditedSchema, noteSchema, notesArray } from "../../schemas/notesSchema";


export const createNoteService = async (noteData: any) => {

    if (!noteData.oneOneUUID) {
        throw new AppError("One one not found", 404)
    };

    const noteRepository = AppDataSource.getRepository(Notes)

    const newNote = noteRepository.create({
        ...noteData,
    });    
    
    await noteRepository.save(newNote)

    return noteSchema.parse(newNote)
};

export const listAllNotesService = async (uuidNote: string) => {
    const notesRepository: Repository<Notes> = AppDataSource.getRepository(Notes);

    const notesInfos: Notes[] = await notesRepository
        .createQueryBuilder('notes')
        .leftJoinAndSelect('notes.oneOneUUID', 'oneOneUUID')
        .where('notes.oneOneUUID.uuid = :uuidNote', {
            uuidNote: uuidNote,
        })
        .getMany();        

        return notesArray.parse(notesInfos)
};

export const editNoteService = async (noteData: INoteEdit, uuidNote: string) => {
    const notesRepository: Repository<Notes> = AppDataSource.getRepository(Notes);

    let noteInfos: Notes | null = await notesRepository.findOne({
        where: {uuid: uuidNote}
    });

    noteInfos = notesRepository.create({...noteInfos, ...noteData});

    await notesRepository.save(noteInfos);

    const updatedNote =  noteEditedSchema.parse(noteInfos);

    return updatedNote
};

export const deleteNoteService = async (uuidNote: string) => {

    const notesRepository: Repository<Notes> = AppDataSource.getRepository(Notes);

    const noteInfos = await notesRepository.findOne({
        where: { uuid: uuidNote },
    });

    await notesRepository.remove(noteInfos!);
};
