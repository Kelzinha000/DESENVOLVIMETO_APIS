import {response, Router} from 'express' // reponsável pelas rotas do express
//import conn from '../config/conn.js'// depois de importar controller apaga
const router = Router()
// import contollers
import {getLivros, cadastrarLivro} from "../controllers/livrosController.js"
// acessar rotas de livros
router.get("/",getLivros); 
router.post("/criar", cadastrarLivro); 
// router.get("/:id", cadastrarFuncionario); CODIGO
// router.put("editar/:id", editarFuncionario); CODIGO
export default router; 