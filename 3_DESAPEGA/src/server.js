import "dotenv/config";
import express, { request, response } from "express";
import path from "node:path"
import { fileURLToPath } from "node:url";
import cors from "cors";
// importar conexão
import conn from "./Config/conn.js";

const PORT = process.env.PORT;
const app = express();
// importação dos módulos (tabela)
import "./Models/usuarioModel.js";
import "./Models/objetoModel.js"
import "./Models/objetoImagesModel.js"

// importar as rotas
import usuarioRouter from "./Routes/usuarioRoute.js";
import obejetoRouter from "./Routes/ObjetoRouter.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// upload de imagem, passar data e arquivo que é a imagem 
app.use(express.urlencoded({ extended: true })); // trabalhar com imagens
app.use(express.json());


// localizar onde está a pasta public
app.use("/public", express.static(path.join(__dirname, "public")))
//CORS
app.use(cors({
  origin: 'http://localhost:5372'
}))

// utilizar a rota
app.use("/usuarios", usuarioRouter);
app.use("/objetos");

//404
app.use((request, response) => {
  response.status(404).json({ message: "Recurso não encontrado" });
});
// 404
// app.get("*", (request, response) => {
// response.send("Olá, Mundo!");
// });

app.listen(PORT, () => {
  console.log("Servidor on PORT" + PORT);
});

// .env é um arquivo de texto porém não se usar virgula para passar o proximo
