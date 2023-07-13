import { Request, Response } from "express";
import { ILogin } from "../interfaces/login.interface";
import { LoginService } from "../services/login/services.Login";

export const loginUserController = async (req: Request, res: Response): Promise<Response> => {

    const loginData: ILogin = req.body;

    const token = await LoginService(loginData);

    return res.json({
        token: token
    });
};