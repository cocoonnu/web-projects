- 网址：http://127.0.0.1:8000/

- 服务器重启需要重新登录

- 服务器打开的网址不能访问本地的文件
报错：Not allowed to load local resource
```js
location.href = './index.html';  // 不推荐用
location.href = "D:/.../session/html/index.html";  // 直接无法访问
location.href = 'http://127.0.0.1:8000/html/index.html'; // 可用

<img src="./Power.jpg" alt="">  // 不可用
<img src="http://127.0.0.1:8000/html/Power.jpg" alt=""> // 可用
```

- html 中 __dirname is not defined

- 查询数据库用了异步
因为要等获取到数据库的用户数组才能进行下一步，所以想到了异步
```js
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
    // users为用户数组
    var users = value;

    // 配置路由接口...

},function(reason) {
    console.log(reason);
})
```