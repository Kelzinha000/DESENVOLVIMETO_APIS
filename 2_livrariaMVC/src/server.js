import "dotenv/config"
import express from "express"

// conexão com banco de dados
import conn from "./config/conn.js"

// importação dos modulos e criação das tabelas 
import "./models/livroModel.js"

const PORT = process.env.PORT

const app = express()

app.get("/", (request, response)=>{
    response.send('Olá, Mundo!')
})

app.listen(PORT, ()=>{
    console.log("Servidor on port "+PORT) 
})