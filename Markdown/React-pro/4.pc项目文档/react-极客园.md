# 项目准备

## 1. 项目介绍

`本节目标:`  了解项目的定位和功能

- 项目功能演示
  - 登录、退出
  - 首页
  - 内容（文章）管理：文章列表、发布文章、修改文章
- 技术
  - React 官方脚手架 `create-react-app`
  - react hooks
  - 状态管理：mobx
  - UI 组件库：`antd` v4
  - ajax请求库：`axios`
  - 路由：`react-router-dom` 以及 `history`
  - 富文本编辑器：`react-quill`
  - CSS 预编译器：`sass`

## 2. 项目搭建

`本节目标:`  能够基于脚手架搭建项目基本结构

**实现步骤**

1. 使用create-react-app生成项目   `npx create-react-app geek-pc`

2. 进入根目录  `cd geek-pc`

3. 启动项目   `yarn start`

4. 调整项目目录结构

   ```bash
   /src
     /assets         项目资源文件，比如，图片 等
     /components     通用组件
     /pages          页面
     /store          mobx 状态仓库
     /utils          工具，比如，token、axios 的封装等
     App.js          根组件
     index.css       全局样式
     index.js        项目入口
   ```

**保留核心代码**

`src/index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

`src/App.js`

```jsx
export default function App() {
  return <div>根组件</div>
}
```

## 3. 使用gitee管理项目

`本节目标:`  能够将项目推送到gitee远程仓库

**实现步骤**

1. 在项目根目录打开终端，并初始化 git 仓库（如果已经有了 git 仓库，无需重复该步），命令：`git init`
2. 添加项目内容到暂存区：`git add .`
3. 提交项目内容到仓库区：`git commit -m '项目初始化'`
4. 添加 remote 仓库地址：`git remote add origin [gitee 仓库地址]`
5. 将项目内容推送到 gitee：`git push origin master -u`



## 4. 使用scss预处理器

`本节目标:`  能够在CRA中使用sass书写样式

`SASS` 是一种预编译的 CSS，作用类似于 Less。由于 React 中内置了处理 SASS 的配置，所以，在 CRA 创建的项目中，可以直接使用 SASS 来写样式

**实现步骤**

1. 安装解析 sass 的包：`yarn add sass -D`

2. 创建全局样式文件：`index.scss`

   ```scss
   body {
     margin: 0;
   }
   
   #root {
     height: 100%;
   }
   ```

## 5. 配置基础路由

`本节目标:` 能够配置登录页面的路由并显示到页面中

**实现步骤**

1. 安装路由：`yarn add react-router-dom`
2. 在 pages 目录中创建两个文件夹：Login、Layout
3. 分别在两个目录中创建 index.js 文件，并创建一个简单的组件后导出
4. 在 App 组件中，导入路由组件以及两个页面组件
5. 配置 Login 和 Layout 的路由规则

**代码实现**

`pages/Login/index.js`

```jsx
const Login = () => {
  return <div>login</div>
}
export default Login
```

`pages/Layout/index.js`

```jsx
const Layout = () => {
  return <div>layout</div>
}
export default Layout
```

`app.js`

```jsx
// 导入路由
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// 导入页面组件
import Login from './pages/Login'
import Layout from './pages/Layout'

// 配置路由规则
function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <Routes>
            <Route path="/" element={<Layout/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
```

## 6. 组件库antd使用

`本节目标:`  能够使用antd的Button组件渲染按钮

**实现步骤**

1. 安装 antd 组件库：`yarn add antd`
2. 全局导入 antd 组件库的样式
3. 导入 Button 组件
4. 在 Login 页面渲染 Button 组件进行测试

**代码实现**

`src/index.js`

```js
// 先导入 antd 样式文件
// https://github.com/ant-design/ant-design/issues/33327
import 'antd/dist/antd.min.css'
// 再导入全局样式文件，防止样式覆盖！
import './index.css'
```

`pages/Login/index.js `

```jsx
import { Button } from 'antd'

const Login = () => (
  <div>
    <Button type="primary">Button</Button>
  </div>
)
```

**易错总结**

1. 在哪个文件中导入 antd 的样式文件？
2. antd 的样式文件和我们自己的全局样式文件的导入顺序？

## 7. 配置别名路径

`本节目标:`  能够配置@路径简化路径处理

> [自定义 CRA 的默认配置](https://ant.design/docs/react/use-with-create-react-app-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE)
> [craco 配置文档](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration)
>
> - CRA 将所有工程化配置，都隐藏在了 `react-scripts` 包中，所以项目中看不到任何配置信息
> - 如果要修改 CRA 的默认配置，有以下几种方案：
>   1. 通过第三方库来修改，比如，`@craco/craco`  （推荐）
>   2. 通过执行 `yarn eject` 命令，释放 `react-scripts` 中的所有配置到项目中

**实现步骤**

1. 安装修改 CRA 配置的包：`yarn add -D @craco/craco`
2. 在项目根目录中创建 craco 的配置文件：`craco.config.js`，并在配置文件中配置路径别名
3. 修改 `package.json` 中的脚本命令
4. 在代码中，就可以通过 `@` 来表示 src 目录的绝对路径
5. 重启项目，让配置生效

**代码实现**

`craco.config.js`

```js
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

package.json

```json
// 将 start/build/test 三个命令修改为 craco 方式
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

## 8. @别名路径提示

`本节目标:`  能够让vscode识别@路径并给出路径提示

**实现步骤**

1. 在项目根目录创建 `jsconfig.json` 配置文件
2. 在配置文件中添加以下配置

**代码实现**

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

vscode会自动读取`jsconfig.json` 中的配置，让vscode知道@就是src目录

## 9. 安装dev-tools调试工具

> https://gitee.com/react-cp/react-pc-doc  这里找到dev-tools.crx文件

# 登录模块

## 1. 基本结构搭建

`本节目标:`  能够使用antd搭建基础布局

**实现步骤**

1. 在 Login/index.js 中创建登录页面基本结构
2. 在 Login 目录中创建 index.scss 文件，指定组件样式
3. 将 logo.png 和 login.png 拷贝到 assets 目录中

**代码实现**

`pages/Login/index.js`

```jsx
import { Card } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'

const Login = () => {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
      </Card>
    </div>
  )
}

export default Login
```

`pages/Login/index.scss`

```scss
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: center/cover url('~@/assets/login.png');

  .login-logo {
    width: 200px;
    height: 60px;
    display: block;
    margin: 0 auto 20px;
  }

  .login-container {
    width: 440px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);
  }

  .login-checkbox-label {
    color: #1890ff;
  }
}
```

## 2. 创建表单结构

`本节目标:` 能够使用antd的Form组件创建登录表单

**实现步骤**

1. 打开 antd [Form 组件文档](https://ant.design/components/form-cn/)
2. 找到代码演示的第一个示例（基本使用），点击`<>`（显示代码），并拷贝代码到组件中
3. 分析 Form 组件基本结构
4. 调整 Form 组件结构和样式

**代码实现**

`pages/Login/index.js `

```jsx
import { Form, Input, Button, Checkbox } from 'antd'
const Login = () => {
  return (
    <Form>
      <Form.Item>
        <Input size="large" placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item>
        <Input size="large" placeholder="请输入验证码" />
      </Form.Item>
      <Form.Item>
        <Checkbox className="login-checkbox-label">
          我已阅读并同意「用户协议」和「隐私条款」
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <!-- 渲染Button组件为submit按钮 -->
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
```

## 3. 表单校验实现

`本节目标:` 能够为手机号和密码添加表单校验

**实现步骤**

1. 为 Form 组件添加 `validateTrigger` 属性，指定校验触发时机的集合
2. 为 Form.Item 组件添加 name 属性，这样表单校验才会生效
3. 为 Form.Item 组件添加 `rules` 属性，用来添加表单校验

**代码实现**

`page/Login/index.js`

```jsx
const Login = () => {
  return (
    <Form validateTrigger={['onBlur', 'onChange']}>
      <Form.Item
        name="mobile"
        rules={[
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号码格式不对',
            validateTrigger: 'onBlur'
          },
          { required: true, message: '请输入手机号' }
        ]}
      >
        <Input size="large" placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
          { required: true, message: '请输入验证码' }
        ]}
      >
        <Input size="large" placeholder="请输入验证码" maxLength={6} />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox className="login-checkbox-label">
          我已阅读并同意「用户协议」和「隐私条款」
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
```

## 4. 获取登录表单数据

`本节目标:` 能够拿到登录表单中用户的手机号码和验证码

**实现步骤**

1. 为 Form 组件添加 `onFinish` 属性，该事件会在点击登录按钮时触发
2. 创建 onFinish 函数，通过函数参数 values 拿到表单值
4.  Form 组件添加 `initialValues` 属性，来初始化表单值

**代码实现**

`pages/Login/index.js`

```jsx
// 点击登录按钮时触发 参数values即是表单输入数据
const onFinish = values => {
  console.log(values)
}

<Form
  onFinish={ onFinish }
  initialValues={{
    mobile: '13911111111',
    code: '246810',
    remember: true
  }}
>...</Form>
```

## 5. 封装http工具模块

`本节目标:` 封装axios，简化操作

**实现步骤**

1. 创建 utils/http.js 文件
2. 创建 axios 实例，配置 baseURL，请求拦截器，响应拦截器
3. 在 utils/index.js 中，统一导出 http

**代码实现**

`utils/http.js`

```js
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config)=> {
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { http }
```

`utils/index.js`

```js
import { http } from './http'
export {  http }
```

## 6. 配置登录Mobx

`本节目标:`  基于mobx封装管理用户登录的store

`store/login.Store.js`

```js
// 登录模块
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class LoginStore {
  token = ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    this.token = res.data.token
  }
}
export default LoginStore
```

`store/index.js`

```js
import React from "react"
import LoginStore from './login.Store'

class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
```

## 7. 实现登录逻辑

`本节目标:`  在表单校验通过之后通过封装好的store调用登录接口

**实现步骤**

1. 使用useStore方法得到loginStore实例对象
2. 在校验通过之后，调用loginStore中的login函数
3. 登录成功之后跳转到首页

**代码实现**

```jsx
import { useStore } from '@/store'
const Login = () => {
  // 获取跳转实例对象
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async values => {
    const { mobile, code } = values
    try {
      await loginStore.login({ mobile, code })
      navigate('/')
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  return (...)
}
```

## 8. token持久化 

### 8.1 封装工具函数

`本节目标:`  能够统一处理 token 的持久化相关操作

**实现步骤**

1. 创建 utils/token.js 文件
2. 分别提供 getToken/setToken/clearToken/isAuth 四个工具函数并导出
3. 创建 utils/index.js 文件，统一导出 token.js 中的所有内容，来简化工具函数的导入
4. 将登录操作中用到 token 的地方，替换为该工具函数

**代码实现**

`utils/token.js`

```js
const TOKEN_KEY = 'itcast_geek_pc'

const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = token => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export { getToken, setToken, clearToken }
```

### 8.2 持久化设置

`本节目标:`  使用token函数持久化配置

**实现步骤**

1. 拿到token的时候一式两份，存本地一份
2. 初始化的时候优先从本地取，取不到再初始化为控制

**代码实现**

`store/login.Store.js`

```js
// 登录模块
import { makeAutoObservable } from "mobx"
import { setToken, getToken, clearToken, http } from '@/utils'

class LoginStore {
  // 这里哦！！
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    this.token = res.data.token
    // 还有这里哦！！
    setToken(res.data.token)
  }
 
}
export default LoginStore
```

## 9. 请求拦截器注入token

`本节目标:` 把token通过请求拦截器注入到请求头中

![token](assets/token.png)

> 拼接方式：config.headers.Authorization = `Bearer ${token}}`

`utils/http.js`

```js
http.interceptors.request.use(config => {
  // if not login add token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## 10. 路由鉴权实现

`本节目标:` 能够实现未登录时访问拦截并跳转到登录页面

**实现思路**

> 自己封装 `AuthRoute` 路由鉴权高阶组件，实现未登录拦截，并跳转到登录页面
>
> 思路为：判断本地是否有token，如果有，就返回子组件，否则就重定向到登录Login

**实现步骤**

1. 在 components 目录中，创建 AuthRoute/index.js 文件
2. 判断是否登录
3. 登录时，直接渲染相应页面组件
4. 未登录时，重定向到登录页面
5. 将需要鉴权的页面路由配置，替换为 AuthRoute 组件渲染

**代码实现**

`components/AuthRoute/index.js`

```jsx
// 1. 判断token是否存在
// 2. 如果存在 直接正常渲染
// 3. 如果不存在 重定向到登录路由

// 高阶组件:把一个组件当成另外一个组件的参数传入 然后通过一定的判断 返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

// <AuthComponent> <Layout/> </AuthComponent>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />

export {
  AuthRoute
}
```

`src/app.js`

```jsx

import { Router, Route } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'

function App() {
  return (
    <Router>
      <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/*" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          } />
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
       </Routes>
    </Router>
  )
}
export default App
```



# Layout模块

## 1. 基本结构搭建

`本节目标:`  能够使用antd搭建基础布局

**实现步骤**

1. 打开 antd/Layout 布局组件文档，找到示例：顶部-侧边布局-通栏
2. 拷贝示例代码到我们的 Layout 页面中
3. 分析并调整页面布局

**代码实现**

`pages/Layout/index.js`

```jsx
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const GeekLayout = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="1">
              数据概览
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="2">
              内容管理
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="3">
              发布文章
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>内容</Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
```

`pages/Layout/index.scss`

```scss
.ant-layout {
  height: 100%;
}

.header {
  padding: 0;
}

.logo {
  width: 200px;
  height: 60px;
  background: url('~@/assets/logo.png') no-repeat center / 160px auto;
}

.layout-content {
  overflow-y: auto;
}

.user-info {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 20px;
  color: #fff;

  .user-name {
    margin-right: 20px;
  }

  .user-logout {
    display: inline-block;
    cursor: pointer;
  }
}
.ant-layout-header {
  padding: 0 !important;
}
```

## 2. 二级路由配置

`本节目标:`  能够在右侧内容区域展示左侧菜单对应的页面内容

**使用步骤**

1. 在 pages 目录中，分别创建：Home（数据概览）/Article（内容管理）/Publish（发布文章）页面文件夹
2. 分别在三个文件夹中创建 index.js 并创建基础组件后导出
3. 在app.js中配置嵌套子路由，在layout.js中配置二级路由出口
4. 使用 Link 修改左侧菜单内容，与子路由规则匹配实现路由切换

**代码实现**

`pages/Home/index.js`

```jsx
const Home = () => {
  return <div>Home</div>
}
export default Home
```

`pages/Article/index.js`

```jsx
const Article = () => {
  return <div>Article</div>
}
export default Article
```

`pages/Publish/index.js`

```jsx
const Publish = () => {
  return <div>Publish</div>
}
export default Publish
```

`app.js`

```jsx
<Route path="/" element={
    <AuthRoute>
      <Layout />
    </AuthRoute>
  }>
    {/* 二级路由默认页面 */}
    <Route index element={<Home />} />
    <Route path="article" element={<Article />} />
    <Route path="publish" element={<Publish />} />
</Route>
<Route path="/login" element={<Login/>}></Route>
```

`pages/Layout/index.js`

```jsx
// 配置Link组件
<Menu
    mode="inline"
    theme="dark"
    style={{ height: '100%', borderRight: 0 }}
    selectedKeys={[selectedKey]}
    >
    <Menu.Item icon={<HomeOutlined />} key="/">
      <Link to="/">数据概览</Link>
    </Menu.Item>
    <Menu.Item icon={<DiffOutlined />} key="/article">
      <Link to="/article">内容管理</Link>
    </Menu.Item>
    <Menu.Item icon={<EditOutlined />} key="/publish">
      <Link to="/publish">发布文章</Link>
    </Menu.Item>
</Menu>

// 二级路由对应显示
<Layout className="layout-content" style={{ padding: 20 }}>
  <Routes>
    {/* 二级路由默认页面 */}
    <Outlet />
  </Routes>
</Layout>
```

## 3. 菜单高亮显示

`本节目标:`  能够在页面刷新的时候保持对应菜单高亮

> 思路
>
> 1. Menu组件的selectedKeys属性与Menu.Item组件的key属性发生匹配的时候，Item组件即可高亮
>
> 2. 页面刷新时，将`当前访问页面的路由地址`作为 Menu 选中项的值（selectedKeys）即可

**实现步骤**

1. 将 Menu 的` key` 属性修改为与其对应的路由地址
2. 获取到当前正在访问页面的路由地址
3. 将当前路由地址设置为 `selectedKeys` 属性的值

**代码实现**

`pages/Layout/index.js`

```jsx
import { useLocation } from 'react-router-dom'

const GeekLayout = () => {
  const location = useLocation()
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname

  return (
    // ...
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[selectedKey]}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item icon={<HomeOutlined />} key="/">
        <Link to="/">数据概览</Link>
      </Menu.Item>
      <Menu.Item icon={<DiffOutlined />} key="/article">
        <Link to="/article">内容管理</Link>
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />} key="/publish">
        <Link to="/publish">发布文章</Link>
      </Menu.Item>
    </Menu>
  )
}
```

## 4. 展示个人信息

`本节目标:`  能够在页面右上角展示登录用户名

**实现步骤**

1. 在store中新增userStore.js模块，在其中定义获取用户信息的mobx代码
2. 在store的入口文件中组合新增的userStore模块
3. 在Layout组件中调用action函数获取用户数据
4. 在Layout组件中获取个人信息并展示

**代码实现**

`store/user.Store.js`

```js
// 用户模块
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  async getUserInfo() {
    const res = await http.get('/user/profile')
    this.userInfo = res.data
  }
}

export default UserStore

```

`store/index.js`

```js
import React from "react"
import LoginStore from './login.Store'
import UserStore from './user.Store'

class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
  }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
```

`pages/Layout/index.js`

```jsx
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const GeekLayout = () => {
  const { userStore } = useStore()
  // 获取用户数据
  useEffect(() => {
    try {
      userStore.getUserInfo()
    } catch { }
  }, [userStore])
    
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
        </div>
      </Header>
      {/* 省略无关代码 */}
    </Layout>
  )
}

export default observer(GeekLayout)
```

## 5. 退出登录实现

`本节目标:`  能够实现退出登录功能

**实现步骤**

1. 为气泡确认框添加确认回调事件
2. 在`store/login.Store.js` 中新增退出登录的action函数，在其中删除token
3. 在回调事件中，调用loginStore中的退出action
4. 退出后，返回登录页面

**代码实现**

`store/login.Store.js`

```js
class LoginStore {
  
  // 退出登录
  loginOut = () => {
    this.token = ''
    clearToken()
  }
}

export default LoginStore
```

`pages/Layout/index.js`

```jsx
// login out
const navigate = useNavigate()
const onLogout = () => {
    loginStore.loginOut()
    navigate('/login')
}

<span className="user-logout">
    <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
      <LogoutOutlined /> 退出
    </Popconfirm>
</span>
```

## 6. 处理Token失效

`本节目标:`  能够在响应拦截器中处理token失效

> 说明：为了能够在非组件环境下拿到路由信息，需要我们安装一个history包

![](assets/historyoutside.png)

**实现步骤**

1. 安装：`yarn add history`
2. 创建 `utils/history.js `文件
3. 在app.js中使用我们新建的路由并配置history参数
4. 通过响应拦截器处理 token 失效

**代码实现**

`utils/history.js`

```js
// https://github.com/remix-run/react-router/issues/8264

import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
const history = createBrowserHistory()

export {
  HistoryRouter,
  history
}
```

`app.js`

```jsx
import { HistoryRouter, history } from './utils/history'

function App() {
  return (
    <HistoryRouter history={history}>
       ...省略无关代码
    </HistoryRouter>
  )
}

export default App
```

`utils/http.js`

```js
import { history } from './history'

http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      // 删除token
      clearToken()
      // 跳转到登录页
      history.push('/login')
    }
    return Promise.reject(error)
  }
)
```

## 7. 首页Home图表展示

`本节目标:`  实现首页echart图表封装展示

![](assets/home.png)

**需求描述：**

1. 使用eharts配合react封装柱状图组件Bar
2. 要求组件的标题title，横向数据xData，纵向数据yData，样式style可定制

**代码实现**

`components/Bar/index.js`

```jsx
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function echartInit (node, xData, sData, title) {
  const myChart = echarts.init(node)
  // 绘制图表
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: sData
      }
    ]
  })
}

function Bar ({ style, xData, sData, title }) {
  // 1. 先不考虑传参问题  静态数据渲染到页面中
  // 2. 把那些用户可能定制的参数 抽象props (1.定制大小 2.data 以及说明文字)
  const nodeRef = useRef(null)
  useEffect(() => {
    echartInit(nodeRef.current, xData, sData, title)
  }, [xData, sData])

  return (
    <div ref={nodeRef} style={style}></div>
  )
}

export default Bar
```



`pages/Home/index.js`

```jsx

import Bar from "@/components/Bar"
import './index.scss'
const Home = () => {
  return (
    <div className="home">
      <Bar
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        sData={[50, 60, 70]}
        title='三大框架满意度' />

      <Bar
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        sData={[50, 60, 70]}
        title='三大框架使用度' />
    </div>
  )
}

export default Home
```

`pages/Home/index.scss`

```scss
.home {
  width: 100%;
  height: 100%;
  align-items: center;
}
```

# 内容管理

## 1. 筛选区结构

`本节目标:` 能够使用antd组件库搭建筛选区域结构

![](assets/search.png)

> 重点关注
>
> 1. 如何让RangePicker日期范围选择框选择中文
>
> 2. Select组件配合Form.Item使用时，如何配置默认选中项
>
>      ` <Form initialValues={{ status: null }} >`

**代码实现**

```jsx
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Article
```

## 2. 表格区域结构

`本节目标:` 能够基于Table组件搭建表格结构

> 重点关注
>
> 1. 通过哪个属性指定Table组件的列信息
> 2. 通过哪个属性指定Table数据
> 3. 通过哪个属性指定Table列表用到的key属性

**代码实现**

```jsx
import { Link } from 'react-router-dom'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'

const Article = () => {
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: cover => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]

  const data = [
      {
          id: '8218',
          comment_count: 0,
          cover: {
            images:['http://geek.itheima.net/resources/images/15.jpg'],
          },
          like_count: 0,
          pubdate: '2019-03-11 09:00:00',
          read_count: 2,
          status: 2,
          title: 'wkwebview离线化加载h5资源解决方案' 
      }
  ]
  
  return (
    <div>
      <Card title={`根据筛选条件共查询到 count 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}
```

## 3. 渲染频道数据

`本节目标:`  使用接口数据渲染频道列表

**实现步骤**

1. 使用axios获取数据
2. 将使用频道数据列表改写下拉框组件

**代码实现**

`pages/Article/index.js`

```jsx
// 获取频道列表
const [channels, setChannels] = useState([])
useEffect(() => {
    async function fetchChannels() {
      const res = await http.get('/channels')
      setChannels(res.data.channels)
    }
    fetchChannels()
}, [])

// 渲染模板
return (
<Form.Item label="频道" name="channel_id" >
    <Select placeholder="请选择文章频道" style={{ width: 200 }} >
      {channels.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
</Form.Item>
)
```



## 4. 渲染表格数据

`本节目标:`  使用接口数据渲染表格数据

**实现步骤**

1. 声明列表相关数据管理
2. 声明参数相关数据管理
3. 调用接口获取数据
4. 使用接口数据渲染模板

**代码实现**

```jsx
// 文章列表数据管理
const [article, setArticleList] = useState({
    list: [],
    count: 0
})

// 参数管理
const [params, setParams] = useState({
    page: 1,
    per_page: 10
})

// 发送接口请求
useEffect(() => {
    async function fetchArticleList() {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count
      })
    }
    fetchArticleList()
}, [params])

// 模板渲染
return (
 <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
    <Table
      dataSource={article.list}
      columns={columns}
    />
 </Card>
)
```

## 5. 筛选功能实现

`本节目标:` 能够根据筛选条件筛选表格数据

**实现步骤**

1. 为表单添加`onFinish`属性监听表单提交事件，获取参数
2. 根据接口字段格式要求格式化参数格式
3. 修改`params` 触发接口的重新发送

**代码实现**

```jsx
// 筛选功能
const onSearch = values => {
    const { status, channel_id, date } = values
    // 格式化表单数据
    const _params = {}
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起
    setParams({
       ...params,
       ..._params
    })
}
// Form绑定事件
return (
    <Form onFinish={ onSearch }></Form>
)
```

## 6. 分页功能实现

`本节目标:`  能够实现分页获取文章列表数据

**实现步骤**

1. 为Table组件指定pagination属性来展示分页效果
2. 在分页切换事件中获取到筛选表单中选中的数据
3. 使用当前页数据修改params参数依赖引起接口重新调用获取最新数据

**代码实现**

```jsx
const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      ...params,
      page
    })
}

return (
   <Table
      dataSource={article.list}
      columns={columns}
      pagination={{
        position: ['bottomCenter'],
        current: params.page,
        pageSize: params.per_page,
        onChange: pageChange
      }}
    />
)
```

## 7. 删除功能

`本节目标:`  能够实现点击删除按钮弹框确认

**实现步骤**

1. 给删除文章按钮绑定点击事件
2. 弹出确认窗口，询问用户是否确定删除文章
3. 拿到参数调用删除接口，更新列表

**代码实现**

```jsx
// 删除回调
const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    // 更新列表
    setParams({
      page: 1,
      per_page: 10
    })
}

const columns = [
  // ...
  {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
]
```

## 8. 编辑文章跳转

`本节目标:`  能够实现编辑文章跳转功能

**代码实现**

```jsx
const columns = [
  // ...
  {
    title: '操作',
    render: data => (
      <Space size="middle">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => history.push(`/home/publish?id=${data.id}`)}
        />
      </Space>
    )
  }
]
```

# 发布文章

## 1. 基本结构搭建

`本节目标:`  能够搭建发布文章页面的基本结构

**实现步骤**

1. 使用Card、Form组件搭建基本页面结构
2. 创建样式文件，对样式做出调整

**代码实现**

`pages/Publish/index.js`

```jsx
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

const { Option } = Select

const Publish = () => {
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              <Option value={0}>推荐</Option>
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          ></Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
```

`pages/Publish/index.scss`

```scss
.publish {
  position: relative;
}

.ant-upload-list {
  .ant-upload-list-picture-card-container,
  .ant-upload-select {
    width: 146px;
    height: 146px;
  }
}
```

## 2. 富文本编辑器

`本节目标:`  能够安装并初始化富文本编辑器

**实现步骤**

1. 安装富文本编辑器：`yarn add react-quill`
2. 导入富文本编辑器组件以及样式文件
3. 渲染富文本编辑器组件
4. 通过 Form 组件的 `initialValues` 为富文本编辑器设置初始值，否则会报错
5. 调整富文本编辑器的样式

**代码实现**

`pages/Publish/index.js`

```jsx
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Publish = () => {
  return (
    // ...
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      // 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
      initialValues={{ content: '' }}
    >
      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: '请输入文章内容' }]}
      >
        <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
      </Form.Item>
    </Form>
  )
}
```

`pages/Publish/index.scss`

```scss
.publish-quill {
  .ql-editor {
    min-height: 300px;
  }
}
```

## 3. 频道数据获取

`本节目标:` 实现频道数据的获取和渲染

**实现步骤**

1. 使用useState初始化数据和修改数据的方法
2. 在useEffect中调用接口并保存数据
3. 使用数据渲染对应模块

**代码实现**

```jsx
// 频道列表
const [channels, setChannels] = useState([])
    useEffect(() => {
    async function fetchChannels() {
      const res = await http.get('/channels')
      setChannels(res.data.channels)
    }
    fetchChannels()
}, [])

// 模板渲染
return (
 <Form.Item
    label="频道"
    name="channel_id"
    rules={[{ required: true, message: '请选择文章频道' }]}
  >
    <Select placeholder="请选择文章频道" style={{ width: 200 }}>
      {channels.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  </Form.Item>
)
```

## 4. 上传封面实现

`本节目标:` 能够实现上传图片

**实现步骤**

1. 为 Upload 组件添加 action 属性，指定封面图片上传接口地址
2. 创建状态 fileList 存储已上传封面图片地址，并设置为 Upload 组件的 fileList 属性值
3. 为 Upload 添加 onChange 属性，监听封面图片上传、删除等操作
4. 在 change 事件中拿到当前图片数据，并存储到状态 fileList 中

**代码实现**

```jsx
import { useState } from 'react'

const Publish = () => {
  const [fileList, setFileList] = useState([])
  // 上传成功回调
  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
  }

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList
      action="http://geek.itheima.net/v1_0/upload"
      fileList={fileList}
      onChange={onUploadChange}
    >
      <div style={{ marginTop: 8 }}>
        <PlusOutlined />
      </div>
    </Upload>
  )
}
```

## 5.切换图片Type

`本节目标:` 实现点击切换图片类型

**实现步骤**

1. 创建状态 maxCount
2. 给 Radio 添加 onChange 监听单图、三图、无图的切换事件
3. 在切换事件中修改 maxCount 值
4. 只在 maxCount 不为零时展示 Upload 组件

**代码实现**

`pages/Publish/index.js`

```jsx
const Publish = () => {
  const [imgCount, setImgCount] = useState(1)

  const changeType = e => {
    const count = e.target.value
    setImgCount(count)
  }

  return (
    // ...
    <Form.Item label="封面">
      <Form.Item name="type">
        <Radio.Group onChange={changeType}>
          <Radio value={1}>单图</Radio>
          <Radio value={3}>三图</Radio>
          <Radio value={0}>无图</Radio>
        </Radio.Group>
      </Form.Item>
      {maxCount > 0 && (
        <Upload
          name="image"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList
          action="http://geek.itheima.net/v1_0/upload"
        >
          <div style={{ marginTop: 8 }}>
            <PlusOutlined />
          </div>
        </Upload>
      )}
    </Form.Item>
  )
}
```



## 6. 控制最大上传数量

`本节目标:` 控制Upload组件的最大上传数量和是否支持多张图片

**实现步骤**

1. 修改 Upload 组件的 `maxCount（最大数量）`属性控制最大上传数量
5. 控制`multiple （支持多图选择）属性` 控制是否支持选择多张图片

**代码实现**

`pages/Publish/index.js`

```jsx
const Publish = () => {
  return (
    // ...
    <Form.Item label="封面">
      <Form.Item name="type">
        <Radio.Group onChange={changeType}>
          <Radio value={1}>单图</Radio>
          <Radio value={3}>三图</Radio>
          <Radio value={0}>无图</Radio>
        </Radio.Group>
      </Form.Item>
      {maxCount > 0 && (
        <Upload
          name="image"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList
          action="http://geek.itheima.net/v1_0/upload"
          maxCount={ maxCount }
          multiple={ maxCount > 1 }
        >
          <div style={{ marginTop: 8 }}>
            <PlusOutlined />
          </div>
        </Upload>
      )}
    </Form.Item>
  )
}
```

## 7. 暂存图片列表实现

`本节目标:` 能够实现暂存已经上传的图片列表，能够在切换图片类型的时候完成切换

**问题描述**

如果当前为三图模式，已经完成了上传，选择单图只显示一张，再切换到三图继续显示三张，该如何实现？

**实现思路**

在上传完毕之后通过ref存储所有图片，需要几张就显示几张，其实也就是把ref当仓库，用多少拿多少

**实现步骤 （特别注意useState异步更新的巨坑）**

1. 通过useRef创建一个暂存仓库，在上传完毕图片的时候把图片列表存入
2. 如果是单图模式，就从仓库里取第一张图，以**数组的形式**存入fileList
3. 如果是三图模式，就把仓库里所有的图片，以**数组的形式**存入fileList

**代码实现**

```js
const Publish = () => {
  // 1. 声明一个暂存仓库
  const fileListRef = useRef([])
  
  // 2. 上传图片时，将所有图片存储到 ref 中
  const onUploadChange = info => {
    // ...
    fileListRef.current = imgUrls
  }
  
  // 3. 切换图片类型
  const changeType = e => {
    // 使用原始数据作为判断条件
    const count = e.target.value
    setMaxCount(count)

    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      // 三图，展示所有图片
      setFileList(fileListRef.current)
    }
  }

}
```

## 8. 发布文章实现

`本节目标:` 能够在表单提交时组装表单数据并调用接口发布文章

**实现步骤**

1. 给 Form 表单添加 `onFinish` 用来获取表单提交数据

2. 在事件处理程序中，拿到表单数据按照接口需要格式化数据

3. 调用接口实现文章发布，其中的接口数据格式为:

   ```javascript
   {
      channel_id: 1
      content: "<p>测试</p>"
      cover: {
         type: 1, 
         images: ["http://geek.itheima.net/uploads/1647066600515.png"]
      },
      type: 1
      title: "测试文章"
   }
   ```

**代码实现**

```jsx
const Publish = () => {
    const onFinish = async (values) => {
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.response.data.url)
      }
    }
    await http.post('/mp/articles?draft=false', params)
  }
}
```

## 9. 编辑文章-文案适配

`本节目标:` 能够在编辑文章时展示数据

**实现步骤**

1. 通过路由参数拿到文章id
2. 根据文章 id 是否存在判断是否为编辑状态
3. 如果是编辑状态，展示编辑时的文案信息

**代码实现**

```jsx
import { useSearchParams } from 'react-router-dom'

const Publish = () => {
  const [params] = useSearchParams()
  const articleId = params.get('id')

  return (
    <Card
      title={
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/home">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {articleId ? '修改文章' : '发布文章'}
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      // ...
      <Button size="large" type="primary" htmlType="submit">
        {articleId ? '修改文章' : '发布文章'}
      </Button>
  )
}
```



## 10.编辑文章-数据获取

`本节目标:` 使用id获取文章详情

> 判断文章 id 是否存在，如果存在就根据 id 获取文章详情数据

```js
useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
}, [articleId])
```

## 11. 编辑文章-回显Form

`本节目标:` 完成Form组件的回填操作

> 调用Form组件的实例对象方法 `setFieldsValue`

```js
useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
      const { cover, ...formValue } = res.data
      // 动态设置表单数据
      form.setFieldsValue({ ...formValue, type: cover.type })
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
}, [articleId])
```



## 12. 编辑文章-回显Upload相关

> 1.Upload回显列表 fileList   2. 暂存列表 cacheImgList   3. 图片数量 imgCount 
>
> 核心要点：fileList和暂存列表要求格式统一

表单的赋值回显需要调用`setFieldsValue`方法，其中图片上传upload组件的回显依赖的数据格式如下：

```js
[
  { url: 'http://geek.itheima.net/uploads/1647066120170.png' }  
  ...
]
```

**代码实现**

```jsx

useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
      const { cover, ...formValue } = res.data
      // 动态设置表单数据
      form.setFieldsValue({ ...formValue, type: cover.type })
      // 格式化封面图片数据
      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      setMaxCount(cover.type)
      fileListRef.current = imageList
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
}, [articleId])
```

## 11. 编辑保存

`本节目标:` 能够在编辑文章时对文章进行修改

**代码实现**

```js
// 提交表单
const onFinish = async (values) => {
    const { type, ...rest } = values
    const data = {
      ...rest,
      // 注意：接口会按照上传图片数量来决定单图 或 三图
      cover: {
        type,
        images: fileList.map(item => item.url)
      }
    }
    if(articleId){
      // 编辑
      await http.put(`/mp/articles/${data.id}?draft=false`,data)
    }else{
      // 新增
      await http.post('/mp/articles?draft=false', data)
    }
}
```

# 项目打包

## 1. 项目打包

`本节目标:` 能够通过命令对项目进行打包

**使用步骤**

1. 在项目根目录下打开终端，输入打包命令：`yarn build`
2. 等待打包完成，打包生成的内容被放在根下的build文件夹中

## 2. 项目本地预览

`本节目标:` 能够在本地预览打包后的项目

**使用步骤**

1. 全局安装本地服务包 `npm i -g serve`  该包提供了serve命令，用来启动本地服务
2. 在项目根目录中执行命令 `serve -s ./build`  在build目录中开启服务器
3. 在浏览器中访问：`http://localhost:3000/` 预览项目

## 3. 打包体积分析

`本节目标:`   能够分析项目打包体积

**分析说明**通过分析打包体积，才能知道项目中的哪部分内容体积过大，才能知道如何来优化

**使用步骤**

1. 安装分析打包体积的包：`yarn add source-map-explorer`
2. 在 package.json 中的 scripts 标签中，添加分析打包体积的命令
3. 对项目打包：`yarn build`（如果已经打过包，可省略这一步）
4. 运行分析命令：`yarn analyze`
5. 通过浏览器打开的页面，分析图表中的包体积

**核心代码**：

package.json 中：

```json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
}
```



## 4. 优化-配置CDN

`本节目标:`  能够对第三方包使用CDN优化

**分析说明**：通过 craco 来修改 webpack 配置，从而实现 CDN 优化

**核心代码**

`craco.config.js`

```js
// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig自动注入的webpack配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后return出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        // key:需要不参与打包的具体的包
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        // 通过import 导入的 react / react-dom
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组 现在是公共为了测试
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
          ],
          css: []
        }
      })

      // 都是为了将来配置 htmlWebpackPlugin插件 将来在public/index.html注入
      // cdn资源数组时 准备好的一些现成的资源
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.cdn = cdn
      }

      return webpackConfig
    }
  }
}
```

`public/index.html `

```html
<body>
  <div id="root"></div>
  <!-- 加载第三发包的 CDN 链接 -->
  <% htmlWebpackPlugin.userOptions.cdn.js.forEach(cdnURL => { %>
    <script src="<%= cdnURL %>"></script>
  <% }) %>
</body>
```

 

## 5. 优化-路由懒加载

`本节目标:`   能够对路由进行懒加载实现代码分隔

**使用步骤**

1. 在 App 组件中，导入 Suspense 组件
2. 在 路由Router 内部，使用 Suspense 组件包裹组件内容
3. 为 Suspense 组件提供 fallback 属性，指定 loading 占位内容
4. 导入 lazy 函数，并修改为懒加载方式导入路由组件

**代码实现**

`App.js`

```jsx
import { Routes, Route } from 'react-router-dom'
import { HistoryRouter, history } from './utils/history'
import { AuthRoute } from './components/AuthRoute'

// 导入必要组件
import { lazy, Suspense } from 'react'
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </HistoryRouter>
  )
}

export default App
```



**查看效果**

我们可以在打包之后，通过切换路由，监控network面板资源的请求情况，验证是否分隔成功

