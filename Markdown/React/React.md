# 第一章 认识 React

A JavaScript library for building user interfaces （用于构建用户界面的 JavaScript 库）



`ReactJS` 是由 Facebook 在 2013年 5 月推出的一款 JS 前端开源框架,推出式主打特点式函数式编程风格。值得一说的是，到目前为止 `ReactJS` 是世界上使用人数最多的前端框架,它拥有全球最健全的文档和社区体系。



ReactJS 的官方英文网站为：https://reactjs.org/

ReactJS 的中文网站为：https://zh-hans.reactjs.org/



## 1.1 项目启动初始化

React 组件文件可以用 `.jsx` 也可以用 `.js` 文件，两者没有区别

主要参考文档：https://lanan.blog.csdn.net/article/details/126923270

使用脚手架 `create-react-app` 启动一个项目，默认情况下**脚手架搭建的项目配置文件都是隐藏的**

```bash
$ npx create-react-app react-test
```



- **新建 `jsconfig.json` 使得 Vscode 对 JS 代码进行优化**

```js
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "baseUrl": "./",
        "moduleResolution": "node",
        "paths": {
            "@/*": [
                "src/*"
            ]
        },
        "jsx": "preserve",
        "lib": [
            "esnext",
            "dom",
            "dom.iterable",
            "scripthost"
        ]
    }
}
```



- **安装 VS code 插件**

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



- **显示 React 项目配置文件**

```bash
$ npm run eject
```

> 仓库必须 Git  初始化命令才会生效

执行之后，会多出以下项目配置文件夹：scripts、config。

通常不需要动这些文件，如果要实现某些配置的业务逻辑，直接现搜即可！！一般会有第三方解决方法



 

## 1.2 JSX 语法规则

JSX 就是 Javascript 和 XML 结合的一种格式。React 发明了 JSX，可以方便的利用 HTML 语法来创建虚拟 DOM，当遇到 `<`，JSX 就当作 HTML 解析，遇到 `{` 就当 JavaScript 解析

文档：https://www.yuque.com/fechaichai/qeamqf/xbai87#M1UW5



**{} 插入内容**

- 可以理解为插入的是 JS 表达式

- 当插入的变量是Number、String、Array、节点等类型时，可以直接插入显示，其他类型插入会报错

- 还支持函数、函数调用、 三元表达式、运算表达式

```jsx
const name = '柴柴'

(<h1>你好，我叫{ name }</h1>)
```

> 注意是表达式，所以不能写语句



**列表渲染**

```jsx
<div className="App">
    {/* 列表渲染 */}
    {list.map(item => (
        <div key={ item } onClick={ clickMe }>{ item }</div>
    ))}
</div>
```

> 同样列表元素需要加上 key！！使用 map 因为会返回一个充满节点的新数组



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

这里是 React18 之前的响应式实现方式，React18 之后使用函数组件，下面的 API 基本废弃



### 1.4.1 实现响应式数据

记住 React 是禁止直接操作 `state` 的！我们一般通过 `setState` 这个 API 进行状态修改

- `setState` 方法是从 `Component` 中继承过来的，所以可以直接 `this.setState`
- `setState` 方法传入的该对象会和 `this.state` 的对象进行一个合并, **相同的属性会进行覆盖**
- **`setState` 的更新是异步的**，我们并不能在执行完 `setState` 之后立马拿到最新的 `state` 的结果



**方式一：`setState` 直接传入一个对象**

```jsx
class Test extends Component {
    state = {
        name: 'cocoon'
    }
    
    clickBtn = () => {
        this.setState({
            name: this.state.name + 'czy'
        })
    }

    ...
    <button onClick={ this.clickBtn }>clickBtn</button>
	...
}
```



**方式二：`setState` 传入一个回调函数，函数直接接收 `stete`、`props` 参数，然后返回一个对象即可**

```jsx
class Test extends Component {

    state =  {
        list: [1,2,4,5,6]
    }
    
    clickBtn() {
        this.setState((state, props) => {
            console.log(state, props)
            const list = this.state.list.filter(item => item > 2)

            return {
                list
            }
        })
    }

    <button onClick={ () => this.clickBtn() }>
        clickBtn
    </button>
    { this.state.list }
}
```



**因为是异步的，所以可接收第二个回调函数获取最新的状态数据**

```jsx
clickBtn() {
    this.setState((state, props) => {
        console.log(state, props)
        const list = this.state.list.filter(item => item > 2)

        return {
            list
        }
    }, () => {
        console.log(this.state.list)
    })
}
```





### 1.4.2 实现事件绑定

**事件绑定就是事件名称 + 回调函数**

- 首先要绑定事件时要指定 `this` 指向，事件参数默认接收 `e`
- 普通成员函数建议使用箭头函数
- 内置函数可以不适用箭头函数，里面的 this 已经被封装好了 

```jsx
// 类里面定义成员函数
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



### 1.4.3 实现数据双向绑定 

手动绑定状态和绑定事件

```jsx
class Test extends Component {

    state =  {
        inputValue: ''
    }
    
    inputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() { 
        return (
            <div className="test">
                <input 
                    type="text" 
                    value={ this.state.inputValue } 
                    onChange={ this.inputChange } 
                />
                { this.state.inputValue }
            </div>
        )
    }
}
```





## 1.5 React 组件通信方法

### 1.5.1 Props 参数传递

父子组件通信一切都基于 `props` 属性发展，props 可以传递数字、字符串、布尔值、数组、对象、JSX、函数等任意类型的数据，类组件 props 自动封装到了 this 里面。

参考文档：https://blog.csdn.net/grooyo/article/details/127844673



**函数组件需要在参数中声明**

```jsx
function ComponentA(props) { 
    return <div>{ props.value }</div>
}
```



**类组件需要在构造函数中声明**

```jsx
constructor(props) {
    super(props)
}
```

> 如果不加的话，在创建组件、设置 state 的时候无法访问 props



以下 props 的使用方法

- **父传子 props 传递数据**

```jsx
// 父组件
<Test content={ item } />

// 批量传递
const p = { name: '老王', age: 30, sex: 'man' }
<Test { ...p } showMsg={ showMsg } />
```

```jsx
// 子组件
<div>{this.props.content}</div>
<div>{this.name}</div>
```



- **子传父 props 传递函数**

```jsx
// 父组件
const showMsg = (msg) => {
    console.log(msg)
}

return (
    <div className="App">
        <Test showMsg={ showMsg } />
    </div>
)
```

```jsx
// 子组件
clickBtn = () => {
    this.props.showMsg('cocoon')
}

render() {
    return (
        <div className="test">
            <button onClick={ this.clickBtn }>123</button>
        </div>
    )
}
```



- **PropTypes 校验传递值**

```js
import PropTypes from 'prop-types' // 不需要另外下载

// 限定 Test 组件的 props 参数类型
Test.propTypes = {
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number.isRequired // 必须传入
}
```

```jsx
// 设置默认 props 参数
Test.defaultProps = {
    content: 'cocoon'
}

// 函数中直接在形参设置默认值
function Test({ name = 'cocoon' }) {
    return (
        <div><div/>
    )
}
```

> 直接将 defaultProps、propTypes 在类里面定义为静态属性 static 也行



### 1.5.2 Context 嵌套传递

`Context` 提供了一种新的组件之间共享数据的方式，允许数据隔代传递，而不必显式的通过组件树逐层传递`props`，具体使用如下面所示。

参考文档：https://blog.csdn.net/qq_34307801/article/details/109774612



**场景一：使用 `Provider` 和 `Consumer` 生产和消费数据**

- 创建一个 `context` 数据对象，父组件和内层组件通用这个对象
- 父组件的根元素在外层套一层 `Provider` 标签
- `Provider` 标签的 value 属性传入 context 数据
- 内层组件通过 `Consumer` 标签的回调函数渲染元素

1、首先新建一个导出 `context` 对象的文件：`ProductContext.js`

```js
import React from 'react'

export const ProductContext = React.createContext({
    // 传入一个默认对象，如果Provider标签中没给就用这里的
    name: 'cocoon',
    age: 18
})

export const { Provider, Consumer } = ProductContext
```



2、父组件通过 `Provider` 标签的 value 属性传入 context 数据

```jsx
import { Provider } from './ProductContext.js'

// 根组件
export default function App() {
    const context = {
        name: 'czy',
        age: 21
    
    return (
        <Provider value={ context }>
            <div className="App">
                <Midcom />
            </div>
        </Provider>
    )
}
// 中间组件
function Midcom() {
    return (
        <div>
            <Test />
        </div>
    )
}
```



3、内层组件在 `Consumer` 中接收数据

```jsx
import { Consumer } from './ProductContext.js'

class Test extends Component {
    render() {
        return (
            <Consumer>
                {context => (
                    <div>
                        { context.name }
                        { context.age }
                    </div>
                )}
            </Consumer>
        )
    }
}
```



**场景二：直接使用 `context` 进行对父组件数据的访问**

- 内层组件可以不使用 `Consumer` 标签进行渲染
- 通过 `static contextType = ThemeContext` 使得实例直接获取 `context` 数据
- 参考文档：https://blog.csdn.net/landl_ww/article/details/93514944

```jsx
import { ProductContext } from './ProductContext.js'

class Test extends Component {
    // 声明一下
    static contextType = ProductContext

    // 任何生命周期下都可访问
    componentDidMount() {
        console.log(this.context)
    }

    render() {
        // @ts-ignore
        const { name, age } = this.context

        return (
            <div>
                { name }{ age }
            </div>
        )
    }
}
```



其他使用场景再查看文档，如消费多个 Context、嵌套组件更新 Context等



## 1.6 React API 使用

### 1.6.1 createRef

React 使用 Ref 属性的使用方法：https://blog.csdn.net/weixin_44827418/article/details/121319268

- 当 ref 属性用于 HTML 元素时，使用 `createRef` 创建的 ref 接收底层 DOM 元素作为其 current 属性
- 当 ref 属性用于自定义类组件时，ref 对象接收组件的挂载实例作为其 current 属性
- 你不能在函数组件上使用 ref 属性，因为他们没有实例

> 但是某些时候，我们可能想要获取函数式组件中的某个DOM元素，这个时候我们可以通过 React.forwardRef 后面学习 hooks 中如何使用 ref



**获取普通 HTML 元素的 DOM**

```jsx
import React, { Component, createRef } from 'react'

class Test extends Component {

    btnRef = createRef()

    componentDidMount() {
        console.log(this.btnRef)
    }

    render() { 
        return (
            <div className="test">
                <button ref={ this.btnRef } >111</button>
            </div>
        )
    }
}
```



### 1.6.2 Props.children

父组件使用子组件时，在子组件内部写的节点或数据会被封装到子组件 `props` 属性的`children` 当中

- 如果当前组件没有子节点，`this.props.children` 就是 undefined
- 如果有一个子节点，`this.props.children` 数据类型是 object
- 如果有多个子节点，`this.props.children` 数据类型就是 array



**实现类似 Vue 中的插槽功能**

参考文档：https://lanan.blog.csdn.net/article/details/126634054

```jsx
class Parent extends React.Component {
  render() {
    return (
      <Child>
        <div>slot1</div>
        <div>slot2</div>
        <div>slot3</div>
      </Child>
    )
  }
}
```

```jsx
class Child extends React.Component {
 render() {
   return (
    <div>
      <div>{this.props.children[2]}</div>
      <div>{this.props.children[1]}</div>
      <div>{this.props.children[0]}</div>
    </div>
  )
 }
}
```

> 当传入多个子节点时，`props.children` 是一个存放子节点的数组，可以通过下标访问到子节点，并控制其出现的位置



## 1.7 React 生命周期记录

组件的生命周期是指组件从被创建到挂载到页面中运行起来，再到组件不用时卸载的过程，注意，只有类组件才有生命周期（类组件 实例化  函数组件 不需要实例化）

React 万能参考图：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

![image-20230511195805658](mark-img/image-20230511195805658.png)



**挂载阶段**

| 钩子 函数         | 触发时机                                            | 作用                                                  |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------- |
| constructor       | 创建组件时，最先执行，初始化的时候只执行一次        | 初始化state、创建 Ref、使用 bind 解决 this 指向问题等 |
| render            | 每次组件渲染都会触发                                | 渲染UI、不能在里面调用 setState                       |
| componentDidMount | 组件挂载（完成DOM渲染）后执行，初始化的时候执行一次 | 发送网络请求、DOM操作                                 |



**更新阶段**

| 钩子函数           | 触发时机                  | 作用                                                     |
| ------------------ | ------------------------- | -------------------------------------------------------- |
| render             | 每次组件渲染都会触发      | 渲染UI（与 挂载阶段 是同一个render）                     |
| componentDidUpdate | 组件更新后（DOM渲染完毕） | DOM操作、可以获取到更新后的DOM内容、不要直接调用setState |



**卸载阶段**

| 钩子函数             | 触发时机                 | 作用                               |
| -------------------- | ------------------------ | ---------------------------------- |
| componentWillUnmount | 组件卸载（从页面中消失） | 执行清理工作（比如：清理定时器等） |



## 1.8 Craco 配置开发环境

使用`create-react-app` 创建的项目默认是无法修改其内部的`webpack`配置的，不像 `vue-cli `那样可以通过一个配置文件修改。 虽然有一个`eject` 命令可以是将配置完全暴露出来，但这是一个不可逆的操作，同时也会失去`CRA` 带来的便利和后续升级。

如果想要无 `eject` 重写 `CRA` 配置，目前成熟的是下面这几种方式

- 通过 CRA 官方支持的 `--scripts-version` 参数，创建项目时使用自己重写过的 `react-scripts` 包
- 使用 `react-app-rewired` + `customize-cra` 组合覆盖配置
- 使用 `craco` 覆盖配置



更多项目配置可以查看掘金文档（待完成）：https://juejin.cn/post/6871148364919111688



### 1.8.1 配置项目根路径

首先安装 Craco

```bash
$ npm i @carco/craco -D
$ npm i @craco/craco@alpha -D // 最新版React兼容 
```

新建文件 `craco.config.js`

```js
const path = require('path')

const reslove = pathname => path.resolve(__dirname, pathname)

module.exports = {
    webpack: {
        alias: {
            "@": reslove("src")
        }
    }
}
```

替换启动命令

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
},
```



参考文档：https://lanan.blog.csdn.net/article/details/126923270



### 1.8.2 webpack 构建优化

参考文档：https://blog.csdn.net/guxin_duyin/article/details/127247755



### 1.8.3 配置 ESlint/Prettier

 https://blog.csdn.net/guxin_duyin/article/details/127048203
