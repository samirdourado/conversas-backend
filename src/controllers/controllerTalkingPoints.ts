import { Request, Response } from "express";
import { talkingPointArray, talkingPointSchema } from "../schemas/talkingPointsSchema";
import { createTalkingPointService, deleteTalkingPointsService, editTalkingPointsService, listAllTalkingPointsService } from "../services/users/servicesTalkingPoints";

export const createTalkingPointController = async (req: Request, res: Response) => {

    try {
        const talkingPointData = req.body        

        const talkingPoint = await createTalkingPointService(talkingPointData)

        return res.status(200).send(talkingPoint)

        
    } catch (error) {
        console.log(error)
    }

};

export const listAllTalkingPointController = async (req: Request, res: Response) => {
    try {
        const uuidTalkingPoint = req.params.uuid;

        const talkingPointsFromOneOne = await listAllTalkingPointsService(uuidTalkingPoint)

        return res.status(200).send(talkingPointsFromOneOne)
        
    } catch (error) {
        console.log(error)
    }

};

// export const listEspecifTalkingPointController = async (req: Request, res: Response) => {
//     try {
        
//     } catch (error) {
//         console.log(error)
//     }

// };

export const editTalkingPointController = async (req: Request, res: Response) => {
    try {
        
        const talkingPointData = req.body;

        const uuidTalkingPoint = req.params.uuid;        

        const editedTalkingPoint = await editTalkingPointsService(talkingPointData, uuidTalkingPoint);

        return res.status(200).json(editedTalkingPoint);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Não foi possível editar o talking point"});
    }
};

export const deleteTalkingPointController = async (req: Request, res: Response) => {
    try {

        deleteTalkingPointsService(req.params.uuid)

        return res.status(204).send()
        
    } catch (error) {
        console.log(error)
    }

};
