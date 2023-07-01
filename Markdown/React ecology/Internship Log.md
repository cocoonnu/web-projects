## 6.27

入职第一天的步骤记录：

- 首先 HR 会要求你发送身份证、学生证、银行卡照片的电子稿。然后会发给你一份入职指南，按照上面的流程下载各个软件并注册



- 通常一个企业会使用企业微信或者钉钉进行团队管理沟通，另外会分配一个 SSO 账号（最好重置一下密码），以便登录公司的内置网站、系统和 Gitlab。其次就是用飞书来实现团队之间代码、文档的共享。不过注册飞书需要企业邀请码，这个可能需要排队



- 另外需要在企业微信中申请访问公司项目。**申请的审批下来了就可以 clone 公司的项目代码了，需要切换成开发版本的分支**。接下来就是配置项目所需要的环境：VScode 版本、Nodejs 版本、npm 或 yarn 的镜像源



- 最后下载依赖，阅读项目的介绍文档、前端开发代码规范、学习 Git、GitLens 的使用、学习代码管理



## 6.28

从拉取代码到配置环境再到运行代码整体流程:

- 修改 Git 全局配置和设置 VScode 默认换行符为 LF，防止 ESlint delete cr 报错

```bash
$ git config --global core.autocrlf false
```

```bash
# 在设置综合搜索 files:eol，将选项修改为 '/n'
```



- 下载 nvm、yarn、nrm

```bash
$ nvm use 14.7.0
$ nrm use ekb
$ yarn config set registry https://npm.ekuaibao.com/
```



- 下载依赖，并运行项目，必须按照文档步骤来！！

```bash
$ yarn install
$ yarn run build:pre:dev
$ yarn run start
```



- 最好在本地新建一个分支进行个人开发

```bash
$ git checkout -b feature/N/czyTest
```



- 记住公司的项目端口号地址：http://localhost:9966/web/app.html



- VScode 工作区适配 prettier：.vscode/setting.json

```json
{
  "files.eol": "\n",
  "editor.tabSize": 2,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 设置自动保存
  }
}
```



- **将工作区 TS 的版本设置为项目所需的版本：**在右下角的编辑器语言里面进行 TS 版本的选择，在 @types/react 中查看项目对应的 TS 版本：www.npmjs.com/package/@types/react?activeTab=versions





## 6.29

Gitlab、公司 SSO 账户：chenzhiyi@hosecloud.com 2002CZYczy

公司项目用到了 mobx5 和 React 类组件的使用，所以需要再熟悉一下。

mobx5 官网：https://cn.mobx.js.org/

学习文档：https://blog.csdn.net/qq_35812380/article/details/124423899

还有记得申请电脑补贴！！
