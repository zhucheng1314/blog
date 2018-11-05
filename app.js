const express=require('express')
const app=express()
const bodyparser=require('body-parser')


//导入首页路由模块
const indexrouter=require('./router/index.js')
//导入用户功能路由模块
const userrouter=require('./router/user.js')

//设置采用的模板引擎名称
app.set('view engine','ejs')
app.set('views','./views')


//注册解析表单的数据的中间件
app.use(bodyparser.urlencoded({extended:false}))


//给node_modules挂载虚拟路径
app.use('/node_modules',express.static('./node_modules'))

//挂载首页路由模块
app.use(indexrouter)


//挂载用户功能模块
app.use(userrouter)



app.listen(80,()=>{
    console.log('http://127.0.0.1')
})