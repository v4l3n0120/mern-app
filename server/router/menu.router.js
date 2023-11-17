const express = require("express")
const MenuControllers = require("../controllers/menu.controllers")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.post("/menu", [md_auth.asureAuth], MenuControllers.createMenu)
api.get("/menu", MenuControllers.getMenus)
api.patch("/menu/:id", [md_auth.asureAuth], MenuControllers.updateMenu)
api.delete("/menu/:id", [md_auth.asureAuth], MenuControllers.deleteMenu)


module.exports = api 