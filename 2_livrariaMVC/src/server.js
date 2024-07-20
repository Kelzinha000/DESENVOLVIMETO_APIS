import "dotenv/config"
import express from "express"

// conexão com banco de dados
import conn from "./config/conn.js"

// importação dos modulos e criação das tabelas 
import "./models/livroModel.js"
import "./models/funcionarioModel.js"

// importação das ROTAS
import livroRoutes from "./routes/livroRoutes.js"

const PORT = process.env.PORT;

const app = express() 


app.use(express.urlencoded({extended : true}));
app.use(express.json())

// Utilização das rotas
// http://localhost:3333/livros
app.use('/livros', livroRoutes); 
app.use('/clientes',clienteRoutes )

// app.use("/funcionarios", funcionarioRoutes)

app.get("/", (request, response)=>{
    response.send('Olá, Mundo!')
})

app.listen(PORT, ()=>{
    console.log("Servidor on port "+PORT) 
})