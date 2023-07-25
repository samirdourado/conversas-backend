import 'express-async-errors'
import express, { Application} from 'express'
import { handleErros } from './errors'
import { loginRoutes, notesRoutes, oneOneRoutes, talkingPointsRoutes, userRoutes } from './routes'

const app: Application = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());

// Rotas de users
app.use('/users', userRoutes);

// Rotas de Login
app.use('/login', loginRoutes)

// Rotas de One One
app.use('/oneone', oneOneRoutes)

// Rotas de Talking Points
app.use('/talkingpoints', talkingPointsRoutes)

// Rotas de Notes
app.use('/notes', notesRoutes)

export default app
