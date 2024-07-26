    import { request, response } from "express";
    import conn  from "../Config/conn.js";
   


    export const getLinhas = (request, response)=>{
        const sql = /*sql*/ `SELECT * FROM linhas`; 
        conn.query(sql, (err,data)=>{
            if(err){
                response.status(500).json({message:"Erro ao buscar linhas de onibus"})
            }
            const linhas = data
            response.status(200).json(linhas)
        })
    }

    export const criarLinhas = (request, response)=>{
        const {nome_linha, numero_linha, itinerario} = request.body;  
        // validades
        if(!nome_linha){
        response.status(400).json({message:"O nome da linha é obrigatorio"})
        return
        } if(!numero_linha){
        response.status(400).json({message:"O numero da linha é obrigatorio"})
        return
        } if(!itinerario){
        response.status(400).json({message:"O itinerario é obrigatório"})
        return
        }


    const checkSql = /*sql*/ `SELECT * FROM linhas WHERE ?? = ? AND ?? = ? AND ?? = ?`
    const checkSqlData = ["nome_linha", nome_linha, "numero_linha", numero_linha, "itinerario",itinerario]
    conn.query(checkSql,checkSqlData, (err, data)=>{
        if(err){
        response.status(500).json({message:"Erro ao casdastar linhas"})
        return console.log(err); 

        } if(data.length > 0){
        response.status(409).json({message: "essa linha já existe"}); 
        return console.log(err); 
        }

        const id = data.length + 1
        
    // inserir dados/ cadastro
    const insertSql = /*sql*/ `INSERT INTO linhas(??, ??, ??, ??) VALUES (?,?,?,?)` 
    const insertData = ["linhas_id", "nome_linha", "numero_linha" , "itinerario",id, nome_linha, numero_linha, itinerario ]
    // as colunas vão ser representadas por "??", os valores são representados por "?"
                        // adiciona a instrução insertData 
    conn.query(insertSql, insertData, (err)=>{
        if(err){
        response.status(500).json({message:"Erro ao cadastrar linha"}); 
        }
        response.status(201).json({message:"Linha  cadastrada"})
    })
    }); 
    }

    export const buscarLinha = ()=>{
        const {id}= request.params
        const {nome_linha, numero_linha, itinerario} = request.body;
        if(!nome_linha){
            response.status(400).json({message:"O nome da linha é obrigatorio"})
            return
            } if(!numero_linha){
            response.status(400).json({message:"O numero da linha é obrigatorio"})
            return
            } if(!itinerario){
            response.status(400).json({message:"O itinerario é obrigatório"})
            return
            }

        const buscaLinhaId = /*sql*/ `SELECT FROM linhas WHERE linhas_id= "${id}"`

        conn.query(buscaLinhaId, (err ,data)=>{
         if(err){
            response.status(404).json({message:"linha não encontrada"})
         }
         if(data === 0){
            response.status(409).json({message:"Linha não encontradae"})
         }
        
        })
        
    }

    export const atualizarLinha = ()=>{
        const {id}= request.params
        const upadateSql = /*sql*/ `UPDATE linhas SET "nome_linha"= nome_linha,"numero_linha", numero_linha, "itinerario", itinerario
        WHERE linha_id = "{id}"`
        conn.query(upadateSql, (err)=>{
            if(err){
                response.status(500).json({message:"erro ao autualizar linha"})
            }
            response.status(200).json({message:"linha atualizada"})
        })
    }


