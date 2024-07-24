import { request, response } from "express";
import conn  from "../Config/conn.js";


export const getOnibus = (request, response)=>{
    const sql = /*sql*/ `SELECT * FROM onibus`; 
    conn.query(sql, (err,data)=>{
        if(err){
            response.status(500).json({message:"Erro ao buscar onibus"})
        }
        const onibus = data
        response.status(200).json(onibus)
    })
}

export const cadastraronibus = (request, response)=>{
    const {placa, modelo, ano_fabricação,  capacidade } = request.body;  
    // validades
    if(!placa){
    response.status(400).json({message:"A placa é obrigatorio"})
    return
    } if(!modelo){
    response.status(400).json({message:"O modelo é obrigatorio"})
    return
    } if(!ano_fabricação){
    response.status(400).json({message:"O ano_fabricação é obrigatório"})
    return
    } if(!capacidade){
    response.status(400).json({message:"O ano_fabricação é obrigatório"})
    return
        }
//     - Placa
// - Modelo
// - Ano de fabricação
// - Capacidade


const checkSql = /*sql*/ `SELECT * FROM onibus WHERE ?? = ? AND ?? = ? AND ?? = ?`

const checkSqlData = [placa,"placa", modelo, "modelo",ano_fabricação, "ano_fabricação",capacidade, "capacidade"]
conn.query(checkSql,checkSqlData, (err, data)=>{
    if(err){
    response.status(500).json({message:"Erro ao casdastar onibus"})
    return console.log(err); 
    }
    
    if(data.length > 0){
    response.status(409).json({message: "esse onibusjá existe"}); 
    return console.log(err); 
    }

// inserir dados/ cadastro
    const insertSql = /*sql*/ `INSERT INTO onibus
    (??, ??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?,?)` 

const insertData = [placa, modelo ,ano_fabricação,capacidade,"placa", , "modelo", "ano_fabricação", "capacidade"]
// as colunas vão ser representadas por "??", os valores são representados por "?"
                    // adiciona a instrução insertData 
conn.query(insertSql, insertData, (err)=>{
    if(err){
    response.status(500).json({message:"Erro ao cadastrar onibus"}); 
    }
    response.status(201).json({message:"onibus cadastrado"})
})
}); 
}

