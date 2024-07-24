import conn from "../Config/conn.js"

    const tableMotorista = /*sql*/`
    CREATE TABLE IF NOT EXISTS motorista(
        motorista_id int primary key auto_increment, 
        nome varchar(255) not null, 
        numero_habilitacao varchar(255) not null, 
        data_nascimento varchar(255) not null, 
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

