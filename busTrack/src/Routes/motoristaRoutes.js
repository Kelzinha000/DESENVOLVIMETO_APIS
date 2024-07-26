import {application, response, Router } from "express";
import conn from '../Config/conn.js'

const router = Router()
import { getMotorista, cadastrarMotorista, buscarMotorista, deleteMotorista } from "../Controller/motoristaController.js"; 

application.get("/", getMotorista);
application.post("/motoristas",cadastrarMotorista)
application.get("/motoristas",buscarMotorista)
application.delete("/motorista", deleteMotorista)

export default router; 