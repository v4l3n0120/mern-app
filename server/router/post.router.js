const express = require("express")
const multiparty = require("connect-multiparty")
const PostControllers = require("../controllers/post.controllers")
const md_auth = require("../middlewares/authenticated")

const md_upload = multiparty({ uploadDir: "./uploads/blog"})
const api = express.Router()

//rutas ...
api.post("/post", [md_auth.asureAuth, md_upload], PostControllers.createPost)
api.get("/post", PostControllers.getPosts)
api.patch("/post/:id", [md_auth.asureAuth, md_upload], PostControllers.updatePost)
api.delete("/post/:id", [md_auth.asureAuth], PostControllers.deletePost)
api.get("/post/:path", PostControllers.getPost)

module.exports = api