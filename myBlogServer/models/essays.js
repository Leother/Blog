let mongoose = require('mongoose')
let Schema = mongoose.Schema

let essaysSchema = new Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        //引用
        ref : 'Sorts'
    },
    "essaysTitle" : String,
    "essaysImg" : String,
    "summary" : String,
    "author": String,
    "date" : Number,
    "scan" : Number,
    "sort" : String,
    "conent" : String
})

module.exports = mongoose.model('Essays', essaysSchema)

