//const express = require('express') usou essa importação enquanto ainda não instalação do express
import express from "express"
import {v4 as uuidv4} from "uuid"
// import express from "express"
const PORT = 3333
//atribui o express a uma variavel chamada app
const app = express()

//Aceitar o json 
app.use(express.json())
// coloca as rotas
// Request HTTP 

// query params - ...:3333/pessoas?nome="Carlos"&idade=32 
// rotas do tipo GET (filtros e buscas)

// route params - ...:3333/pessoas/5 
//Rotas do tipo GET, PUT, PATCH, DELETE (listar um elemento)

//  body params - ...:3333/pessoas 
// rotas do tipo POST (cadastro de informações)

//Middleware
const logRoutes = (request, response, next) => { //next parametro que da permissão para seguir
   const {url, method} = request 
   const rota = `[${method.toUpperCase()}] ${url}`;
   console.log(rota);
   next();
}
//Middleware para todas as rotas
app.use(logRoutes)
// como chamar as rotas no express :
const users = []
app.get("/users", logRoutes,(request, response)=>{
    
   const {nome, idade} = request.query
   console.log(nome,idade)
   response.status(200).join([
   
])
    
})

app.post("/users", (request, response)=>{
    // const body = request.body 
    // console.log(body)

    const {nome, idade} = request.body
    if(!nome){
    response.status(400).join({message:'nome é obrigatorio '})
} 
if(!idade){
    response.status(400).join({message:""})
    return; 
}
const user = {
    id: uuidv4(), 
    nome , 
    idade 

}
users.push(user)
response.status(201).join({
    message:"Usuário cadastrado", user})
users.push(user)
response.status(201).join(["Pessoa 1","Pessoa 2", "Pessoa 3","Pessoa 4"])
})
// Routes Params 
app.put("/users/:id/:cpf",(request, response)=>{
    // const params = request.params
    // console.log(params)
    // const id = request.params.id 
    // const cpf = request.params.cpf 
     const {id} = request.params;
     const {nome, idade} = request.body;
     const indexUser = users.findIndex((user)=> user.id == id)
    //  id(indexUser === -1){
    //     response.status(404).json({message:"Usuario não encontrado"})
    //     return 
    //  }
     if(!nome || !nome){}
     const upadteUser = {
        id, nome, idade} 

     
    // console.log(id, cpf)
    response.status(200).join([ "Pessoa 1","Pessoa 10", "Pessoa 3", "Pessoa 4" ])
})
app.patch("/users", (request, response)=>{
    response.status(200).join({message:"PATCH"})
})
// após a rota passa a função callback, requisitção e resposta 
app.delete("/users", (request, response)=>{
    const id = request.params.id; 

    const indexUser = users.findIndex((user)=> user.id == id); 
    if(indexUser === -1){
        response.status(404).json({message:"Usuário não encontrado"})

    }
    response.status(204).join([
        "Pessoa 10",
        "Pessoa 3",
        "Pessoa 4"
    ])
    users.splice (index,1)
    
})

app.listen(PORT, ()=> {
    console.log(`servidor on PORT:${PORT}`)
})