const conn = require('../db/db.js')
const moment=require('moment')

module.exports = {
    //进入注册首页  
    registerget: (req, res) => {
        res.render('./user/register.ejs', {}) //调用ejs模板渲染页面
    },
    //进入登录页面  
    loginget: (req, res) => {
        res.render('./user/login.ejs', {}) //调用ejs模板渲染页面
    },

    //注册页面  逻辑
    registerpost: (req, res) => {
        //获取客户端提交过来的 用户表单信息
        const user = req.body

        //判断客户端提交过来的 数据是否合法  不合法就返回提示信息
        if (user.username.trim().length === 0 || user.password.trim().length === 0 || user.nickname.trim().length === 0){
            return res.status(400).send({status:400,msg:'请填写完整的信息!'})
        }

        //查询用户名是否可用 (是否重复)
        const querySql='select count(*) as count from blog where username=?'
        conn.query(querySql,user.username,(err,result)=>{
            //如果查询失败 则有err提示
            if(err){
                return res.status(500).send({status:500,msg:'用户查询失败 try again!'})
            }
            //如果查询成功但是用户名重复  result是一个数组
            if(result[0].count!=0){
                return res.status(402).send({status:402,msg:'用户名已存在'})
            }
            //添加创建时间
            user.ctime=moment().format('YYYY-MM-DD HH:mm:ss')

            //如果查询用户名可用 可继续往下执行 将用户的数据添加到数据库
            const addSql='insert into blog set ?'
            conn.query(addSql,user,(err,result)=>{
                //如果添加失败
                if(err || result.affectedRows !=1) return res.status(500).send({status:500,msg:'用户添加失败!try again'})
                //添加成功继续执行
                res.send({status:200,msg:'注册成功!'})
            })
        })


    },

    //登录页面  逻辑
    loginpost:(req,res)=>{
        //获取客户端提交过来的数据
        const user=req.body
        //执行sql语句  查询用户是否存在   密码是否正确
        const querySql='select * from blog where username=? and password=?'
        conn.query(querySql,[user.username,user.password],(err,result)=>{
           //若登录失败
            if(err) {
                return res.status(500).send({status:500,msg:'登录失败!try again!'})
            }
            //若密码错误
            if(result.length===0){
                return res.status(400).send({status:400,msg:'用户名或密码错误!try again!'})
            }
            res.send({status:200,msg:'恭喜  登录成功'})
        })
    }




}

































