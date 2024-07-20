import router from 'express'

const router = Router()
import {getClientes, cadastrarClientes} from '../controllers/clientesController.js'
router.get('/', getClientes)
router.post('/criar', cadastrarClientes)