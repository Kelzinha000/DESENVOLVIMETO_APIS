    import conn from "../Config/conn.js"

    const tableLinhas = /*sql*/`
    CREATE TABLE IF NOT EXISTS linhas(
        linhas_id INT PRIMARY KEY NOT NULL, 
        nome_linha VARCHAR(255) NOT NULL, 
        numero_linha VARCHAR(255) NOT NULL, 
        itinerario VARCHAR(255) NOT NULL, 
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

