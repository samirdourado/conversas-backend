// Definir todas os métodos para iniciar a aplicação.
import 'express-async-errors'
import express, { Application} from 'express'
import { handleErros } from './errors'
import { loginRoutes, oneOneRoutes, userRoutes } from './routes'


const app: Application = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());
// app.get('/', (req, res) => res.status(200).send('rodando'))

// Rotas de users
app.use('/users', userRoutes);

// Rotas de Login

app.use('/login', loginRoutes)

// Rotas de One One
app.use('/oneone', oneOneRoutes)

// Rotas de Talking Points

// Rotas de Notes





export default app