import {application, response, Router } from "express";
import conn from '../Config/conn.js'

const router = Router()
import { getLinhas, cadastrarLinhas } from "../Controller/linhaOnibusController.js"; 

application.get("/", getLinhas);
application.post("/linhas",cadastrarLinhas )

export default router; 