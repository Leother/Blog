var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')
let Essays = require('./../models/essays')

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true } )

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success")
})

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail")
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.jade')
});

module.exports = router;
