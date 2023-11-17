const Post = require("../models/post.model")
const image = require("../utils/image")

function createPost(req, res) {
    const post = new Post(req.body)
    post.created_at = new Date()

    const imagePath = image.getFilepath(req.files.miniature)
    post.miniature = imagePath

    post.save((error, postStored) => {
        if(error) {
            res.status(400).send({msg: " error al crear el post"})
        } else {
            res.status(201).send(postStored)
        }
    })
}


function getPosts(req, res) {
    const { page = 1, limit = 10 } = req.query

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { create_at: "desc"}
    }

    Post.paginate({}, options, (error, pastsStored) => {
        if(error) {
            res.status(400).send({msg: "error al obtener los post"})
        } else {
            res.status(200).send(pastsStored)
        }
    })
}

function updatePost (req, res) {
    const { id } = req.params
    const postData = req.body

    if(req.files.miniature) {
        const imagePath = image.getFilepath(req.files.miniature)
        postData.miniature = imagePath
    }

    Post.findByIdAndUpdate({ _id: id}, postData, (error) => {
        if(error) {
            res.status(400).send({msg: "error al actualizar el post"})
        } else {
            res.status(200).send({msg: "actualizacion correcta"})
        }
    })
}


function deletePost (req, res) {
    const { id } = req.params

    Post.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({msg: "error al eliminar el post"})
        } else {
            res.status(200).send({msg: "post elimidado"})
        }
    })
}

function getPost(req, res) {
    const { path } = req.params

    Post.findOne({ path }, (error, postsStored) => {
        if (error) {
            res.status(500).send({msg: "error del servidor"})
        } else if (!postsStored) {
            res.status(400).send({msg: "no se ha encontrado ningun post"})
        } else {
            res.status(400).send(postsStored)
        }
    })
}
module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
}