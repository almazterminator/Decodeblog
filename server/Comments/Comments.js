const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentsSchema = new mongoose.Schema({
    text: String,
    postId:{ type: Schema.Types.ObjectId, ref: 'post' },
    authorId: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment',CommentsSchema)