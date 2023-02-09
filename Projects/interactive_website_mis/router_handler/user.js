exports.login = function(req,res) {

    const jwt = require('jsonwebtoken');
    const secretKey = 'jwtSecret';

    const db = require('../db/db');

    const bcrypt = require('bcryptjs');

    const sqlStr = 'select email,password from user where email=?';

    // req.body：输入的用户数据 users：数据库的用户数据
    let userInput = req.body;

    db.query(sqlStr, [userInput.email], function(err,users) {
        if (err) return console.log(err.message);

        if (users.length != 0) {

            // 拿着用户输入的密码,和数据库中存储的密码进行对比
            const compareResult = bcrypt.compareSync(userInput.password, users[0].password);

            if (compareResult) {
                // 登录成功 创建token

                const user = { ...users[0], password: '', image: '' }; // 获取属性

                var token = jwt.sign({user: user},secretKey,{ expiresIn: '24h' });

                const data = {
                    statue: 1,
                    msg: '登录成功',
                    token: token
                };
    
                res.send(data);       

            } else {
                const data = {
                    statue: 0,
                    msg: '密码不正确'
                };

                res.send(data);

            }

        } else {
            const data = {
                statue: 0,
                msg: '该邮箱未注册'
            };

            res.send(data);
        }
        
    })

}

exports.regUser = function(req,res) {
    const db = require('../db/db');

    const bcrypt = require('bcryptjs'); // 密码加密

    // 检测邮箱是否已注册
    const sqlStr = 'select email from user where email=?';

    // req.body：输入的用户数据 users：数据库的用户数据
    let userInput = req.body;

    db.query(sqlStr, [userInput.email], function(err,users) {
        if (err) return console.log(err.message);

        // 邮箱已存在
        if (users.length > 0) {
            const data = {
                statue: 0,
                msg: '此邮箱被已注册'
            };

            res.send(data);
   
        } else {
            // 加入数据库（密码加密）

            userInput.password = bcrypt.hashSync(userInput.password, 10);

            const user = { email: userInput.email, password: userInput.password};
            const sqlStr = 'insert into user set ?';

            db.query(sqlStr, user, (err, results) => {
                if (err) return console.log(err.message);

                if (results.affectedRows === 1) {
                    console.log('加入数据库成功');

                    const data = {
                        statue: 1,
                        msg: '注册成功'
                    };

                    res.send(data);
               }

            })
        }

    })
}


exports.index = function(req,res) {
    const jwt = require('jsonwebtoken');
    const secretKey = 'jwtSecret';

    // 判断是否已经登录（解析token）       
    jwt.verify(req.body.token, secretKey, function(err,decoded) {
        if (err) {

            console.log(err.message);
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

}