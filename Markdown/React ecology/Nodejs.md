# Nodejs 系统环境配置

在新电脑里面直接可以用我写的这篇文章的配置，当电脑本地环境报错的时候就找解决办法，解决不了就直接卸载重来！另外还有 VScode 如果出现什么问题直接更新一下就行了，最好 3 个月更新一次



## 1.1 安装 NVM 管理版本

**安装方式如下：**

- 如果之前安装过 Nodejs 那么一定要卸载！不管是 C 盘还是 D 盘，然后还有自定义的环境变量也一并删除！

- 安装 NVM 最新版：https://github.com/coreybutler/nvm-windows/releases

- 安装目录都选择 D 盘，默认已经帮我们配好了 NVM、Nodejs 的环境变量

- 打开 NVM 的安装目录里面的 setting.txt 写入 `node_mirror: https://npm.taobao.org/mirrors/node/`



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

```bash
$ nrm add <registry> <url>  # 添加一个镜像源，通常是公司内部镜像源

$ nrm use <registry>  # 切换镜像源

$ nrm del <registry> # 删除镜像源

$ nrm ls # 列出所有镜像源
```





## 1.3 使用 yarn 包管理工具

下载 yarn 这个全局包管理工具，注意切换 Nodejs 版本之后需要另外再下载：`npm i yarn -g`

下面是 yarn 的一些常用命令：

```bash
$ yarn init # 同npm init，执行输入信息后，会生成package.json文件
$ yarn install # 安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
$ yarn install --flat # 安装一个包的单一版本
$ yarn install --force # 强制重新下载所有包
```

```bash
$ npm install -> yarn add
$ yarn config set registry http://registry.npm.taobao.org/ # 设置镜像源
```

