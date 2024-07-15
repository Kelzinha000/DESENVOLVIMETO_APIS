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
    port:3306,
})

// variavel conn (conexão) vai conectar o banco de dados
conn.connect((err)=>{
    if(err){
      return console.log(err.stack);
    }
    console.log("Mysql conectado")
    
}) // connect vai receber uma função callback  

app.get("/livros", (request, response)=>{
    // query para banco 
    const sql = /*SQL*/`SELECT * FROM livros` // instrução do banco de dados
    conn.query(sql, (err, data)=>{ // consulta para buscar erro
        if(err){
            response.status(500).json({message:"Erro o buscar os livros"})
            return console.log(err)// dá o console no erro, para saber qual erro estara lidando

        }
        const livros = data 
        // console.log(data)
        // console.log(typeof data) // typeof - vai dizer que tipo é a variavel *se string, numerico, boolean
        response.status(200).json(livros)
    }) // essq eury é uma função que recebe dois paramentros. Na callback sempre retorna se erro e se não de erro as informações(data)
    

})

// rota 404
app.post("/livros",(request, response)=>{
    // response.status(404).json({message:"Rota não encontrada"})
   const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = request.body;  
   // validades
   if(!titulo){
     response.status(400).json({message:"O titulo é obrigatorio"})
     return
   }
   if(!autor){
    response.status(400).json({message:"O autot é obrigatorio"})
    return
   }
   if(!ano_publicacao){
    response.status(400).json({message:"O ano publicação é obrigatório"})
    return
   }if(!genero){
    response.status(400).json({message:"O genero é obrigatório"})
    return
   }
   if(!preco){
    response.status(400).json({message:"O preço é obrigatório"})
    return
   }
  
  // cadastrar um livro -> antes preciso saber se esse livro existe 
  const checkSql = /*sql*/  `SELECT * FROM livros WHERE titulo ="${titulo}" AND
   autor = "${autor}" AND 
   ano_publicacao = "${ano_publicacao}"`
  conn.query(checkSql, (err, data)=>{
   if(err){
    response.status(500).json({message:"Erro ao buscar livros"})
    return console.log(err); 
   }
    
   if(data.length > 0){
    response.status(409).json({message: "Livro já existe na livraria"}); 
    return console.log(err); 
   }
 
   const id = uuidv4()
   const disponibilidade = 1

   // inserir dados
   const insertSql = /*sql*/ `INSERT INTO livros 
   (id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
   VALUES ("${id}}","${titulo}}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}")` 
 
 conn.query(insertSql, (err)=>{
    if(err){
        response.status(500).json({message:"Erro ao cadastrar livro"}); 
    }
    response.status(201).json({message:"Livro cadastrado"})
 })
  }); 
}); 

app.listen(PORT, ()=>{
    console.log("Servidor on PORT"+PORT)
})