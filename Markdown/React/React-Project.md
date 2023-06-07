# 第一章 项目初始化配置

使用脚手架 `create-react-app` 启动一个项目，默认情况下**脚手架搭建的项目配置文件都是隐藏的**

因此使用 Craco 来对 `create-react-app` 进行自定义配置，主要要用于对 Webpack 的另外配置

新建 `craco.config.js` ，内部导出的模块中可以配置 Webpack 的一些选项

```js
const path = require('path')
const reslove = pathname => path.resolve(__dirname, pathname)

module.exports = {
    webpack: {
        alias: {
            '@': reslove('src'),
        }
    },

    devServer: {
        port: 8000,
        proxy: {
            '/api': 'http://localhost:3001',
        },
    },    
}
```

修改完 `craco.config.js` 必须要重启项目！！有点麻烦了



- Craco 官网：https://github.com/dilanx/craco
- Webpack 官网：https://www.webpackjs.com/

- `create-react-app` 中文文档：https://create-react-app.bootcss.com/



## 1.1 ESlint 的详细使用方法

ESLint 是一个可配置的 JavaScript 检查器（实际上可以检查 JS、TS、JSX、TSX、VUE 等主流文件格式）。它可以帮助你发现并修复 JavaScript 代码中的问题。问题可以指潜在的运行时漏洞、未使用最佳实践、风格问题等



关于 .eslintrc.js 文件配置的介绍

- extends：一些拓展封装了它自定义的语法规则，通过下载配置即可继承别人写好的配置规则
- parser：指定一个代码解析器的引擎，让它去检测代码是不是正规合法的，一般情况下使用默认的
- rules：我们自定义的规则，它的优先级是最高的，需要遵循自定义规则规范
- env：指定脚本允许运行的环境，通常 node、browser、es6 全都开启



配置 .eslintignore 忽略特定的文件和目录，其中的每一行都是一个 glob 模式

```
# Ignore build files
build
server
node_modules
```



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

通过搭配 lint-staged 实现每次提交仅对修改过的代码和未通过检查的文件进行检查。



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

添加 pre-commit 钩子

```bash
$ npx husky add .husky/pre-commit "npm run lint-staged" 
```



在提交的时候即可实现报错信息，且提交失败

![image-20230520222253415](mark-img/image-20230520222253415.png)



参考文档：https://blog.csdn.net/huangpb123/article/details/102690412

Husky 入门教程：https://blog.csdn.net/HHoao/article/details/127833268



commitlint：对 commit 提交格式规范检查的工具，使用方式也在参考文档里面

```
单行规范：type(scope?): subject
多行规范：type(scope?): subject 换行 body 换行 footer
例如：chore: run tests on travis ci
例如：fix(server): send cors headers
```

Github：https://github.com/conventional-changelog/commitlint





## 1.4 TS 在项目中的适配

这里会介绍一下项目中对于 TS 的一些适配情况。

tsconfig 配置文件讲解：https://blog.csdn.net/cs23405/article/details/115750351



**React.FC 以及 Props 传参**

React.FC 详细介绍：https://blog.csdn.net/qq_52421092/article/details/127628465，它主要起到一层函数组件规范的作用，如不能用 `setState`，取而代之的是 `useState()`、`useEffect` 等 Hook API

下面介绍 Props 传参方式

```tsx
<CardOption _id={ _id } />
```

```tsx
import React, { FC } from 'react'

interface PropsType {
    _id: string
}

const CardOption: FC<PropsType> = (props: PropsType) => {

    return (
    )
}
```



**useState 的 TS 声明及使用**

```tsx
const [selectedIds, setSelectedIds] = useState<string[]>([])

// 可强制声明类型避免报错
setSelectedIds(value as string[])
```



**指定 event 的类型**

使用 type 进行引入 `ChangeEvent<HTMLInputElement>`、`MouseEvent<HTMLButtonElement>`

```tsx
import React, { FC } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'

const Login: FC = () => {
    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
    }

    const btnClick = (event: MouseEvent<HTMLButtonElement>) => {
        console.log(event.target)
    }

    return (
        <div className='Login'>
            <input type='text' defaultValue='sdad' onChange={inputChange}/>

            <button onClick={btnClick}>click</button>
        </div>
    )
}
```





## 1.5 组件命名与文件夹规范

这是我在自己的项目里自定义的组件和文件夹命名规范，这里主要做下记录：

- src/layouts：存放 layout 组件，用于页面整体布局，使用 `outlet` 的地方
- src/components：存放公共普通组件
- src/views：存放所有的路由组件

- 有的时候一些公共的普通组件具有相同点的话，还会用一个文件夹进行包裹
- 涉及组件的文件、文件夹都使用驼峰式命名



**路由组件的规范**

首先路由组件放在 `views` 文件夹中，然后创建一个以该路由组件名字命名的文件夹，里面有 `index.tsx`、`index.module.scss`

如果路由组件中有嵌套路由组件，那么该嵌套路由组件也是一样创建一个以该路由组件名字命名的文件夹，里面有 `index.tsx`、`index.module.scss`



**普通组件的规范**

如果是公共的普通组件，那么放到 `components` 文件中，然后创建一个以该组件名字名字的文件夹，里面有 `index.tsx`、`index.module.scss`

如果是普通组件的子组件，那么在当前文件夹下创建 `components` 文件夹，子组件以自己的命名命名在 `components` 文件夹下创建 `JSX` 文件，如果有样式文件，还是在 `components` 文件夹下创建

如果是路由组件下的普通组件，那么在当前文件夹下创建 `components` 文件夹，子组件以自己的命名命名 `components` 文件夹下创建 `JSX` 文件，如果有样式文件，还是在 `components` 文件夹下创建





# 第二章 项目逻辑功能实现

## 2.1 CSS Module 的使用

**CSS Module**

**推荐文章：https://cloud.tencent.com/developer/article/1819624**

我们一般是一个 jsx 文件对应一个 css 文件，但是如果直接这样引入的话，会造成直接引入整个文件，而不是按需加载，这样处理就极有可能对 css 造成全局污染或者冲突，从而就无法达到我们组件化的目的了

```js
import './index.css'
```



Creat React APP 创建的项目原生支持了 CSS Module，**需要规范命名：`*.module.css`**，下面是使用方法

```jsx
import styles from './App.module.css'

(<div className={ styles.app }>
    <p className={ styles.item }>12445</p>
    <p className={ styles['app-black'] }>12445</p>
</div>)
```

```scss
.app {
    color: red;
	
    .app-black {
        color: black;
    }
}

.item {
    color: green;
}   

// 像其他的 CSS 文件一样直接使用类名（也就是普通的设置方法），而不是编译后的哈希字符串
:global(.ant-image-mask) {
    display: none;
}
```

> Creat React APP 创建的项目也原生支持了 SASS Module，直接将后缀名换成 SCSS 即可



![image-20230521160732154](mark-img/image-20230521160732154.png)





**对 TS 的适配**

- 参考文档：https://blog.csdn.net/cs23405/article/details/115752487

- 创建 src/custom.d.ts 声明文件

```js
declare module "*.css" {
    const css : {[key:string]:string};
    export default css;
}

declare module "*.scss" {
    const scss : {[key:string]:string};
    export default scss;
}
```

- **使用 TS 插件使得 VScode 在我们 style. 的时候出现提示**

```bash
$ npm install typescript-plugin-css-modules --save-dev
```

```json
// tsconfig.json
"compilerOptions": {
    ......
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
}
```

```json
// setting.json
{
    ......
    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true    
}
```



**CSS in JSX**

有两个推荐的库，可以实现在 jsx 中写 css，但是不推荐在 tsx 中使用因为又要声明一些类型防止报错！

- https://github.com/vercel/styled-jsx
- https://styled-components.com/



## 2.2 项目路由页面介绍

```markdown
## 页面对应的路由

- 首页 MainLayout -> home `/`
- 登录 `/login`
- 注册 `/register`

- 问卷管理 MainLayout -> ManageLayout `/manage`
    - 我的问卷 `/manage/list`
    - 星标问卷 `/manage/star`
    - 回收站 `/manage/trash`
    
- 问卷详情 QuestionLayout `/question`
    - 编辑问卷 `/question/edit/:id`
    - 问卷统计 `/question/stat/:id`
    
- 404 `/*`
```

`MainLayout`：主页面入口

`ManageLayout`：问卷管理页面入口

`QuestionLayout`：新建问卷页面入口





## 2.3 组件编写问题记录

### 2.3.1 React 使用图片相关组件

组件库：https://ant-design.antgroup.com/components/image-cn

```jsx
<img src={require('@/assets/images/react.png')} />

// antd 图片组件支持预览功能
<Image src={require('@/assets/images/react.png')} />
```

```css
img {
    width: 35px;
    height: 35px;
    cursor: pointer;
    object-fit: contain;
}

:global(.ant-image-mask) {
    display: none;
}
```



### 2.3.2 解决 100vw 出现滚动条

首先我们想让一个容器充满整个浏览器视口，并设置一个最小宽度

```scss
.container {
    width: 100vw;
    min-width: 1200px;
}
```

然后你会发现，当达到一定高度的时候，浏览器出现了纵向滚动条！紧接着横向滚动条也出现了！那是因为 100 vw 也包括了纵向滚动条的宽度

解决办法是**直接将 body 设置为充满整个浏览器视口（不包括纵向滚动条）**

```scss
body {
    width: 100%;
}

// 继承body的宽度即可
.container {
    width: 100%;
    min-width: 1200px;
}
```

> 补充：未指定宽度时，子元素会自动继承父元素的宽度



### 2.3.3 解决 textarea 换行问题

```tsx
// 定义一个文本域受控组件
import React, { FC, useState } from 'react'
import type { ChangeEvent } from 'react'

const Login: FC = () => {

    const textChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }

    const [text, setText] = useState('')

    return (
            <textarea onChange={textChange}></textarea>
            <div>{ text }</div> // 普通渲染会发现无法显示换行

    )
}
```

```tsx
// 使用这个属性可以成功显示换行
<div dangerouslySetInnerHTML={{ __html: text.replaceAll('\n', '<br>')}}></div>
```



### 2.3.4 搜索框组件设计理念

我们设计搜索框和分页器的时候，要遵循组件解耦原则，既不能修改列表组件里面的内容！于是我们可以通过修改组件之间存在的共同的东西 - 页面 URL，来实现组件间的交互。另外这里还实现了受控组件。

**那么搜索框组件的唯一功能就是点击搜索后，将页面 URL 添加 search 参数并页面跳转**

```tsx
import React, { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { LIST_SEARCH_KEY } from '@/constant'
import { Input } from 'antd'
const { Search } = Input

const ListSearch: FC = () => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams() 
    const [searchValue, setSearchValue] = useState('')

    // 监测页面url的search参数
    useEffect(() => {
        setSearchValue(searchParams.get(LIST_SEARCH_KEY))
    }, [searchParams])

    // 搜索时改变页面url传入search参数
    const onSearch = () => {
        nav({
            pathname,
            search: `${LIST_SEARCH_KEY}=${searchValue}`       
        })
    }
    
    // 双向数据绑定
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    return (
        <Search
            onSearch={onSearch}
            onChange={onChange}
            value={searchValue}
            style={{ width: 280 }}
            placeholder='请输入问卷标题...'
        />
    )
}

export default ListSearch
```



### 2.3.5 分页器组件设计理念

和搜索框一样，作用就是点击分页时改变 URL 中的 page、pageSize 属性，**并实现页面跳转。**

我们先将该组件变成一个受控组件，当发生 onChange 事件的时候修改 URL，监听 URL 更新组件受控属性

Pagination 分页器：https://ant-design.antgroup.com/components/pagination-cn

```tsx
type PropsType = {
    total: number // 数据总数由父组件传递
}

const ListPagination: FC<PropsType> = (props: PropsType) => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
	// 受控属性
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

    // 监听URL
    useEffect(() => {
        setCurrent(parseInt(searchParams.get(LIST_PAGE_KEY)) || 1)
        setPageSize(parseInt(searchParams.get(LIST_PAGE_SIZE_KEY)) || LIST_PAGE_SIZE)
    }, [searchParams])

    // 触发分页事件，修改URL search参数
    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        searchParams.set(LIST_PAGE_KEY, page.toString())
        searchParams.set(LIST_PAGE_SIZE_KEY, pageSize.toString())

        nav({
            pathname,
            search: searchParams.toString()
        })
    }

    return (
        <Pagination 
            current={current} 
            total={props.total} 
            onChange={onChange} 
            pageSize={pageSize} 
        />
    )
}
```





## 2.4 Antd 组件库的使用

### 2.4.1 定制主题和全局语言

一般基于 `ConfigProvider` 这个组件上进行设置，这里只是简单设置

全局主题变量：https://ant-design.antgroup.com/docs/react/customize-theme-cn#theme

```tsx
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

const antdTheme = {
    token: {
        borderRadius: 3, // 设置圆角
    }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ConfigProvider locale={zhCN} theme={antdTheme}>
        <App />
    </ConfigProvider>
)
```





### 2.4.2 Modal 对话框的使用

https://ant-design.antgroup.com/components/modal-cn

```tsx
import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: 'Do you Want to delete these items?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const App: React.FC = () => (
    <Button onClick={showConfirm}>Confirm</Button>
);

export default App;
```



### 2.4.3 Table 表格组件的使用

https://ant-design.antgroup.com/components/table-cn

```tsx
// 首先定义列名，一个对象对应一列
const tableColumns = [
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '是否发布',
        dataIndex: 'isPublished',
        
        // 自定义渲染
        render: (isPublished: boolean) => {
            return isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>
        },
    },
    {
        title: '答卷',
        dataIndex: 'answerCount',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
]
```

```jsx
// 数据
const [questionList] = useState([
    {
        _id: 'q1',
        title: '问卷1',
        isPublished: false,
        isStar: false,
        answerCount: 5,
        createdAt: '3月10日 13:23'
    },
    {
        _id: 'q2',
        title: '问卷2',
        isPublished: true,
        isStar: false,
        answerCount: 5,
        createdAt: '3月10日 13:23'
    },
])
```

```tsx
// 渲染
<Table
    rowKey='_id' // 设置唯一key
    pagination={false}
    columns={tableColumns}
    dataSource={questionList}
    style={{ width: '100%' }}
    rowSelection={{ onChange: onSelectedChange }}
/>
```



### 2.4.4 Form 表单的详细使用

#### 2.4.4.1 基础 Form 表单模板

`Form` 组件：最外层必须用 Form 包裹，内部属性如下：

- https://ant-design.antgroup.com/components/form-cn#form
- `labelCol`：设置每一个 Form.Item `label` 标签占总宽度的百分比 8/8+16
- `wrapperCol`：设置每一个 Form.Item 里面的内容（通常为输入框）占总宽度的百分比 
- `onFinish`：当点击 submit 按钮时，表单提交成功的回调函数



`From.Item` 组件，表单的每一项必须用它包裹，内部属性如下：

- https://ant-design.antgroup.com/components/form-cn#formitem

- `rules`：表单项的规则，后面会讲怎么用

- `Input`：输入框组件，有以下选择：`input`、` Input.Password`、` Input.Search`、` Input.TextArea`

- `valuePropName`：指定表单项值的属性（默认将表单项的 **value 属性**映射到了表单内部）

- `wrapperCol`：表单项自定义占总宽度的百分比 ，offset 为在此基础上**向右移动**的百分比距离

  

```tsx
<Form
    name='login'
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ width: 400 }}
    onFinish={onFinish}
>   
    <Form.Item
        label='用户名'
        name='username'
    >
        <Input />
    </Form.Item>

    <Form.Item
        label='密码'
        name='password'
    >
        <Input.Password />
    </Form.Item>

    <Form.Item name='remember' valuePropName='checked' 
        wrapperCol={{ offset: 8, span: 16 }}
    >
        <Checkbox>记住我</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
            登录
        </Button>
    </Form.Item>
</Form>
```



#### 2.4.4.2 指定 Form.Item 规则

可新建 `formRules.ts` 文件导出每个表单项所用到的规则，以下规则的类型和使用方式：

https://ant-design.antgroup.com/components/form-cn#rule

```ts
import { Rule } from 'antd/es/form'

export const usernameRulse: Rule[] = [
    { required: true, message: '用户名不能为空！' },
    
    { type: 'string', min: 5, max: 13, message: '用户名长度必须在5-13之间' },
    
    { pattern: /^\w+$/, message: '用户名只能是字母数字下划线' },
]
```

> 一个对象对应一条规则！！



自定义校验规则，通过设置 `validator(rules, value)` 函数，然后返回 promise

```ts
export const confirmPasswordRules: Rule[] = [
    {
        // 这里规定必须输入123，否则报错
        validator(rules, value) {
            if (value == '123') {
                return Promise.resolve()
            } else {
                return Promise.reject(new Error('123'))
            }
        }
    }
]
```

```ts
// 来一个更高级的
export const confirmPasswordRules: Rule[] = [
 
    // 这里使用一个函数来返回一条规则，函数参数接收formRef表单实例
    (formRef) => ({
        validator(rules, value) {
            if (!value || formRef.getFieldValue('password') === value) {
                return Promise.resolve()
            } else {
                return Promise.reject(new Error('两次密码不一致'))
            }
        }
    }),
]
```



组件中对表单项使用规则

```tsx
import { usernameRulse, passwordRules, confirmPasswordRules } from './hooks/formRules'

<Form.Item
    label='用户名'
    name='username'
    rules={usernameRulse}
>
```





#### 2.4.4.3 获取 Form 表单实例

**函数式组件**

```tsx
const [formRef] = Form.useForm()

<Form
    form={formRef}
>   
```



**类组件**

```tsx
import type { FormInstance } from 'antd/es/form'
const formRef = React.useRef<FormInstance>(null)

<Form
  ref={formRef}
>
      
forRef.current | null
```



**Form 表单实例**

实例封装的 API 如下：https://ant-design.antgroup.com/components/form-cn#forminstance

- `validateFields`：进行表单校验

```ts
const btnClick = () => {
    formRef.validateFields().then((values) => {
        console.log(values)
    }).catch((err) => {
        console.log(err)
    })
}
```

> `formRef.validateFields(['username'])` 可指定只对 username 属性进行校验





## 2.5 ahooks 的使用记录

### 2.5.1 useRequest 处理异步函数

**useRequest(service, option)**

- service 为一个异步函数，option 为一个配置对象
- 自动模式下该 Hook 会在组件初始化时执行
- 该 Hook 返回 data、loading、error、refresh 等
- 使用文档：https://ahooks.gitee.io/zh-CN/hooks/use-request/index

```js
// service 函数的类型1
function getData() {
    return new Promise(function(resolve, reject) {
        if () resolve(res)
        if () reject(err)
    })
}

// service 函数的类型2
export async function createQuestionApi(): Promise<ResDataType> {
    const url = '/api/question'
    const res = await axiosInstance.post(url) as ResType
    if (res.errno === 0) return res.data as ResDataType
    return Promise.reject({} as ResDataType)
}
```



**service 函数接收参数必须写成回调函数**

```ts
const { loading, data } = useRequest(() => getQuestionPageListApi(SearchOption), {
    refreshDeps: [searchParams]
})
```



**在组件初始化时，会自动执行该异步函数**

```js
const { data, error, loading } = useRequest(service)
```

> data 会从 undefined 变成异步函数成功态的返回结果，error 为失败态返回结果



**通过设置 refreshDeps 配置实现监听效果，即依赖项改变则异步函数触发一次**

```ts
const { loading, data } = useRequest(getQuestionPageListApi, {
    refreshDeps: [searchParams]
})
```



**手动触发模式，通过调用暴露的 run 同步函数触发**

```js
const { loading, run: createQuestion  } = useRequest(createQuestionApi, {
    manual: true,

    // 处理成功的回调（promise 为成功态）
    onSuccess: (data) => {
        nav('/question')
        message.success('新建问卷成功')
    },
})
```





## 2.6 Hooks 导出数据与维护

当我们使用 Hooks 导入的数据时，**该数据有三大特点：是响应式的、单项数据流只读、初始值可能为空**

我们还可以从里面**解构赋值，其数据也具有三大特点！**

```ts
const { data: questionData, loading } = useLoadQueList({ isDeleted: true })
const { list: questionList = [] } = questionData || { list: [] }
```



另外我们可以在我们组件中**使用 useState 维护内部的数据。**如果以 Hooks 导出的数据作为初始值，则需要设置 useEffect 来监听依赖的数据，另外还可以在其他地方手动修改内部维护的数据

```ts
const [questionListState, setQuestionListState] = useState(questionList)

// 自动根据依赖更新
useEffect(() => {
    setQuestionListState(questionList)
}, [questionList])
```



这里收集一下 setState 的常用方式

- **过滤数组：直接用 filter**

```ts
setQuestionListState(questionListState.filter(item => {
    if (selectedIds.includes(item._id)) return false
    return true
}))   
```



- **数组添加元素：直接用 concat**

```ts
setQuestionList(questionList.concat(data1, data2))
```





#  第三章 项目服务端与跨域代理

在我们没有后端接口的时候我们难免需要自己搭建一个 Mock 接口，实现与后端的同步开发。当后端的工作完成之后，再把 Mock 接口替换成真实接口。这样便可以大大提升效率！**（全栈开发时服务端可不能用 Mock！）**

因此，搭建 Mock 接口是必须掌握的技能。下面是它三种实现方式：

-  **直接使用 Mockjs 搭建：**可获取随机的数据，直接在前端项目中启动， 只适用于开发环境
- **使用 Nodejs 搭建 Web 服务器：**通过 Express、Koa 等框架手动实现服务端 Mock 接口，

- **使用第三方 Mock 服务：**[一些前端 Mock 工具](https://cloud.tencent.com/developer/article/1980086)，可以自行搜索其他网站，一键生成 Mock 接口



前端项目在开发模式下发送请求的时候通过使用打包工具（Webpack、Vite 等）提供的中间件来实现反向代理从而实现跨域，**发送请求时如果不加上 ip 地址，则默认为本地地址。**另外通常会使用 Axios 来发送请求。



## 3.1 直接使用 Mockjs 搭建

前面其实已经学习过 Mockjs 这个库了，这里再总结一下使用方法

- 使用其内部的 API 可以产生随机的数提供我们使用
- 可以启动 Mockjs 服务来实现请求拦截的效果，不过只适用于开发环境
- 安装：`npm i mockjs -D  @types/mockjs`
- Mock.mock 启动拦截：https://github.com/nuysoft/Mock/wiki/Mock.mock()
- Mock.Random 产生随机数：https://github.com/nuysoft/Mock/wiki/Mock.Random



使用案例：新建 `mock/index.js`

```ts
import Mock from 'mockjs'
const Random = Mock.Random
import banner from './data/banner.json'
interface DataList {
    date: string,
    name: string,
    address: string
}

// 生成随机数数组
const dataList: DataList[] = []
for (let i = 0; i < 100; i++) {
    const template = {
        date: Random.date(), // 生成一个随机日期,可加参数定义日期格式
        name: Random.name(), // 生成姓名
        address: Random.province() // 生成地址
    }
    dataList.push(template)
}

// get 请求
Mock.mock('/mock/banner',{
    'code': '200',
    'message': '获取成功',    
    data: banner,    
})

// post 请求
Mock.mock('/mock/list', 'post', (params: any) => {
    let info = JSON.parse(params.body)
    let [index, size, total] = [info.current, info.pageSize, dataList.length]
    let len = total / size
    let totalPages = len - parseInt(String(len)) > 0 ? parseInt(String(len)) + 1 : len
    let newDataList = dataList.slice(index * size, (index + 1) * size)

    return {
        'code': '200',
        'message': '获取成功',
        'data': {
            'current': index,
            'pageSize': size,
            'rows': newDataList,
            'total': total,
            'totalPages': totalPages
        }
    }
})
```

- 启动服务：直接在入口文件中引入 `mock/index.js`
- 发送请求：mock 地址为 `http://localhost:3001/mock/list`





## 3.2 Koa 搭建服务端接口

这里简单使用 Koa + Koa-route 进行服务端 Mock 接口的搭建。。。

- 安装：`npm i koa-router koa -D  `

- `router.get(url, function(ctx))`：生成一个 `get` 请求，通过 `ctx.body` 设置响应体
- `app.use(router.routes())`：启动  Koa-route 中间件
- Koa 官网：http://www.koajs.com.cn/
- Koa-route：https://github.com/ZijianHe/koa-router



**server/index.js**

```js
const Koa = require('koa')
const Router = require('koa-router')
const { resolve } = require('path')
const routerOption = require('./router')

const app = new Koa()
const router = new Router()

routerOption.forEach(route => {
    const { url, method, response } = route

    router[method](url, async ctx => {
        ctx.body = await asyncGetRes(response, ctx)
    })
})

// 设置1s的延迟效果
const asyncGetRes = async (fn, ...args) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(fn(...args)), 1200)
    })
}

app.use(router.routes())
app.listen(3001)
console.log('http://localhost:3001 服务接口已启动')
```

> nodemon server/index.js 启动服务



**配置单个 route: router/routes/question.js**

```js
const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
    // 创建问卷
    {
        url: '/api/question',
        method: 'post',
        response(ctx) {
            return {
                errno: 0,
                data: {
                    id: Random.id()
                  	ctx
                }
            }
        }
    },
]
```

> 接口地址：`http://localhost:3001/api/question`



获取 GET 请求中的 params 参数：通过 ctx.query 获取，**且所有数据均为字符串类型**





## 3.3 服务端接口架构分析

我还是觉得我这个个人项目如果只写 Mock 接口的话真的有点像过家家一样。。。关键是我这个项目如果要实现后端所有的真实接口工作量又会加大！没办法作为前端的我只能硬着头皮写 Mock 接口了！

前端和后端写接口之前要对 API 进行设计，使用 Restful API 返回统一的格式。这里主要指定接口的 `method`、`path` 和 `response` 返回的响应体数据的格式，下面是一些例子

```markdown
### 获取用户信息

- method `get`
- path `/api/user/info`
- response `{ errno: 0, data: {...} }` 或 `{ errno: 10001, msg: 'xxx' }`

### 注册

- method `post`
- path `/api/user/register`
- request body `{ username, password, nickname }`
- response `{ errno: 0 }`
```





## 3.4 反向代理跨域的实现

一般都是通过 proxy 选项来进行对不同域名跨域的配置，下面以 Webpack 为例来说明（Vite 操作基本一致）

- 另外 proxy 选项里面还有一些其他属性，这里就不做介绍了
- Webpack 修改配置之后项目必须重启之后才能生效

- Webpack：https://www.webpackjs.com/configuration/dev-server/#devserverproxy

- Vite：https://cn.vitejs.dev/config/server-options.html#server-proxy



**配置基本的反向代理**

设置所有请求接口地址中带有 `api` 字段的地址都反向代理到本地端口上实现跨域，让浏览器以为发送的是前面那个没有跨域的接口地址，实际上发送的是后面那个真实的接口地址

`http://localhost:8000/api/list` => `http://localhost:3000/api/list`

```js
module.exports = {
    ......
    devServer: {
        port: 8000,
        proxy: {
            '/api': 'http://localhost:3000',
        },        
    },    
}
```



**实现路径重写的效果**

设置所有请求接口地址中带有 `api` 字段的地址都反向代理到本地端口上实现跨域，同时把 `api` 字段抹去

`http://localhost:8000/api/list` => `http://localhost:3000/list`

**如此可以实现利用多个不同字段来区分并配置多个跨域接口**

```js
module.exports = {
	......
    devServer: {
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },            
        },
    },    
}
```



**多个字段配置同一个跨域接口**

`http://localhost:8000/api/list` => `http://localhost:3000/api/list`

`http://localhost:8000/auth/list` => `http://localhost:3000/auth/list`

```js
module.exports = {
	......
    devServer: {
        port: 8000,
        proxy: [
            {
                context: ['/auth', '/api'],
                target: 'http://localhost:3001',
            },
        ],        
    },    
}
```





## 3.5 Axios 的详细使用

Axios 适用于浏览器环境和 Nodejs 环境，可以直接使用 Axios 发送请求，也可以先创建一个 Axios 实例，对每个请求做出请求响应拦截和设置公共属性

- 每次请求的结果为一个 Promise 对象
- 响应结果里面的 JSON 数据会被自动转换
- 可实现取消请求、超时处理，客户端支持防御[XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
- 无需手动写 TS，TypeScript 类型推断会自动完成
- Aixos API：https://axios-http.com/zh/docs/api_intro



### 3.5.1 Axios 的使用案例

直接安装：`npm install axios`

**axios.get:** https://axios-http.com/zh/docs/example

```js
axios.get('/user?ID=12345')
.then(function (response) {
    // 处理成功情况
    console.log(response);
})
.catch(function (error) {
    // 处理错误情况
    console.log(error);
})
.finally(function () {
    // 总是会执行
});

axios.get('/user', {
    params: {
        ID: 12345
    },
    header: {
        ...
    }
})

// 支持async/await用法
async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
```



**axios.post:** https://axios-http.com/zh/docs/post_example

```js
const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3]
  }, {
    
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    
})

// 支持将 HTML From 转化为 JSON，请求体为一个 HTML From
const {data} = await axios.post('/user', document.querySelector('#my-form'), {
  headers: {
    'Content-Type': 'application/json'
  }
})
```



**支持并发请求**

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);
```



### 3.5.2 Axios 的实例封装

- 使用实例通常搭配拦截器使用，并设置一些发送请求的默认值
- 创建一个 Axios 实例：https://axios-http.com/zh/docs/instance
- 这里有介绍拦截器的阶段：https://axios-http.com/zh/docs/interceptors

```js
import axios from 'axios'
import { message } from 'antd'

const axiosInstance = axios.create({
    // 设置一些发送请求的默认值: headers baseURL
    timeout: 5000,
})

// 请求拦截器
axiosInstance.interceptors.request.use(function(config) {
    return config
})

// 响应拦截器
axiosInstance.interceptors.response.use(function(response) {

    // 统一输出错误提示
    const res: any = response.data || {}
    if (res.errno !== 0) {
        if (res.msg) message.error(res.msg)
    }

    // 直接返回响应体内容
    return res

}, error => {
    // 开发模式下打印
    console.log(error) 
    console.log('响应状态码不为2xx，请检查请求地址是否出错')

    // 统一输出错误提示
    message.error('请求失败，请稍后重试')
    return error
})

export default axiosInstance
```



**特别介绍一下 baseURL**

设置之后可以对每个由该 Axios 实例发出的请求添加一个头字段，可以搭配代理里面的路径重写一起使用！

```js
baseURL: 'server/'
'http://localhost:8000/api/list' => 'http://localhost:8000/server/api/list'
```



同时配置代理跨域路径重写和 baseURL

```js
'/server': {
    target: 'http://localhost:3000',
    pathRewrite: { '^/server': '' },
},            

baseURL: 'server/'
```

实现发送请求时：`axiosInstance.get('api/list') ` 得到地址默认添加 server 字段实现代理，然后又清除

`http://localhost:8000/server/api/list` => `http://localhost:3000/api/list`





## 3.6 前端处理异步请求流程

- 经过封装之后，前端业务中不需要处理请求失败的情况（但需要处理请求成功的情况，如输出成功提示）

- Axios 实例中统一输出了错误提示。如果请求失败（响应码不为 2xx 或者 res.errno 不等于 0）得到的结果统一为一个空对象的 Promise 失败态！如果请求成功则获得 res.data 对象
- 替换成真实接口时，修改代理域名和接口 API 调用函数中的 URL 即可

- Mock 接口或真实接口响应体内容规范如下，**注意 data 里面的属性名也必须要一致！**

```js
{
    errno: 0,
    data: {
        id: Random.id()
        list: [...]
    }
}
{
    errno: 404,
    msg: '新建问卷失败'
}
```



**首先设置跨域代理**

```js
devServer: {
    port: 8000,
    proxy: {
        '/api': 'http://localhost:3001',
    },        
},    
```



**然后封装 Axios 实例**

- 响应成功时根据响应头内容的 `errno` 属性输出错误提示，否则直接返回响应头内容 

- 响应失败时（响应状态码不为2xx），打印错误，输出错误提示，返回 AxiosError 对象

```ts
import axios from 'axios'
import { message } from 'antd'

const axiosInstance = axios.create({
    // 设置一些发送请求的默认值: headers baseURL
    timeout: 5000,
})

// 请求拦截器
axiosInstance.interceptors.request.use(function(config) {
    return config
})

// 响应拦截器
axiosInstance.interceptors.response.use(function(response) {

    // 统一输出错误提示
    const res: any = response.data || {}
    if (res.errno !== 0) {
        if (res.msg) message.error(res.msg)
    }

    // 直接返回响应体内容
    return res

}, error => {
    // 开发模式下打印
    console.log(error) 
    console.log('响应状态码不为2xx，请检查请求地址是否出错')

    // 统一输出错误提示
    message.error('请求失败，请稍后重试')
    return error
})

export default axiosInstance
```



**统一规范接口 API 调用函数**

- 新建文件夹 services，根据接口 API 的不同类型划分模块，如有关问卷的 API 就放在 question.js 中
- 调用 `axiosInstance`方法之后接收 **ResType的响应体内容** 或者 **AxiosError对象**
- **统一规范接口 API 调用函数返回 响应体内容的 data 属性 或者 一个空对象的 Promise 失败态**
- 接口 API 调用函数为 async 函数，调用获取结果依然需要获取

```ts
import axiosInstance from '@/utils/axiosInstance'
type ResType = {
    errno: number,
    data?: ResDataType,
    msg?: string
}

type ResDataType = {
    [key: string]: any
}

// 新建问卷
export async function createQuestionApi(): Promise<ResDataType> {
    const url = '/api/question'
    const res = await axiosInstance.post(url) as ResType
    if (res.errno === 0) return res.data as ResDataType
    return Promise.reject({} as ResDataType)
}

// 获取某页问卷列表
export async function getQuestionPageListApi(): Promise<ResDataType> {
    const url = '/api/question'
    const res = await axiosInstance.get(url) as ResType
    if (res.errno === 0) return res.data as ResDataType
    return Promise.reject({} as ResDataType)
}
```



**前端业务中使用接口 API 调用函数**

- data 可以得到响应体内容的 data 属性 或者 空对象

- 这里只是简单使用，通过 async/await
- 更强大的使用可以去看 ahooks 的 useRequest，专门用来处理异步函数的解决方案

```ts
useEffect(() => {
    async function getQuestionPageList() {
        const data = await getQuestionPageListApi()
        console.log(data)
    }

    getQuestionPageList()
}, [])
```

