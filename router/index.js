const express=require('express')
const router=express.Router()
const conn =require('../db/db.js')


router.get('/',(req,res)=>{
    let pageSize = 5

    let currentPage = parseInt(req.query.page) || 1


    const querySql = `select a.id, a.title, a.ctime, u.nickname, u.username from article as a
    left join blog as u
    on a.author_id = u.id
    order by a.id desc
    limit ${(currentPage - 1) * pageSize}, ${pageSize};
    select count(*) as count from article;`

    conn.query(querySql, (err, result) => {
      console.log(result)
      // 判断是否出错, 如果出错了 result是undefined  所以就直接赋值为空数组避免模板引擎出错
      if (!result) result = [[]] // 如果result查询到结果了  就不会进入if 不会覆盖结果
      // 总文章数量
      let totalCount = result[1][0].count

      // 根据总文章数量和每页显示的条数  计算出总的页数
      let totalPage = Math.ceil(totalCount / pageSize)
      console.log(currentPage)
      res.render('./index.ejs', {
        user: req.session.user,
        isLogin: req.session.isLogin,
        articles: result[0],
        totalPage: totalPage,
        currentPage: currentPage
      })
    })













})

module.exports=router