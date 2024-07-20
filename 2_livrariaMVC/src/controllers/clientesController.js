

export const getClientes =  (request, response)=>{
    const sql = /*sql*/`SELECT * FROM clientes `;
    conn.query(sql,(err,data)=>{
        if(err){
            response.status(500).json({message:"Erro ao buscar clientes"})
            return
        }
        const clientes = data 
        response.status(200).json(clientes); 
    });
}
export const cadastrarClientes = (request, response)=>{ 
    const {nome, email} = request.body;  
    // validades
    if(nome){
    response.status(400).json({message:"O titulo é obrigatorio"})
    return
    }
    if(!email){
    response.status(400).json({message:"O autot é obrigatorio"})
    return
    }
    

// cadastrar um cliene-> antes preciso saber se esse livro existe 
    const checkSql = /*sql*/  `SELECT * FROM clientes WHERE nome ="${nome}" AND
        autor = "${email}"
        `
    conn.query(checkSql, (err, data)=>{
        if(err){
        response.status(500).json({message:"Erro ao casdastar cliente"})
        return console.log(err); 
        }
        
        if(data.length > 0){
        response.status(409).json({message: "Cliente já cadastrado"}); 
        return console.log(err); 
        }
    
        const id = uuidv4()
    
        // inserir dados
        const insertSql = /*sql*/ `INSERT INTO clientes
        (id, nome, email, imagem)
        VALUES ("${id}","${nome}","${email}","${imagem}")` 
    
    conn.query(insertSql, (err)=>{
        if(err){
            response.status(500).json({message:"Erro ao cadastrar cliente"}); 
        }
        response.status(201).json({message:"Cliente já cadastrado"})
    })
    }); 
    
}
