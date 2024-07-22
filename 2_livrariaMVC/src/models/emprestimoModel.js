import conn from "../config/conn.js"

const tableEmprestimo = /*sql*/ `
CREATE TABLE IF NOT EXISTS emprestimo(
emprestimo_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
livro_id VARCHAR (255) NOT NULL, 
cliente_id VARCHAR (255) NOT NULL,  
data_empretismo DATETIME NOT NULL,
data_devolucao DATETIME NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(cliente_id) REFERENCES clientes(id), 
FOREIGN KEY(livro_id) REFERENCES livro(id)
);

`
conn.query (tableEmprestimo, (err, result, field)=>{
if(err){
    console.error("Erro ao criar a tabela"+err.stack)
    return
}
//  console.log(result)
//   console.log(field)

console.log("Tabela [emprestimo] criada com sucesso")
})