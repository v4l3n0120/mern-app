const jwt = require("jsonwebtoken")

function asureAuth(req, res, next) {
if(!req.headers.authorization) {
    res.status(400).send({msg: "la peticion no tiene cabecera"})
    }
   const token =req.headers.authorization.replace("Bearer ", "")
   
   try {
    const payload = jwt.decode(token)
    const { exp } = payload
    const currentData = new Date().getTime()

   
    if(exp <= currentData){
        return res.status(400).send({msg: " el token a expirado"})
    }

    req.user = payload
    next()

   } catch (error) {
    return res.status(400).send({msg: "token invalido"})
   }

}

module.exports = {
    asureAuth
}