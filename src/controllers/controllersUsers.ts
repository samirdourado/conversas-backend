import { Request, Response } from "express"
import { createUserService, listUserService, updateUserService, deleteUserService, listEspecificUserService } from "../services/users/servicesUser"
import { IUpdatePartial } from "../interfaces/user.interface";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true
});

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    try {

        const userData = req.body

        const newUser = await createUserService(userData)

        return res.status(201).json(newUser)    

    } catch (error) {

        console.log(error)

        return res.status(500).json({message: "Não foi possível criar um usuário, tente novamente."})        
    }    
};

export const listUsersController = async (req: Request, res: Response) => {
    try {
        const users = await listUserService()
        
        return res.status(200).json(users)

    } catch (error) {

        console.log(error);

        return res.status(500).json({message: "Não foi possível listar os usuários, tente novamente."});    
    }
};

export const listEspecificUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        const uuidUser = req.params.uuid;

        const users = await listEspecificUserService(uuidUser);
        
        return res.status(200).json(users);

    } catch (error) {

        console.log(error);

        return res.status(500).json({message: "Não foi possível listar o usuário, tente novamente."});        
    }
};

export const updateUserController = async (req: Request, res: Response) => {

    const userData: IUpdatePartial = req.body;
    const uuidUser = req.params.uuid;
    
    try {
        if (req.file) {        
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
            }, (err, result) => {                
                if (result) {
                    userData.profileImage = result.secure_url
                };
            } );
        };

        const updatedUser = await updateUserService(userData, uuidUser);

        return res.status(200).json(updatedUser);        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Não foi possível editar as suas informações, tente novamente."});
    };
};

export const deleteUserController = async (req: Request, res: Response) => {

    try {  

        await deleteUserService(req.params.id);
    
        return res.status(204).send();

    } catch (error) {

        console.log(error);

        return res.status(500).json({message: "Não foi possível deletar, tente novamente."});
    };
};