import multer from "multer"
import { request } from "node:http"
import path from "node:path"
import {fileURLToPath} from "node:url"
import { createBrotliCompress } from "node:zlib"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// função para falar aonde irei guardar as imgens 
const imageStore = multer.diskStorage({
    destination:()=>{
        let folter = ""

        if(request.baseUrl.includes("usuarios")){
            folter = "usuarios";
        }else if(request.baseUrl.includes("objetos")){
           let folter = "objetos";
        }
        createBrotliCompress(null,path.join(__dirname, `../public/${folter}`));
    }, filename:(request, file, cb)=>{
        cb(
            null, 
            Date.now() +
                String(Math.floor(Math.randow() * 100000 )) +
                path.extname(file.originalname)
                )
    }
  
}) 

const imageUpload = multer({
    storage:imageStore, 
    fileFilter(request, file, cb){
        if(!file.originalname.match(/\.(png||jpg)$/)){
            return cb(new Error("Por favor, envie apenas jpg ou png!"));
        }
           cb(null, true) 
    }

})


export default imageUpload; 