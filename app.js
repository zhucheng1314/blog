const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const fs=require('fs')
const path=require('path')
const session=require('express-session')



//设置采用的模板引擎名称
app.set('view engine','ejs')
app.set('views','./views')


//注册解析表单的数据的中间件
app.use(bodyparser.urlencoded({extended:false}))

//注册session中间件
app.use(session({
    secret:'cheng',
    resave:false,
    saveUninitialized:false
}))

//给node_modules挂载虚拟路径
app.use('/node_modules',express.static('./node_modules'))




// //导入首页路由模块
// const indexrouter=require('./router/index.js')
// //导入用户功能路由模块
// const userrouter=require('./router/user.js')
// //挂载首页路由模块
// app.use(indexrouter)
// //挂载用户功能模块
// app.use(userrouter)
//读取文件目录  返回文件名 循环注册路由
fs.readdir('./router',(err,result)=>{
    if (err) return console.log('读取文件失败!')
    result.forEach(item=>{
        const router=require(path.join(__dirname,'./router/',item))
        app.use(router)
    })
})



app.listen(80,()=>{
    console.log('http://127.0.0.1')
})