# 第一章 Nodejs 环境配置

在新电脑里面直接可以用我写的这篇文章的配置，当电脑本地环境报错的时候就找解决办法，解决不了就直接卸载重来！另外还有 VScode 如果出现什么问题直接更新一下就行了，最好 3 个月更新一次



## 1.1 安装 NVM 管理版本

**安装方式如下：**

- 参考文章：https://zhuanlan.zhihu.com/p/646970780

- 如果之前安装过 Nodejs 那么一定要卸载！不管是 C 盘还是 D 盘，然后还有自定义的环境变量也一并删除！
- 安装 NVM 最新版：https://github.com/coreybutler/nvm-windows/releases
- 安装目录都选择 D 盘，默认已经帮我们配好了 NVM、Nodejs 的环境变量
- 切换镜像源：
  1. 打开 NVM 的安装目录里面的 setting.txt 写入 `node_mirror: https://npm.taobao.org/mirrors/node/`（地址失效）
  2. 或者执行命令：`nvm node_mirror https://npmmirror.com/mirrors/node/`



**NVM 的所有命令：**

```bash
$ nvm v                       # 显示nvm版本
$ nvm off                     # 禁用node.js版本管理(不卸载任何东西)
$ nvm on                      # 启用node.js版本管理
$ nvm install <version>       # 安装node.js的命名 version是版本号
$ nvm uninstall <version>     # 卸载node.js是的命令，卸载指定版本的nodejs，当安装失败时卸载使用
$ nvm ls                      # 显示所有安装的node.js版本
$ nvm list available          # 显示可以安装的所有node.js的稳定版本
$ nvm use <version>           # 切换到使用指定的nodejs版本
$ nvm install stable          # 安装最新稳定版
```



**两个注意点：**

- 有了 NVM 之后，千万不要再去使用 Nodejs 安装包安装其他版本
- 使用 NVM 切换 Nodejs 版本之后，每个版本的全局包都独立，切换版本后需要再另外下载
- npm 和 Nodejs 进行了捆绑，切换 Nodejs 版本会自动切换 npm 的版本



## 1.2 使用 NRM 切换镜像源

可以直接使用 npm 命令来查看或者设置当前 npm 的镜像源：

```bash
# 查看当前的下载包镜像源
$ npm config get registry

# 将下载包镜像源切换为淘宝镜像源
$ npm config set registry=https://registry.npm.taobao.org
```



或者下载一个全局的工具 NRM 来进行镜像源的管理：`npm i nrm -g`

**注意是直接切换全局的镜像源，包括 npm、yarn**

```bash
$ nrm add <registry> <url>  # 添加一个镜像源，通常是公司内部镜像源

$ nrm use <registry>  # 切换镜像源

$ nrm del <registry> # 删除镜像源

$ nrm ls # 列出所有镜像源
```



以下是 npm 常用命令总结：

- `npm init -y` ：初始化一个 package.json 文件
- `npm i` 或 `npm install` ：安装项目中所有依赖
- `npm uninstall [package name]`：卸载项目中的依赖
- `npm update [package name]`：升级项目中的依赖
- `npm i [package name] -S/--save`：安装到 dependencies（生产环境）
- `npm i [package name] -D/--save-dev`：安装到 devDependencies（开发环境） 
- `npm install -global/-g <package name>`：全局安装依赖



## 1.3 使用 yarn 包管理工具

下载 yarn 这个全局包管理工具，注意切换 Nodejs 版本之后需要另外再下载

全局安装：`npm i yarn -g`

下面是 yarn 的一些常用命令：

```bash
$ yarn init # 同npm init，执行输入信息后，会生成package.json文件

$ yarn install # 安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
$ yarn install --flat # 安装一个包的单一版本
$ yarn install --force # 强制重新下载所有包

$ yarn remove <packageName> # 删除一个包

$ yarn upgrade <packageName>@<version> # 更新一个包的指定版本

$ yarn add <packageName> # 安装一个包的最新版本

$ yarn config set registry http://registry.npm.taobao.org/ # 设置镜像源

$ yarn global add typescript # 全局下载命令（最好使用npm下载全局包）
```



## 1.4 Node 环境问题总结

### 1.4.1 JS 内存编译过载

编译时出现问题：`FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`，说明 JS 内存编译过载

只要加大 JS 内存即可：`NODE_OPTIONS="--max-old-space-size=8192"` ，设置好环境变量即可

参考文章：https://blog.csdn.net/m0_38137988/article/details/131554880

```bash
$env:NODE_OPTIONS="--max-old-space-size=8192"
```



# 第二章 Nodejs 基础学习

Nodejs 基础学习（博客）：https://www.inode.club/node/what.html

Nodejs 遵循 Commonjs 模块化开发：

1. 使用 `module.exports` 或 `export` 导出

```ts
module.exports.name = 'cocoon';
module.exports = {
    name: 'cocoon',
    say() {
        console.log(module.exports.name);
    }
}
```

2. 使用 require 进行导入：`const obj = require('./module')`



## 2.1 path 模块学习

path 模块学习：https://juejin.cn/post/7176102367723520056

1. path.join：只作为路径字符串拼接，path.resolve：会把 / 作为根目录，还会把路径解析最终生成绝对路径
2. 使用 require 语句可以直接使用 './'、'../' 读文件，**但是在其他语句中最好使用绝对路径**
2. 获取 **基于当前路径的文件** 的绝对路径函数就是使用 path.resolve 生成的

```js
const appDirectory = fs.realpathSync(process.cwd()) // 项目根目录
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

// 获取了基于当前路径的 './webpack.build.js' 文件的绝对路径
webpackConfigPath = resolveApp('./webpack.build.js')
```





## 2.2 .env 环境变量配置

在 Nodejs 中通常从 `process.env` 获取环境变量，全局可使用



**使用 dot-env 载入环境变量**

1. 在 `.env`、`.env.development`、`.env.local` 中定义环境变量，通过 dot-env 入口读取
2. 参考文档：https://juejin.cn/post/6993224664705138702

```js
// config/env.js
const path = require("path");
const fs = require("fs");
const dotEnv = require("dotenv");

// 先构造出.env*文件的绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const pathsDotenv = resolveApp(".env");

// 按优先级由高到低的顺序加载.env文件
dotEnv.config({ path: `${pathsDotenv}.local` })  // 加载.env.local
dotEnv.config({ path: `${pathsDotenv}.development` })  // 加载.env.development
dotEnv.config({ path: `${pathsDotenv}` })  // 加载.env

// 打印一下此时的process.env
console.log(process.env.NAME); // zhangsan
console.log(process.env.AGE); // 20
console.log(process.env.COUNTRY); // China
console.log(process.env.LOCAL_ENV); // local
```



**使用 cross-env 注入环境变量**

1. 运行跨平台设置和使用环境变量的脚本，在启动脚本时注入环境变量
2. 参考文档：https://juejin.cn/post/7088493140205633544

```json
"scripts": {
  "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
}
```

```ts
process.env.NODE_ENV = 'production'
```





## 2.3 进程与线程学习

进程与线程（太难太枯燥了）：https://www.inode.club/node/processAndThread.html

process 对象：https://juejin.cn/post/6913498911973834759

cluster、child_process 进程相关模块学习：https://juejin.cn/post/7202809170378522680

本章主要是过一下 process 对象暴露的 API 的一些使用和学习

```ts
process.argv、process.nextTick(fn)、process.env、process.stdin、process.stdout、process.memoryUsage、process.uptime
```



## 2.4 Stream 模块学习

流（Stream）是一个抽象的数据接口，`Node.js` 中很多对象都实现了流，流是 `EventEmitter` 对象的一个实例，总之它是会冒数据（以 `Buffer` 为单位），或者能够吸收数据的东西，它的本质就是让数据流动起来

1. `source.pipe(dest)`，`source` 和 `dest` 就是通过 pipe 连接，让数据从 `source` 流向了 `dest`。

2. 参考文档：https://www.inode.club/node/stream.html



**以上传文件作为一个简单案例**

```ts
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer(function(req, res) {
  const fileName = path.resolve(__dirname, 'data.txt')
  let stream = fs.createReadStream(fileName) // stream -> source（数据端）
  stream.pipe(res) // res -> dest（读入数据端）
})
server.listen(8000)
```



**一个通过 post 请求微信小程序的地址生成二维码的需求**

1. 通过请求得到一个二维码文件流，然后流入指定的文件中
2. response 也是一个 stream 对象，作为 source，流入 ws 中

```ts
/*
 * 微信生成二维码接口
 * params src 微信url / 其他图片请求链接
 * params localFilePath: 本地路径
 * params data: 微信请求参数
 * */
const downloadFile = async (src, localFilePath, data) => {
  try {
    const ws = fs.createWriteStream(localFilePath)
    return new Promise((resolve, reject) => {
      ws.on('finish', () => {
        resolve(localFilePath)
      })
      if (data) {
        request({
          method: 'POST',
          uri: src,
          json: true,
          body: data,
        }).pipe(ws)
      } else {
        request(src).pipe(ws)
      }
    })
  } catch (e) {
    logger.error('wxdownloadFile error: ', e)
    throw e
  }
}
```



**一个文件拷贝的例子**

```ts
const fs = require('fs')
const path = require('path')

// 两个文件名
const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')
// 读取文件的 stream 对象
const readStream = fs.createReadStream(fileName1)
// 写入文件的 stream 对象
const writeStream = fs.createWriteStream(fileName2)
// 通过 pipe执行拷贝，数据流转
readStream.pipe(writeStream)
// 数据读取完成监听，即拷贝完成
readStream.on('end', function() {
  console.log('拷贝完成')
})
```



## 2.5 Buffer 对象学习

Buffer 介绍参考文档：https://www.inode.club/node/buffer.html

在 Node.js 中，Buffer 对象是用于处理二进制数据的类。以下是一些常用的 Buffer API：

1. `Buffer.alloc(size[, fill[, encoding]])`：创建一个指定大小的新的 Buffer 对象，并用指定的 fill 值填充。可选的 encoding 参数指定填充值的编码，默认为 'utf8'。

2. `Buffer.from(array)`：根据给定的数组创建一个新的 Buffer 对象。

3. `Buffer.from(string[, encoding])`：根据给定的字符串创建一个新的 Buffer 对象。可选的 encoding 参数指定字符串的编码，默认为 'utf8'。

4. `buffer.length`：返回 Buffer 对象的字节长度。

5. `buffer.toString([encoding[, start[, end]]])`：将 Buffer 对象转换为字符串。可选的 encoding 参数指定字符串的编码，默认为 'utf8'。可选的 start 和 end 参数指定要转换的字节范围，默认为整个 Buffer。

6. `buffer.toJSON()`：返回一个包含 Buffer 对象内容的 JSON 表示。

7. `buffer[index]`：获取或设置指定索引位置的字节值。

8. `buffer.slice([start[, end]])`：返回一个新的 Buffer 对象，包含原始 Buffer 对象的指定字节范围。可选的 start 和 end 参数指定字节范围，默认为整个 Buffer。

9. `buffer.copy(target[, targetStart[, sourceStart[, sourceEnd]]])`：将原始 Buffer 对象的内容复制到目标 Buffer 对象中。可选的 targetStart、sourceStart 和 sourceEnd 参数指定复制的字节范围，默认为整个 Buffer。

10. `Buffer.isBuffer(obj)`：检查一个对象是否为 Buffer 对象。

