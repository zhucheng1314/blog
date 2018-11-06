const express=require('express')

const articlectrl=require('../ctrl/articlectrl.js')//导入
const router=express.Router()//创建路由模块

//路由添加文章页面 
router.get('/article/add',articlectrl.articleaddget)
router.post('/article/add',articlectrl.articleaddpost)
//路由添加成功后跳转的页面
router.get('/article/info/:id',articlectrl.articleinfoget)


//暴露路由
module.exports=router