## 第一章 HTML CSS



### 1.1 CSS 常用样式记录

- **calc() 函数**

参考文档：https://blog.csdn.net/p1967914901/article/details/127405749

```scss
width: calc(50% - 10px);
width: calc((100% - 184.62px) / 2);
```

- **CSS 变量**

```css
:root {
  --hue:180;
}
```

- **宽度取内容宽度**

```css
width: fit-content
```

- **渐变色定义**

`0deg` 将创建一个从下到上的渐变，`90deg` 将创建一个从左到右的渐变。设置 0% - 100%

```scss
background: linear-gradient(90deg, rgba(223, 229, 230, 0) 0%,
rgba(223, 229, 230, 1) 100%);
```





### 1.2 CSS 选择器详解

- **伪类选择器**

```css
.test:first-of-type、first-child 选中类名为test并且为父元素的第一个元素，若不满足条件则无法选中


.test:last-of-type、last-child 选中类名为test并且为父元素的最后一个元素，若不满足条件则无法选中


.test:nth-child(n) 选中类名为test并且为在父元素指定位置n的一个元素，若不满足该条件则无法选中

.test:nth-last-of-type(n) 选中类名为test并且为在父元素指定位置n的一个元素（从末尾开始计数）若不满足该条件则无法选中
```

```css
:link 选择未被访问的链接
:visited 选取已被访问的链接
:active 选择活动链接
:hover 鼠标指针浮动在上面的元素
:focus 选择具有焦点的
:root 设置HTML文档
:empty 指定空的元素
:enabled 选择可用元素
:disabled 选择被禁用元素
:checked 选择选中的元素
```



- **属性选择器**

```csss
[attribute*=value]：选择attribute属性值包含value的所有元素
[attribute^=value]：选择attribute属性开头为value的所有元素
[attribute$=value]：选择attribute属性结尾为value的所有元素
```



- **:not(selector)**

选择与 `<selector>` 选择器不匹配的所有元素，下面是例子

```css
/* 选择当包含 flipped 的所有元素中不包含 matched 的元素 */
.flipped:not(.matched) {};

/* 当 board-container 中包含了 flipped 对 board 作用 */
.board-container.flipped .board {};
```



### 1.3 CSS 滚动条样式

全局 css 设置

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

>::-webkit-scrollbar — 整个滚动条.
>::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头).
>::-webkit-scrollbar-thumb — 滚动条上的滚动滑块.
>::-webkit-scrollbar-track — 滚动条轨道.
>::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分.
>::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分.
>::-webkit-resizer — 某些元素的corner部分的部分样式(例:textarea的可拖动按钮).



### 1.5 Img 属性图片使用

- **保持盒子内图片匹配**

```scss
.imgBx img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

fill		// 默认，不保证保持原有的比例，内容拉伸填充整个内容容器
contain		// 保持原有尺寸比例。内容被缩放
cover		// 保持原有尺寸比例。但部分内容可能被剪切
none		// 保留原有元素内容的长度和宽度，也就是说内容不会被重置
```



- **src为空时，img标签不显示裂图**

```js
img[src=""], img:not([src]) {
    opacity:0;
}
```



- **访问网络图片必须添加如下属性**

```html
index.html
<meta name="referrer" content="no-referrer">
```

> https://blog.csdn.net/u011127019/article/details/125169827



- **src 绑定 JS 变量**

```js
// 不能直接使用js变量存储地址字符串给src 需要先引入资源

import img from './img.png'
const img = require('./img/clock.svg')
```

```html
<img :src="img" />
```



- **背景图片适配**

```css
div {
    width: 300px;
    height: 380px;
    background: url(./fingerprint.png) no-repeat;
    /* 一般指定宽度为盒子宽度 或者cover contain*/
    background-size: 300px;
}
```



### 1.6 媒体查询 Rem布局



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



### 1.7 CSS 常用代码记录

#### 1.7.1 CSS 初始化属性

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
li {
    list-style: none;
}
/* 去除图片之间的空隙 */
img {
    vertical-align: middle;
}
a {
    color: #666;
    text-decoration: none;

    /* 去除在移动端下a标签点击的蓝色背景 */
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;

}
input {
    border: 0;
    outline: none;
}
input::placeholder {
    color: #aaa;
}
```



#### 1.7.2 绝对定位内容居中

```css
/* 在有定位的父盒子中实现垂直水平居中 */
div {
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
}
```



#### 1.7.3 Flex/Grid 布局技巧

```css
/* flex实现居中 */
div {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* flex行列间隙：column-gap  row-gap */


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



#### 1.7.4 CSS 文字属性

```scss
// 引入字体
font-family: 'Varela Round';
@font-face {
    font-family: 'Poppins';
    src: url("./Poppins.ttf");
}

// 引入在线谷歌字体
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap');

// 文字间距
letter-spacing: 1px;

// 文字段落间距
word-spacing

// 垂直位置
vertical-align

// 水平位置
text-align
```








## 第二章 JavaScript



### 2.1 ES6 使用笔记

Set：https://juejin.cn/post/7107449385264349191

Map：https://juejin.cn/post/7106898275290054692

WeakMap：https://juejin.cn/post/7107261631859523615

Symbol 内置符号：https://juejin.cn/post/7074608058369835015

Symbol 类型：https://juejin.cn/post/7073852491695128583

Error 类型：https://juejin.cn/post/7169017392016654372

```js
// 直接抛出一个错误 可以使得后面的代码不再执行
throw new Error('参数不是一个可迭代对象')
```

迭代器/生成器：https://juejin.cn/post/7141685685940912136



原型和原型链：

- 对于 ES6 复杂类型，实例里面都有一个 `__proto__` 属性执行构造函数的 `prototype`
- 构造函数的 `prototype` 里面有多个原型方法，不同复杂类型对应不同方法
- 所以实例复杂类型可以直接调用哪些原型方法
- 所有的 `prototype` 都有一个属性 `constructor`，这是一个原型构造函数

```js
// 可查看原型及其方法
let s = new Set()
console.log(s)
let o = new Object()
console.log(o);
let m = new Map()
console.log(m);
let r = new RegExp()
console.log(r)
let w = new WeakMap()
console.log(w);
let f = new Function()
console.log(f);
let a = new Array()
console.log(a);
```

```js
// 构造函数的使用
let a1 = new a.constructor() // 等效于 new Arrar()
console.log(a1);

// 复制内容
let a1 = new a.constructor(a)
```





### 2.2 对象常见函数

MDN 官方文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

内含多个 API 使用方法



- **Object.assign**

用来合并对象。如果存在同名属性则o1被o2覆盖，返回o1对象  浅拷贝

```js
Object.assign(obj1, obj2)
```



- **Object.keys、Object.values 、Object.entries**

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



- **for in 循环**

for...in 遍历一个对象的**可枚举属性**，如对象、数组、字符串。针对属性，所以获得 key

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



- **delete obj.name：删除对象属性**



- **obj.hasOwnProperty**：只会检查**对象的自有属性**，对象原形上的属性其不会检测





### 2.3 数组常见函数

https://vue3js.cn/interview/JavaScript/array_api.html

容易搞混的几个api

`arr.splice`：arr.splice(下标，个数，替换的值)

`arr.slice`：截取下标为 a ，到下标为 b（不包括 b）的区间（字符串也适用）

`str.split('')`：将字符串变成数组



- 普通方法总结

```js
1、arr.shift：删除数组的第一个元素   

2、arr.unshift：插入数组第一个元素

3、arr.concat：直接将多个数组、多个数字拼接成一个数组 
let a= [].concat(1,2,3,[4,5],[6,7])

4、let newArr = arr.slice(a, b) 截取下标为 a ，到下标为 b（不包括 b）的区间

5、arr.reverse()：用来将一个数组中的全部项顺序置反

6、arr.indexOf(value)：数组存在value则返回下标 不存在返回
```



- **arr.splice**

arr.splice(下标，个数，替换的值)：数组值替换（可替换、添加、删除值） 如：第三项不填则为删除

```js
// 删除下标为index的项
arr.splice(index, 1)
```



- **arr.reduce**

使用方法：https://blog.csdn.net/hannah2233/article/details/128367223



- **arr.some**

some() 方法会依次执行数组的每个元素：

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

遍历查找数组，返回找到的值

```js
let num = arr.find(item => item == 12)
```



- **arr.forEach**

遍历操作数组，**没有返回值**，对item进行操作不会改变原数组。但是如果item为复杂类型则会产生改变

```js
arr.fonEach((item,index,arr) => {})
```



- **arr.map**

遍历操作数组，返回一个新数组

当数组为简单类型时，不会该变原数组，当为引用类型时，则会改变原数组！！

```js
let newArr = arr.map((item,index,arr) => item + 1)
```

map 使用方法：https://blog.csdn.net/Anna0115/article/details/103696124



- **arr.filter**

遍历筛选数组，回调函数返回布尔类型，返回一个满足条件的新数组

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

for...of 遍历一个可迭代对象，如数组、字符串、Map/Set（无对象） 。针对一个迭代对象，所以获得 value

```js
for (let key of arr) {}
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





### 2.4 JavaScript 常用函数

- 30 个常用函数

https://juejin.cn/post/7145036326373425159



- JSON.stringify

https://juejin.cn/post/7191712569394987065


- Math

```js
Math.ceil() // 数字向上取整

Math.round() // 四舍五入

Math.abs() // 绝对值

Math.floor() // 向下

parseInt(a) // 字符串转化为整数（向下取整）

isNaN(a * 1) // 判断 a 是不是数字

toFixed：// 保留小数位

Math.floor(Math.random() * num)：// 返回0到num-1的整数
```



- 字符串

https://vue3js.cn/interview/JavaScript/string_api.html

```js
substr：// 截取字符串

Arr.join() , Str.split() // 数组与字符串互相转化

String.fromCharCode(ASCII码)：// 通过ASCII码返回字符 A从6

charCodeAt(str)：// 返回str的ASCII码
```



- 其他函数

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



- 获取随机值

使用 `Mock.Random`：https://github.com/nuysoft/Mock/wiki/Mock.Random

```js
import Mock from 'mockjs'
const Random = Mock.Random

console.log(Random.date())
```





### 2.5 DOM BOM 使用记录

DOM 常用操作：https://vue3js.cn/interview/JavaScript/Dom.html

BOM  常用操作：https://vue3js.cn/interview/JavaScript/BOM.html



#### 2.5.1 Event 高度宽度属性

e 就是鼠标对象 MouseEvent：`show(e) {}`，下面是一些属性

1、`e.target`：触发绑定事件的对象，可以为本体，也可以为子盒子



2、`e.clientX`：鼠标在**页面上可视区域的位置**，从浏览器可视区域左上角开始，即是以浏览器滑动条此刻的滑动到的位置为参考点，随滑动条移而变化



3、`e.pageX`：鼠标在**页面上的位置**，从页面左上角开始，即是以页面为参考点，不随滑动条移动而变化



4、`e.offsetX`：鼠标在 `e.target` **盒子里的位置**，如果该盒子有边框，则可能出现负值



#### 2.5.2 DOM 高度宽度属性

https://vue3js.cn/interview/JavaScript/visible.html

主要考察盒子模型，一个 DOM 对象包含如下的高宽度属性：

- offsetHeight offsetWidth：包括盒子的 border + padding + content
- clientHeight clientWidth：包括盒子的 padding + content
- scrollHeight scrollWidth：包括盒子的 padding + 实际内容的尺寸
- scrollTop scrollLeft：DOM 内部元素滚动的距离

> 实际内容是指该盒子可能含有子盒子，子盒子内容尺寸大于该盒子内容尺寸



#### 2.5.3 BOM API 使用记录



- **scrollIntoView**

MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView

将调用它的元素滚动到浏览器窗口的可见区域。（可用于锚点操作）

```js
const two = document.getElementById('two')

// block：垂直方向对齐方式    inline：水平方向对齐方式
if (two) two.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
```





### 2.6 事件冒泡和事件委托

- 由于事件捕获、事件冒泡会导致多个对象产生监听 
- e.target 返回真正触发事件的对象 和 this 可能不一样！！
- 事件委托通常需要结合使用 e.target 属性







## 第三章 编辑器操作记录



### 3.1 Typora 图片设置

1、去偏好设置中设置图片指定路径：`./mark-img`

2、粘贴图片后改一下图片 url，确保 github 可以识别：

原图片地址：`D:\文档\学习文件\GitWebProjects\Markdown\Vue\mark-img\image-20230118225827872.png`

改为：`mark-img/image-20230118225827872.png`     注意是这个： `/` 



3、图片位置调整：https://blog.csdn.net/K346K346/article/details/108162853



### 3.2 VScode 快捷键

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



### 3.3 VScode 插件介绍

1、pritter-Code formatter - 代码格式化

https://blog.csdn.net/qq_45981075/article/details/114551233



2、Vue Language Features (Volar) - Vue3 代码支持



3、Vetur - Vue2 代码支持



### 3.4 VScode 设置记录

- 在 vs code 中关闭对 js、ts 文件校验：`搜索 validata 点击 TypeScript`



### 3.5 VScode 配置代码片段

快捷键：Ctrl + Shift + P 打开搜索，搜索 snippets 选择配置用户代码片段

在下面选择 vue.json 配置vue的代码片段，进入网站：https://snippet-generator.app/

配置然后粘贴即可

参考：https://blog.csdn.net/sinat_36359516/article/details/128042359