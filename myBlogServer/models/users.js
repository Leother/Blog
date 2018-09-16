let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UsersSchema = new Schema({
    "userName" : String,
    "userPwd" : String,
    "jurisdiction" : String,
    "nickName" : String,
    "date" : String,
    "author": String,
    "date" : String
})

module.exports = mongoose.model('Users', UsersSchema)

