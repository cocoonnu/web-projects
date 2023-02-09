## 1、安装`mysql`

安装：`"D:\文档\Downloads\软件\MySQL for Windows"`

汉化：[汉化教程](https://blog.csdn.net/weixin_51647998/article/details/126009505?ops_request_misc=&request_id=&biz_id=102&utm_term=mysql%20workbench&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-3-126009505.142^v68^pc_new_rank,201^v4^add_ask,213^v2^t3_esquery_v2&spm=1018.2226.3001.4187)

root   admin123

创建数据库:

![image-20221222210708148](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221222210708148.png)

## 2、创建数据表 

![image-20221218111858700](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218111858700.png)



## 3、`sql`语言学习

`ppt`里面

![image-20221218171024411](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171024411.png)

![image-20221218171043841](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171043841.png)

![image-20221218171058407](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171058407.png)

![image-20221218171118352](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171118352.png)

![image-20221218171134002](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171134002.png)



![image-20221218171215950](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171215950.png)

![image-20221218171253917](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171253917.png)

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171331286.png" alt="image-20221218171331286" style="zoom:50%;" />



![image-20221218171407951](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171407951.png)

![image-20221218171427850](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171427850.png)



## 4、`mysql`模块

一般创建文件夹db，数据库模块写在里面 `db/db.js`

```js
// 导入 mysql 模块
const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'api_server',
})

// 向外共享 db 数据库连接对象
module.exports = db;

// 需要时引入
const db = require('../db/db');
```



### 4.1 初始化`mysql`模块

```js
// 首先下载
npm i mysql

// 导入mysql
const mysql = require('mysql');

// 与本地数据库建立连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})
```



### 4.2 `SELECT`

**results铁定为一个数组** 无论为0,1...个数据	

```js
// 查询 users 表中所有的数据

const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message)
  
  // results为一个数组
  console.log(results)
})

// 查询
```

![image-20221218170207477](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218170207477.png)



### 4.3 `INSERT INTO`

- user里面的 key 要和表里面的对应
- ？表示占位符

```js
// 插入数据的便捷方式

const user = { username: 'czx'};
const sqlStr = 'insert into users set ?';

// 执行 SQL 语句
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message);

  if (results.affectedRows === 1) {
    console.log('插入数据成功');

    // result 为一个结果对象
    console.log(results);
  }
})
```

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218171802257.png" alt="image-20221218171802257" style="zoom:50%;" />

自动添加id、status

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221218170825332.png" alt="image-20221218170825332" style="zoom:50%;" />



### 4.4  `UPDATE`

- 多个属性

```js
// 更新数据（多个属性）
const user = { id: 2020210832, username: 'cocoonnp',status: 1}; 

const sqlStr = 'update users set ? where id=?';

// 执行 SQL 语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)

  if (results.affectedRows === 1) {
    console.log('更新数据成功')
  }
})
```

- 标记删除（更新单个属性）

*通常不用 `detele`减少风险*

```js
// 标记删除（更新单个属性）
const sqlStr = 'update users set status=? where id=?';

db.query(sqlStr,[1,2020210833],function(err,results) {
    if (err) return console.log(err.message);

    if (results.affectedRows === 1) {
        console.log('标记删除成功');
    }
})
```



### 4.5 `DETELE`

```js
// 删除一行数据
const sqlStr = 'delete from users where id=?';

db.query(sqlStr, 2020210833, (err, results) => {
  if (err) return console.log(err.message)

  // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
  if (results.affectedRows === 1) {
    console.log('删除数据成功')
  }
})
```



### 4.6 注册案例

```js
exports.regUser = function(req,res) {
    const db = require('../db/db');

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
            // 加入数据库
            const user = { email: userInput.email, password: userInput.password};
            const sqlStr = 'insert into user set ?';

            db.query(sqlStr, user, (err, results) => {
                if (err) return console.log(err.message);

                if (results.affectedRows === 1) {
                    console.log('插入数据成功');

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
```



### 4.7 登录案例

```js
exports.login = function(req,res) {
    const db = require('../db/db');

    const sqlStr = 'select email,password from user where email=?';

    // req.body：输入的用户数据 users：数据库的用户数据
    let userInput = req.body;

    db.query(sqlStr, [userInput.email], function(err,users) {
        if (err) return console.log(err.message);

        if (users.length != 0) {
            if (users[0].password == userInput.password) {
                const data = {
                    statue: 1,
                    msg: `欢迎${userInput.email}`,
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
```

