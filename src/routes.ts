// Deixar todos as sessões de rotas comentadas para seguir o padrao
import { Router } from 'express';
import { createUserController, listUsersController, listEspecificUserController, updateUserController, deleteUserController } from './controllers/controllersUsers';
import { ensureBodyDataIsValidMuddleware } from './middlewares/ensureBodyDataIsValid';
import { userSchema, userUpdateSchema } from './schemas/user.schema';
import ensureEmailExistsMiddleware from './middlewares/ensureEmailExistsMiddleware';
import { loginUserController } from './controllers/controllersLogin';
import { createLoginSchema } from './schemas/login.schema';
import { ensureTokenIsValidMiddleware } from './middlewares/ensureTokenIsValidMiddleware';
import { ensureUserExistsMiddleware } from './middlewares/ensureUserExistMiddleware';
import { ensureIsLoggedIn } from './middlewares/ensureIsLoggedIn';
import { oneOneEditSchema, oneOneSchema } from './schemas/oneOneSchema';
import { createOneOneController, listAllOneOneUserController, editOneOneController } from './controllers/controllerOneOne';

// Rotas de user
export const userRoutes: Router = Router();

userRoutes.post('', ensureBodyDataIsValidMuddleware(userSchema), ensureEmailExistsMiddleware, createUserController );
userRoutes.get('', ensureTokenIsValidMiddleware, listUsersController);
userRoutes.get('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, listEspecificUserController );
userRoutes.patch('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, ensureBodyDataIsValidMuddleware(userUpdateSchema), ensureEmailExistsMiddleware, updateUserController);
userRoutes.delete('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, deleteUserController);

// Rotas de Login
export const loginRoutes: Router = Router();

loginRoutes.post('', ensureBodyDataIsValidMuddleware(createLoginSchema), loginUserController)

// Rotas de One One
export const oneOneRoutes: Router = Router();

oneOneRoutes.post('', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureBodyDataIsValidMuddleware(oneOneSchema), createOneOneController);
oneOneRoutes.get('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, listAllOneOneUserController)
oneOneRoutes.patch('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, ensureBodyDataIsValidMuddleware(oneOneEditSchema), editOneOneController)

// Rotas de Talking Points

// Rotas de Notes
