# 一、什么是 Node.js

**Node.js 是  JavaScript  语言的服务器运行环境。**

- Node.js 就是运行在服务端的 JavaScript。
- Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。
- Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。



**为什么要用 Node.js ？**

javaScript 语言本身是完善的函数式语言，在前端开发时，开发人员往往写得比较随意，让人感觉JavaScript就是个玩具语言。无法像其他编程语言一样满足工程的需要。

但是，在Node环境下，通过模块化的JavaScript代码，加上函数式编程，并且无需考虑浏览器兼容性问题，直接使用最新的ECMAScript 6标准，可以完全满足工程上的需求。

 

**Node.js 适合以下场景:**

1、实时性应用，比如在线多人协作工具，网页聊天应用等。

2、以 I/O 为主的高并发应用，比如为客户端提供 API，读取数据库。

3、流式应用，比如客户端经常上传文件。

4、前后端分离。



**Node.js 学习任务：**

- Node.js 的模块化

- JS、ES6+ 语法
- Node.js 内置 API
- Node.js 包管理
- Node.js 第三方工具
- mysql 数据库基础使用

可以参考文档：https://github.com/overnote/over-javascript/tree/master/05-Node.js



## 1.1 Node.js 安装



Node.js 安装与环境配置：https://blog.csdn.net/qq_42006801/article/details/124830995

注意里面要更改 npm 安装位置，不要安装到 C盘！

历史版本下载：https://nodejs.org/en/download/releases/



安装依赖选择：npm 、yarn、cnpm



## 1.2 nvm 安装及使用

 

在工作中，我们可能同时在进行2个或者多个不同的项目开发，每个项目的需求不同，进而**不同项目必须依赖不同版本的NodeJS运行环境**，并且一些低版本的第三方库，可能需要降低版本才能安装成功。所以使用 nvm 方便的在同一台设备上进行多个 node 版本之间切换。



安装教程：https://blog.csdn.net/qq_30376375/article/details/115877446

直接安装即可，不用先卸载 Node.js



使用方式如下：

```js
nvm off                     // 禁用node.js版本管理(不卸载任何东西)
nvm on                      // 启用node.js版本管理
nvm install <version>       // 安装node.js的命名 version是版本号 例如：nvm install 8.12.0
nvm uninstall <version>     // 卸载node.js是的命令，卸载指定版本的nodejs，当安装失败时卸载使用
nvm ls                      // 显示所有安装的node.js版本
nvm list available          // 显示可以安装的所有node.js的版本
nvm use <version>           // 切换到使用指定的nodejs版本
nvm v                       // 显示nvm版本
nvm install stable          // 安装最新稳定版
```





## 1.3 nodemon 的使用

直接 `node xxx.js` 即可编译 JS 文件，可在终端中输出结果



全局安装nodemon（可自动监听 JS 文件的变化并重新编译）：`npm i -g nodemon`

`nodemon xxx.js`



## 1.4 yarn 的安装及使用

yarn 是 facebook 发布的一款取代 npm 的包管理工具。在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。



全局安装：

```bash
npm install -g yarn

yarn --version
```

> 也可以去修改缓存路径，自行搜索一下



基本命令如下：

- **初始化项目及安装依赖**

```bash
yarn init # 同npm init，执行输入信息后，会生成package.json文件

yarn install # 安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
yarn install --flat # 安装一个包的单一版本
yarn install --force # 强制重新下载所有包
yarn install --production # 只安装dependencies里的包
yarn install --no-lockfile # 不读取或生成yarn.lock
yarn install --pure-lockfile # 不生成yarn.lock
```



- **添加项目依赖**

```bash
yarn add [package] # 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
yarn add [package]@[version] # 安装指定版本
yarn add [package]@[tag] # 安装某个tag（比如beta,next或者latest）

# 指定依赖类型
yarn add [package] --save/-S # 加到 dependencies（默认）
yarn add [package] --dev/-D # 加到 devDependencies
yarn add [package] --peer/-P # 加到 peerDependencies
yarn add [package] --optional/-O # 加到 optionalDependencies
```



- **其他命令操作**

```bash
yarn publish # 发布包
 
yarn remove <packageName> # 移除一个包，会自动更新package.json和yarn.lock
 
yarn upgrade <packageName> # 用于更新包到基于规范范围的最新版本

yarn run # 用来执行在 package.json 中 scripts 属性下定义的脚本
 
yarn info <packageName> # 显示某个包的信息
 
yarn cache # 缓存当前项目依赖 
yarn cache list # 列出已缓存的每个包 
yarn cache dir # 返回 全局缓存位置 
yarn cache clean # 清除缓存
```



- **全局配置项**

```bash
yarn config list # 显示所有配置项
yarn config get <key> # 显示某配置项
yarn config delete <key> # 删除某配置项
yarn config set <key> <value> [-g|--global] # 设置配置项
```





# 二、Node.js 的模块化



Node应用是由模块组成，**遵循的是 CommonJS 模块规范**。 CommonJS 是一套代码规范, 目的是为了构建 JavaScript 在浏览器之外的生态系统 (服务器端, 桌面端)。 

> 通过该规范使JavaScript具备开发复杂应用、跨平台的能力



 **CommonJS模块规范化的内容**

- 导出模块：`moudle.exports.xxx` 或 `exports.xxx` 
- 导入模块：`require('模块名称')`



参考博客：[CommonJs 详解](https://blog.csdn.net/weixin_43877799)



## 2.1 初始 module

 每个模块内部，都有一个 `module` 对象（直接使用），代表当前模块。它有以下属性：

- `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
- `module.filename` 模块的文件名，带有绝对路径。
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` 返回一个对象，表示调用该模块的模块。
- `module.children` 返回一个数组，表示该模块要用到的其他模块。
- `module.exports` 表示模块对外输出的值。



```js
// 输出看看
console.log(module.filename)
console.log(module.loaded)
```



## 2.2 module 导出

使用导出功能有两种方式：

- module.exports
- exports



**（一）module.exports**


```js
// 设置导出变量属性
module.exports.name = 'cocoon';

module.exports.say = function() {
    console.log(module.exports.name);
}

// 设置导出变量对象（和上面不能混用！）
module.exports = {
    name: 'cocoon',
    say() {
        console.log(module.exports.name);
    }
}
```



**（二）exports**

为了方便，Node.js 为每个模块提供一个 `exports` 变量，指向 `module.exports`。

这等同在每个模块头部，有一行这样的命令：

```js
var exports = module.exports
```

> 这使得 module.exports 完全可以替换成 exports，但是两个不要一起用！





## 2.3 module 导入

Node.js 使用 CommonJS 模块规范，内置的 `require` 命令用于加载模块文件。

`require` 命令的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 `exports` 对象。如果没有发现指定模块，会报错。

```js
// 返回一个导出的对象
const obj = require('./module')

// 也可以解构赋值
const { say, name } = require('./module')
```

> `require` 命令用于加载文件，后缀名默认为 `.js`



模块的加载机制：

- **模块在第一次加载后会被缓存**。 这也意味着多次调用 require() 不会导致模块的代码被执行多次



# 三、npm 包管理工具



**npm 是什么？**

npm（即 node package manager ）是 `Node` 的包管理工具，能解决 NodeJS 代码部署上的很多问题。 到目前为止，**npm 差不多收集了60万个别人写好的包**，其实每个包就是一个功能，一个需求。如果正好我们有这些需求，那么我们就没必要自己去写代码，完全可以用别人已经写好的包。



npm 官网：https://www.npmjs.com/



npm 是随同 Nodejs 一起安装的包管理工具，能解决Nodejs代码部署上的很多问题，常见的使用场景：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用

> npm -v 查看版本号



## 3.1 npm 包管理流程

以下是 npm 常用命令总结：

- `npm init -y` ：初始化一个 package.json 文件
- `npm i` 或 `npm install` ：安装项目中所有依赖
- `npm uninstall [package name]`：卸载项目中的依赖
- `npm update [package name]`：升级项目中的依赖
- `npm i [package name] -S/--save`：安装到 dependencies（生产环境）
- `npm i [package name] -D/--save-dev`：安装到 devDependencies（开发环境） 
- `npm install -global/-g <package name>`：全局安装依赖



注：命令 `npm install [package name]`

1、 将依赖安装到项目 node_modules 目录下。
2、不会将依赖写入 devDependencies 或 dependencies 节点

3、会写在 package-lock.json，所以 `npm i` 时还是会下载

> 所以不知道是 -S 还是 -D  那么还是看官方给的命令吧！！！





## 3.2 package.json 说明

各个字段的介绍：

- name：项目名，也就是在使用 npm init 初始化时取的名字，但是如果使用的是 npm init -y 快速初始化的话，那这里的名字就是默认存放这个文件的文件名
- version：版本号
- private：希不希望授权别人以任何形式使用私有包或未发布的
- scripts：是vue的项目简写配置
- dependencies：指定了项目运行时所依赖的模块
- devDependencies：指定项目开发时所需要的模块，也就是在项目开发时才用得上，一旦项目打包上线了，就将移除这里的第三方模块



在 scripts 对象中添加属性  `npm run 属性名` 简化命令

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel src -d dist",
    "webpack": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server"
}

npm run dev  
npm run webpack
npm run build
```



**package-lock.json：**

package-lock.json 是在运行 `npm install` 时生成的一个文件，用于记录当前状态下项目中实际安装的各个 package 的版本号、模块下载地址、及这个模块又依赖了哪些依赖。





## 3.3 切换下载镜像源

- 手动设置

```bash
# 打开Windows PowerShell

# 查看当前的下载包镜像源
npm config get registry

# 将下载包镜像源切换为淘宝镜像源
npm config set registry=https://registry.npm.taobao.org

# 查看镜像源是否下载成功
npm config get registry
```



- 利用 nrm 工具

```bash
# 安装全局包nrm
npm i nrm -g

# 查看所有可用镜像源
nrm ls

# 切换镜像源
nrm use taobao
```



- 利用 cnpm 命令

```
// 全局安装
npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm -v
```





## 3.4 修改包的版本

**npm 方式**

先将 `node_modules`、`package-lock.json` 删除

```bash
rm -rf node_modules
rm -rf package-lock.json
```

再修改 `package.json` 中包的版本，最后在 `npm i`

> 最好不要不要直接卸载依赖！！会莫名其妙出现很多错误！！！



**yarn 方式**

```bash
$ yarn add [package]@[version]
```






# 四、Node.js 内置 API

## 4.1 readFile 读文件

  ```js
  const fs = require('fs');
  
  fs.readFile('./files/1.txt', 'utf-8', function(err, data) {
      if (err) {
          return console.log('failed!' + err.message)
      }
  
      console.log('content:' + data)
  })
  ```



## 4.2 writeFile 写文件

  ```js
  const fs = require('fs');
  
  fs.writeFile('./files/2.txt', '要写入的内容', function(err, data) {
      if (err) {
          return console.log('failed!' + err.message)
      }
  })
  
  fs.readFile('./files/2.txt', 'utf-8', function(err, data) {
      if (err) {
          return console.log('failed!' + err.message)
      }
  
      console.log('content:' + data)
  })
  
  ```



## 4.2 path 模块

-  **__dirnam**

__dirname：表示当前目录地址

```js
console.log(__dirname);
```



- **path 拼接**

path.join()

```js
console.log(path.join(__dirname,'./index.html'));

// D:\文档\学习文件\Web Projects\Webpack\index.html
```



path.resolve()

```js
console.log(path.resolve(__dirname, './dist'));

// D:\文档\学习文件\Web Projects\Webpack\dist
```



path.basename：获取文件名

```js
const fpath = '/a/b/c/index.html'

const fullName = path.basename(fpath)
console.log(fullName) // index.html

const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) // index
```

  

## 4.3 http模块

- ip地址：每个web服务端都有一个ip地址 且是独一无二的       **一个ip地址再对应一个域名**

  ```
  在终端中查看域名的ip地址：ping 域名
  ```

  测试用的本地ip地址：`127.0.0.1`   对应域名为`localhost`



- 端口号：一个服务器有多个服务，而一个服务对应一个端口号

  注：1、每个端口号不能同时被多个服务占用      2、80端口在url里可以省略



配置http服务端（推荐用express框架！）

- 设置所有url的响应

```js
const http = require('http');

const app = http.createServer();

// 设置所有url的响应
app.on('request',function(req,res) {
 
    // 获取请求的url地址
    console.log(req.url);
    // 获取请求方式
    console.log(req.method);

    //设置响应头 设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应头 支持自定义请求头变量信息
    res.setHeader('Access-Control-Allow-Headers', '*');
    // 设置响应头 防止响应体中文乱码
    res.setHeader('Content-Type','text/html; charset=utf-8');

    // 设置响应体
    let str = '发送请求成功！'
    res.end(str);
})

app.listen(8000,function() {
    console.log('服务已经启动， 8000端口监听中....');
})
```

- 分配url响应   **url还可以带参数！！所以不太好判断！   一般是直接文件url请求**

```js
const http = require('http');

const app = http.createServer();

app.on('request',function(req,res) {
 
    // 获取请求的url地址
    let url = req.url;

    //设置响应头 设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应头 支持自定义请求头变量信息
    res.setHeader('Access-Control-Allow-Headers', '*');
    // 设置响应头 防止响应体中文乱码
    res.setHeader('Content-Type','text/html; charset=utf-8');

    let content = ''; // 响应体信息
    // 分配url响应  url不能带参数！！所以一般是文件url请求
    if (url == '/')
    {
        content = '首页';
    }
    if (url == '/ajax')
    {
        content = 'ajax';
    }
    if (url == '/index.html')
    {
        content = 'index.html';
    }

    res.end(content);
})

app.listen(8000,function() {
    console.log('服务已经启动， 8000端口监听中....');
})
```



## 4.4 全局变量

https://github.com/febobo/web-interview/issues/154






# 五、Express 框架的使用

什么是 Express:

- 官方给出的概念：Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。 
- Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。
-  Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。 
- Express 的中文官网： http://www.expressjs.com.cn
- **在项目根目录下安装Express**：`npm i express@4.17.1`

可以参考文档：https://github.com/overnote/over-javascript/blob/master/05-Node.js/07.1-Web%E6%A1%86%E6%9E%B6-Express.md



## 5.1 创建基本web服务器

```js
// 基本web服务器结构
const express = require('express');

const app = express();


// 全局中间件
app.use(function(req,res,next) {
    // 全局设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Method", '*');

    // 一定要调用next()
    next();
})


// 导入路由模块
const userRouter = require('./router/user');
// 实现路由模块
app.use(userRouter);


// 创建错误中间件（写在所有路由之后）
app.use(function(err,req,res,next) {
    console.log('err:' + err.message);
    res.send(err.message);
}) 

// 监听端口
app.listen(8000,function() {
    console.log("8000端口监听中...");
})
```



## 5.2 res设置响应头

常用的响应头：

```js
//设置响应头 设置允许跨域
res.setHeader('Access-Control-Allow-Origin', '*');

// 设置响应头 支持自定义请求头变量信息
res.setHeader('Access-Control-Allow-Headers', '*');

// 设置响应头 防止响应体中文乱码
res.setHeader('Content-Type','text/html; charset=utf-8');

// 设置允许任意请求类型
response.setHeader("Access-Control-Allow-Method", '*');
```



## 5.3 req获取url参数

- req.query： 返回url中的静态参数对象

- **req.params**：返回动态参数

  ```js
  // ajax:
  let url = 'http://127.0.0.1:8000/axios';    
  let ids = 12;
  axios.get(url, {
      //url参数 (现在是动态参数)
      params: {
          id: ids,
          vip: 7
      },
      //请求头信息
      headers: {
          name: 'cocoon',
          age: 20
      }
  }).then(value => {
      // 响应体
      console.log(value.data);
  })
  ```
  
  ```js
  app.all('/axios',(req,res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', '*')
   
      const date = {
          "reqQuery": req.query,
          "reqParams": req.params
      };
      let jsonStr = JSON.stringify(date);
  
      res.send(jsonStr);
  })
  ```
  



## 5.4 req获取请求体

req.body：获取post的请求体

如果从未解析过请求体数据，则req.body默认为undefined

```js
// 添加express内置中间件 解析请求体数据

// 两种
app.use(express.json()); // 写在所有路由之前！

app.use(express.urlencoded({ extended: false }))
```

```js
axios.post(url, {
    //请求体  json格式
    "admin": 'admin',
    'num': 2020210832
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
    console.log(response.data);
})
```



## 5.5 托管静态文件

  **express.static**：将公开目录下的所有文件对外访问     *通常路径前缀与公开目录名相同*

和本地文件访问不同！！这是http://127.0.0.1:8000支持的访问

```js
app.use('路径前缀',express.static('公开目录'));
```

```js
app.use('/files', express.static('./files'))

// 若files下存在index.html 则可访问http://127.0.0.1:8000/files/index.html
```



http://127.0.0.1:8000/默认打开index.html！！！



## 5.6 模块化路由

1、什么是路由？

- 服务器中的`app.method(path,handler)`就是路由模块
- 在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。
- 路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数



模块化路由：
1. 在项目根目录中，新建 `router` 文件夹，用来存放所有的`路由`模块
  
   > 路由模块中，只存放客户端的请求与处理函数之间的映射关系
2. 在项目根目录中，新建 `router_handler` 文件夹，用来存放所有的 `路由处理函数模块`
  
   > 路由处理函数模块中，专门负责存放每个路由对应的处理函数



- 路由模块  `./router/user.js`

```js
// 路由模块：存放客户端的请求与处理函数之间的映射关系
const express = require('express');
const userRouter = express.Router();

// 导入路由处理函数模块
const userHandler = require('../router_handler/user');

// 响应
userRouter.post('/login',userHandler.login);

userRouter.post('/regUser',userHandler.regUser);	

// 记得导出！
module.exports = userRouter
```

- 路由处理函数模块  `./router_handler/user.js`

```js
// 注册用户的处理函数
exports.regUser = (req, res) => {
  res.send('reguser OK')
}

// 登录的处理函数
exports.login = (req, res) => {
  res.send('login OK')
}
```

- 服务器导入路由模块：`./app.js`

```js
const express = require('express');
const app = express();

// 导入路由模块
const userRouter = require('./router/user');

// 实现路由模块
app.use(userRouter);

// app.use('/api',userRouter)：添加访问前缀
```



## 5.7 中间件函数

中间件的作用：

- 中间件与路由之间，**共享同一份** **req** **和** **res**。基于这样的特性，我们可以在上游的中间件中，**统一**为 req 或 res 对象**添加自定义的属性或方法**，供下游的中间件或路由进行使用。

- 例如每个路由都要写相同的代码，则可以写入中间件里面

- **中间件一定要写在路由前面！**

  

1、全局中间件

```js
// app.use()实现全局中间件函数
app.use(function(req,res,next) {
    // 全局设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Method", '*');

    // 一定要调用next()
    next();
})

// 中间件函数按循序执行
app.use(function(req,res,next) {
    // 全局添加req自定义属性
    req.newDate = new Date();

    next();
})
```



2、局部中间件

```js
// 不是用app.user() 而直接在指定的路由里面添加
// 局部中间件
const mw1 = function(req,res,next) {
    console.log('局部中间件1');
    next();
}
const mw2 = function(req,res,next) {
    console.log('局部中间件2');
    next();
}

app.all('/mw', mw1, mw2, function(req,res) { 
    res.send('');
})

```



3、错误中间件

```js
// 创建错误中间件（写在所有路由之后）
app.use(function(err,req,res,next) {
    // 向服务器输出错误
    console.log('err:' + err.message);
    // 向客户端抒输出错误
    res.send(err.message);
}) 
```



4、Express内置的中间件

express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等

 express.json 解析 JSON 格式的请求体数据

 express.urlencoded 解析 URL-encoded 格式的请求体数据



5、第三方中间件（也是第三方库）

自行下载 自行使用 基于express

- body-parser：解析请求体数据  `npm i body-parser`

```js
// 导入
const bodyParser = require('body-parser');

// 使用：解析请求体json格式
app.use(bodyParser.json());
```



## 5.8 模块化中间件

将中间件模块化： *新建文件夹  middleware 在里面写中间件模块*

- 中间件模块

```js
// 新建文件custom-body-parser.js 封装中间件函数

// 封装自定义中间件函数：解析json格式的请求体

const qs = require('querystring');

function customBodyParser(req,res,next) {
    let str = ''; // 储存请求体str

    // req.data改变时监听
    req.on('data',function(chunk) {
        str += chunk;
    })
    
    // req.end时监听
    req.on('end',function() {
        // 此时str为完整请求体str

        // 解析str为js对象 并赋予req.body
        req.body = qs.parse(str);

        next();
    }) 

}

// 导出函数
module.exports = customBodyParser;
```

- 服务器
```js
// 导入自定义中间件
const customBodyParser = require('./middleware/custom-body-parser');
app.use(customBodyParser);
```






# 六、其他第三方库的使用




## 6.1 表单数据合法验证

> 表单验证的原则：前端验证为辅，后端验证为主，后端**永远不要相信**前端提交过来的**任何内容**

在实际开发中，前后端都需要对表单的数据进行合法性的验证，而且，**后端做为数据合法性验证的最后一个关口**，在拦截非法数据方面，起到了至关重要的作用。

单纯的使用 `if...else...` 的形式对数据合法性进行验证，效率低下、出错率高、维护性差。因此，推荐使用**第三方数据验证模块**，来降低出错率、提高验证的效率与可维护性，**让后端程序员把更多的精力放在核心业务逻辑的处理上**。

1. 安装 `joi` 包，为表单中携带的每个数据项，定义验证规则：

```bash
npm install joi
```

2. 安装 `@escook/express-joi` 中间件，来实现自动对表单数据进行验证的功能：

```bash
npm i @escook/express-joi
```

3. 新建 `/schema/user.js` 用户信息验证规则模块，并初始化代码如下：

   

*导出验证规则（当前针对req.body  err在全局中间件  body中的属性必须和请求中的一致）*




```js
const joi = require('joi')

/*
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则

   newPwd: joi.not(joi.ref('oldPwd')).concat(password)
	// 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则

*/

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

// 导出验证规则

// 注册和登录表单的验证规则
exports.reg_login_schema = {
    body: {email, password}

    // 也可以对 req.parms 中的数据进行验证
}
```

4. 修改 `/router/user.js` 中的代码如下：

```js
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
// 登录
router.post('/login', userHandler.login)

module.exports = router
```

5. 在 `app.js` 的全局错误级别中间件中，捕获验证失败的错误，并把验证失败的结果响应给客户端：

```js
const joi = require('joi')

// 创建错误中间件（写在所有路由之后）
app.use(function(err,req,res,next) {
    
    // 表单验证失败错误
    if (err instanceof joi.ValidationError) {
        console.log(err.message);
        res.send({statue: 0, msg: '请填写正确的邮箱或密码', errmsg: err.message});
    } else {

        console.log(err.message);
        res.send({statue: 0, msg: err.message});
    }
    
}) 
```



## 6.2 对密码进行加密处理

> 为了保证密码的安全性，不建议在数据库以 `明文` 的形式保存用户密码，推荐对密码进行 `加密存储`

---

在当前项目中，使用 `bcryptjs` 对用户密码进行加密，优点：

- 加密之后的密码，**无法被逆向破解**
- 同一明文密码多次加密，得到的**加密结果各不相同**，保证了安全性

---

1. 运行如下命令，安装指定版本的 `bcryptjs` ：

```bash
npm i bcryptjs
```

2. 在 `/router_handler/user.js` 中，导入 `bcryptjs` ：

```js
const bcrypt = require('bcryptjs')
```

3. 在注册用户的处理函数中，确认用户名可用之后，调用 `bcrypt.hashSync(明文密码, 随机盐的长度)` 方法，对用户的密码进行加密处理：

```js
// 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
userinfo.password = bcrypt.hashSync(userinfo.password, 10)
```

4. 判断用户输入的密码是否正确

```js
// 拿着用户输入的密码,和数据库中存储的密码进行对比
const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

// 返回bool值
```



## 6.3 生成唯一字符串

用到一个迷你版的库：`nanoid`

- 安装：`npm i nanoid`
- `ES6`引入：`import { nanoid } from 'nanoid'`
- 使用：`const str = nanoid()`



## 6.4 动画、过渡的`css`

**1、动画**

使用一个库：`Animate.css`    官网：https://animate.style/（可能进不去）

动画演示网址：https://www.dowebok.com/demo/2014/98/

安装和所有的动画效果都在官网，接下来介绍在vue里面怎么使用

当类名为`animate__animated + 动画类名` 时，就会展示动画

1、class绑定

```vue
<button 
    class="btn btn-danger animate__animated"
    :class="delClass" 
    @click="handleDelete()">删除</button>
```

```js
data() {
    return {
        // 动画类名初始化
        delClass: {'animate__rubberBand': false}
    }
}
```



2、当被点击时就展示动画

```js
handleDelete() {
    this.delClass.animate__rubberBand = true;
    setTimeout(()=> {
        this.delClass.animate__rubberBand = false;
    },500)
},

// 定时器里面的时间最小为动画时间！！！！
```



**2、 过渡**

一般用于元素的显示或消失的时候呈现过渡效果  `transition.css`

官网：https://www.transition.style/   github：https://github.com/argyleink/transition.css

使用：复制`css`样式，或者直接引入或下载库，然后在盒子里面添加样式

```html
<div class="imgBx" transition-style="in:circle:top-right" >
```

```css
@keyframes circle-in-top-right {
  from {
    clip-path: circle(0%);
  }
  to {
    clip-path: circle(150% at top right);
  }
}

[transition-style="in:circle:top-right"] {
  animation: 2.5s cubic-bezier(.25, 1, .30, 1) circle-in-top-right both;
}
```



## 6.5 获取当前时间格式

**moment.js**

一个获取当前时间格式的包     学习网址：http://momentjs.cn/docs/#/use-it/

```js
const moment = require('moment');

// format里面写入时间格式
let date = moment().format();

console.log(date);
```



**day.js**

轻量级且一样功能的包：https://www.bootcdn.cn/dayjs/

学习网址：https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md

```
dayjs()：时间戳为当前时间

dayjs(传入指定)
```