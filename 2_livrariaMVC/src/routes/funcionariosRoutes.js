import {response, Router} from 'express' // reponsável pelas rotas do express
//import conn from '../config/conn.js'// depois de importar controller apaga
const router = Router()
// import contollers
import {getFuncionarios,criarFuncionario} from "../controllers/funcionariosController.js"
// acessar rotas de livros
router.get("/",getFuncionarios); 
router.post("/criar", criarFuncionario); 
// router.get("/:id", cadastrarFuncionario); CODIGO
// router.put("editar/:id", editarFuncionario); CODIGO
export default router; 