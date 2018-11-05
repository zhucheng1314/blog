const express=require('express')
const app=express()

//设置采用的模板引擎名称
app.set('view engine','ejs')
app.set('views','./views')

app.use('/node_modules',express.static('./node_modules'))

app.get('/',(req,res)=>{
    res.render('index.ejs',{})
})


app.listen(80,()=>{
    console.log('http://127.0.0.1')
})