import {application, response, Router } from "express";
import conn from '../Config/conn.js'

const router = Router()
import { getOnibus, cadastraronibus, buscaronibus} from "../Controller/onibusControoler.js"; 

application.get("/",getOnibus);
application.post("/onibus",cadastraronibus)
application.get("/onibus", buscaronibus)

export default router; 