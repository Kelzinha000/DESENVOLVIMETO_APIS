    import conn from "../Config/conn.js";
    import { v4 as uuidv4 } from "uuid";
    import getToken from "../helpers/get-token.js";
    // import getUserByToken from "../helpers/get-user-token.js";
    import getUserByToken from "./usuarioController.js";
import { request, response } from "express";

    export const create = async (request, response) => {
    const { nome, peso, cor, descricao } = request.body;
    const disponivel = 1;

    // nuscar o token do usuário cadastrado
    const token = getToken(request);
    const user = await getUserByToken(token);

    if (!nome) {
        response.status(400).json("O nome do objeto é obrigatório");
        return;
    }
    if (!peso) {
        response.status(400).json("O peso do objeto é obrigatório");
        return;
    }
    if (!cor) {
        response.status(400).json("O cor do objeto é obrigatório");
        return;
    }
    if (!descricao) {
        response.status(400).json("O escricao do objeto é obrigatório");
        return;
    }

    // crar o objeto
    const objeto_id = uuidv4();
    const usuario_id = user.usuario_id;
    const insertSql = /*sql*/ `INSERT INTO objetos
        (??,??, ??, ??,??,??,??) 
        VALUES (?,?, ?,?,?,?,?)`;

    const insertData = [
        "objeto_id",
        " nome",
        "peso",
        "cor",
        "descricao",
        "disponivel",
        objeto_id,
        nome,
        peso,
        cor,
        descricao,
        disponivel,
        usuario_id,
    ];

    conn.query(insertSql, insertData, (err, data) => {
        if (err) {
        response.status(500).json({ err: "Erro o cadastrar usuario" });
        return;
        }
        if (request.files) {
        // cadastrar no banco
        const insertImagemSql = /*sql*/ `INSERT INTO Objeto_Imagens
        (image_id, objeto_id, image_path) VALUES ?`;
        const imageValues = request.files.map((file) => [
            uuidv4(),
            objeto_id,
            file.filename,
        ]);
        conn.query(insertImagemSql, [imageValues], (err) => {
            if (err) {
            console.error(err);
            response
                .status(500)
                .json({ err: "Errro ao salver imagens do objeto" });
            return;
            }
            response.status(201).json("Objeto cadastrado com sucesso!");
        });
        } else {
        response.status(201).json("Objeto cadastrado com sucesso!");
        }
    });
    };


    export const getAllObjectUser = async (request, response)=>{
        try{
           const token = getToken(resquest)
           const user = await getUserByToken(token)

           const usuarioId = user.usuario_id
           const selectSql = /*sql*/ `
           SELECT 
            obj.objeto_id,
            obj.usuario_id,
            obj.nome,
            obj.peso,
            obj.cor,
            obj.descricao,
            obj_img.image_path,
            -- GROUP_CONCAT(obj_img.image_path SEPARATOR ',') AS image_path
            FROM 
                objetos AS obj
           LEFT JOIN 
                objeto_image AS obj_img ON obj.objeto_id = obj_img.objeto_id
           WHERE 
                obj.usuario_id = ? 
                GROUP BY 
                obj.objeto_id, obj.usuario_id, obj.nome, obj.peso, obj.cor, obj.descricao
           `

           conn.query(selectSql, [usuarioId], (err, data)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({err:"Erro ao buscar objeto"})
                    return
                }
                const objetoUsuario = data.map((objeto)=>{
                objeto_id: objeto.objeto_id;
                usuario_id: objeto.usuario_id; 
                nome: objeto.nome; 
                peso: objeto.peso;
                cor: objeto.cor; 
                descricao: objeto.descricao; 
                image_paths: objeto.image.image_path.split(',')



                })
                // const objetoUsuario = datarespose
                 response.status(200).json(objetoUsuario)
           })
        }catch(error){
        response.status(500).json({err:"Error ao processar a requisição"})
        }

        // buscar um objeto pelo id
    }