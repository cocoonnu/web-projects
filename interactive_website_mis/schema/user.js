// 表单验证规则模块
const joi = require('joi');

const email = joi
    .string()
    .pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/)
    .required();

const password = joi
    .string()
    .pattern(/^[\w]{6,16}$/)
    .required();


// 导出验证规则（当前针对req.body  err在全局中间件  body中的属性必须和请求中的一致）

// 注册和登录表单的验证规则
exports.reg_login_schema = {
    body: {email, password}

    // 也可以对 req.parms 中的数据进行验证
}