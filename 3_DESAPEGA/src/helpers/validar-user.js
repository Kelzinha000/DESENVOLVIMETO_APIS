    const validarUsuario =(request, response, next)=>{
        const {nome, email, telefone, senha, confirmesenha} = request.body

        if(!nome){
            response.status(400).json({message:"O nome é obrigatório"})
            return
        }
        if(!email){
            response.status(400).json({message:"O email é obrigatório"})
        }
        if(!telefone){
            response.status(400).json({message:"O telefone é obrigatório"})
        }
        if(!senha){
            response.status(400).json({message:"O senha é obrigatório"})
        }
        if(!confirmesenha){
            response.status(400).json({message:"O confirme senha é obrigatório"})
        }
        if(!email.includes('@')){
            response.status(409).json({message:"Deve conter @ do email"})
        }
        if(senha !== confirmesenha){
            response
            .status(409)
            .json({message:"A confimação de senha deve ser iguais"})
        }
        next()
    }
    export default validarUsuario; 