const conn = require('../db/db.js')
const moment=require('moment')
module.exports = {
    //用户进入添加文章页面逻辑
    articleaddget:(req,res)=>{
        //判断用户登录状态 , 处理登录拦截
        if (!req.session.isLogin)  return res.redirectf('/')
        res.render('./articles/add.ejs.',{
            user:req.session.user,
            isLogin:req.session.isLogin
        })
        
    },
    //用户登录后  写文章上传  逻辑
    articleaddpost:(req,res)=>{
        if(!req.session.isLogin) return res.status(400).send({status:400,mag:'登录已经超时,please seve text try again login'})
        const body=req.body
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        body.author_id = req.session.user.id
        const insert = 'insert into article set ?'
        conn.query(insert, body, (err, result) => {
        if (err) return res.status(500).send({ status: 500, msg: '发表失败,try again!' })
        res.send({ status: 200, msg: 'ok', articleId: result.insertId });
    })

    },
    articleinfoget:(req,res)=>{
        res.render('./articles/info.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }


}