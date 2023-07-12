// Definir todas os métodos para iniciar a aplicação.
import 'express-async-errors'
import express, { Application} from 'express'
import cors from 'cors';
import { handleErros } from './errors'
import { userRoutes } from './routes'

const app: Application = express()
app.use(express.json());
// app.use(cors);
app.get('/', (req, res) => res.status(200).send('rodando'))
// app.use('/users', userRoutes);




export default app