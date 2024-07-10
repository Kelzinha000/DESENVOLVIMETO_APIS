//const express = require('express') usou essa importação enqunato ainda não instalação do express
import express from "express"
/// import express from "express"
const PORT = 3333
//atribui o express a uma variavel chamada app
const app = express()

//Aceitar o json 
app.use(express.json())
// coloca as rotas
// Request HTTP 
// query params - ...:3333/pessoas?nome="Carlos"&idade=32 = rotas do tipo GET (filtros e buscas)

// route params - ...:3333/pessoas/5 = Rotas do tipo GET, PUT, PATCH, DELETE (listar um elemento)

//  body params - ...:3333/pessoas = rotas do tipo POST (cadastro de informações)

// como chamar as rotas no express :
app.get("/users",(request, response)=>{
    // const query = request.query
    // console.log(query)
   const {nome, idade} = request.query
   console.log(nome,idade)
response.status(200).join([
    "Pessoa 1",
    "Pessoa 2",
    "Pessoa 3"
])
    
})

app.post("/users", (request, response)=>{
    // const body = request.body 
    // console.log(body)
    const {nome, idade} = request.body
    console.log(nome,idade)
    response.log(201)
    response.status(201).join([
        "Pessoa 1",
        "Pessoa 2",
        "Pessoa 3",
        "Pessoa 4"
    ])
})
// Routes Params 
app.put("/users/:id/:cpf",(request, response)=>{
    // const params = request.params
    // console.log(params)
    // const id = request.params.id 
    // const cpf = request.params.cpf 
     const {id, cpf} = request.params
    console.log(id, cpf)
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
// após a rota passa a função callback, requisitção e resposta 
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