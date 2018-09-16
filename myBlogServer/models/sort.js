let mongoose = require('mongoose')
let Schema = mongoose.Schema

let sortsSchema = new Schema({
    "sortName" : String
})

module.exports = mongoose.model('Sorts', sortsSchema)

