import { Request, Response } from "express";
import { createNoteService, deleteNoteService, editNoteService, listAllNotesService } from "../services/users/servicesNotes";

export const createNoteController = async (req: Request, res: Response) => {
    try {
        
        const noteData = req.body

        const newNote = await createNoteService(noteData)

        return res.status(200).send(newNote)
        
    } catch (error) {
        console.log(error)
    }
};
export const listAllNotesController = async (req: Request, res: Response) => {
    try {
        const uuidNote = req.params.uuid;

        const notesFromOneOne = await listAllNotesService(uuidNote);

        return res.status(200).send(notesFromOneOne);
        
    } catch (error) {
        console.log(error);
    }
};
export const editNoteController = async (req: Request, res: Response) => {
    try {

        const noteData = req.body;

        const uuidNote = req.params.uuid;

        const editedNote = await editNoteService(noteData, uuidNote);

        return res.status(200).json(editedNote)
        
    } catch (error) {
        console.log(error)
    }
};
export const deleteNoteController = async (req: Request, res: Response) => {
    try {
        
        deleteNoteService(req.params.uuid)

        return res.status(204).send()
    } catch (error) {
        console.log(error)
    }
};
