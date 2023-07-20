import { Request, Response } from "express"
import { createUserService, listUserService, updateUserService, deleteUserService, listEspecificUserService } from "../services/users/servicesUser"

export const createUserController = async (req: Request, res: Response): Promise<Response> => {      

    try {

        const userData = req.body

        const newUser = await createUserService(userData)

        return res.status(201).json(newUser)    

    } catch (error) {

        console.log(error)

        return res.status(500).json({message: "Não foi possível criar um usuário, tente novamente."})
        
    }    
}

export const listUsersController = async (req: Request, res: Response) => {

    try {
        const users = await listUserService()
        
        return res.status(200).json(users)

    } catch (error) {

        console.log(error)

        return res.status(500).json({message: "Não foi possível listar os usuários, tente novamente."})
        
    }
}

export const listEspecificUserController = async (req: Request, res: Response) => {

    try {
        const userData = req.body;

        const uuidUser = req.params.uuid;

        const users = await listEspecificUserService(uuidUser);
        
        return res.status(200).json(users);

    } catch (error) {

        console.log(error)

        return res.status(500).json({message: "Não foi possível listar o usuário, tente novamente."})
        
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    
    try {

        const userData = req.body;        

        const uuidUser = req.params.uuid;        

        const updateUser = await updateUserService(userData, uuidUser);

        return res.status(200).json(updateUser)

    } catch (error) {

        console.log(error)

        return res.status(500).json({message: "Não foi possível editar as suas informações, tente novamente."})        
    }
}

export const deleteUserController = async (req: Request, res: Response) => {

    try {  

        await deleteUserService(req.params.id)
    
        return res.status(204).send()

    } catch (error) {

        console.log(error)

        return res.status(500).json({message: "Não foi possível deletar, tente novamente."})
    }    
}