    import "dotenv/config";
    import express, { request, response } from "express";

    // importar conexão
    import conn from "./Config/conn.js"

    const PORT = process.env.PORT;
    const app = express();
    // importação dos módulos (tabela)
    import "./Models/usuarioModel.js"

    // importar as rotas 
    import usuarioRouter from './Routes/usuarioRoute.js'
    
    app.use(express.urlencoded({extended:true})) // trabalhar com imagens
    app.use(express.json())
    // utilizar a rota
    app.use('/usuarios', usuarioRouter)


   



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
