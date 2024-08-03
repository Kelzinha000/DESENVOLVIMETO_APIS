import {Router} from "express"


import {create, getAllObjectUser} from "../Controllers/obejtoController.js"
// helpers
import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js";

const router = Router()
router.post("/create", verifyToken, imageUpload.array("imagens", 10),create)
router.get("/usuarios/imagens", verifyToken, getAllObjectUser)
export default router; 