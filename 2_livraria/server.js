import "dotenv/config"
import express, { request, response } from "express"
import mysql from "mysql2"
import {v4 as uuidv4} from "uuid"

const PORT = process.env.PORT

const app = express()

app.use(express.json())

//criar conexão com o banco de dads MYSQL 
const conn = mysql.createConnection({
    host:'localhost', 
    user:'root', 
    password:'Sen@iDev77!.', 
    database:'livraria', 
    port:3306
})

// conectar o banco de dados
conn.connect((err)=>{
    if(err){
      console.log(err.stack)
    }
    console.log("Mysql conectado")
    // app.listen(PORT, ()=>{
    //     console.log("Servidor on PORT"+PORT)
    // })
}) // connect vai receber uma função callback  

app.get("/livros", (request, response)=>{
    response.send("Olá, mundo!")

})

// rota 404
app.use((request, response)=>{
    response.status(404).json({message:"Rota não encontrada"})
})

app.listen(PORT, ()=>{
    console.log("Servidor on PORT"+PORT)
})