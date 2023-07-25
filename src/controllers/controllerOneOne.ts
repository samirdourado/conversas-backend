import { Request, Response } from "express";
import { IOneOne } from "../interfaces/oneOneInterface";
import { createOneOneService, listAllOneOneUserService, editOneOneService, deleteOneOneService } from "../services/users/servicesOneOne";

export const createOneOneController = async (req: Request, res: Response) => {

    try {
        const oneOneData = req.body

        const organizerUUID = req.user.uuid

        const oneOneCreated = await createOneOneService(oneOneData, organizerUUID)

        return res.status(201).send(oneOneCreated)
        
    } catch (error) {
        console.log(error)        
    }
}

export const listAllOneOneUserController = async (req: Request, res: Response) => {

    try {

        const uuidUser = req.params.uuid;        

        const oneOneFromUser = await listAllOneOneUserService(uuidUser)

        return res.status(200).send(oneOneFromUser)
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({message: "Não foi possível listar as one one."})                
    }
}

// export const listSpecifcOneOneUserController = async (req: Request, res: Response) => {

//     try {

//         const uuidOneOne = req.params.uuid;        

//         const oneOneFromUser = await listSpecificOneOneUserService(uuidOneOne)

//         return res.status(200).send(oneOneFromUser)
        
//     } catch (error) {
//         console.log(error)

//         return res.status(500).json({message: "Não foi possível listar as one one."})                
//     }
// }

export const editOneOneController = async (req: Request, res: Response) => {

    try {
        const oneOneData = req.body

        const uuidOneOne = req.params.uuid;        

        const editedOneOne = await editOneOneService(oneOneData, uuidOneOne)        

        return res.status(200).json(editedOneOne)        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Não foi possível editar a one one."});        
    }
}

export const deleteOneOneController = async (req: Request, res: Response) => {

    try {

        deleteOneOneService(req.params.uuid)
        
        return res.status(204).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Não foi possível deletar a one one."});
    }
}