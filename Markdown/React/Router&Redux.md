# 第一章 认识 React-Router

组件是 React 的核心功能，其拥有非常强大的声明式编程模型。React Router 是**导航组件**的集合，可与你的应用程序进行声明式的组合。无论你是想为你的 Web 应用程序添加**书签**，还是在 **React Native** 中进行组件化导航，React Router 都可以在 React 的任何位置渲染使用 - 所以请考虑使用！



我们 Web 端下载 `React-router-dom` 这个库，现在已经升级到了  V6 版本，如果想下载 V5 版本

```bash
$ npm i react-router-dom@5

$ npm i react-router-dom
```



## 1.1 简单的路由跳转

**首先认识一下路由器**

`BrowserRouter`、`HashRouter`，最好一个应用对应一个路由器！`HashRouter` 其实就是 Vue 路由的哈希模式，理解方式是一样的

- 普通模式：`http://localhost:3000/home`：当前服务器地址就为这个
- 哈希模式：`http://localhost:3000/#/home`：当前服务器地址为 `http://localhost:3000`



**注册全局路由器：**进入入口文件 `index.js`

```jsx
import { BrowserRouter as Router } from 'react-router-dom'

root.render(<Router> <App/> </Router>)   
```



**实现路由跳转**

`Link` 组件实现链接标签的效果，在导航组件中引入，一个 `to` 属性

`Route` 组件实现路由组件占位的效果，也在导航组件中引入，`path`、`component` 属性

```jsx
import React, { memo } from 'react'
import { Link, Route } from 'react-router-dom'

const App = memo(() => {
    return (
        <div>
            <Link to='/about'>about</Link>
            <Link to='/home'>home</Link>
            <Route path='/about' component={About}/>
            <Route path='/home' component={Home} />
        </div>
    )
})

function About(props) {
    console.log(props)
    return (<div>about</div>)
}

function Home() {

    return (<div>home</div>)
}

export default App
```



## 1.2 路由功能点记录

### 1.2.1 NavLink 组件

- `NavLink` 组件也可以实现 `Link` 的功能，并且它支持自动给选中的链接添加一个 `active` 的类名
- 自定义 `active` 类名通过 `activeClassName` 属性设置
- 标签体内容可以通过 `children` 属性实现



**NavLink 的使用**

```jsx
<NavLink to='/about' activeClassName='ggg'>about</NavLink>
<NavLink to='/home' activeClassName='myActive' children='home'/>
```



**封装 NavLink**

 ```jsx
 function MyNavLink(props) {
     return (<NavLink className='link' activeClassName='myActive' {...props} />)
 }
 
 <MyNavLink to='/home'>home</MyNavLink>
 ```

> 使得不用重复写 activeClassName 和 className 等公共属性了



### 1.2.2 Swicth 组件

多个 Route 组件进行匹配的时候，匹配到一个还会继续向下匹配，直到匹配到最后一个组件。Switch 组件可以使得匹配到第一个组件就停止匹配



下面代码匹配到 Home 组件而不是 Test

```jsx
<Switch>
    <Route path='/about' component={About}/>
    <Route path='/home' component={Home} />
    <Route path='/home' component={Test} />
</Switch>
```

 

### 1.2.3 路由匹配规则

**路由默认是进行模糊匹配，下面是匹配规则**

```jsx
<Route path='/about' component={About}/>

<Link to='a/about/b'>a/about/b</Link>
```

会被拆解为 a、about、b，因为 a 没有匹配上 about 所以无法匹配



```jsx
<Route path='/about' component={About}/>

<Link to='about/a/b'>a/about/b</Link>
```

这个会被成功匹配



**通过添加 `exact` 属性可以开启严格匹配，只有 to 和 path 一一对应**

```jsx
<Route exact path='/about' component={About}/>

<Link to='about/a/b'>a/about/b</Link>
```

`Link` 无法匹配，所以这个 `Route` 组件不能作为嵌套路由组件！



### 1.2.4 路由重定向

当页面跳转时，若跳转链接没有匹配上任何一个 `Route` 组件，那么就会显示 `404` 页面，所以我们需要一个重定向组件 `Redirect`

```jsx
<Switch>
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Redirect to="/home" />    {/* 当以上Route组件都匹配失败时，重定向到/home */}
</Switch>
```



## 1.3 路由嵌套与传参

嵌套路由的实现，下面是匹配规则：

- 输入 `http://localhost:3000/home/test`，
- 会先匹配最顶层的 `Route`组件有没有对应的 `home` 路径，
- 若匹配则再进入 `Home` 组件进行匹配里面 `Router` 组件的 `home/test` 路径对应的组件



**导航组件**

```jsx
import { Link, Route, NavLink, Switch, Redirect } from 'react-router-dom'
import Home from './views/Home'

const App = memo(() => {
    return (
        <div>
            <Link to='/about'>about</Link>
            <Link to='/home'>home</Link>

            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Redirect to="/home" />
            </Switch>
        </div>
    )
})

function About(props) {
    console.log(props)
    return (<div>about</div>)
}
```



**Home 组件**

```jsx
import { Link, Route, NavLink, Switch, Redirect } from 'react-router-dom'
import Test from './Test'
import News from './News'

export default function Home() {
    return (
        <div>
            <Link to='/home/test'>test</Link>
            <Link to='/home/news'>news</Link>

            <Switch>
                <Route path="/home/test" component={Test} />
                <Route path="/home/news" component={News} />
                <Redirect to="/home/test" />
            </Switch>            
        </div>
    )
}
```

