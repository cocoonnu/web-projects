const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const jwt = require('jsonwebtoken'); // 生成token字符串
const secretKey = 'jwtSecret'; // 定义 secret 密钥


// 托管静态文件
app.use('/html', express.static('./html'));

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

app.use(function(req,res,next) {
    // 全局设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Method", '*');

    // 一定要调用next()
    next();
})


// 创建promise对象
let p = new Promise(function(resolve,reject) {
    const sqlStr = 'select username,password from users';

    db.query(sqlStr, (err, results) => {
        if (err) {
            reject(err.message);
        } else {
            resolve(results);
        }
    })
});

p.then(function(value) {
    var users = value;

    app.post('/index',function(req,res) {
        console.log(req.body);

        // 判断是否已经登录            
        jwt.verify(req.body.token, secretKey, function(err,decoded) {
            if (err) {
                const data = {
                    statue: 0,
                    msg: 'token无效',
                };

                res.send(data);

            } else {
                const data = {
                    statue: 1,
                    msg: 'token有效',
                    decoded: decoded
                };

                res.send(data);
            }
        })
    })

    app.get('/login',function(req,res) {
        let userInput = req.query;

        let flag = 0;
        for (let user of users) 
        {
            if (user.username == userInput.usernameInput && user.password == userInput.passwordInput) {

                // 生成token字符串
                var token = jwt.sign({
                    username: user.username,
                    statue: 1,
                },secretKey,{ expiresIn: '24h' })

                flag = 1;
                break;
            }
        }

        if (flag) {
            const data = {
                statue: 1,
                msg: '登录成功',
                token: token // 将token字符串响应给客户端
            };

            res.send(data);
        } else {
            const data = {
                statue: 0,
                msg: '登录失败'
            };

            res.send(data);
        }

    })


},function(reason) {
    console.log(reason);
})

app.listen(8000,function() {
    console.log('8000端口监听中...');
})