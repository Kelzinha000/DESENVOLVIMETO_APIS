import { request, response } from "express";
import conn  from "../Config/conn.js";


export const getMotorista = (request, response)=>{
    const sql = /*sql*/ `SELECT * FROM motorista`; 
    conn.query(sql, (err,data)=>{
        if(err){
            response.status(500).json({message:"Erro ao buscar motorista"})
        }
        const motorista = data
        response.status(200).json(motorista)
    })
}

export const cadastrarMotorista = (request, response)=>{
    const {nome, numero_habilitacao, data_nascimento } = request.body;  
    // validades
    if(!nome){
    response.status(400).json({message:"O nome  é obrigatorio"})
    return
    } if(!numero_habilitacao){
    response.status(400).json({message:"O numero da habilitacao é obrigatorio"})
    return
    } if(!data_nascimento ){
    response.status(400).json({message:"O data nascimento é obrigatório"})
    return
    }


const checkSql = /*sql*/ `SELECT * FROM motorista WHERE ?? = ? AND ?? = ? AND ?? = ?`

const checkSqlData = ["nome", nome, "numero_habilitacao", numero_habilitacao, "data_nascimento",data_nascimento]
conn.query(checkSql,checkSqlData, (err, data)=>{
    if(err){
    response.status(500).json({message:"Erro ao casdastar motorista"})
    return console.log(err); 
    }
    
    if(data.length > 0){
    response.status(409).json({message: "esse motorista já existe"}); 
    return console.log(err); 
    }

// inserir dados/ cadastro
    const insertSql = /*sql*/ `INSERT INTO motorista
    (??, ??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?,?)` 

const insertData = ["nome", "numero_habilitacao", "data_nascimento", nome, numero_habilitacao, data_nascimento ]
// as colunas vão ser representadas por "??", os valores são representados por "?"
                    // adiciona a instrução insertData 
conn.query(insertSql, insertData, (err)=>{
    if(err){
    response.status(500).json({message:"Erro ao cadastrar motorista"}); 
    }
    response.status(201).json({message:"motorista cadastrado"})
})
}); 
}

