## H5 JS CSS 知识点记录



### 第三方在线图标库

1、https://boxicons.com   https://boxicons.com/usage

```html
// index.html 中引入 css
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

// 作为在线字体使用
<i class='bx bxl-facebook-square'></i>
```



2、https://ionic.io/ionicons   https://ionic.io/ionicons/usage

```html
// index.html 中引入 js
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

// 作为在线字体使用
<ion-icon name="heart"></ion-icon>
```





### 媒体查询 + rem

1、html 默认 font-size 为16px ,  `1rem = html-font-size * 1`

2、媒体查询：通过视口宽度实现不同适配方案

2、媒体查询的作用：手动设置 `html-font-size `  、  手动修改不同视口宽度的样式

3、使用方法：

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





### pointer-events

设置元素是否对鼠标事件做出反应

```css
div.ex1 {
  pointer-events: none;
}
 
div.ex2 {
  pointer-events: auto;
}

/* 元素设置关闭后 整个盒子无法被点击选中 */
```





### 绝对定位内容居中

```css
/* 在有定位的父盒子中实现垂直水平居中 */
div {
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
}
```





### 设置100vw/vh时，vue出现滚动条

首先设置全局样式表 common.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    /* user-select: none; */
}

html, body, #app{
    height: 100%;
}
```

之后在 main.js 中引入即可解决 

```js
import "./assets/css/common.css"
```




### img a 标签问题

```css
// src为空时，img标签不显示裂图
img[src=""], img:not([src]) {
    opacity:0;
}

// a 标签不跳转
<a href="javascript:void(0);" >
```



### flex grid 布局技巧

```css
/* 1、flex */

/* 实现居中 */
div {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 行列间隙：column-gap  row-gap */



/* 2、grid */

/* 实现居中 */
div {
    display: grid;
    place-items: center;
}

/* 将两个子元素按比例划分 */
div {
    display: grid;
    grid-template-columns: 15% 85%;   
}
```



### 让元素占满整个页面

```css
body {
    /* body宽度默认100% 默认高度为内容高度 */
    /* 这条可以让body占满整个页面 */
    min-height: 100vh;
 
    /* 让body中的内容实现垂直水平居中*/
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    overflow: hidden;
}
```



### html、body、自定义属性

```css
html：整个页面

body：整个内容

:root {
    --clr: #222327;
}
/* var(--clr) */
```



### css初始化属性

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
```



### 100vh / 100vw

```css
/* 规定当高度小于800px时 内容高度不再随视口高度变化而变化 宽度同理 */
div {
    min-height: 800px;
    height: 100vh;
}

min-height: 100vh /* 表示高度时刻随视口高度变化而变化 */
```



### img属性

```css
// 保持图片匹配
.imgBx img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

fill		默认，不保证保持原有的比例，内容拉伸填充整个内容容器
contain		保持原有尺寸比例。内容被缩放
cover		保持原有尺寸比例。但部分内容可能被剪切
none		保留原有元素内容的长度和宽度，也就是说内容不会被重置
```



### 实现字体

```css
/* 首先电脑要安装该字体 或者直接引入*/
/* font-family: 'Varela Round'; */
@font-face {
    font-family: 'Poppins';
    src: url("./Poppins.ttf");
}

/* 引入在线谷歌字体 */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap');
```



### 适配最小内容高度

```css
height: min-content;
```



### 背景无限循环移动

```css
body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(./wave-haikei.png);
    background-size: cover;
    /* 逆向且循环播放 */
    animation: move 10s linear alternate infinite;
}

@keyframes move {
    50% {
        background-position: 50%;
    }
}
```



### calc 宽度基于父类的计算

```css
.wrapper .buttons {
    display: flex;
    /* 宽度占父类的100% 并且子元素两边对齐 */
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.wrapper .buttons button {
    /* 宽度基于父类的计算！！ */
    width: calc(50% - 10px);
}
```



### input 样式

```css
.input-field input {
    background: none;
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: #333;
}

.input-field input::placeholder {
    color: #aaa;
}
```

```
### 行内元素margin-top无效！！！！！！解决：加定位、变块元素

### 绝对定位的宽度只会继承参考点属性中的宽度！！！
```



### `e.target`和`this`有什么区别？？

```js
// 1、由于事件捕获、事件冒泡会导致多个对象产生监听 
// 2、e.target返回真正触发事件的对象 和 this可能不一样！！

// 事件委托通常需要结合使用 e.target 属性。
```



### 滚动条参数

```css
#files-list {
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
}
#files-list::-webkit-scrollbar {
    width: 0;
}
```



### 禁止右键、复制、快捷键

```js
// 禁止打开右键
document.oncontextmenu=new Function("event.returnValue=false");
// 禁止滑动选中
document.onselectstart=new Function("event.returnValue=false");

document.onkeydown = function(event){
    if (event.ctrlKey && window.event.keyCode==65){   //禁用ctrl + a 功能
        return false;
    }
    
    if (event.ctrlKey && window.event.keyCode==67){	//禁用ctrl + c 功能
        return false;
    }
    
    if (event.ctrlKey && window.event.keyCode==83){	//禁用ctrl + s 功能
        return false;
    }

    if (event.ctrlKey && window.event.keyCode==86){	//禁用ctrl + v 功能
        return false;
    }
}

```

### 背景图片适配
```css
.scan .fingerprint {
    width: 300px;
    height: 380px;
    background: url(./fingerprint.png) no-repeat;
    /* 一般指定宽度为盒子宽度 或者cover */
    background-size: 300px;
}
```

### 未定义高度的惯用套路：用padding撑开！！
```css 
.container {
    width: 31.25em;
    padding: 5em 3.75em;
    /* 实现在body中脱标垂直水平居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
```

### flex行内元素贴不到两边
```css
/* 必须转块级元素或者行内块 */
p {
    display: block;
    justify-content: space-between;
}
```

### 常用JS函数
```js
toFixed：保留小数位

substr：截取字符串

for (let i of items)：循环遍历

String.fromCharCode(ASCII码)：通过ASCII码返回字符

charCodeAt(str)：返回str的ASCII码

Math.floor(Math.random() * num)：返回0到num-1的整数

navigator.clipboard.writeText(123);：实现用户复制内容为123

splice(下标，个数，替换的值)：数组值替换（可替换、添加、删除值） 如：第三项不填则为删除

forEach()、map()：一个遍历数组，一个返回遍历数组

function isLeapYear(year) { 判断闰年
    return (
        (year % 4 == 0 && year % 100 != 0 && year % 400 !=0) ||
        (year % 100 == 0 && year % 400 == 0)
    );
}

// 显示当前时间
setInterval(function() {
    const timer = new Date();
    let option = {hour : 'numeric',minute : 'numeric',second : 'numeric',hour12 : false,}
    let formateTimer = new Intl.DateTimeFormat('en-us',option).format(timer)
    console.log(formateTimer);
},1000)

// 数组与字符串互相转化
Arr.join('/r/n')  Str.split() 

// exec()：正则表达式匹配字符串
let arr = regStyle.exec(htmlData);
let cssData = arr[0].replace('<style>','').replace('<\/style>','');

// 新对象拥有全部属性，相同属性，后者覆盖前者
const obj = {...apple, ...pen};
```

### js细节大全
```js
// <!-- defer：文档加载完毕再加载js -->
{/* <script src="./script.js" defer></script> */}

// 提供报错
throw console.error('The dimension of the board must be an even number.');

// date对象 月份从0开始 天从1开始
new Date(2020,10)：得到2020年11月份的第一天date对象
new Date(2020,10,2)：得到2020年11月2号date对象
```

### 在JS中写html 并插入html中
```js
// 在js中写html
const cards = `
    <div class="board" style="grid-template-columns: repeat(${dimension},auto);">
    ${
        items.map(item => item= `
            <div class="card">
                <div class="board-front"></div>
                <div class="board-back">${item}</div>
            </div>            
        `).join('')
    }
    </div>        
`;

// items.map()：返回一个新数组  item.map().join('')：将新数组转化为字符串

// 将cards转化为dom元素 命名为parser
const parser = new DOMParser().parseFromString(cards,'text/html');

// 将selectors.board替换成parser.querySelector('.board')
selectors.board.replaceWith(parser.querySelector('.board'));

```

### css特殊选择器
```css
/* 选择当包含flipped的所有元素中不包含matched的元素 */
.flipped:not(.matched) {};

/* 当board-container中包含了flipped 对board作用 */
.board-container.flipped .board {};

```

### css隐藏背面
```css
/* 当元素旋转时 背面不可见 */
backface-visibility: hidden;    
```



### 页面变灰方案

```css
html {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
```



### 动画收集

1、上下浮动

```css
```



