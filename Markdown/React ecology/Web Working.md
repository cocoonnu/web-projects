# 第一章 HTML

## 1.1 HTML 备忘清单

HTML 备忘清单

https://wangchujiang.com/reference/docs/html.html

Emmet （HTML、CSS 内置的快捷指令）备忘清单

https://wangchujiang.com/reference/docs/emmet.html

特殊字符及转义参考

https://blog.csdn.net/jack_rose_me/article/details/124603494



## 1.2 IMG 标签知识点

**保持盒子内图片匹配**

```scss
// 使用外层盒子
.imgBx img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

// 直接使用img
    img {
        width: 35px;
        height: 35px;
        cursor: pointer;
        object-fit: contain;
    }

fill		// 默认，不保证保持原有的比例，内容拉伸填充整个内容容器
contain		// 保持原有尺寸比例。内容被缩放
cover		// 保持原有尺寸比例。但部分内容可能被剪切
none		// 保留原有元素内容的长度和宽度，也就是说内容不会被重置
```



**src为空时，img标签不显示裂图**

```js
img[src=""], img:not([src]) {
    opacity:0;
}
```



**访问网络图片必须添加如下属性**

```html
index.html
<meta name="referrer" content="no-referrer">
```

> https://blog.csdn.net/u011127019/article/details/125169827



**src 绑定 JS 变量**

```js
// 不能直接使用js变量存储地址字符串给src 需要先引入资源

import img from './img.png'
const img = require('./img/clock.svg')
```

```html
<img :src="img" />
```



**背景图片适配**

```css
div {
    width: 300px;
    height: 380px;
    background: url(./fingerprint.png) no-repeat;
    /* 一般指定宽度为盒子宽度 或者cover contain*/
    background-size: 300px;
}
```



## 1.3 HTML 静态资源路径

React 脚手架中使用 `%PUBLIC_URL%` 则固定从服务器根路径 `http://localhost:3000` 的文件夹下获取资源

```html
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
```

> 和 `href="/logo192.png"` 效果是一样



使用 `./` 则从当前服务器路径 `http://localhost:3000/home` 的文件夹下获取资源

```html
<link rel="apple-touch-icon" href="./logo192.png" />
```





# 第二章 CSS

## 2.1 CSS 速记链接

CSS 备忘清单：https://wangchujiang.com/reference/docs/css.html

> CSS 样式包含三种类型：行内样式（内联样式）、内部样式（style 标签）、外部样式（link 标签）
>
> 加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载
>
> a 标签不能嵌套 a 标签，p 标签不能嵌套块级元素



## 2.2 CSS 选择器详解

CSS 选择器速记：[https://wangchujiang.com/reference/docs/css.html#css-选择器](https://wangchujiang.com/reference/docs/css.html#css-选择器)

CSS 选择器介绍：https://vue3js.cn/interview/css/selector.html

> 可以同时使用多个伪类，而只能同时使用一个伪元素
>
> nth-of-type(2n + 1)：n 从 0 开始匹配



**带 type 的匹配选择器**

- `first-of-type`、`last-of-type`、`nth-of-type(n)`：选择第一个、最后一个、第 n 个

- 理解：先筛选同级父元素下的所有 `p` 标签（仅限兄弟元素），再匹配第 n 个 `p` 标签
- 并且还会逐层把兄弟元素作为父元素，再进行上面的匹配流程
- `nth-last-of-type(n)`：从末尾开始计数，第 n 个

```css
p:nth-of-type(2) {
	color: red
}
```

```html
<div>
    <p>1</p>
    <p>2</p>
</div>
<h1>3</h1>
<p>4</p>
<p>5</p>
```

> 2 和 5 会亮



**带 child 的匹配选择器**

- `first-child`、`last-child`、`nth-child(n)`：选择第一个、最后一个、第 n 个
- 理解：先选择同级父元素下的第 n 个元素（任何兄弟元素），再看下该该元素是不是 `p` 标签，如果是则匹配
- 如果不是，再逐层把兄弟元素作为父元素，再进行上面的匹配流程

```css
p:nth-child(2) {
	color: red
}
```

```html
<div>
    <p>1</p>
    <p>2</p>
</div>
<h1>3</h1>
<p>4</p>
<p>5</p>
```

> 只有 2 会亮，因为 5 被认为是第 4 个元素



**其他伪类选择器**

```css
:link 未被访问的链接样式
:visited 已被访问的链接样式
:active 鼠标点击时链接的样式
:hover 鼠标指针浮动在上面的元素
:focus 选择具有焦点的
:root 设置HTML文档
:empty 指定空的元素
:enabled 选择可用元素
:disabled 选择被禁用元素
:checked 选择选中的元素
```



**属性选择器**

```css
[attribute*=value]：选择attribute属性值包含value的所有元素
[attribute^=value]：选择attribute属性开头为value的所有元素
[attribute$=value]：选择attribute属性结尾为value的所有元素
```

```css
/* 选择p标签中id为包含div的所有元素 */
p[id*=div] {
    color: red;
}
```



**:not(selector)**

选择与 `<selector>` 选择器不匹配的所有元素，下面是例子

```css
/* 选择当包含 flipped 的所有元素中不包含 matched 的元素 */
.flipped:not(.matched) {};

/* 当 board-container 中包含了 flipped 对 board 作用 */
.board-container.flipped .board {};
```





## 2.3 CSS 滚动条样式

`::-webkit-scrollbar` 作为一个伪类选择器，设置全局滚动条

参考文档：https://blog.csdn.net/coder_jxd/article/details/124213962

MDN：https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar



全局滚动条模板参考

```css
/* 整个滚动条 */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* 垂直滚动条和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
    display: block;
    /* background-color: rgba(0, 0, 0, 0.1); */
    background-color: transparent;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border-right-color: transparent;
    border-left-color: transparent;
    background-color: rgba(0, 0, 0, 0.3);
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    border-right-color: transparent;
    border-left-color: transparent;
    background-color: rgba(0, 0, 0, 0.1);
}
```



单个盒子生效

```scss
// 滚动条隐藏
&::-webkit-scrollbar {
    width: 0px;
}
```






## 2.4 响应式布局介绍

**Rem 布局**

html 默认 font-size 为16px ,  `1rem = html-font-size * 1`



**媒体查询**

概念：通过视口宽度实现不同适配方案

作用：手动设置 `html-font-size `  、  手动修改不同视口宽度的样式

使用方法：

- 先把常规布局写完（视口宽度为1024px）
- 然后从大到下 设置媒体查询   **下面的会继承上面的样式**
- 通过不同视口宽度下 修改某些元素的布局或样式

``` css
/* 常规 css（750 - ） */
...

/* 视口宽度：320 - 750 */
@media screen and (max-width: 750px) {...}

/* 视口宽度：0 - 320 */
@media screen and (max-width: 30px) {...}
```





## 2.5 Flex/Grid 布局技巧

**flex 布局**

Flex 介绍：https://vue3js.cn/interview/css/flexbox.html
Flex 备忘清单：https://wangchujiang.com/reference/docs/css.html#css-flexbox

```less
/* flex实现居中 */
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* flex行列间隙：column-gap  row-gap */
```



**grid 布局**

Grid 介绍：https://vue3js.cn/interview/css/grid.html

Grid 备忘清单：[https://wangchujiang.com/reference/docs/css.html#css-grid-网格布局](https://wangchujiang.com/reference/docs/css.html#css-grid-网格布局)

```less
/* grid实现居中 */
div {
    display: grid;
    place-items: center;
}

/* grid将两个子元素按比例划分 */
div {
    display: grid;
    grid-template-columns: 15% 85%;   
}
```



## 2.6 背景属性与渐变



## 2.7 CSS 技巧总结

**父级元素清除浮动的方式**

1. 在父级元素创建 BFC，https://vue3js.cn/interview/css/BFC.html
2. 在最后的浮动元素末尾添加一个空标签，设置 `clear: both` 样式
3. 给父元素添加一个伪元素 `::after`，设置 `clear: both` 样式

 



# 第三章 JavaScript

推荐阅读文档专栏，包含 JS 大部分语法和知识点复习：https://juejin.cn/column/6991485674788487205

JavaScript 八大数据类型：Number、String、Boolean、Null、Undefined、Object、Symbol、BigInt  

变量名必须以字母、下划线（_）或美元符号（$）开头，不能以数字开头

变量名可以包含字母、数字、下划线或美元符号，但不能包含其他特殊字符



## 3.1 ES6 使用笔记

**展开运算符**

使用展开运算符进行对数组和对象的复制或者合并，**返回一个新的对象或数组，新地址和原地址不相等**

```js
// 数组
const arr = [1,2,3]
console.log([...arr] === arr);	// false
```

```js
// 对象
const apple = {
    color: '红色',
    shape: '球形',
    taste: '甜'
};
console.log({...apple});			// { color: '红色', shape: '球形', taste: '甜' }
console.log({...apple} === apple);	// false
```



**更多复杂类型**

Set（引用类型和 NaN 无法去重）：https://juejin.cn/post/7107449385264349191

Map：https://juejin.cn/post/7106898275290054692

遍历 Map：https://blog.csdn.net/qq_41767116/article/details/131161193

WeakMap：https://juejin.cn/post/7107261631859523615

Symbol 内置符号：https://juejin.cn/post/7074608058369835015

Symbol 类型：https://juejin.cn/post/7073852491695128583

RegExp：https://juejin.cn/post/7275550152974221346

Error：https://juejin.cn/post/7169017392016654372

Date：https://juejin.cn/post/6996926386405376037

```js
// 直接抛出一个错误 可以使得后面的代码不再执行
throw new Error('参数不是一个可迭代对象')
```

迭代器/生成器：https://juejin.cn/post/7141685685940912136



**原型和原型链**

- 详细解析：https://juejin.cn/post/6844903989088092174
- 对于 ES6 复杂类型，实例里面都有一个 `__proto__` 属性执行构造函数的 `prototype`
- 构造函数的 `prototype` 里面有多个原型方法，不同复杂类型对应不同方法
- JS 内置的构造函数如下所示

```js
// 可查看原型及其方法
let s = new Set()
console.log(s)
let o = new Object()
console.log(o);
let m = new Map()
console.log(m)
let r = new RegExp()
console.log(r)
let w = new WeakMap()
console.log(w)
let f = new Function()
console.log(f)
let a = new Array()
```

```js
// 构造函数的使用
let a1 = new a.constructor() // 等效于 new Arrar()
console.log(a1);

// 复制内容
let a1 = new a.constructor(a)
```



**经典的原型链**

只要记住三个法则：

- 构造函数和对象实例都是对象，只有构造函数有 prototype（原型对象），任何对象都有 `__proto__`
- 对象的 `__proto__` 指向其构造函数的 prototype
- 构造函数的 prototype 里面有一个属性 constructor，就等于该构造函数。其实例对象直接有该属性

```js
// 构造函数Function（构造函数的构造函数）
// 构造函数Object（对象的构造函数）
function Foo() {} // 构造函数Foo
const foo = new Foo() // 对象实例foo

// 可以得到以下关系
foo.__proto__ == Foo.prototype
Foo.__proto == Function.prototype
Function.__proto__ = Function.prototype

Foo.prototype.__proto__ == Object.prototype // 原型对象也是一个对象，构造函数为Object
Function.prototype.__proto__ == Object.prototype

Object.__proto__ == Function.prototype // Object的构造函数为Function
Object.prototype.__proto__ == null // 原型链的终点
```

```js
Foo.prototype.constructor == Foo
Function.prototype.constructor == Function
Object.prototype.constructor == Object
```

> null 和 undefined 没有原型对象



## 3.2 对象常见函数

这里记录 Object 原型对象所暴露的 API，通常在每个对象下都可以使用

**Object.assign**

用来合并对象。如果存在同名属性则o1被o2覆盖，**返回o1对象**  浅拷贝

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
```



**Object.keys、Object.values 、Object.entries**

返回键、值、键值对数组

```js
const person = {
    name: 'Alex',
    age: 18
};
// 返回键数组
console.log(Object.keys(person));		// [ 'name', 'age' ]
// 返回值数组
console.log(Object.values(person));		// [ 'Alex', 18 ]
// 返回键值二维数组
console.log(Object.entries(person));
```



**for in 循环**

for...in 遍历一个对象的**可枚举属性**，如对象、数组、字符串。针对属性，所以获得 key（数组获得 index ）

注意：key 可以得到该对象所有的属性，包括原型链上的属性

```js
for (let key in obj) {}
```

```js
// hasOwnProperty：判断一个对象有某个属性或对象，无法检查到原型链上
for (const key in target) {
    if (target.hasOwnProperty(key)) {

    }
}
```



**Object.defineProperty**

`Object.defineProperty(obj, prop, descriptor)`

用于定义一个对象的新属性或修改对象已有属性的特性（如可写性、可枚举性等）,

obj 是要定义属性的对象，prop 是要定义的属性名，descriptor 是一个包含属性特性的对象。

descriptor 对象可以包含以下属性：

- `value`：属性的值
- `writable`：属性是否可写，默认为 `false`
- `enumerable`：属性是否可枚举，默认为 `false`
- `configurable`：属性是否可配置（delete），默认为 `false`
- `get`：获取属性值的函数
- `set`：设置属性值的函数



**object 实例常用 API**

- delete obj.name：删除对象属性

- obj.hasOwnProperty：只会检查**对象的自有属性**，对象原形上的属性其不会检测

- 判断是否是空对象：`JSON.stringify(obj)==="{}"`



**toString()**

https://blog.csdn.net/u011140116/article/details/121845262



**valueOf()**

https://blog.csdn.net/weixin_45242865/article/details/119798783



## 3.3 数组常见函数

数组常见函数：https://vue3js.cn/interview/JavaScript/array_api.html

Array 原型方法大全：https://juejin.cn/post/7028018256266919973

**会直接改变原数组的方法：push、pop、splice、unshift、shift、sort、reverse**



**容易搞混的几个api**

`arr.splice`：arr.splice(下标，个数，替换的值)，替换个数和删除个数可以不一致

`arr.slice`：截取下标为 a ，到下标为 b（不包括 b）的区间（字符串也适用），省略 b 则截取到末尾

`str.split('')`：将字符串变成数组

`arr.length`：数组长度会自动延长到最后一个被赋值的位置，中间没有被赋值的都为 undefined



**普通方法总结**

```js
1、arr.shift：删除数组的第一个元素   

2、arr.unshift：插入数组第一个元素

3、arr.concat：直接将多个数组、多个数字拼接成一个数组 
let a= [].concat(1,2,3,[4,5],[6,7])

4、let newArr = arr.slice(a, b) 截取下标为 a ，到下标为 b（不包括 b）的区间

5、arr.reverse()：用来将一个数组中的全部项顺序置反

6、arr.indexOf(value)：数组存在value则返回其下标 不存在返回-1

7、arr.includes(value)：数组存在value则返回true,否则返回false

8、arr.join(',')：数组转字符串

9、arr.push(1, 2, 3)：只会push最后一项
```



- **arr.concat**

首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回一个新数组，**不会影响原始数组**

```js
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```




- **arr.splice**

arr.splice(下标，个数，替换的值)：数组值替换（可替换、添加、删除值），**该方法会改变原始数组**

```js
// 删除下标为index的项
arr.splice(index, 1)
```



- **arr.slice**

从数组中添加、删除项目，然后返回被删除的项目，**该方法会改变原始数组**

```ts
const newArr = arr.slice(a,b) // 截取a-b区间，改变arr同时返回改变之后的数组（不包含b！！）
const newArr = arr.slice() // 经典的浅拷贝！！
```



- **arr.reduce**

使用方法：https://blog.csdn.net/hannah2233/article/details/128367223



- **arr.some**

some() 方法会依次遍历数组的每个元素：

如果有一个元素满足条件，则表达式返回 true , 剩余的元素不会再执行检测

如果没有满足条件的元素，则返回false

```js
var arr = [3,6,9,12];
 
if(arr.some(function checknumber(number){return number == 12;})) {
    console.log(true)
}

// 简写：arr.some(item => item == 12)
 
//因为arr数组中有12的值，所以代码块会执行，而函数checknumber中传的参数number是从数组arr中读取
```




- **arr.find**

遍历查找数组，返回找到的值（只返回一个值），未找到返回 undefined

```js
let num = arr.find(item => item == 12)
```



- **arr.forEach**

遍历操作数组，**没有返回值**，对item进行操作不会改变原数组。但是如果item为复杂类型则会产生改变

```js
arr.fonEach((item,index,arr) => {})
```



- **arr.map**

遍历操作数组，将每次返回的结果作为一个新数组返回

当数组为简单类型时，不会该变原数组，当为引用类型时，则会改变原数组！！

```js
let newArr = arr.map((item,index,arr) => item + 1)
```

map 使用方法：https://blog.csdn.net/Anna0115/article/details/103696124



- **arr.filter**

遍历筛选数组，回调函数返回布尔类型，返回一个满足条件的新数组

当数组为简单类型时，不会该变原数组，当为引用类型时，则会改变原数组！！

```js
var newArr = arr.filter(function(item,index,arr) {
    if (item > 4) return true;
})
```



- **arr.flat**

对多维数组进行扁平化处理

```js
// 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
let newArr = arr.flat(Infinity)
```



- **for of 循环**

for...of 遍历一个可迭代对象，如数组、字符串、Map/Set（无object） 。针对一个迭代对象，所以获得 value

```js
for (let v of arr) {}
```



- **arr.sort(compareFn(a,b))**

自定义规则排序数组：[MDN Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

如果没有指定比较函数，那么数组按照转换后的字符串的各字符的[Unicode](https://so.csdn.net/so/search?q=Unicode&spm=1001.2101.3001.7020)位点进行排序。

如果指明了比较函数，那么数组按照调用**该函数的返回值**进行排序。规则如下：

- 函数遍历数组，a 和 b 为前一项和后一项

- 如果`compareFunction(a,b)`小于0，那么`a`排`b`前面
- 如果`compareFunction(a,b)`大于0，那么`a`排`b`后面
- 如果`compareFunction(a,b)`等于0，那么`a,b`的相对位置不变

```js
// 默认排序从小到大
arr.sort()

// 自定义排序
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

items.sort((a, b) => {
	const nameA = a.name.toUpperCase()
	const nameB = b.name.toUpperCase()
	if(nameA < nameB)	return -1
	if(nameA > nameB)	return 1
	return 0
})
```

> 该方法会改变原数组



- **arr.every**

判断数组中是否所有元素都满足条件，所有都满足则返回 true，否则返回 false

```ts
const isOld = columns?.every((item, index) => {
  const oldItem = oldPropsColumnsCurrent?.[index]
  return item.key === oldItem?.key || item?.dataIndex === oldItem?.dataIndex
})
```



- **二维数组去重**（数组为number类型）

利用的是对象添加 `key - values` 时的特性，把数组作为对象的 `key` 值，达到去重的目的

```ts
const TwoDimArrayUnique = (arr) => {
  const obj = {}
  arr.forEach(item => obj[item] = item)
  return Object.values(obj)
}
```



- **Array.form**

将类数组或者 Set 实例转化为数组，https://blog.csdn.net/qq_27674439/article/details/108793223



## 3.4 JavaScript 常用函数

**30 个常用函数**

https://juejin.cn/post/7145036326373425159



**JSON.stringify**

https://juejin.cn/post/7191712569394987065



**Math 和 Number 的 API**

```js
Math.ceil() // 数字向上取整

Math.round() // 整数四舍五入

Math.abs() // 绝对值

Math.floor() // 向下取整

isNaN(value) // value会先被Number()隐式类型转换，转化后不是一个数字则返回true

num.toFixed(n) // 保留n位小数，四舍五入

Math.floor(Math.random() * num)：// 返回0到num-1的整数
```



**`parseInt()` 、 `parseFloat()` 、`Number()` 的区别**

前两个是将字符串根据一定的规则转换为整数或者浮点数，后者是将其他类型隐式转换成 Number

https://blog.csdn.net/qq_41131745/article/details/114663291



**两个浮点数直接相减后不能直接用来判断结果**

```js
0.3 - 0.2 !== 0.1 // 会考虑到精度丢失的问题，部分浮点数计算也是如此 
```



**字符串**

增删改查基础方法：https://vue3js.cn/interview/JavaScript/string_api.html

`str.split`：https://blog.csdn.net/weixin_52844244/article/details/122836185

`String.fromCharCode(ASCII)`：通过 ASCII 码返回字符（A = 65）

`str.charCodeAt(index)`：返回 `str[index]` 的 ASCII 码

`[...new Set(string)].join('')`：字符串去重

`match、search、replace`：[https://vue3js.cn/interview/JavaScript/string_api.html#三、模板匹配方法](https://vue3js.cn/interview/JavaScript/string_api.html#三、模板匹配方法)



**其他函数**

```js
navigator.clipboard.writeText(123); // 实现用户复制内容为123

// 禁止打开右键
document.oncontextmenu=new Function("event.returnValue=false");

// 禁止滑动选中
document.onselectstart=new Function("event.returnValue=false");

document.onkeydown = function(event){    
    if (event.ctrlKey && window.event.keyCode==67){	//禁用ctrl + c 功能
        return false;
    }
    
    if (event.ctrlKey && window.event.keyCode==86){	//禁用ctrl + v 功能
        return false;
    }
}
```



**获取随机值**

使用 `Mock.Random`：https://github.com/nuysoft/Mock/wiki/Mock.Random

```js
import Mock from 'mockjs'
const Random = Mock.Random

console.log(Random.date())
```



## 3.5 DOM BOM 使用记录

DOM 常用操作：https://vue3js.cn/interview/JavaScript/Dom.html

BOM  常用操作：https://vue3js.cn/interview/JavaScript/BOM.html



### 3.5.1 Event 对象属性

MouseEvent MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent

Event MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/Event



`e` 就是鼠标对象 `MouseEvent`，它继承了 `Event` 事件对象，下面是它的常见属性

- `e.target`：触发绑定事件的对象，可以为本体，也可以为子盒子

- `e.clientX`：鼠标在**页面上可视区域的位置**，从浏览器可视区域左上角开始，即是以浏览器滑动条此刻的滑动到的位置为参考点，随滑动条移而变化

- `e.pageX`：鼠标在**页面上的位置**，从页面左上角开始，即是以页面为参考点，不随滑动条移动而变化

- `e.offsetX`：鼠标在 `e.target` **盒子里的位置**，如果该盒子有边框，则可能出现负值

- `e.stopPropagation`：阻止事件冒泡

- `e.preventDefault`：组件事件默认行为



### 3.5.2 DOM 高度宽度属性

https://vue3js.cn/interview/JavaScript/visible.html

主要考察盒子模型，一个 DOM 对象包含如下的高宽度属性：

- offsetHeight offsetWidth：包括盒子的 border + padding + content
- clientHeight clientWidth：包括盒子的 padding + content
- scrollHeight scrollWidth：包括盒子的 padding + 实际内容的尺寸
- scrollTop scrollLeft：DOM 内部元素滚动的距离

> 实际内容是指该盒子可能含有子盒子，子盒子内容尺寸大于该盒子内容尺寸



### 3.5.3 BOM API 使用记录

- **scrollIntoView**

MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView

将调用它的元素滚动到浏览器窗口的可见区域。（可用于锚点操作）

```js
const two = document.getElementById('two')

// block：垂直方向对齐方式    inline：水平方向对齐方式
if (two) two.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
```





### 3.5.4 事件捕获和事件冒泡

**事件流：有三个阶段**

- 事件捕获阶段：一种从上往下的传播方式，由DOM中最高层的父节点然后逐渐向下传播到触发节点

- 处于目标阶段

- 事件冒泡阶段：一种从下往上的传播方式，由触发节点然后逐渐向上传播到DOM中最高层的父节点



**事件模型可以分为三种**

- 原始事件模型：同一个类型的事件只能绑定一次、只支持冒泡，不支持捕获、btn.onclick = fun
- 标准事件模型：1、使用 addEventListener 进行监听，默认事件冒泡
- 标准事件模型：2、第三个参数决定该元素的事件在捕获还是冒泡中执行，可绑定多个事件
- 标准事件模型：3、事件捕获先执行，再目标元素事件，再事件冒泡
- https://github.com/febobo/web-interview/issues/64

> 原始事件模型、标准事件模型、IE事件模型、Netscape4事件模型



**addEventListener 使用方法**

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

> 如果设置第三个参数为useCapture，则默认为false，事件冒泡执行。为true，事件捕获执



**DOM 事件类型大全**

https://www.runoob.com/jsref/dom-obj-event.html

> 不支持冒泡：妈（mouseenter）妈( mouseleave )不( blur )放( focus )心你( load、unload、resize )



**Vue 里面的事件监听**

- 默认为事件冒泡执行：`@click="doThis"`
- 设置为事件捕获执行：`@click.capture="doThis"`
- 阻止该元素触发事件冒泡：`@click.stop="doThis"`

https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers



### 3.5.5 DOM 操作 API 记录

**document 对象**

推荐文章：https://juejin.cn/post/7029691847060488228

| 方法                                | 功能                        | 兼容性                       |
| ----------------------------------- | --------------------------- | ---------------------------- |
| `document.getElementById()`         | 通过 id 得到**元素**        | IE 6                         |
| `document.getElementsByTagName()`   | 通过标签名得到**元素数组**  | IE 6                         |
| `document.getElementsByClassName()` | 通过类名得到**元素数组**    | IE 9                         |
| `document.querySelector()`          | *通过选择器得到**元素**     | IE 8 部分兼容、IE 9 完全兼容 |
| `document.querySelectorAll()`       | *通过选择器得到**元素数组** | IE 8 部分兼容、IE 9 完全兼容 |




## 3.6 正则表达式介绍

菜鸟教程：https://www.runoob.com/regexp/regexp-tutorial.html

正则表达式实用大全：https://wangchujiang.com/regexp-example/



**常见的特殊字符匹配**

```
\d     匹配一个数字字符。等价于 [0-9]。
\D     匹配一个非数字字符。等价于 [^0-9]。
\f     匹配一个换页符。等价于 \x0c 和 \cL。
\n     匹配一个换行符。等价于 \x0a 和 \cJ。
\r     匹配一个回车符。等价于 \x0d 和 \cM。
\s     匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [\f\n\r\t\v]。
\S     匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。
\t     匹配一个制表符。等价于 \x09 和 \cI。
\v     匹配一个垂直制表符。等价于 \x0b 和 \cK。
\w     匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。
\W     匹配非字母、数字、下划线。等价于 '[^A-Za-z0-9_]'。 
```





## 3.7 Global&Window 

**全局对象介绍**

内部对象包括 Array、Boolean、Date、Function、Global、Math、Number、Object、RegExp、String

以及各种错误类对象，包括 Error、EvalError、RangeError、ReferenceError、SyntaxError 和 TypeError



**Window**

全局定义的变量会封装在 window 对象下



## 3.8 变量提升和函数提升

var 和 function 定义的变量或函数都会直接到块级作用域的最顶层，其中 function 定义的更高

其次就会是后者的声明覆盖前者：https://www.cnblogs.com/liuhe688/p/5891273.html	

```js
function hoistFunction() {
  foo(); // 2
  var foo = function() {
    console.log(1);
  };
  foo(); // 1
  function foo() {
    console.log(2);
  }
  foo(); // 1
}
```

```js
// 预编译之后
function hoistFunction() {
  var foo;
  foo = function foo() {
    console.log(2);
  }
  foo(); // 2
  foo = function() {
    console.log(1);
  }
  foo(); // 1
	foo(); // 1
}
```



## 3.9 JS 类型与运算符详解

**常用运算符**

推荐文章：https://juejin.cn/post/6993711769281626119

`&& 、|| 、??、?.`：https://www.cnblogs.com/jimyking/p/16225335.html

`&、|、^、~`（位运算，转换为二进制）：https://blog.csdn.net/qq_34205932/article/details/106481876

` obj.child = obj = { num2: 935 }; `：赋值操作先定义变量(从左到右)，再进行赋值（从右到左）



**鉴定为 false 的变量**

只有 `0，-0，NaN，""，null，undefined` 可以直接作为 false 判断，但是像 `[]、{}`  而是返回 true。最后记住：对象永远等于真！！！



**隐式类型转换**

在执行 `+、-、==` 运算符时，某些变量会进行隐式类型转换 `Boolean() Number() String()`，转换规则如下

https://vue3js.cn/interview/JavaScript/==%20_===.html

https://vue3js.cn/interview/JavaScript/type_conversion.html

> 一些特殊转换记录：Number([]) = 0, Number(null) = 0, Number(undefined) = NaN



## 3.10 高阶函数与闭包



## 3.11 浏览器页面进程







# 第四章 Windows setting

## 4.1 Typora 配置记录

- [x] **图像配置**

去偏好设置中设置图片指定路径：`./mark-img`，另外把下面的框全部勾选上即可

```
![图片描述](本地图片地址，最好用相对路径！)
[图片描述](网络图片地址)
```



- [x] **图片位置调整**

```html
<!-- 直接使用html标签即可 而且可以不用加引号！ -->
<img src=mark-img/image-20230211224700258.png  align="left" />
```



- [x] **Latex 数学公式语法**

参考文档：https://juejin.cn/post/6844903605720317959



## 4.2 VScode 设置


###  4.2.1 VScode 快捷键

```
ctrl + i: 触发建议

ctrl + h: 合并行

ctrl + /: 设置注释

ctrl + `: 打开终端

ctrl + j: 切换面板（终端和编辑器）

ctrl + [: 调整缩进

ctrl + d: 删除整行

ctrl + p: Open Live Server

ctrl + l: 选中该行

ctrl + g: 跳转行号

ctrl + '': 移动到行尾

ctrl + ;: 移动到行头

ctrl + shift + z: 取消撤销

ctrl+ shift + v: 预览Markdown

按住 alt 键: 实现多选

ctrl + b: 空了
```



### 4.2.2 VScode 插件介绍

Pritter - Code formatter - 代码格式化，https://blog.csdn.net/qq_45981075/article/details/114551233



Vue Language Features (Volar) + TypeScript Vue Plugin - Vue3 和 TS 代码支持，Vetur - Vue2 代码支持



Tabnine - 免费版 AI 代码自动补全，https://blog.csdn.net/RetroFlux/article/details/125773360



GitHub Copilot：AI 代码自动补全，https://blog.csdn.net/RetroFlux/article/details/124205948



Code Spell Checker - 单词拼写检查，https://blog.csdn.net/qq_42078081/article/details/115014474



DotENV - .env 环境变量文件语法高亮，https://blog.csdn.net/qq_45905655/article/details/130680442



EditorConfig for VS Code - .editorconfig 文件高亮效果



Beautify css/sass/scss/less - css/sass/scss/less 等文件实现格式化



HTML CSS Support - 在 HTML 编写中提示 CSS 的类名和 id 名 



JavaScript (ES6) code snippets - ES6 代码片段，https://github.com/xabikos/vscode-javascript



language-stylus、stylus supremacy：Stylus CSS 预处理器代码支持和一键格式化


npm Intellisense：自动补全引入 node modules 里面所安装的依赖，Path Intellisense：自动补全文件名



Git History - 在文件中右键可以查看该文件的所有 Git 历史



GitLens - 在每行代码后面都会显示最近一次的 Git 提交，另外在终端中还有单独的



Project Manager - 项目管理插件，https://cloud.tencent.com/developer/article/2196913




### 4.2.3 VScode 设置记录

- 在 VScode 中关闭对 js、ts 文件校验：搜索 validate 点击 TypeScript



- Volar 关闭箭头函数和 CSS 的 reference：搜索一下即可



- 关闭 VScode Git 功能： 设置中搜索 `git:Enabled`



- 关闭 VScode ESlint 检查：设置中搜索 `eslint.enable` 



### 4.2.4 VScode 配置代码片段

- 快捷键：Ctrl + Shift + P 打开搜索，搜索 snippets 选择配置用户代码片段



- 给当前项目单独配置，输入配置文件的名字如 `react` 回车，会在 .vscode 文件夹下指定生成 `react.code-snippets` 文件



- 进入网站：https://snippet-generator.app，配置之后然后粘贴到哪个文件对象下即可



- 一个配置文件可以使用多个代码片段。选择 vue.json 可以配置全局的代码片段



- 自主配置可以参考：https://zhuanlan.zhihu.com/p/475137755





## 4.3 修改浏览器缓存地址

删除这几个文件夹

```
C:\Users\LENOVO\AppData\Local\Microsoft\Edge\User Data\Default\Cache
C:\Users\LENOVO\AppData\Local\Microsoft\Edge\User Data\Default\Code Cache

C:\Users\LENOVO\AppData\Local\Google\Chrome\User Data\Default\Cache
C:\Users\LENOVO\AppData\Local\Google\Chrome\User Data\Default\Code Cache
```



新建 D 盘

```
D:\Browser_cache\chrome
D:\Browser_cache\edge
```



进入 CMD 输入

```
mklink /d "C:\Users\LENOVO\AppData\Local\Microsoft\Edge\User Data\Default\Cache" "D:\Browser_cache\edge"

mklink /d "C:\Users\LENOVO\AppData\Local\Microsoft\Edge\User Data\Default\Code Cache" "D:\Browser_cache\edge"
```

```
mklink /d "C:\Users\LENOVO\AppData\Local\Google\Chrome\User Data\Default\Cache" "D:\Browser_cache\chrome"

mklink /d "C:\Users\LENOVO\AppData\Local\Google\Chrome\User Data\Default\Code Cache" "D:\Browser_cache\chrome"
```



## 4.4 AOC 显示器设置

显示器型号：Q24P3C  首先下载 I-menu 软件：https://www.aocmonitor.com.cn/download，在软件里实现 OSD 配置的效果。G-menu 是游戏模式下的配置软件，剩下的两个软件在 I-menu 里面已经整合了

- 亮度模式使用标准模式，选择伽马二，色温模式选择正常模式
- DCR 开启之后会自动设置亮度和对比度，通常亮度会设置的很高（无法手动调节亮度了）
- HDR 模式开启后会模拟 HDR 效果，这时候亮度对比度色彩都会被自动调节
- Overdrive 越强，响应时间越短，但是可能产生灰影，非游戏模式下不建议开启
- Clear Vision 越强，文字色彩越重越深，自行判断设置的强度



**色彩校准**

搜索校准显示器颜色和启用 ClearType 文本，使 Window11 对显示器起到更高的支持 

设置原厂色彩校准教程：https://www.bilibili.com/read/cv3013179，感觉原厂的色彩太淡了,还是用了上一条设置



**缩放比例**

首先进入设置 - 屏幕 - 缩放 选择系统推荐的缩放即可。然后进入辅助功能 - 文本大小 设置文本放大，这样文本的锯齿感会降低一点，大小没有定论，自行设置即可
