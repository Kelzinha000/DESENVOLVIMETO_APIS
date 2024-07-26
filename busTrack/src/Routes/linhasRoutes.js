import {application, Router } from "express";
import conn from '../Config/conn.js'

const router = Router()
import { getLinhas, criarLinhas , atualizarLinha, buscarLinha} from "../Controller/linhasController.js"; 

application.get("/", getLinhas);
application.post("/linhas",criarLinhas )
application.get("/", buscarLinha);
application.put("/linhas",atualizarLinha )

export default router; 