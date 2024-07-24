import {application, response, Router } from "express";
import conn from '../Config/conn.js'

const router = Router()
import { getMotorista, cadastrarMotorista } from "../Controller/motoristaController.js"; 

application.get("/", getMotorista);
application.post("/motoristas",cadastrarMotorista)

export default router; 