const mongoose = require("mongoose")
const mongoosepaginate = require("mongoose-paginate")

const PostSchema = mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path:{
        type: String,
        unique: true,
    },
    created_at: Date,
})

PostSchema.plugin(mongoosepaginate)

module.exports = mongoose.model("post", PostSchema)