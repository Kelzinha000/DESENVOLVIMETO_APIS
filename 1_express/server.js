//const express = require('express') usou essa importação enqunato ainda não instalação do express
import express from "express"
/// import express from "express"
const PORT = 7777
//atribui o express a uma variavel chamada app
const app = express()
// coloca as rotas
// como chamar as rotas no express :
app.get("/users",(request, response)=>{
response.status(200).join([
    "Pessoa 1",
    "Pessoa 2",
    "Pessoa 3"
])
    
})

app.post("/users", (request, response)=>{
    response.status(200).join([
        "Pessoa 1",
        "Pessoa 2",
        "Pessoa 3",
        "Pessoa 4"
    ])
})

app.put("/users", (request, response)=>{
    response.status(200).join([
        "Pessoa 1",
        "Pessoa 10",
        "Pessoa 3",
        "Pessoa 4"
    ])
})
app.patch("/users", (request, response)=>{
    response.status(200).join({message:"PATCH"})
})
// apos a rota passa a função callback, requisitção e resposta 
app.delete("/users", (request, response)=>{
    response.status(204).join([
        "Pessoa 10",
        "Pessoa 3",
        "Pessoa 4"
    ])
})


app.listen(PORT, ()=> {
    console.log("servidor on PORT"+PORT)
})