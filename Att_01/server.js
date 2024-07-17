import "dotenv/config"
import express, { request, response } from "express"
import mysql from "mysql2"
import {v4 as uuidv4} from "uuid"


const PORT = process.env.PORT

const app = express()

app.use(express.json())

const conn = mysql.createConnection({
host:'localhost', 
user:'root', 
password:'Sen@iDev77!.',
database:'funcionarios', 
port:3333, 

})
conn.connect((err)=>{
    if(err){
        console.error(err.stack)
        return
    }
    console,log("Mysql conectado")
})
// seleciobar todos os funcionarios
app.get("funcionarios", (request, response)=>{
    
    const sql = /*sql*/ `SELECT * FROM funcionarios`
    conn.query(sql, (err,data)=>{
        if(err){
            response.status(500).json({mesage:"Error ao buscar funcionarios"})
            return console.error(err)
        }
        const funcionarios = data 
        response.status(200).json(funcionarios)
    })
})

app.post("/funcinarios", (request, response)=>{
    const {nome,cargo, data_contratacao, salario, email } = request.body
    
    if(!nome){
        response.status(400).json({messge:"O nome é obrigatório"})
        return
    }
    if(!cargo){
        response.status(400).json({messge:"O cargo é obrigatório"})
        return
    }
    if(!data_contratacao){
        response.status(400).json({messge:"O data_contratacao é obrigatório"})
        return
    }
    if(!salario){
        response.status(400).json({messge:"O salario é obrigatório"})
        return
    }
    if(!email){
        response.status(400).json({messge:"O email é obrigatório"})
        return 
    }
   
    const checkSql = /*sql*/  `SELECT * FROM funcionarios WHERE nome ="${nome} AND  email ="${email}"`
    conn.query(checkSql, (err)=>{
        if(err){
            response.status(500).json({message:"Erro ao cadastrar funcionário"})
            return console.log(err)
        }
         if(data.length > 0){
         response.status(409).json({message:"Esse funcionário ja foi cadastrador "})
        console.error(err)
        }
        
        const id = uuidv4()
      

        const insertSql = /*sql*/`INSERT INTO funcionarios (id,cargo, data_contratacao, salario, email )
         VALUES ("${id}","${nome}", "${cargo}", "${data_contratacao}", "${salario}", "${email}")`
        
        conn.query( insertSql, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao cadastrar funcionario"})
            }
            response.status(201).json({message:"Funcionario cadastrado"})
        })

    })  
})

app.get("/funcionarios/:id", (request, response)=>{
    const id = request.params

    if(!nome){
        response.status(400).json({messge:"O nome é obrigatório"})
        return
    }
    if(!cargo){
        response.status(400).json({messge:"O cargo é obrigatório"})
        return
    }
    if(!data_contratacao){
        response.status(400).json({messge:"O data_contratacao é obrigatório"})
        return
    }
    if(!salario){
        response.status(400).json({messge:"O salario é obrigatório"})
        return
    }
    if(!email){
        response.status(400).json({messge:"O email é obrigatório"})
        return 
    }
   

    const sql = /*sql*/ `SELECT * FROM funcionarios WHERE id = "${id}"`
    conn.query(sql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message:"Erro ao selecionar um funcionário"})
        }
      if(data.length === 0){
        return response.status(404).json({message:"Funcionario não encontrado"})
      }
    })
})

app.delete('/funcionarios/:id', (request, response)=>{
    const {id} = request.params; 

    const deleteSql = /* sql */ `DELETE FROM funcionarios WHERE id="${id}"`
    conn.query(deleteSql, (err, info)=>{
        if(err){
            response.status(500).json({message:"Erro ao deletar funcionario"})
            return
        }
       //console.log(info)
       if(info.affectedRows === 0){
           response.status(404).json({message:"funcionario não encontrado"})
           return   
    }

        response.status(200).json({mesage:"funcionario selecionado foi deletado"})
    })
  
})


app.listen(PORT, ()=>{
    console.log(`Servidor on PORT:`+PORT)
})