import conn from '../config/conn.js'
import { v4 as uuidv4 } from 'uuid'
import { response } from 'express';

export const getFuncionarios =  (request, response)=>{
    const sql = /*sql*/`SELECT * FROM funcionarios`;
    conn.query(sql,(err,data)=>{
        if(err){
            response.status(500).json({message:"Erro ao buscar funcionarios "})
            return
        }
        const funcionarios = data 
        response.status(200).json(funcionarios); 
    });
}

export const criarFuncionario = (resquest, response)=>{
   
        const {nome, ano_publicacao, genero, preco,} = resquest.body;  
        // validades
        if(!nome){ 
        response.status(400).json({message:"O nome é obrigatorio"})
        return
        } if(!cargo){
        response.status(400).json({message:"O cargo é obrigatorio"})
        return
        } if(!data_contratacao){
        response.status(400).json({message:"O data contratacao é obrigatório"})
        return
        } if(!salario){
        response.status(400).json({message:"O salario é obrigatório"})
        return
        } if(!email){
        response.status(400).json({message:"O email é obrigatório"})
        return
        }

    // cadastrar um livro -> antes preciso saber se esse livro existe 
    // const checkSql = /*sql*/  `SELECT * FROM livros WHERE titulo ="${titulo}" AND autor = "${autor}" AND 
    // ano_publicacao = "${ano_publicacao}"` CODIGO ANTES DE FATORIZAÇÃO

    const checkSql = /*sql*/ `SELECT * FROM funcionarios WHERE ?? = ? AND ?? = ? AND ?? = ?`

    const checkSqlData = ["nome", nome, "cargo", cargo, "data_contratacao", data_contratacao]
    conn.query(checkSql,checkSqlData, (err, data)=>{
        if(err){
        response.status(500).json({message:"Erro ao casdastar funcionarios"})
        return console.log(err); 
        }
        
        if(data.length > 0){
        response.status(409).json({message: "Esse funcionarios ja fi cadastrado"}); 
        return console.log(err); 
        }

        const id = uuidv4()
        const disponibilidade = 1
    
    // inserir dados/ cadastro
        const insertSql = /*sql*/ `INSERT INTO funcionarios
        (??, ??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?,?)` 

    const insertData = ["funcionario_id", "nome", "cargo", "data_contratacao", "salario", "email", id, titulo, autor, ano_publicacao, genero, preco ]
    // as colunas vão ser representadas por "??", os valores são representados por "?"
                        // adiciona a instrução insertData 
    conn.query(insertSql,insertData, (err)=>{
        if(err){
        response.status(500).json({message:"Erro ao cadastrar funcionário"}); 
        }
        response.status(201).json({message:"Funcionário cadastrado"})
    })
    }); 
}



