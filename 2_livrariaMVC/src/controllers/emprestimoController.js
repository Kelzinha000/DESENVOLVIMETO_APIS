import conn from '../config/conn.js'

export const getLivros =  (request, response)=>{
    const sql = /*sql*/`SELECT * FROM emprestimos `;
    conn.query(sql,(err,data)=>{
        if(err){
            response.status(500).json({message:"Erro ao buscar emprestimos"})
            return
        }
        const emprestimos = data 
        response.status(200).json(emprestimos); 
    });
}
