import conn from "../Config/conn.js"

const tableObject = /*sql*/ `
CREATE TABLE IF NOT EXISTS objetos(
    objeto_id VARCHAR(60) PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL, 
    peso VARCHAR(255), 
    cor VARCHAR(255) NOT NULL, 
    descricao TEXT, 
    disponivel BOOLEAN, 
    usuario_id VARCHAR(60), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 

    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)

)
`

conn.query(tableObject, (err)=>{
    if(err){
        console.error(err); 
        return
    }
    console.log("tabela de [objeto] criada com sucesso!")
})

