exports.getUserInfo = function(req,res) {

    const db = require('../db/db');

    const sqlStr = 'select * from user where email=?';


    db.query(sqlStr, [req.body.email], function(err,users) {
        if (err) return console.log(err.message);

        if (users.length != 0) {

            const data = {
                statue: 1,
                msg: '获取用户信息成功',
                userinfo: users[0]
            };

            res.send(data);       

        } else {
            const data = {
                statue: 0,
                msg: '获取用户信息失败'
            };

            res.send(data);
        }
        
    })

}


exports.updataUserInfo = function(req,res) {
    const db = require('../db/db');

    if (req.body.newPassword) {

        // 新密码加密
        const bcrypt = require('bcryptjs');
        req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10);

        // 更新用户信息
        const user = { 
            username: req.body.username, 
            password: req.body.newPassword,
            image: req.body.image
        }; 

        const sqlStr = 'update user set ? where email=?';

        db.query(sqlStr, [user, req.body.email], (err, results) => {
            if (err) return console.log(err.message)

            if (results.affectedRows === 1) {
                const data = {
                    statue: 1,
                    msg: '更新用户信息成功'
                };

                res.send(data);   
            }  else {
                const data = {
                    statue: 0,
                    msg: '更新用户信息失败'
                };

                res.send(data);
            }
        })

    } else {

        // 不更新密码
        const user = { username: req.body.username, image: req.body.image }; 
        const sqlStr = 'update user set ? where email=?';

        db.query(sqlStr, [user, req.body.email], (err, results) => {
            if (err) return console.log(err.message)

            if (results.affectedRows === 1) {
                const data = {
                    statue: 1,
                    msg: '更新用户信息成功'
                };

                res.send(data);   
            }  else {
                const data = {
                    statue: 0,
                    msg: '更新用户信息失败'
                };

                res.send(data);
            }
        })

    }

}