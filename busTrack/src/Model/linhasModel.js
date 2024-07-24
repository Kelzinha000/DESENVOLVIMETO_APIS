    import conn from "../Config/conn.js"

    const tableLinhas = /*sql*/`
    CREATE TABLE IF NOT EXISTS linhas(
        linhas_id int primary key auto_increment, 
        nome_linha varchar(255) not null, 
        numero_linha varchar(255) not null, 
        itinerario varchar(255) not null, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `

    conn.query(tableLinhas, (err, result, field)=>{
        if(err){
            console.error("error ao criae a tabela"+err.stack)
            return
        }
        // console.log(result)
    //  console.log(field)
        console.log("Tabela [Linhas] criada com sucesso")
    })

