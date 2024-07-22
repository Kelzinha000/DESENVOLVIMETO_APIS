import "dotenv/config"
import express from "express"

// conexão com banco de dados
import conn from "./config/conn.js"

// importação dos modulos e criação das tabelas 
import "./models/livroModel.js"
import "./models/funcionarioModel.js"
import './models/clientesmodel.js'

// importação das ROTAS
import livroRoutes from "./routes/livroRoutes.js"
import funcionariosRoutes from './routes/funcionariosRoutes.js'

const PORT = process.env.PORT;

const app = express() 


app.use(express.urlencoded({extended : true}));
app.use(express.json())

// Utilização das rotas
// http:/  /localhost:3333/livros
app.use('/livros', livroRoutes); 
//app.use('/clientes', clientesRoutes )

// app.use("/funcionarios", funcionarioRoutes)

app.get("/", (request, response)=>{
    response.send('Olá, Mundo!')
})

app.listen(PORT, ()=>{
    console.log("Servidor on port "+PORT) 
})

// 3 tabelas(livros, funcionarios, clientes) 

// dayjs npm 

// empretismos
// id INT auto incremente 
// cliente_id - deve existir
// livro_id - deve existir 
// data_empretismo
// data_devolução 
// createAt 
// UpdateaAt 
// 1 listar todos os empretismos
// 2  validar o criar empretismo 
//      - o funcionário não pode adicionar a data que seja anterior a data de hoje 
//       -data devolução // não pode ser antes da data de empretismo 
//     - a data de devolução não pode ser maior que duas semanas 