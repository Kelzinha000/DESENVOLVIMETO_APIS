import conn from '../config/conn.js'
import { v4 as uuidv4 } from 'uuid';


export const getClientes =  (request, response)=>{
    const sql = /*sql*/`SELECT * FROM clientes `;
    conn.query(sql,(err,data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message:"Erro ao buscar clientes"})
            return
        }
        const clientes = data 
        response.status(200).json(clientes); 
    });
}
export const criarClientes = (request, response)=>{ 
    // desustruturação 
    const {nome, email, senha, imagem} = request.body;  
    // validades
    if(nome){
    response.status(400).json({message:"O titulo é obrigatorio"})
    return
    }
    if(!email){
    response.status(400).json({message:"O autot é obrigatorio"})
    return
    } if(!senha){
        response.status(400).json({message:"O autot é obrigatorio"})
        return
    }if(!imagem){
        response.status(400).json({message:"O autot é obrigatorio"})
        return
    }

    if(!email.includes("@")){
        response.status(422).json({message:"O email deve cnter o @"})
    }if(!nome){
        response.status(422).json({message:"O email deve cnter o @"})
    }if(!senha){
        response.status(422).json({message:"O email deve cnter o @"})
    }if(!imagem){
        response.status(422).json({message:"O email deve cnter o @"})
    }
    
    const checkSql = /*sql*/ `SELECT FROM clientes WHERE ?? = ? `
    const checkData = ["email", email]
    
    const id = uuidv4()
    const insertSql = /*sql*/ ` INSERT INTO  clientes (??,??,??,??,??) values (?,?,?,?,?)` 
    const isertData = ["email","nome","senha", "" ]
    

// cadastrar um cliene-> antes preciso saber se esse livro existe 
//     const checkSql = /*sql*/  `SELECT * FROM clientes WHERE nome ="${nome}" AND
//         autor = "${email}"
//         `
//     conn.query(checkSql, (err, data)=>{
//         if(err){
//         response.status(500).json({message:"Erro ao casdastar cliente"})
//         return console.log(err); 
//         }
        
//         if(data.length > 0){
//         response.status(409).json({message: "Cliente já cadastrado"}); 
//         return console.log(err); 
//         }
    
//         const id = uuidv4()
    
//         // inserir dados
//         const insertSql = /*sql*/ `INSERT INTO clientes
//         (id, nome, email, imagem)
//         VALUES ("${id}","${nome}","${email}","${imagem}")` 
    
//     conn.query(insertSql, (err)=>{
//         if(err){
//             response.status(500).json({message:"Erro ao cadastrar cliente"}); 
//         }
//         response.status(201).json({message:"Cliente já cadastrado"})
//     })
//     }); 
    
// }
}

export const buscarCliente = (resquest, response)=>{

const {id} = resquest.params
const checkSql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?`
const checkData = ["cliente_id", id]
conn.query(checkSql, checkData, (err, data)=>{
    if(err){
        console.error(err)
        response
        return
    }  


    const checkEmailExists= `SELECT * FROM livros WHERE ?? = ? AMD ?? !=?`
    const checkEmailExistsData = ["email", e,ai, "cliente_id", id]
    conn.query(checkEmailExistsSql, checkEmailExistsData, (err, data)=>{
        if(err){
            response.status(500).json({message:"Erro ao nuscar cliente"})
            return
        }
    })    
    
    conn.query(checkSql, checkData, (err, data)=>{

    })

})



}; 

//  if(!email.includes("@")){
//         response.status(422).json({message:"O email deve cnter o @"})
//     }if(!nome){
//         response.status(422).json({message:"O email deve cnter o @"})
//     }if(!email){
//         response.status(422).json({message:"O email deve cnter o @"})
//     }if(!imagem){
//         response.status(422).json({message:"O email deve cnter o @"})
//     }