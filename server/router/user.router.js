const express = require("express")
const multiparty =require("connect-multiparty")
const UserControllers = require("../controllers/user.controllers")
const md_auth = require("../middlewares/authenticated")

const md_upload = multiparty({ uploadDir: "./uploads/avatar" })
const api = express.Router()

api.get("/user/Me", [md_auth.asureAuth], UserControllers.getMe)
api.get("/users", [md_auth.asureAuth], UserControllers.getUsers)
api.post("/user", [md_auth.asureAuth, md_upload], UserControllers.createUser)
api.patch("/user/:id", [md_auth.asureAuth, md_upload], UserControllers.updateUser)
api.delete("/user/:id", [md_auth.asureAuth,], UserControllers.deleteUser)

module.exports = api