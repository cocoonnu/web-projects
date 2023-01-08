# AJAX的学习笔记(Node.js环境)
AJAX学习的笔记，主要环境为Node.js

课程地址：   https://www.bilibili.com/video/BV1WC4y1b78y

## 第一章： 原生Ajax

### 1.1 Ajax简介

- Ajax全称为Asynchronous Javascript And XML，即异步JS和XML
- 通过Ajax可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**
- AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式

### 1.2 http报文

- **请求报文**

```
行	请求类型:GET/POST     路径URL（带参数）  /s？ie=utf-8   协议版本HTTP/1.1
头  HOST: blog.sliber.cn
    Cookie: name=LMK
	Content-type: application/x-www-form-urlencoded
	Uer-Agent: chrom 83    
空行
体   username=admin&password=admin
```

- **响应报文**

```
  行	协议版本：HTTP/1.1    响应状态码200   响应字符串OK
  头	Content-Type: text/html;charset=utf-8
  	 Content-length: 2048
  	 Content-encoding: gzip
  
  空行
  体    <html>
  		<head>
  		</head>
  		<body>
  			<h1>ajax学习</h1>
  		</body>
  	  </html>
```

第一个为请求行 即url参数

第二个为请求体 post独有

请求头在标头里面

![image-20221207185054651](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221207185054651.png)



### 1.3 AJAX 的使用

1、AJAX的优点

1. 可以无刷新页面与服务端进行通信
2. 允许你根据用户事件来更新部分页面内容

2、AJAX 的缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题（同源）
3. SEO不友好（爬虫获取不到信息）


#### 1.3.1 GET请求

```js
btn.addEventListener('click',function() {

    // 1. 创建AJAX对象
    const xhr = new XMLHttpRequest();

    // 2. 设置请求方法和服务端url
    xhr.open('GET','http://127.0.0.1:8000/sever') // 本地的sever.js

    // 3. 发送
    xhr.send();

    // 4. 事件绑定（处理服务端返回的结果）
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) 
        {
            if (xhr.status >= 200 && xhr.status < 300) 
            {
                // 1. 响应行
                console.log(xhr.status); // 状态码
                console.log(xhr.statusText); // 状态字符串

                //2. 响应头
                console.log(xhr.getAllResponseHeaders());

                //3. 响应体
                console.log(xhr.response)
            }
        }
    }

})
```



解析：

```
1、readystate： 是XHR对象中的一个属性，表示状态：
0（未初始化） 
1（open方法调用完毕） 
2（send方法调用完毕） 
3（服务端返回部分结果）
4（服务端返回所有结果）  
5、xhr.readyState == 4 当服务端返回了所有的结果才处理数据

2、xhr.status响应状态码：200 404 403 401 500 (xhr.status >= 200 && xhr.status < 300)

3、xhr.response：响应体
```

给服务端发送参数：  `xhr.open('GET','http://127.0.0.1:8000/server?a=10&b=9');`

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221206150219304.png" alt="image-20221206150219304" style="zoom:50%;" />

#### 1.3.2 POST请求

```js
// 1. 创建AJAX对象
const xhr = new XMLHttpRequest();

// 2. 设置请求方法和服务端url
xhr.open('POST','http://127.0.0.1:8000/sever') // 本地的sever.js

// 3. 发送
xhr.send('a=111'); // 可在此发送参数

// 4. 事件绑定（处理服务端返回的结果）
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4)    
    {
        if (xhr.status >= 200 && xhr.status < 300) 
        {
            console.log(xhr.response); // 响应体
        }
    }
}
```

给服务端发送参数：可以在open 也可以在send中发送



#### 1.3.3 请求头信息

```js
// 设置请求头信息：一般作为身份效验用！

// 设置预定义变量
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

// 设置自定义变量
xhr.setRequestHeader('name','cocoon');
```



#### 1.3.4 超时与网络异常

```js
btn.addEventListener('click', function () {
    const xhr = new XMLHttpRequest();
    
    //超时设置 2s 设置(2s内服务端不响应，就取消请求)
    xhr.timeout = 2000;
    //超时回调
    xhr.ontimeout = function () {
        alert('网络异常，请稍后重试!!');

    }
    
    //网络异常回调
    xhr.onerror = function () {
        alert('你的网络似乎出了一些问题！');

    }
    xhr.open('GET', 'http://127.0.0.1:8000/delay');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                result.innerHTML = xhr.response;
            }
        }
    }
})
```



#### 1.3.5 处理重复请求问题

先设置服务端：

```js
app.get('/delay',(request,response) => {
   
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    // 设置响应头 支持自定义请求头变量信息
    response.setHeader('Access-Control-Allow-Headers', '*')

    // 延时发送响应体
    setTimeout(function(){
        response.send("delay");
    },3000)
})
```

请求端：

```js
let xhr = null;
let isSending = false;  // 标识符

const btn = document.querySelector('button');
btn.addEventListener('click',function() {
    // 首先判断 如果该请求正在发送则取消
    if (isSending) xhr.abort();

    // 1. 创建新的AJAX对象
    xhr = new XMLHttpRequest();
    isSending = true;

    // 2. 设置请求方法和服务端url
    xhr.open('GET','http://127.0.0.1:8000/delay');

    // 3. 发送
    xhr.send();

    // 4. 事件绑定（处理服务端返回的结果）
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) 
        {
            // 请求发送完毕 则改为false
            isSending = false;

            if (xhr.status >= 200 && xhr.status < 300) 
            {
                console.log(xhr.response);
            }
        }
    }

})
```





## 第二章 http服务端  express

### 2.1 服务端编写

- 常用的响应头：

  ```js
  //设置响应头 设置允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应头 支持自定义请求头变量信息
  res.setHeader('Access-Control-Allow-Headers', '*');
  // 设置响应头 防止响应体中文乱码
  res.setHeader('Content-Type','text/html; charset=utf-8');
  ```

  

*http在前面有，主要看http报文的内容*

*利用express框架*

作用是为AJAX做出响应     服务端url：http://127.0.0.1:8000

1、现在文件夹下初始化node.js ：`npm init --yes`

2、在文件夹下安装express：`npm i express`

3、在文件夹下创建server.js

- 创建路由规则
- 分配URL响应

```js
// 1、引入express
const { response } = require('express');
const express = require('express');

// 2、创建应用对象
const app = express();

// 3、创建路由规则  request 是对请求报文的封装  response 是对响应报文的封装

// 分配不同url响应 url：http://127.0.0.1:8000/ajax
app.get('/ajax',(request,response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    // 设置响应体
    response.send("HELLO AJAX - 1");
})

app.post...

// url：http://127.0.0.1:8000/post-ajax
app.all('/post-ajax',(request,response) => {
   
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    // 设置响应头 支持自定义请求头变量信息
    response.setHeader('Access-Control-Allow-Headers', '*')

    // 设置响应体
    response.send("HELLO AJAX POST");
})


//4、监听端口启动服务
app.listen(8000,() => {
    console.log("服务已经启动， 8000端口监听中....");
}) 
```

4、启动server：node server.js 不过每次修改得重启

5、自动重启方法安装nodemon：` npm install -g nodemon`

6、启动server：`nodemon server.js`



### 2.2 json格式转换

json语法在前面有，这里主要讲实例

- 服务端： `JSON.stringify(date)`

```js
app.get('/json-sever',(request,response) => {
   
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    // 定义一个js对象
    const date = {
        name: "cocoon",
        age: 20,
        number: 2020210832,
    };
    // 转化为json格式字符串
    let jsonStr = JSON.stringify(date);

    // 设置响应体
    response.send(jsonStr);
})
```

- 请求端 ：

手动将json字符串转化为js对象：`JSON.parse(str)`

```js
// 1. 创建AJAX对象
const xhr = new XMLHttpRequest();

// 2. 设置请求方法和服务端url
xhr.open('GET','http://127.0.0.1:8000/json-sever');

// 3. 发送
xhr.send();

// 4. 事件绑定（处理服务端返回的结果）
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) 
    {
        if (xhr.status >= 200 && xhr.status < 300) 
        {
            // 获取响应体的json格式字符串
            let str = xhr.response;
            console.log(str);

            // 将字符串转为js对象
            let people = JSON.parse(str);
            console.log(people);
        }
    }
}

```

自动转化：

注：xhr.response如果不是json格式字符串则得到null

```js
// 设置响应体对象属性
xhr.responseType = 'json';

// 可直接得到js对象
console.log(xhr.response);
```



## 第三章 Axios

我们不用AJAX原生方法，用一个更方便的库！！

[ Axios 中文网 | Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js (axios-http.cn)](https://www.axios-http.cn/)

[https://www.bootcdn.cn/axios/](https://www.bootcdn.cn/axios/)

### 3.1 引入Axios

<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.2.0/axios.js"></script>

### 3.2 使用Axios

- 配置 baseURL
```js
axios.defaults.baseURL = 'http://127.0.0.1:8000';

let url = '/axios';
```

- 服务端
```js
app.all('/axios',(request,response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    // 设置响应头 支持自定义请求头变量信息
    response.setHeader('Access-Control-Allow-Headers', '*')

    const data = {
        name: "cocoon",
        age: 20,
        number: 2020210832,
    };
    let jsonStr = JSON.stringify(data);

    response.send(jsonStr);
})
```

- Axios 提供了 get 方法

```javascript
let url = 'http://127.0.0.1:8000/axios';
let id = 2020210832;
axios.get(url, {
    //url参数 (接受静态参数、动态参数)
    params: {
        id: i,
        vip: 7
    },
    //请求头信息
    headers: {
        name: 'cocoon',
        age: 20
    }
}).then(value => {
    console.log(value);

    // 响应头
    console.log(value.heardr);

    // 响应体 直接转js对象！！
    console.log(value.data);

    // 原生xhr
    console.log(value.request);

})
```


- Axios 提供了 post 方法

请求体、请求行为JSON 格式

```js
axios.post(url, {
    //请求体 json格式  req.body获取
    'user': 'admin',
    'password': 20022002
}, {
    //url参数 请求行
    params: {
        id: 200,
        vip: 9
    },
    //请求头参数
    headers: {
        height: 100,
        weight: 180,
    }
}).then(response => {
    console.log(response);
    //响应状态码
    console.log(response.status);
    //响应状态字符串
    console.log(response.statusText);
    //响应头信息
    console.log(response.headers);
    //响应体
    console.log(response.data);
})
```

- axios()
```js
axios({
    //请求方法
    method: 'POST',
    //url 请求行
    url: '/axios',
    //url参数
    params: {
        vip:10,
        level:30
    },
    //头信息
    headers: {
        a:100,
        b:200
    },
    //请求体参数
    data: {
        username: 'admin',
        password: '123456'
    }
}).then(response=>{
    console.log(response);
    //响应状态码
    console.log(response.status);
    //响应状态字符串
    console.log(response.statusText);
    //响应头信息
    console.log(response.headers);
    //响应体
    console.log(response.data);
})

```



- 简单get请求

```js
axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
    function(responce) {
        console.log(responce.d)
    },
 
    function(err) {
        console.log(err.message);
    }                
)
```



### 3.3 fetch

了解即可 和axios一样 代替ajax原生方法发送请求

```js
fetch('http://127.0.0.1:8000/fetch?vip=10', {
    //请求方法
    method: 'POST',
    //请求头
    headers: {
        name: 'Nliver'
    },
    //请求体
    body: 'username=admin&password=admin'
}).then(response => {
    // 一个promise对象
    console.log(response);

    // 响应体如果是json格式字符串则用json
    // return response.text();
    return response.json();

}).then(response => {
    // 这里才能打印出响应体 已转化为js对象
    console.log(response);
})
```








## 第四章： 跨域

### 4.1 同源策略

同源策略（Same-Origin Policy）最早由 Netscape 公司提出，是浏览器的一种安全策略。

 同源：协议、域名、端口号 必须完全相同

违背同源策略就是跨域  下面是同域实例:**请求端和服务端在同一个文件目录下**

- 服务端

```js
// url: http://127.0.0.1:9000

const { response } = require('express');
const express = require('express');

const app = express();

app.get('/home', (request, response)=>{
    //响应一个页面
    response.sendFile(__dirname + '/index.html');

});

app.get('/data', (request, response)=>{
    //响应一个页面
    response.send('用户数据');

});

app.listen(9000,()=>{
    console.log("服务已经启动...");
})
```

- 请求端
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>跨域问题-index</title>
</head>
<body>
    <h1>跨域问题-index</h1>
    <button>点击获取用户数据</button>
    <script>
        // 请求端和服务端在同一个文件目录下 所以符合同源策略！

        const btn = document.querySelector('button');
        const h1 = document.querySelector('h1');

        btn.onclick = function(){
            const x = new XMLHttpRequest();
            
            //这里因为是满足同源策略的，所以url可以简写
            x.open("GET",'/data');
            
            //发送
            x.send();
            x.onreadystatechange = function () {
                if (x.readyState === 4) 
                {
                    if(x.status >= 200 && x.status < 300)
                    {
                        h1.innerHTML = x.response;
                    }    
                }
            }
        }
    </script>
</body>
</html>
```

### 4.2 JSONP

#### 4.2.1 JSONP原理

1. JSONP是什么

   JSONP (JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持get请求

2. JSONP 怎么工作的？

   在网页有一些标签天生具有跨域能力，比如：img, link, iframe, script

   JSONP就是利用**script**标签的跨域能力来发送请求的

- 服务端
```js
// jsonp原理：利用script返回js代码
//针对 jsonp 服务
app.all('/jsonp-server', (request, response) =>{
    const data = {
        name: 'Nliver的学习笔记-1'
    };
    //将数据转化为字符串
    let str = JSON.stringify(data);
    //返回结果形式就是一段js代码：是一个函数调用，而函数的实参就是我们想给客户端返回的结果数据
    response.end(`handle(${str})`);
});

```

- 请求端
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script>
        // 利用script标签实现跨域问题！！
        // script标签可以返回script.src读取到的代码！！

        function handle(date) {
            console.log(date.name);
        }

    </script>

    <!-- 通过script 从script.src中获取响应体 即js代码 -->
    <script src="http://127.0.0.1:8000/jsonp-server"></script>
</body>
</html>
```


#### 4.2.2  JSONP的使用

   - 动态的创建一个script标签

   ```js
   var script = document.createElement("script");
   ```

   - 设置script的src

   ~~~js
   script.src = "http://locallhost:3000/textAJAX?callback=abc"
   ~~~

- 在文档尾部添加script

```js
document.body.appendChild(script);
```

  

实践：

- 服务端：
```js
// json实践
app.all('/check-username', (request, response) =>{
    const data = {
        exist: 1,
        msg: '用户名已经存在'
    };

    //将数据转化为字符串
    let str = JSON.stringify(data);

    response.end(`handle(${str})`);
});
```
- 请求端
```js
//获取input元素
const input = document.querySelector('input');
const p = document.querySelector('p');

//声明 handle 函数
function handle(data){
    //修改边框颜色
    input.style.border = "solid 1px #f00";
    //修改 p 标签的提交文本
    p.innerHTML = data.msg;
}
	
//绑定事件
input.onblur = function () {
    //获取用户的输入值
    let username = this.value;

    //1. 创建 script 标签
    const script = document.createElement('script');

    //2. 设置 script 标签的src属性
    script.src = 'http://127.0.0.1:8000/check-username';

    //3. 将 script 插入到文档中
    document.body.appendChild(script);     
}
```

### 4.3 CORS

和jsonp一样，为了解决跨域问题；

其实我前面已经用到了cors，实际上只需要在服务端设置响应头即可：

- cors的使用一

```js
app.all('/cors-server', (request, response)=>{
    //设置响应头 表示允许跨域 * 可替代为其他域名
    response.setHeader("Access-Control-Allow-Origin", "*");
  
    // 设置允许自定义请求头
    response.setHeader("Access-Control-Allow-Headers", '*');

    // 设置允许任意请求类型
    response.setHeader("Access-Control-Allow-Method", '*');

    response.send('hello CORS');
})
```



- cors的使用二

利用中间件：

```js
// npm i cors
const cors = require('cors')
app.use(cors())
```



### 4.3.1 简单请求

![image-20221217224042405](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221217224042405.png)

### 4.3.2 预检请求

如果是预检请求，则客户端会发送**两次请求**！！

![image-20221217224126435](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221217224126435.png)





推荐阅读：

- http://www.ruanyifeng.com/blog/2016/04/cors.html
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

1. CORS是什么？

   CORS (Cross-Origin Resource Sharing), 跨域资源共享。CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 等请求。跨域资源共享标准新增了一组 HTTP  首部字段（响应头），允许服务器声明哪些源站通过浏览器有权限访问哪些资源

2. CORS怎么工作的？

   CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

   