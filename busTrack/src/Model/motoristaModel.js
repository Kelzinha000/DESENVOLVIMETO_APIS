import conn from "../Config/conn.js"

    const tableMotorista = /*sql*/`
    CREATE TABLE IF NOT EXISTS motorista(
        motorista_id INT PRIMARY KEY AUTO_INCREMENT, 
        nome VARCHAR(255) NOT NULL, 
        numero_habilitacao VARCHAR(255) NOT NULL, 
        data_nascimento DATE NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `

    conn.query(tableMotorista, (err, result, field)=>{
        if(err){
            console.error("error ao criae a tabela"+err.stack)
            return
        }
        // console.log(result)
    //  console.log(field)
        console.log("Tabela [Motorista] criada com sucesso")
    })

