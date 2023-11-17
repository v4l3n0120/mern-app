const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const jwt = require("../utils/jwt")

function register(req,res){

    const { firstname, lastname, email, password} = req.body

    if (!email) res.status(400).send({msg: "El email es obligatorio"})
    if (!password) res.status(400).send({msg: "La contraseña es obligatorio"})

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "User",
        active: false
    })
    
    const salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password, salt)

    user.password = hashpassword
    user.save((error, userStorage) =>{
        if (error){
            res.status(400).send({msg: "Error al crear el usuario"})
        }else{
            res.status(200).send(userStorage)
        }
    })   
}


function login(req,res){
    const{ email, password } = req.body
    if (!email) res.status(400).send({msg: "El email es obligatorio"})
    if (!password) res.status(400).send({msg: "La contraseña es obligatorio"})

    const emailLowerCase = email.toLowerCase()
    User.findOne({ email: emailLowerCase}, (error, userStore) => {
        if (error){
            res.status(500).send({msg: "error del server"})
        } else {
            bcrypt.compare( password, userStore.password, (bcryptError, check) => {
                if(bcryptError) {
                    res.status(500).send({msg: "error del sever"})
                } else if (!check) {
                    res.status(400).send({msg: "usuario o contraseña incorrecta "})
                } else if (!userStore.active) {
                    res.status(401).send({msg: "usuario no actualizado o no activo"})
                }else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore) 
                    })
                }
            })
             
            //res.status(200).send(userStore)
        }
    })
}

function refreshAccesstoken (req, res) {
    const { token } = req.body

    if(!token) res.status(400).send({msg: "Error al token requerido "})

    const { user_id } = jwt.decoded(token)

    User.findOne({ _id: user_id}, (error,  userStorage) => {
        if (error) {
            res.status(500).send({msg: " Error del servidor "})
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage)
            })
        }
    })
}


module.exports ={
    register,
    login,
    refreshAccesstoken
};