import {application, response, Router } from "express";
import conn from '../Config/conn.js'

const router = Router()
import { getOnibus, cadastraronibus } from "../Controller/onibusControoler.js"; 

application.get("/",getOnibus);
application.post("/onibus",cadastraronibus)

export default router; 