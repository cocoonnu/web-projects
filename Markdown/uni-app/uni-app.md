# 第一章 认识 uni-app

首先我们要认识微信小程序开发！注册小程序流程和开发流程都在小程序里。

如果只开发小程序的话，确实可以不用 uni-app 和 vscode 编辑器还有前端框架等等，只需要一个微信小程序官方文档和微信开发者工具即可！



但是！如果想更方便开发小程序，且想要多端同步开发，而且还想用 vue.js 框架的话（仅仅是 vue2 框架，不是vue 生态系统！！！）那么就可以使用 uni-app 来搭建微信小程序



**主要还是要明确就是只会使用到 vue2 框架的基本指令、基本属性、事件监听等**



## 1.1 HBuilderX 的使用

工欲善其事，必先利其器。我们先下载 uni-app 开发工具 -- HBuilderX 

官网：https://hx.dcloud.net.cn/

插件市场：https://ext.dcloud.net.cn/?cat1=1&type=UpdatedDate



这个工具可以帮我们快速搭建小程序模板，新建组件（自动注册），新建页面。

还可以一键运行到微信开发者工具中进行模拟调试！！



> 如果我们继续用 vscode 编写代码的话，那这个工具就是作为一个中间件来使用了，一般都是不用 vscode 的



```
快捷键
ctrl + i 隐藏工具栏

ctrl + b 隐藏文件

ctrl + /: 设置注释

ctrl + `: 打开终端

ctrl + j: 切换面板（终端和编辑器）

ctrl + [: 调整缩进

ctrl + d: 删除整行

ctrl + l: 选中该行

ctrl + g: 跳转行号

ctrl + ': 移动到行尾

ctrl + ; 移动到行头

ctrl + shift + z: 取消撤销

按住 alt 键: 实现多选
```





## 1.2 uni-app 项目目录

```
├─pages			    // 页面存放文件夹，等同于 微信小程序中的 pages
│  └─index			// 默认生成的页面
├─static			// 静态资源存放文件夹
└─uni_modules		// uni-app组件目录
│  └─uni-xxx		// uni-app 所提供的业务组件，等同于 微信小程序中的组件
├─App.vue			// 应用配置文件，用来配置全局样式、生命周期函数等，等同于 微信小程序中的app.js
└─main.js			// 项目入口文件
├─mainfest.json		 // 配置应用名称、appid、logo、版本等打包信息，
└─pages.json		// 配置页面路径、窗口样式、tabBar 等页面类信息，等同于 微信小程序中的app.json
└─uni.scss			// uni-app内置的常用样式变量
```



- 组件还是使用 `.vue` 文件
- 最关键的一点是 **HTML 标签全部替换成了微信小程序组件标签**
- 所以就是 `template` 内部就是**微信小程序组件及其属性 + vue 指令属性复用！！！**



## 1.3 uni-app 的语法

主要还是微信小程序组件的语法

官方组件使用介绍：https://uniapp.dcloud.net.cn/component/uniui/uni-badge.html#

> 包含内置组件和 uni-ui 组件



然后 JS 架构就是按照 vue2 框架来设计的