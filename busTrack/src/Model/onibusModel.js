import conn from "../Config/conn.js"

    const tableOnibus = /*sql*/`
    CREATE TABLE IF NOT EXISTS onibus(
        onibus_id INT PRIMARY KEY AUTO_INCREMENT, 
        placa VARCHAR(255) NOT NULL, 
        modelo VARCHAR(255) NOT NULL, 
        ano_fabricação YEAR(4) NOT NULL, 
        capacidade INT NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `

    conn.query(tableOnibus, (err, result, field)=>{
        if(err){
            console.error("error ao criae a tabela"+err.stack)
            return
        }
        // console.log(result)
    //  console.log(field)
        console.log("Tabela [Onibus] criada com sucesso")
    })

