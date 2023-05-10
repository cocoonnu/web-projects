# 第一章 认识 React

A JavaScript library for building user interfaces （用于构建用户界面的 JavaScript 库）



`ReactJS` 是由 Facebook 在 2013年 5 月推出的一款JS前端开源框架,推出式主打特点式函数式编程风格。值得一说的是，到目前为止 `ReactJS` 是世界上使用人数最多的前端框架,它拥有全球最健全的文档和社区体系。



ReactJS 的官方英文网站为：https://reactjs.org/

ReactJS 的中文网站为：https://zh-hans.reactjs.org/

> 以下为 React18 的学习



## 1.1 项目启动初始化

React 组件文件可以用 `.jsx` 也可以用 `.js` 文件，两者没有区别

使用脚手架启动一个项目

```bash
$ npx create-react-app react-basic
```



- 入口文件 `index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />,document.getElementById('root'))
```



- VS code 插件

Simple React Snippets：快速生成代码

```jsx
imr 
import React, { Component } from 'react';

cc
class rcom extends Component {
    state = {  }
    render() { 
        return (  );
    }
}
export default rcom;
```





## 1.2 JSX 语法规则

JSX 就是 Javascript 和 XML 结合的一种格式。React 发明了 JSX，可以方便的利用 HTML 语法来创建虚拟 DOM，当遇到 `<`，JSX 就当作 HTML 解析，遇到 `{` 就当 JavaScript 解析

文档：https://www.yuque.com/fechaichai/qeamqf/xbai87#M1UW5



**JS 表达式**

```jsx
const name = '柴柴'

<h1>你好，我叫{ name }</h1>
```

> 注意是表达式，所以不能写语句



**列表渲染**

```jsx
<div className="App">
    {/* 列表渲染 */}
    { list.map(item => (
        <div key={ item } onClick={ clickMe }>{ item }</div>
    )) }
</div>
```

> 同样列表元素需要加上 key！！



**条件渲染**

```jsx
const flag = true

function App() {
  return (
    <div className="App">
      {/* 条件渲染字符串 */}
      {flag ? 'react真有趣' : 'vue真有趣'}

      {/* 条件渲染标签/组件 */}
      {flag ? <span>this is span</span> : null}
    </div>
  )
}
```



**样式处理**

多个 `class` 动态绑定需要安装插件

```bash
$ npm i classnames
```

```jsx
import React, { Component } from 'react'
import classNames from 'classnames'
 
const classObj = {
    active: true,
    testr: true
}

const flag = true

function App() {

    return (
        <div className="App">

            {/* 使用内联样式 */}
            <div style={ {color: 'red', fontSize: '16px'} }></div>

            {/* 单个动态绑定 */}
            <div className={ flag ? 'avtive' : 'defalut' }></div>

            {/* 多个动态绑定 */}
            <div className={ classNames(classObj) }></div>
            
        </div>
    )
}
```



**幽灵节点**

```jsx
function App() {

    return (
        // 幽灵节点不会被渲染
        <>
        <div className="App">
        </div>
        
        <div></div>
        </>
    )
}
```





**lable 标签中的 `for` 要替换成 `htmlFor`**

```jsx
<label htmlFor="jspang">加入服务：</label>
<input id="jspang" className="input" value={this.state.inputValue} />
```



## 1.3 React 组件化

组件化分为两种写法：函数组件、类组件

```jsx
import React, { Component } from 'react'

// 类组件
class Test extends Component {
    state = {  } 
    render() { 
        return (
            <div>hello</div>
        )
    }
}

// 函数组件
function App() {

    return (
        <div className="App">
            <Test />
        </div>
    )
}

export default App
```

函数组件在 React Hook 中再具体使用，后面的默认使用类组件



## 1.4 响应式和事件绑定



### 1.4.1 实现响应式数据

定义响应式写在 `this.state` 中，修改响应式写在 `this.setState({})` 中

记住 React 是禁止直接操作 `state` 的！

```jsx
// 类里面定义一个 state 属性
class Test extends Component {
    state = {
        name: 'cocoon'
    }
    
    clickBtn = () => {
        this.setState({
            name: this.state.name + 'czy'
        })
    }

    render() { 
        return (
            <div className="test">
                <button onClick={ this.clickBtn }>clickBtn</button>
                {this.state.name}
            </div>
        )
    }
}
```



### 1.4.2 实现事件绑定

首先要绑定事件时要指定 `this` 指向，事件参数默认接收 `e`

```jsx
// 类里面定义成员函数（一定要使用箭头函数）
show = (e) => {
    console.log(e)
}
```

```jsx
// 传入参数
<Button type="primary" onClick={(e) => this.show(e, 其他参数)}>按钮</Button>

// 无多余参数
<Button type="primary" onClick={ this.show }>按钮</Button>
```



**成员函数不使用箭头函数的后果：没有自己的 this 指向**，有两个方式修正

```jsx
class Test extends Component {
    
    constructor() {
        super()
        // 修正方式一
        this.clickBtn = this.clickBtn.bind(this)
    }

    // 定义普通函数
    clickBtn() {
        console.log(1111)
        console.log(this)
    }

    render() { 
        return (
            <div className="test">
                // 修正方式二
                <button onClick={ () => this.clickBtn() }>clickBtn</button>
                
                <button onClick={ this.clickBtn }>clickBtn</button>
            </div>
        )
    }
}
```





## 1.5 React 组件通信

- **父传子 props 传递数据**

```jsx
// 父组件
<XiaojiejieItem content={item} />
```

```jsx
// 子组件
<div>{this.props.content}</div>
```



> 同样的子组件不能直接改 props 参数



- **子传父 props 传递函数**

注意设置回调函数时要指定 `this`

```jsx
// 父组件
<XiaojiejieItem content={item} deleteItem={this.deleteItem.bind(this)} />

// 回调函数
deleteItem(index){
    let list = this.state.list
    list.splice(index,1)

    this.setState({
        list:list
    })
}
```

```jsx
// 子组件
<div onClick={this.handleClick.bind(this)}>
    {this.props.content}
</div>

handleClick(){
    
    // 触发回调函数
    this.props.deleteItem(this.props.index)
}
```



- **PropTypes 校验传递值**

```js
import PropTypes from 'prop-types'

Item.propTypes = {
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number.isRequired
}

Item.defaultProps = {
    content: 'cocoon'
}
```



## 1.6 Ref 属性和生命周期



Ref 的使用方法：https://blog.csdn.net/weixin_44827418/article/details/121319268



生命周期：https://vue3js.cn/interview/React/life%20cycle.html



- componentDidMount 相当于 Vue 的 mounted

```js
// 在组件挂在后（插入到dom树中）后立即调用
componentDidMount() {
    // 发送 ajax 请求等
    
    axios.get('xxxx')
        .then((res)=>{
            console.log('axios 获取数据成功:'+JSON.stringify(res))
           
            this.setState({
                list:res.data.data
            })
          })
        .catch((error)=>{console.log('axios 获取数据失败'+error)})    
}
```



- shouldComponentUpdate

在渲染之前被调用，默认返回为 true。返回值是判断组件的输出是否受当前 state 或 props 更改的影响，默认每次 state 发生变化都重新渲染，首次渲染或使用 forceUpdate 时不被调用

```js
// 优化性能
shouldComponentUpdate(nextProps,nextState){
    if(nextProps.content !== this.props.content){
        return true
    }else{
        return false
    }  
}
```



含代码介绍：https://blog.csdn.net/luobo2345/article/details/122818947
