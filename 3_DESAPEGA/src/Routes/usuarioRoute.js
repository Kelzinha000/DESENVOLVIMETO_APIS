import { response, Router } from "express";

// importar cControllers de ususarios
import { register , login  , checkUser} from "../Controllers/usuarioController.js";
import validarUsuario from "../helpers/validar-user.js";
const router = Router();
// localhost:3333/usuarios/register
router.post("/register", validarUsuario, register);
router.post("/login", login);
router.get("/:id", checkUser );
export default router;
