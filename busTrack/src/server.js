import "dotenv/config";
import express from 'express';
// importando conexão com banco de dados
import conn from './Config/conn.js'


// importacao dos modulos e criaca das tabelas
import "./Model/linhasModel.js"
import "./Model/motoristaModel.js"
import "./Model/onibusModel.js"

// importacao das rotas
import linhasRoutes from './Routes/linhasRoutes.js'
import motoristaRoutes from './Routes/motoristaRoutes.js'
import onibusRoutes from './Routes/onibusRoutes.js'


const PORT = process.env.PORT
const app = express()
app.use(express.urlencoded({extended : true}));
app.use(express.json())

app.use('/linhas',linhasRoutes )


app.listen(PORT, ()=>{
    console.log(`Servidor on PORT`+PORT)
})