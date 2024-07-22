import "dotenv/config"
import mysql from "mysql2"
                   //createConnection  
const conn = mysql.createPool({
    connectionLimit: 10, /// limite de conexão 
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT

});

/// o create pool não precisa dessa instrução para funcionar
// conn.connect((err) => {
//     if (err) {
//         return console.error(err.stack)
//     }
//     console.log("Mysql conectado")
// })

export default conn; 