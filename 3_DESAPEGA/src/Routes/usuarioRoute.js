import {response, Router} from "express"

// importar cControllers de ususarios
import {register} from '../Controllers/usuarioController.js'

const router = Router(); 
// localhost:3333/usuarios/register
router.post("/register",register);

export default router; 