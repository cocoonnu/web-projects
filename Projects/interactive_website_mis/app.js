const express = require('express');

// 表单验证规则模块
const joi = require('joi');

const app = express();

// 解析表单
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 静态文件
app.use('/html', express.static('./html'));

// 全局中间件
app.use(function(req,res,next) {
    // 全局设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Method", '*');
    res.setHeader('Content-Type','text/html; charset=utf-8');

    // 一定要调用next()
    next();
})


// 导入路由模块
const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
// 实现路由模块
app.use(userRouter);
app.use(userinfoRouter);


// 创建错误中间件（写在所有路由之后）
app.use(function(err,req,res,next) {
    
    // 表单验证失败错误
    if (err instanceof joi.ValidationError) {
        console.log(err.message);
        res.send({statue: 0, msg: '请填写正确的邮箱或密码', errmsg: err.message});
    } else {

        console.log(err.message);
        res.send({statue: 0, msg: err.message});
    }
    
}) 

// 监听端口
app.listen(8000,function() {
    console.log("8000端口监听中...");
})