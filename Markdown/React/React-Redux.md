# 第一章 认识 Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理，作用：集中式管理 react 应用中多个组件共享的状态

Redux 的数据状态如果想实现响应式，一共有三种方式：仅用 Redux 实现，搭配 React-Redux 实现，使用最新的@reduxjs/toolkit 插件进行编写。



文档前面还是使用 Redux + React-Redux 搭配进行状态管理，后面会用到最新的 @reduxjs/toolkit 进行更新

- 英文官网: https://redux.js.org  中文官网：https://cn.redux.js.org

- 中文文档（未兼容 Redux Toolkit）: http://www.redux.org.cn



Redux + React-Redux 模式安装版本

```json
"react-redux": "7.2.1",
"redux": "4.0.5",
"redux-thunk": "2.3.0",
```



## 1.1 Redux 工作流

Redux 思想其实很简单，我们可以在 `index.js ` 中模拟一下

- `action` 为一个对象，具有 type 属性，type 属性的字段称为 `constants`
- `reducer` 为一个函数，根据 type 处理指定的 `action`，修改仓库状态
- `createStore(reducer)` 创建一个实例仓库，具有 `dispatch`、`getState` 方法

```js
import { createStore } from 'redux'

// 处理指定的action，修改仓库状态
function reducer(state = 10, action) {
    switch (action.type) {
        case 'ADD':
            return state + action.num
    
        case 'SQURE':
            return state * state

        default:
            return state
    }
}

// 实例化仓库
const store = createStore(reducer)

// 读取仓库的状态
console.log(store.getState()) // 10

// 分发action，会调用reducer
store.dispatch({
    type: 'ADD',
    num: 20
})
console.log(store.getState()) // 30
```

```js
// 将action写成函数形式
function myself() {
    const num = 99
    return {
        type: 'MYSELF',
        num
    }
}
store.dispatch(myself())
console.log(store.getState())
```



如果想要引起仓库数据更新视图自动变化，那么纯 Redux 做法是这样的

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router><App /></Router>
)

store.subscribe(() => {
    root.render(
        <Router><App /></Router>
    )
})
```





## 1.2 仓库目录拆分

**如果我们将所有的逻辑代码写到一起，那么当redux变得复杂时代码就难以维护**，所以我们最好是有一个单独的文件夹存放这些逻辑。接下来，我会对代码进行拆分，将 store、reducer、action、constants 拆分成一个个文件

参考文档：https://blog.csdn.net/m0_71485750/article/details/126732471



创建 store/index.js 文件：index 文件中, 我们只需要创建 store 即可

```js
import { createStore } from 'redux'
import reducer from './reducer'

export default createStore(reducer)
```

> 最新的 Redux 已经废弃了 createStore，后面会有替代方案



创建 store/reducer.js 文件：在真实项目中, reducer 这个函数我们会越写越复杂, 造成我们 index.js 文件越来越大, 所以我们将 reducer 也抽离到一个单独的文件中

```js
import { ADD, MYSELF } from './constants'

export default function reducer(state = 10, action) {
    switch (action.type) {
        case ADD:
            return state + action.num

        case MYSELF:
            return action.num

        default:
            return state
    }
}
```



创建 store/constants.js 文件：将 type 的类型定义为常量（防止写错的情况）, 这些常量最好也防止一个单独的文件中

```js
export const ADD = 'ADD'
export const MYSELF = 'MYSELF'
```



创建 store/actionCreators.js 文件：将封装的动态创建 action 的函数放在该文件中, 在需要使用的地方导入即可

 ```js
 import { MYSELF } from './constants'
 
 export function myself() {
     const num = 99
     return {
         type: MYSELF,
         num
     }
 }
 ```

