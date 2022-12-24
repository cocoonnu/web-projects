// 路由模块：存放客户端的请求与处理函数之间的映射关系
const express = require('express');
const userRouter = express.Router();

// 导入路由处理函数模块
const userHandler = require('../router_handler/user');

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');

// 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user');

// 响应
userRouter.post('/login', expressJoi(reg_login_schema), userHandler.login);

userRouter.post('/regUser',userHandler.regUser);

userRouter.post('/index',userHandler.index);


module.exports = userRouter;