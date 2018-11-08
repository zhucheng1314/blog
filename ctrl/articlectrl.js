const conn = require('../db/db.js')
const moment = require('moment')
const marked = require('marked')
module.exports = {
    //用户进入添加文章页面逻辑
    articleaddget: (req, res) => {
        //判断用户登录状态 , 处理登录拦截
        if (!req.session.isLogin) return res.redirect('/')
        res.render('./articles/add.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })

    },
    //用户登录后  写文章上传  逻辑
    articleaddpost: (req, res) => {
        if (!req.session.isLogin) return res.status(400).send({
            status: 400,
            mag: '登录已经超时,please seve text try again login'
        })
        const body = req.body
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        body.author_id = req.session.user.id
        const insert = 'insert into article set ?'
        conn.query(insert, body, (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: '发表失败,try again!'
            })
            res.send({
                status: 200,
                msg: 'ok',
                articleId: result.insertId
            });
        })

    },
    articleinfoget: (req, res) => {
        // req.query用于获取 ? 传递过来的参数
        // console.log(req.params) // req.params 用于获取 :id传递过来的参数
        const id = req.params.id
        const querySql = 'select * from article where id = ' + id
        conn.query(querySql, (err, result) => {
            // 封装渲染的对象, 登录用户信息和是否登录的记录
            const renderObj = {
                user: req.session.user, // 如果用户未登录 user 则不存在
                isLogin: req.session.isLogin
            }
            // 如果出现错误或者查不到文章 就返回404页面
            if (err || result.length !== 1) return res.render('./404.ejs', renderObj)
            // 如果找到文章就将文章转换为HTML标签
            result[0].content = marked(result[0].content)
            // 将文章对象加到renderObj中
            renderObj.article = result[0]
            // 渲染文章详情页面
            res.render('./articles/info.ejs', renderObj)

            // console.log(renderObj.article)

        })
    },

    articleeditget(req, res) {
        if (!req.session.isLogin) return res.redirect('/')
        // 查询数据库 根据ID获取文章信息
        const id = req.params.id
        const querySql = 'select * from article where id = ' + id
        conn.query(querySql, (err, result) => {
            if (err || result.length !== 1) return res.status(500).send({
                status: 500,
                msg: '文章获取失败, 请重试',
                data: null
            })
            console.log(result)
            res.render('./articles/edit.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0]
            })
        })
    },

    articleeditpost(req, res) {
        const article = req.body
        article.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(article)
        const updateSql = 'update article set ? where id = ?'
        conn.query(updateSql, [article, article.id], (err, result) => {
          if (err || result.affectedRows !== 1) return res.status(400).send({ status: 400, msg: '修改文章失败, 请重试!', data: null })
          // 修改成功, 像客户端响应结果
          res.send({status: 200, articleId: article.id});
        })
     }
}