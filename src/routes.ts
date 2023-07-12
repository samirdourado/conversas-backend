// Deixar todos as sessões de rotas comentadas para seguir o padrao
import { Router } from 'express';
import { createUserController } from './controllers/controllersUsers';


export const userRoutes: Router = Router();

userRoutes.post('', createUserController )
