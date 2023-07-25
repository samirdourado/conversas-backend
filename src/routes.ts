import { Router } from 'express';
import { createUserController, listUsersController, listEspecificUserController, updateUserController, deleteUserController } from './controllers/controllersUsers';
import { ensureBodyDataIsValidMiddleware } from './middlewares/ensureBodyDataIsValid';
import { userSchema, userUpdateSchema } from './schemas/user.schema';
import ensureEmailExistsMiddleware from './middlewares/ensureEmailExistsMiddleware';
import { loginUserController } from './controllers/controllersLogin';
import { createLoginSchema } from './schemas/login.schema';
import { ensureTokenIsValidMiddleware } from './middlewares/ensureTokenIsValidMiddleware';
import { ensureUserExistsMiddleware } from './middlewares/ensureUserExistMiddleware';
import { ensureIsLoggedIn } from './middlewares/ensureIsLoggedIn';
import { oneOneEditSchema, oneOneSchema } from './schemas/oneOneSchema';
import { createOneOneController, listAllOneOneUserController, editOneOneController, deleteOneOneController } from './controllers/controllerOneOne';
import { newTalkingPointSchema, talkingPointEditedSchema } from './schemas/talkingPointsSchema';
import { createTalkingPointController, deleteTalkingPointController, editTalkingPointController, listAllTalkingPointController } from './controllers/controllerTalkingPoints';
import { ensureOneOneExistsMiddleware } from './middlewares/ensureOneOneExistMiddleware';
import { ensureTalkingPointExistsMiddleware } from './middlewares/ensureTalkingPointExistMiddleware';
import { createNoteController, deleteNoteController, editNoteController, listAllNotesController } from './controllers/controllerNotes';
import { editNoteSchema, newNoteSchema } from './schemas/notesSchema';
import { ensureNoteExistsMiddleware } from './middlewares/ensureNoteExistMiddleware';


// Rotas de user
export const userRoutes: Router = Router();
userRoutes.post('', ensureBodyDataIsValidMiddleware(userSchema), ensureEmailExistsMiddleware, createUserController );
userRoutes.get('', ensureTokenIsValidMiddleware, listUsersController);
userRoutes.get('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, listEspecificUserController );
userRoutes.patch('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, ensureBodyDataIsValidMiddleware(userUpdateSchema), ensureEmailExistsMiddleware, updateUserController);
userRoutes.delete('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, deleteUserController);


// Rotas de Login
export const loginRoutes: Router = Router();
loginRoutes.post('', ensureBodyDataIsValidMiddleware(createLoginSchema), loginUserController)


// Rotas de One One
export const oneOneRoutes: Router = Router();
oneOneRoutes.post('', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureBodyDataIsValidMiddleware(oneOneSchema), createOneOneController);
oneOneRoutes.get('/:uuid', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsLoggedIn, listAllOneOneUserController)
// oneOneRoutes.get('/:uuid', ensureTokenIsValidMiddleware, ensureOneOneExistsMiddleware, listSpecifcOneOneUserController)
oneOneRoutes.patch('/:uuid', ensureTokenIsValidMiddleware, ensureOneOneExistsMiddleware, ensureBodyDataIsValidMiddleware(oneOneEditSchema), editOneOneController)
oneOneRoutes.delete('/:uuid', ensureTokenIsValidMiddleware, ensureOneOneExistsMiddleware, deleteOneOneController)


// Rotas de Talking Points
export const talkingPointsRoutes: Router = Router();
talkingPointsRoutes.post('', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureBodyDataIsValidMiddleware(newTalkingPointSchema), createTalkingPointController)
talkingPointsRoutes.get('/:uuid', ensureTokenIsValidMiddleware, ensureOneOneExistsMiddleware, listAllTalkingPointController)
talkingPointsRoutes.patch('/:uuid', ensureTokenIsValidMiddleware, ensureTalkingPointExistsMiddleware, ensureBodyDataIsValidMiddleware(talkingPointEditedSchema), editTalkingPointController)
talkingPointsRoutes.delete('/:uuid', ensureTokenIsValidMiddleware, ensureTalkingPointExistsMiddleware, deleteTalkingPointController)


// Rotas de Notes
export const notesRoutes: Router = Router();
notesRoutes.post('', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureBodyDataIsValidMiddleware(newNoteSchema), createNoteController)
notesRoutes.get('/:uuid', ensureTokenIsValidMiddleware, ensureOneOneExistsMiddleware, listAllNotesController)
notesRoutes.patch('/:uuid', ensureTokenIsValidMiddleware, ensureNoteExistsMiddleware, ensureBodyDataIsValidMiddleware(editNoteSchema), editNoteController)
notesRoutes.delete('/:uuid', ensureTokenIsValidMiddleware, ensureNoteExistsMiddleware, deleteNoteController)