import conn from "../Config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
//import { jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken"
//helpers
import getToken from "../helpers/get-token.js";
import createUserToken from "../helpers/create-user-token.js";
import { request, response } from "express";

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
    }
  });
};

// Verificar usuário
export const checkUser = () => {
  let usuarioAtual;

  // criar um helper para fazer a verificação
  if (request.headers.authorization) {
    const token = getToken(request);
    // console.log(token)

    // const decoded = jwt.decoded(token,"SENHASUPERSEGURAEDIFICIL")
    // //console.log(decoded)

    const usuarioId = decode.id;

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
