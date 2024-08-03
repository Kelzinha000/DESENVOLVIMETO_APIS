import conn from "../Config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
//import { request, response } from "express";
//import { jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken"
//helpers
import getToken from "../helpers/get-token.js";
import createUserToken from "../helpers/create-user-token.js";
import getUserByToken from "../helpers/get-user-token.js";
export const register = (resquest, response) => {
  const { nome, email, telefone, senha, confirmesenha } = resquest.body;

  const checkEmailSQL = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
  const checkEmailData = ["email", email];
  conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Não foi pssivel buscar usuario" });
      return;
    }
    if (data.length > 0) {
      response.status(409).json({ err: "E-mail já está em uso" });
      return;
    }
    // criar senha do usuario
    // genSalt = gerar caracteres aleatorios
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);
    // console.log(salt);
    // console.log("senha recebida: ", senha);
    // console.log("senha criptografada: ", senhaHash);
    // response.send("CHEGOU AQUI");

    // CADASTRAR USUARIO
    const id = uuidv4();
    const imagem = "usuarioDefault.png";

    const insertSql = /*sql*/ `INSERT INTO usuarios 
    (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)
    `;

    const insertData = [
      "usuario_id",
      "nome",
      "email",
      "telefone",
      "senha",
      "imagem",
      id,
      nome,
      email,
      telefone,
      senha,
      imagem,
    ];
    conn.query(insertSql, insertData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "erro ao cadastrar usuario" });
        return;
      }
      const usuarioSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
      const usuarioData = ["usuario_id", id];
      conn.query(usuarioSql, usuarioData, async (err, data) => {
        if (err) {
          console.error(err);
          response.status(500).json({ err: "Erro ao selecionar usuário" });
          return;
        }
        const usuario = data[0];
        try {
          await createUserToken(usuario, request, response);
        } catch (error) {
          console.error(error);
        }
      });
      // usuario esteja logado na aplicação
      //createUserToken()
      //APAGOU response.status(201).json({ mesage: "Usuário cadastrado" });
    });
  });
};

//LOGIN
export const login = (request, response) => {
  // response.send("login") Verifica se a rotae esta funcionando

  const { email, senha } = request.body;
  // validações
  if (!email) {
    response.status(400).json({ err: "O email é obrigatório" });
  }
  if (!senha) {
    response.status(400).json({ err: "A senha é obrigatória" });
  }

  const checkSql = /*sql*/ `SELECT * FROM  usuarios WHERE ?? = ?`;
  const checkData = ["email", email];
  conn.query(checkSql, checkData, async (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao buscar usuario" });
      return;
    }

    if (data.length === 0) {
      response.status(404).json({ err: "Usuário não encontrado" });
      return;
    }
    const usuario = data[0];
    // verifica se a senha existe/comparar senha
    const compararSenha = await bcrypt.compare(senha, usuario.senha);
    // console.log("Senha do usuário", senha)
    // console.log("Senha do objeto", usuario.senha)
    // console.log("comparar senha", compararSenha)
    if (!compararSenha) {
      return response.status(401).json({ message: "Senha inválida" });
    }

    try {
      await createUserToken(usuario, request, response);
    } catch (error) {
      response.error(error);
      response.status(500).json({ err: "Erro ao processar informações" });
      return
    }
  });
};

// Verificar usuário
export const checkUser = (request, response) => {
  let usuarioAtual;

  // criar um helper para fazer a verificação
  if (request.headers.authorization) {
    const token = getToken(request);
    // console.log(token)

   const decoded = jwt.decoded(token,"SENHASUPERSEGURAEDIFICIL")
    // //console.log(decoded)

    const usuarioId = decoded.id;

    const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? =?`;
    const checkData = ["usuario_id", id];
    conn.query(checkSql, checkData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao verificar usuario" });
        return;
      }
      usuarioAtual = data[0]
      response.status(200).json(usuarioAtual)
    });
  } else {
    usuarioAtual = null
    response.status(200).json(usuarioAtual)
  
  }
};

// verificar ususario 
export const getUserById = (resquest, response)=>{
  const {id} = request.params

  const checkSql = /*sql*/`
  SELECT id, nome, email, telefone, imageM 
  FROM usuarios 
  WHERE ?? =?
  `

  const checkData = ["usuario_id", id]
  conn.query(checkSql,checkData, (err, data)=>{
    if(err){
      console.error(err)
      response.status(500).json({err:"erro ao bscar ususario"})
      return
    }

    if(data.length === 0){
      response.status(404).json({err:"Usuário não encontrado"})
      return
     } 

     const usuario = data[0]
     response.status(200).json(usuario)
  })
}

export const editUser = async (request, response)=>{
  const {id} = request.params

  //verificar se usuario estar logado 
  try{
    const token = getToken(request)
    //buscar dados no banco, nova consulta ao banco 
    const user = await getUserByToken(token)
    // console.log(user)
    const {nome, email, telefone} = request.body
    // adicionar imagem ao objeto 
    let imagem = user.imagem
    if(request.file){
      imagem = request.file.filename
    }


    if(!nome){
      return response.status(400).json({message :"O nome é obrigado"})
    }
    if(!email){
      return response.status(400).json({message :"O email é obrigado"})
    }
    if(!telefone){
      return response.status(400).json({message :"O telefone é obrigado"})
    }

    const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
    const checkData = ["usuario_id", id]
    conn.query(checkSql,checkData, (err,data)=>{
      if(err){
        response.status(500).json({err: "Erro ao buscar usuário"})
        return
      }
      if(data.length === 0 ){
        response.status(404).json({err:"Usuário não encontrado"})
      }
        // validação de usuario do banco é o mesmo token 
        // verifique se o email já está em uso                             != -> <>
        const checkEmailSql = /*sql*/ `SELECT* FROM usuarios WHERE ?? = ? AND ?? <> ?`
        const checkEmailData = ["email", email, "usuario_id", id]
        conn.query(checkEmailSql, checkEmailData, (err, data)=>{
          if(err){
            response.status(500).son({err:"Errp ap buscar email"})
            return
          }

          if(data.length > 0){
            response.status(409).json({err:"Email já estar em uso"})
            return
          }

          const updateSql = /*sql*/`UPDATE usuarios SET ? WHERE ?? = ? `
          const updateData = [{nome, email, telefone, imagem}, "usuarios_id", id]
          conn.query(updateSql, updateData, (err)=>{
            if(err){
              console.error(err)
              response.status(500).json({err: "Erro ao atualizar usuário"})
              return
            }
            response,statusbar(200).json({mesage:"usuario atualizado"})
          })
        })
      
      
  
    })
  }catch(error){
    console.error(error)
    response.
    status(error.status || 500).
    json({
      messgae: error.message || "Errro interno no servidor"
    })
  }
};