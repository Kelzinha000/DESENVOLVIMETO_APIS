import router from 'express'

const router = Router()
import {getClientes, criarClientes} from '../controllers/clientesController.js'
router.get('/', getClientes)
router.post('/criar',criarClientes)

export default router; 