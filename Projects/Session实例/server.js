const express = require('express');
const mysql = require('mysql');
const session = require('express-session');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// 托管静态文件
app.use('/html', express.static('./html'));

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

let maxAge = 30 * 24 * 60 * 60;
app.use(session({
    secret: 'cocoon',
    name: 'sessionID',
    cookie: { maxAge: maxAge },
    resave: false,
    saveUninitialized: true,
  })
)

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

    app.get('/',function(req,res) {
        console.log(req.session);
        // 判断是否已经登录
        if (!req.session.isLogin) {
            // 里面只能放本地文件地址
            res.sendFile(__dirname + '/html/login.html');
        } else {
            res.sendFile(__dirname + '/html/index.html');
        }

    })

    app.get('/login',function(req,res) {
        let userInput = req.query;

        let flag = 0;
        for (let user of users) 
        {
            if (user.username == userInput.usernameInput && user.password == userInput.passwordInput) {

                req.session.isLogin = 1;
                flag = 1;
                break;
            }
        }

        if (flag) {
            const data = {
                statue: 1,
                msg: '登录成功'
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

    app.get('/signout',function(req,res) {
        req.session.destroy();

        const data = {
            statue: 1,
            msg: '退出登录成功'
        };

        res.send(data);     
    })


},function(reason) {
    console.log(reason);
})

app.listen(8000,function() {
    console.log('8000端口监听中...');
})