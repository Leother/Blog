var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')
let Sorts = require('./../models/sort')
let Users = require('./../models/users')
let Essay = require('./../models/essays')
var multer  = require('multer')
var upload = multer({ dest: './uploads' })
let fs = require('fs')
/* GET home page. */
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true } )

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success")
})

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail")
})


router.get('/', function(req, res, next) {
   let page = req.query.page || 1;

    /**
     * limit() 限制读取的条数
     *
     * skip() 忽略数据的条数
     */

    let limit = 2;
    let skip = (page - 1) * limit

    Essay.count().then((count)=>{

        Essay.find().limit(limit).skip(skip).sort({"_id": -1}).then((response)=>{

            res.json({
                status : '0',
                msg : '',
                result : {
                    list : response,
                    pages : count,
                    limit : limit
                }
            })

        })
    })
});
router.get('/reading', function (req,res,next) {
    Essay.find().sort({"scan" : -1}).limit(8).then((response)=>{
        res.json({
            status : '0',
            msg : '',
            result : {
                list : response
            }
        })
    })
})
router.get('/latest', function (req,res,next) {
    Essay.find().sort({"_id" : -1}).limit(8).then((response)=>{
        res.json({
            status : '0',
            msg : '',
            result : {
                list : response
            }
        })
    })
})
router.get('/users', function(req, res, next) {

    let page = req.query.page || 1;

    /**
     * limit() 限制读取的条数
     *
     * skip() 忽略数据的条数
     */
    let limit = 4;
    let skip = (page - 1) * limit

    Users.count().then((count)=>{
        Users.find().limit(limit).skip(skip).sort({"_id": -1}).then((response)=>{

            res.json({
                status : '0',
                msg : '',
                result : {
                    list : response,
                    pages : count,
                    limit : limit
                }
            })

        })
    })
});

router.get('/sort', function(req, res, next) {
    let page = req.query.page || 1;
    /**
     * limit() 限制读取的条数
     *
     * skip() 忽略数据的条数
     */
    let limit = 10;
    let skip = (page - 1) * limit
    Sorts.count().then((count)=>{
        Sorts.find().limit(limit).skip(skip).sort({"_id": -1}).then((response)=>{
            res.json({
                status : '0',
                msg : '',
                result : {
                    list : response,
                    pages : count,
                    limit : limit
                }
            })

        })
    })

});
router.get('/article', function(req, res, next) {
    let page = req.query.page || 1;
    /**
     * limit() 限制读取的条数
     *
     * skip() 忽略数据的条数
     */
    let limit = 4;
    let skip = (page - 1) * limit
        Essay.count().then((count)=>{
            Essay.find().limit(limit).skip(skip).sort({"_id": -1}).then((response)=>{
                res.json({
                    status : '0',
                    msg : '',
                    result : {
                        list : response,
                        pages : count,
                        limit : limit
                    }
                })

            })
        })
});

router.post('/login', function (req,res,next) {
    var param = {
        userName : req.body.userName,
        userPwd : req.body.userPwd
    }
    Users.findOne(param, function (err,doc) {
        if(err) {
            res.json({
                status : '1',
                msg : res.message
            })
        }else{
            if(doc){
                res.cookie('userId', doc.userName, {
                    path : '/',
                    maxAge : 1000*60*30
                })
                // req.session.user = doc;
                res.json({
                    status : '0',
                    msg : '',
                    result : {
                        nickName: doc.nickName
                    }
                })
            }else{
                res.json({
                    status : '2',
                    msg : '用户名或密码错误'

                })
            }
        }
    })
})

router.post('/logout', function (req,res,next) {
    res.cookie("userId", '', {
        path : '/',
        maxAge : -1
    })
    res.json({
        status : '0',
        msg: '',
        result : ''
    })
})
router.post('/addsort', function (req,res,next) {

    let param = {
        sortName : req.body.sortName,
    }
    Sorts.findOne(param, function (err,doc) {
        if(err) {
            res.json({
                status : '1',
                msg : err.message
            })
        }else{

            if(doc){
                res.json({
                    status : '2',
                    msg : '分类名称或分类ID已经存在'
                })
            }else{

                new Sorts({
                    sortId : req.body.sortId,
                    sortName : req.body.sortName,
                }).save().then((rs)=>{
                    res.json({
                        status : '0',
                        msg : '',
                        result : '保存成功'
                    })
                })

            }
        }
    })
})
router.post('/delsort', function (req,res,next) {
    var id = req.body._id;
    Sorts.remove({_id: id}, function (err,doc) {
        if(err){
            res.json({
                status : '1',
                msg : err.message
            })
        }else {
            res.json({
                status : '0',
                msg : '',
                result : '删除成功'
            })
        }
    })
})
router.post('/editsort', function (req,res,next) {
    let sortName = req.body.sortName;
    let newSortName = req.body.newSortName;
    Sorts.update({sortName : sortName}, {$set : {sortName : newSortName}}, function (err, doc) {
        if(err) {
            res.json({
                status : '1',
                msg : err.message
            })
        }else{
            res.json({
                status : '0',
                msg : '',
                result : '修改成功！'
            })
        }
    })
})

router.post('/addessays', function (req,res,next) {
        let params = {
            essaysTitle : req.body.essaysTitle,
            author : req.body.author,
            summary : req.body.summary,
            date : req.body.date,
            sort : req.body.sort,
            conent : req.body.conent,
            scan : req.body.scan,
            essaysImg : req.body.essaysImg
        }
        console.log(params)
        Essay.find({essaysTitle: req.body.essaysTitle}, function (err,doc) {
            if(err){
                res.json({
                    status : '1',
                    msg : err.message
                })
            }else{

                if(doc.length > 0){
                    res.json({
                        status : '2',
                        msg : '文章标题已经存在',
                        result : ''
                    })
                }else{
                    new Essay(params).save().then((rs)=>{
                        res.json({
                            status : '0',
                            msg : '',
                            result : '保存成功! '
                        })
                    })

                }
            }
        })
})

router.post('/editessay', function (req,res,next) {
    let param = {
        _id : req.body._id,
        essaysTitle : req.body.sortTitleValue,
        author : req.body.autherValue,
        summary : req.body.summaryValue,
        conent : req.body.contentValue,
        sort : req.body.typesValue,
        date : req.body.date
    }

    Essay.update({_id : req.body._id},{$set : {essaysTitle : req.body.sortTitleValue,author : req.body.autherValue,
            summary : req.body.summaryValue,
            conent : req.body.contentValue,
            sort : req.body.typesValue,
            date : req.body.date}} ,(err,doc)=>{

            if(err){
                res.json({
                    status : '1',
                    msg : err.message
                })
            }else{
                res.json({
                    status : '0',
                    msg : '',
                    result : '修改成功！'
                })
            }
    })
})
router.post('/delessay', function (req,res,next) {
    Essay.remove({_id: req.body._id}, (err,doc)=>{
        if(err){
            res.json({
                status : '1',
                msg : err.message
            })
        }else{
            res.json({
                status : '0',
                msg : '',
                result : '删除成功！'
            })
        }
    })
})

router.post('/delusers', function (req,res,next) {
    Users.remove({_id: req.body._id}, (err,doc)=>{
        if(err){
            res.json({
                status : '1',
                msg : err.message
            })
        }else{
            res.json({
                status : '0',
                msg : '',
                result : '删除成功！'
            })
        }
    })
})
//详情页
router.get('/details', function (req,res,next) {
    let id = req.query._id;
    Essay.findOne({_id:id}, function (err,doc) {
        if(err){
            res.json({
                status : '1',
                msg : err.message
            })
        }else{

            res.json({
                status : '0',
                msg : '',
                result : {
                    content : doc
                }
            })

        }
    })
})

//浏览量
router.get('/detailscan', function (req,res,next) {
    let id = req.query._id;
    let scan = req.query.scan
    console.log(id,scan)
    Essay.update({_id:id},{$set:{"scan": scan }}, function (err,doc) {
        if(err){
            res.json({
                status : '1',
                msg : err.message
            })
        }else{
            res.json({
                status : '0',
                msg : '',
                result : "修改成功"
            })

        }
    })
})
//判断是否为超级管理员
router.get('/isgetadmin', function (req,res,next) {
    let users = req.query.users;
    Users.findOne({userName: users}).then((response)=>{
        if(response.jurisdiction == '0'){
            res.json({
                status : '0',
                msg : '',
                result : '删除成功！'
            })
        }else{
            res.json({
                status : '1',
                msg : '',
                result : '删除失败，只有超级管理员才可以进行删除操作！'
            })
        }
    })
})

//文件上传
router.post('/fileupload',upload.single('file') , function (req,res,next) {


    var tmp_path = req.file.path;
    console.log(req.file)
    // 指定文件上传后的目录 - 示例为"images"目录。
    var target_path = './public/images/' + req.file.originalname;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件,
        fs.unlink(tmp_path, function () {
            if (err) throw err;
        });
        res.json({
            status : '0',
            msg : '',
            result : {
                name : req.file.originalname,
                originalname : req.file.originalname
            }
        })
    })


})
module.exports = router;
