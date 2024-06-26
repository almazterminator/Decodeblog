const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    re_password: String,
    githubId: String
})

module.exports = mongoose.model('user',UserSchema)