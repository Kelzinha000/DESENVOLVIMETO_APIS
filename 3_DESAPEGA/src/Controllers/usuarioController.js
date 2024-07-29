import conn from "../Config/conn.js";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid'

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
     response.send("CHEGOU AQUI");

    // CADASTRAR USUARIO 
    const id = uuidv4()
    const imagem = 'usuarioDefault.png'

    const insertSql = /*sql*/ `INSERT INTO usuarios 
    (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)
    `

    const insertData = ["usuario_id", "nome", "email", "telefone", "senha", "imagem", id, nome, email, telefone, senha, imagem]
    conn.query(insertSql, insertData, (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({err:"erro ao cadastrar usuario"})
            return
        }

        response.status(201).json({mesage:"Usuário cadastrado"})
    })
  });
};
