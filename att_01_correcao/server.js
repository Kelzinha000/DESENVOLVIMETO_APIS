import "dotenv/config"
import express, { request, response } from "express"
import mysql from "mysql2"
import {v4 as uuidv4} from "uuid"

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

//criar conexão com o banco de dads MYSQL 
const conn = mysql.createConnection({
    host:'localhost', 
    user:'root', 
    password:'Sen@iDev77!.', 
    database:'funcionarios', 
    port:3306,
});

conn.connect((err)=>{
    if(err){
      return console.log(err.stack);
    }
    console.log("Mysql conectado")
    
})

app.get("/funcionarios", (request, response)=>{
  const sql = /*sql*/ `SELECT * FROM funcionarios`
  conn.query(sql, (err, data)=>{
    if(err){
        response.status(200).json({message:"Erro ao listar funcionario"})
        return console.error(err)
    }
    const funcionarios = data 
    response.status(200).json(funcionarios)
  })

})
app.post("/funcionarios",(request, response)=>{
    const {nome, cargo, data_contratacao, salario, email} = request.body; 
   
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
    //@
    if(!email.includes("@")){
        response.status(400).json({messge:"O email é obrigatório"})
        return 
    }
   
     const checkEmailSql = /*sql*/ `SELECT * FROM funcionarios WHERE email = "${email}"`
     conn.query(checkEmailSql, (err, data)=>{
        if(err){
            response.status(500).json({message:"Erro ao listar funcionario"})
            return console.error(err)
        }
        if(data.length > 0){
            response.status(409).json({message:"O E-mail já está em uso"})
            return console.error(err); 
        }
        const id = uuidv4()
        const insertSql = /*sql*/ `INSERT INTO funcionarios (id, nome, cargo, data_contratacao, salario, email)
        VALUES ("${id}","${nome}","${cargo}","${data_contratacao}","${salario}","${email}",)` 

        conn.query(insertSql, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message:"Erro ao Cadastrar funcionario"})
                return
            }

            response.status(200).json({message:"Funcionario cadastrado com sucesso"})
        })
     })
}); 
app.get('/funcionarios/:id', (request, response)=>{
   const {id} = request.params 

   const sql = /*sql*/ `SELECT * FROM  funcionarios WHERE id = "${id}"`
   conn.query(sql, (err,data)=>{
    console.error(err)
    response.status(500).json({message:"Erro ao buscar dados"})
    return 
})
const funcionario = data[0]
response.status(200).json(funcionario)

if(data.length === 0 ){
    console.error(err)
    response.status(404).json({message:"funcionario não encontrado"})
    return
}
})


app.put('/funcionarios/:id', (request, response)=>{
    const {id} = request.params 
    const {nome, cargo, data_contratacao, salario, email} = request.body;
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
    //@
    if(!email.includes("@")){
        response.status(400).json({messge:"O email é obrigatório"})
        return 
    }

 const checkSql = /*sql*/ `SELECT * FROM  funcionarios WHERE id = "${id}"`
 conn.query(checkSql, (err, data)=>{
    if(err){
     console.log(err)
     response.status(500).json({message:"Erro ao buscar dados"})
    }
    if(data.length === 0){
        response.status(404).json({message:"Funcionário não encontrado"})
        return
    }
    // verificar e um email que foi enviado é !# id 
    const emailCheckSql = /*sql*/ `SELECT * FROM funcionarios 
    WHERE email = "${email}" AND id !="${id}"`
    conn.query(emailCheckSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({messge:"Errro ao verifica os email"})
        }
         if(data.length > 0){
            return response.status(409).json({message:"E-mail. já está em uso"})
         }
  
         const updateSql = /*sql*/ `UPDATE funcionarios SET nome = "${nome}", cargo ="${cargo}", data_contratacao = "${data_contratacao}",
          salario ="${salario}", email ="${email}"  `

          conn.query(updateSql, (err)=>{
            if(err){
                console.err(err)
                return response.status(500).json({message:"Erro ao atualizar funcionários"})

            }
            response.status(200).json({message:"Usuário atualizar"})
          })

    })
})
 })

 app.delete("/funcionarios/:id", (response,response)=>{
    const {id} = request.params

    const deleteSql = /*sql*/ `DELETE FROM funcionarios WHERE id = "${id}" `
    conn.query(deleteSql, (err, info)=>{
        if(err){
            console.error(err)
            return response.status(500).json({message:"Erro ao deletar"})
        }
        if(info.affectedRows === 0 ){
      return response.status(404).json({message:"funcionário não encontrado"})

        }
       response.status(204).send("Excluido")
    })
 })

 app.use((request, response)=>{
    response.status(404).json({message:"Rota não encontratada"})
 })

process.on(`SIGINT`, ()=>{
    conn.end((err)=>{
        if(err){
            console.error(`Erro ao fechar conexão ${err.message}`)
        }
        console.log("Conexeão com Mysql encerrada"); 
        process.exit(); 
    })
})

app.listen(PORT, ()=>{
    console.log("Servidor on PORT"+PORT)
})