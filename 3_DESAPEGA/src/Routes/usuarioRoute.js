import {Router } from "express";
import jwt from 'jsonwebtoken'

// importar cControllers de ususarios
import { register , login  , checkUser, getUserById, editUser} from "../Controllers/usuarioController.js";
// importar helpers
import validarUsuario from "../helpers/validar-user.js";
import verifyToken from '../helpers/verify-token.js'
const router = Router();
// localhost:3333/usuarios/register
router.post("/register", validarUsuario, register);
router.post("/login", login);
router.get("/:id", getUserById );
router.get("/checkUser", checkUser );
// verifica se estar logado e upload de imagem para perfil 
router.put("/edit/:id", editUser);
router.put("/edit/:id", verifyToken)
export default router;
