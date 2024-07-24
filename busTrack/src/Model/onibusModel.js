import conn from "../Config/conn.js"

    const tableOnibus = /*sql*/`
    CREATE TABLE IF NOT EXISTS onibus(
        onibus_id int primary key auto_increment, 
        placa varchar(255) not null, 
        modelo varchar(255) not null, 
        ano_fabricação year(4) not null, 
        capacidade int  not null, 
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

