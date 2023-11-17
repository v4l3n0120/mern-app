const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const { API_VERSION } = require("./constants")
const app = express()

//importar rutas
const authRouter = require("./router/auth.router")
const userRouter = require("./router/user.router")
const menuRouter = require("./router/menu.router")
const courseRouter = require("./router/course.router")
const postRouter = require("./router/post.router")
const newsletterRouter = require("./router/newsletter.router")

//configurar body parse
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//configurar carpeta estaticos
app.use(express.static("uploads"))

//configurar header - http - CORS
app.use(cors())

//configurar rutas 
app.use(`/api/${API_VERSION}`, authRouter)
app.use(`/api/${API_VERSION}`, userRouter)
app.use(`/api/${API_VERSION}`, menuRouter)
app.use(`/api/${API_VERSION}`, courseRouter)
app.use(`/api/${API_VERSION}`, postRouter)
app.use(`/api/${API_VERSION}`, newsletterRouter)

module.exports = app
