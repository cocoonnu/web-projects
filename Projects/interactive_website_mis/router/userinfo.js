// 路由模块：存放客户端的请求与处理函数之间的映射关系
const express = require('express');
const userinfoRouter = express.Router();

// 导入路由处理函数模块
const userinfoHandler = require('../router_handler/userinfo');


// 响应
userinfoRouter.post('/getUserInfo', userinfoHandler.getUserInfo);
userinfoRouter.post('/updataUserInfo', userinfoHandler.updataUserInfo);


module.exports = userinfoRouter;