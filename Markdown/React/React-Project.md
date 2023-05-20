# 第一章 项目初始化配置

## 1.1 ESlint 的详细使用方法

ESLint 是一个可配置的 JavaScript 检查器（实际上可以检查 JS、TS、JSX、TSX、VUE 等主流文件格式）。它可以帮助你发现并修复 JavaScript 代码中的问题。问题可以指潜在的运行时漏洞、未使用最佳实践、风格问题等



关于 .eslintrc.js 文件配置的介绍

- extends：一些拓展封装了它自定义的语法规则，通过下载配置即可继承别人写好的配置规则
- parser：指定一个代码解析器的引擎，让它去检测代码是不是正规合法的，一般情况下使用默认的
- rules：我们自定义的规则，它的优先级是最高的，需要遵循自定义规则规范
- env：指定脚本允许运行的环境，通常 node、browser、es6 全都开启



中文官网：https://zh-hans.eslint.org/docs/latest/

规则大全：https://zh-hans.eslint.org/docs/latest/rules/

自定义规则规范：https://zh-hans.eslint.org/docs/latest/use/configure/rules



安装

```bash
$ npm i eslint -D

$ npx eslint --init # 根据提出的问题会自动生成 .eslintrc.js
```



配置插件：下载 `ESlint` 插件，启用。在 VScode 设置中搜索 `eslint` 可编辑配置（一般不需要编辑）



添加 `lint` 全局检查命令

```json
"lint": "eslint --ext .js,.ts,.tsx src"
```



实现保存时自动进行 ESlint autofix，进入 .vscode/setting.json 添加

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```



下面是我自定义的一些规则仅供参考

```js
rules: {
    "indent": ["error", 4], // 缩进

    // "no-unused-vars": [
    //     "error", { "varsIgnorePattern": "Taro|wx" }
    // ], // 检查变量是否有被使用

    "no-unused-vars": 0,

    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"], // 禁止空格和tab的混合缩进

    "no-debugger": 2, //禁止有debugger

    "space-infix-ops": 2, // 要求操作符周围有空格

    "space-before-blocks": 2, // 要求语句块之前有空格

    "import/first": 0, // 消除绝对路径必须要在相对路径前引入的问题

    "semi": ["error", "never"], // 不允许加分号
}
```



ESLint 全方位解析：https://blog.csdn.net/brokenkay/article/details/111106266

React ESlint 报错处理：https://blog.csdn.net/Yuj_l/article/details/125655060



## 1.2 Prettier 的使用和抛弃

Prettier 提供代码格式化方案，**通过下载依赖和插件，设置 .prettierrc.js 的代码格式**。实现保存时自动进行代码格式化。它可以支持 JS、JSX、TS、Flow、JSON、CSS、LESS 等文多种件格式

- 官方文档：https://www.prettier.cn/

- 基本使用指南：https://blog.csdn.net/weixin_44808483

- 代码格式大全：https://blog.csdn.net/weixin_44808483/article/details/118113753
- 到这里实现代码格式化已经基本够用，如果还使用了 ESlint 的话，就会造成冲突！
- 有人 ESlint 就行了，反正我的项目是不会使用 Prettier 的！！！



如果要将 Prettier 集成到 ESLint 当中的话，那么需要下载拓展

```bash
$ npm install prettier eslint-config-prettier eslint-plugin-prettier -D
```



添加拓展，这个拓展会把 ESlint 中可能导致冲突的规则关掉，这样两者就能兼容使用了

```js
"extends": [
    ......
    "plugin:prettier/recommended"
]
```



添加一键格式化命令

```json
"format": "prettier --write src\"/**/*.+(js|ts|tsx|jsx|json|md|json)\""
```



实现保存时自动进行 Prettier 格式化，进入 .vscode/setting.json 添加

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```



下面是自定义的一些代码格式仅供参考

```js
//此处的规则供参考，其中多半其实都是默认值，可以根据个人习惯改写
module.exports = {
  printWidth: 100, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: true, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'all', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  proseWrap: 'preserve', //不知道怎么翻译
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  endOfLine: 'lf', //结束行形式
  embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
}
```



## 1.3 提交代码前的检查

首先介绍 Husky，它可以编写脚本使得在代码提交之前，自动对代码进行格式化、优化、lint 检查。

通过搭配 lint-staged 实现每次提交仅对修改过的代码和未通过检查的文件进行检查。在提交的时候即可实现报错信息，且提交失败

![image-20230520222253415](mark-img/image-20230520222253415.png)



下载

```bash
$ npm i -D husky lint-staged
```

> 项目版本："lint-staged": "^13.2.2"  "husky": "^8.0.3"

配置 husky

```bash
$ npm pkg set scripts.prepare="husky install"

$ npm run prepare
```

配置 lint-staged

```js
{
    "lint-staged": "lint-staged"
}

// 新建 .lintstagedrc 文件
{
    "src/**/*.{js,ts,tsx,jsx}": "npm run lint"
}
```

添加 pre-commit 钩子，执行 `npm run lint-staged` 命令

```bash
$ npx husky add .husky/pre-commit "npm run lint-staged" 
```



参考文档：https://blog.csdn.net/huangpb123/article/details/102690412

Husky 入门教程：https://blog.csdn.net/HHoao/article/details/127833268

参考文档里面还有对 commit 格式规范检查的工具的使用