const getToken = (request)=>{
const autHeader = request.headers.authorization
const token = autHeader.split("")[1]

return token
}; 
export default getToken; 