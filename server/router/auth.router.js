const express = require("express")
const authcontrollers = require("../controllers/auth.controllers")

const api = express.Router()

api.post("/auth/register/", authcontrollers.register)
api.post("/auth/login", authcontrollers.login)
api.post("/auth/refresh_access_token", authcontrollers.refreshAccesstoken)

module.exports = api