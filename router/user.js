const express=require('express')
const router=express.Router()//创建路由模块

const userctrl=require('../ctrl/userctrl.js')//导入

//路由注册页面 
router.get('/register',userctrl.registerget)


//路由登录页面  
router.get('/login',userctrl.loginget)



//路由注册页面  业务逻辑
router.post('/register',userctrl.registerpost)

//路由登录页面 业务逻辑
router.post('/login',userctrl.loginpost)




//暴露路由
module.exports=router