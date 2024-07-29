    import "dotenv/config";
    import express, { request, response } from "express";

    // importar conexão
    import conn from "./Config/conn.js"

    const PORT = process.env.PORT;

    // importação dos módulos (tabela)
    import "./Models/usuarioModel.js"
    const app = express();
    //404 
    app.use((request, response)=>{
        response.status(404).json({message: "Recurso não encntrado"})
    })
    // 404
    // app.get("*", (request, response) => {
    // response.send("Olá, Mundo!");
    // });

    app.listen(PORT, () => {
    console.log("Servidor on PORT" + PORT);
    });

    // .env é um arquivo de texto porém não se usar virgula para passar o proximo
