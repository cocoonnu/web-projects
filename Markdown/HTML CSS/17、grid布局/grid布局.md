# 一、Grid 概述

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

<img src="mark-img/1_bg2019032501.png" alt="img" style="zoom:50%;" />

上图这样的布局，就是 Grid 布局的拿手好戏。

Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内多个项目的位置。但是它们也存在重大区别。

Flex 布局是轴线布局，只能指定 “项目” 针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成 “行” 和 “列” 产生单元格，然后指定 “项目所在” 的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

> 目前 Grid 布局的浏览器兼容性不是太好，移动端比 PC 端要好得多。



![webp](mark-img/webp.jpg)



## 1.1 容器和项目

采用网格布局的区域，称为 “容器”（container）。容器内部采用网格定位的子元素，称为 “项目”（item）。

```html
<div>
  <div><p>1</p></div>
  <div><p>2</p></div>
  <div><p>3</p></div>
</div>
```

上面代码中，最外层的 `<div>` 元素就是容器，内层的三个 `<div>` 元素就是项目。

注意：项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的 `<p>` 元素就不是项目。Grid 布局只对项目生效。



## 1.2 行和列

容器里面的水平区域称为 “行”（row），垂直区域称为 “列”（column）。

水平的深色区域就是 “行”，垂直的深色区域就是 “列”。

<img src="mark-img/1_bg2019032502.png" alt="img" style="zoom:50%;" />





## 1.3 网格布局

在容器中会定义好 grid 网格布局，网格布局由一个个单元格组成。正常情况下，`n` 行和 `m` 列会产生 `n x m` 个单元格。虚线为网格线，**划分出单元格**

```css
div {
    background-color: aliceblue;
    width: 500px;
    height: 200px;
    display: grid;
    grid-template-columns: 100px 200px 100px 50px 50px;
    grid-template-rows: repeat(2, 100px);
    justify-items: center;
}
```

![image-20230210170951818.png](mark-img/image-20230210170951818.png)



单元格内存放容器中的项目，默认情况下项目和单元格按顺序一对一存放，**并且项目百分比对应单元格宽度**

```html
<div>
    <span>1</span>
    <span class="two">2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
</div>
```

```css
span {
    width: 100%;
    height: 100%;
}

.two {
    background-color: #F9CC9D;
}
```

![image-20230210171859018](mark-img/image-20230210171859018.png)





## 1.4 网格线

划分网格的线，称为 “网格线”（grid line）。水平网格线划分出行，垂直网格线划分出列。

正常情况下，`n` 行有 `n + 1` 根水平网格线，`m` 列有 `m + 1` 根垂直网格线，比如三行就有四根水平网格线。

<img src="mark-img/1_bg2019032503.png" alt="img" style="zoom: 67%;" />



grid 布局工具：https://www.lingdaima.com/grid/



# 二、容器属性

采用网格布局的区域，称为 “容器”（container），就是指父元素属性。



## 2.1 display 属性

`display: grid` 指定一个容器采用网格布局。

默认情况下，容器元素都是块级元素，也可以设成行内元素 `display: inline-grid;`。



> 注意，设为网格布局以后，容器子元素（项目）的 `float`、`display: inline-block`、`display: table-cell`、`vertical-align` 和 `column-*` 等设置都将失效。



## 2.2 grid-template-columns/rows

容器指定了网格布局以后，接着就要划分**单元格的行宽和列宽**，注意不是项目

1、`grid-template-columns: n1 n2 n3...`：n 为每一列的列宽，n 的个数为每列元素个数

2、`grid-template-rows: m1 m2 m3`：m 为每一行的行高，m 的个数为每行元素个数



> 如果未定义 grid-template-rows，则会根据列宽和列的个数默认填充满容器
>
> 如果未定义 grid-template-columns，则默认列宽为容器宽度



指定一个三行三列的网格，列宽和行高都是 `100px`

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```



除了使用绝对单位，也可以使用百分比（百分比是基于容器宽度的比例）

```css
.container {
  display: grid;
  /* 100 ÷ 3 ≈ 33.33333333333333（一般保留两位小数即可）*/
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```



### 2.2.1 repeat() 函数

有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用 `repeat()` 函数，简化重复的值。上面的代码用 `repeat()` 改写如下。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
```

`repeat()` 接受两个参数，第一个参数是**重复的次数**（上例是3），第二个参数是所要**重复的值**。

`repeat()` 重复某种模式也是可以的。

```css
grid-template-columns: repeat(2, 100px 20px 80px);
/* 100px 20px 80px 100px 20px 80px */
```

上面代码定义了 6 列，第一列和第四列的宽度为 `100px`，第二列和第五列为 `20px`，第三列和第六列为 `80px`。



### 2.2.2 auto-fill 关键字
repeat() 函数 内置 auto-fill 关键字

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 `auto-fill` 关键字表示自动填充。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

上面代码表示**每列宽度 `100px`，然后自动填充，直到容器不能放置更多的列**，然后换行继续依次排列。



### 2.2.3 fr 关键字

为了方便表示**比例关系**，网格布局提供了 `fr` 关键字来占据容器宽度的比列。

1、定义两个相同宽度的列

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```



2、定义第一列占 1/3 第二列占 2/3

```css
grid-template-columns: 1fr 2fr;
```



3、`fr` 还可以与绝对长度的单位结合使用，第一列的宽度为 150 像素，第二列的宽度是第三列的一半。

```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

<img src="mark-img/image-20220227180532881-164595711490010.png" alt="image-20220227180532881" style="zoom:33%;" />



4、传统的十二网格布局，写起来也很容易。

```css
grid-template-columns: repeat(12, 1fr);
```



### 2.2.4 minmax() 函数

`minmax()` 函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```

上面代码中，`minmax(100px, 1fr)` 表示列宽不小于 `100px`，不大于 `1fr`。

![1](mark-img/1.gif)





### 2.2.5 auto 关键字

`auto` 关键字表示由浏览器自己决定长度。

```css
grid-template-columns: 100px auto 100px;
```

上面代码中，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了 `min-width`，且这个值大于最大宽度。



### 2.2.6 网格线的名称

`grid-template-columns` 属性和 `grid-template-rows` 属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

上面代码指定网格布局为 3 行 3 列，因此有 4 根垂直网格线和 4 根水平网格线。方括号里面依次是这八根线的名字。**网格布局允许同一根线有多个名字**，比如 `[fifth-line row-5]`。






## 2.3 grid-column/row-gap

注：`grid-` 前缀可以去掉，并且这三个属性在**非 grid 布局也可以使用**



**1、grid-column/row-gap**

`grid-row-gap` 属性设置行与行的间隔（行间距），`grid-column-gap` 属性设置列与列的间隔（列间距）。

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```

上面代码中，`grid-row-gap` 用于设置行间距，`grid-column-gap` 用于设置列间距。

<img src="mark-img/bg2019032511.png" alt="img" style="zoom:50%;" />



**2、grid-gap**

`grid-gap` 属性是 `grid-column-gap` 和 `grid-row-gap` 的合并简写形式，语法如下。

```css
grid-gap: <grid-row-gap> <grid-column-gap>;
```

因此，上面一段 CSS 代码等同于下面的代码。

```css
.container {
  grid-gap: 20px 20px;
}
```

> 如果 `grid-gap` 省略了第二个值，浏览器认为第二个值等于第一个值。





## 2.4 grid-template-areas

网格布局允许指定 “区域”（area），**一个区域由单个或多个单元格组成**。该属性用于定义区域。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```

上面代码先划分出9个单元格，然后将其定名为 `a` 到 `i` 的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

```css
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
```

上面代码将 9 个单元格分成 `a`、`b`、`c` 三个区域。



**下面是一个布局实例**

```css
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";
```

上面代码中，顶部是页眉区域 `header`，底部是页脚区域 `footer`，中间部分则为 `main` 和 `sidebar`。

如果某些区域不需要利用，则使用 “点”（`.`）表示。

```css
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```

上面代码中，中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。

1、注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为 `区域名-start`，终止网格线自动命名为 `区域名-end`。

2、比如，区域名为 `header`，则起始位置的水平网格线和垂直网格线叫做 `header-start`，终止位置的水平网格线和垂直网格线叫做 `header-end`。



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>区域</title>
    <style>
        .container {
            width: 980px;
            height: 600px;
            margin: 10px auto;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
                                "header header header"
                                "main main sidebar"
                                "footer footer footer";
        }

        .header {
            grid-area: header;
            background-color: red;
        }

        .main {
            grid-area: main;
            background-color: green;
        }

        .sidebar {
            grid-area: sidebar;
            background-color: blue;
        }

        .footer {
            grid-area: footer;
            background-color: gray;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header"></div>
    <div class="main"></div>
    <div class="sidebar"></div>
    <div class="footer"></div>
</div>
</body>
</html>
```

![image-20220227184302178](mark-img/image-20220227184302178.png)



## 2.5 grid-auto-flow

这个顺序由该属性决定，默认值是 `row`，即 “先行后列”。也可以将它设成 `column`，变成 “先列后行”。

<img src="mark-img/bg2019032506-164595896089512.png" alt="img" style="zoom:50%;" />

```css
grid-auto-flow: column;
```

上面代码设置了 `column` 以后，放置顺序就变成了下图。

<img src="mark-img/bg2019032512.png" alt="img" style="zoom:50%;" />

`grid-auto-flow` 属性除了设置成 `row` 和 `column`，还可以设成 `row dense` 和 `column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

下面的例子让 1 号项目和 2 号项目各占据两个单元格，然后在默认的 `grid-auto-flow: row` 情况下，会产生下面这样的布局。

<img src="mark-img/bg2019032513.png" alt="img" style="zoom:50%;" />

上图中，1 号项目后面的位置是空的，这是因为 3 号项目默认跟着 2 号项目，所以会排在 2 号项目后面。

现在修改设置，设为 `row dense`，表示 “先行后列”，并且尽可能紧密填满，尽量不出现空格。

```css
grid-auto-flow: row dense;
```

上面代码的效果如下。

<img src="mark-img/bg2019032514.png" alt="img" style="zoom:50%;" />

上图会先填满第一行，再填满第二行，所以 3 号项目就会紧跟在 1 号项目的后面。8 号项目和 9 号项目就会排到第四行。

如果将设置改为 `column dense`，表示 “先列后行”，并且尽量填满空格。

```css
grid-auto-flow: column dense;
```

上面代码的效果如下。

<img src="mark-img/bg2019032515.png" alt="img" style="zoom:50%;" />

上图会先填满第一列，再填满第 2 列，所以 3 号项目在第一列，4 号项目在第二列。8 号项目和 9 号项目被挤到了第四列。



## 2.6 justify/align/place-items

`justify-items` 属性设置**单元格内容（即项目在单元格中的位置）**的水平位置

`align-items` 属性设置单元格内容的垂直位置

| 属性值    | 说明                                 |
| --------- | ------------------------------------ |
| `start`   | 对齐单元格的起始边缘                 |
| `end`     | 对齐单元格的结束边缘                 |
| `center`  | 单元格内部居中                       |
| `stretch` | 拉伸，占满单元格的整个宽度（默认值） |



```css
.container {
  justify-items: start;
}
```

上面代码表示，单元格的内容左对齐，效果如下图。

![img](mark-img/bg2019032516.png)

```css
.container {
  align-items: start;
}
```

上面代码表示，单元格的内容头部对齐，效果如下图。

![img](mark-img/bg2019032517.png)





`place-items` 属性是 `align-items` 属性和 `justify-items` 属性的合并简写形式。

```css
place-items: <align-items> <justify-items>;
```

```css
place-items: start end;
```

> 如果省略第二个值，则浏览器认为与第一个值相等。



## 2.7 justify/align/place-content

`justify-content` 属性是整个内容区域在容器里面的水平位置（左中右）

`align-content` 属性是**整个内容区域**的垂直位置（上中下）

```css
.container {
	justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
	align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```



以 `justify-content` 定义为例：

> - start - 对齐容器的起始边框。

![img](mark-img/bg2019032519.png)

> - end - 对齐容器的结束边框。

![img](mark-img/bg2019032518.png)

> - center - 容器内部居中。

![img](mark-img/bg2019032520.png)

> - stretch - 项目大小没有指定时，拉伸占据整个网格容器。

![img](mark-img/bg2019032521.png)

> - space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。

![img](mark-img/bg2019032522.png)

> - space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。

![img](mark-img/bg2019032523.png)

> - space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

![img](mark-img/bg2019032524.png)





`place-content` 属性是 `align-content` 属性和 `justify-content` 属性的合并简写形式。

```css
place-content: <align-content> <justify-content>
```

```css
place-content: space-around space-evenly;
```
> 如果省略第二个值，浏览器就会假定第二个值等于第一个值。



## 2.8 grid-auto-columns/rows

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有 3 行，但是某一个项目指定在第 5 行。这时，浏览器会自动生成多余的网格，以便放置项目。

1、`grid-auto-columns` 属性和 `grid-auto-rows` 属性用来设置，浏览器自动创建的多余网格的列宽和行高。



2、它们的写法与 `grid-template-columns` 和 `grid-template-rows` 完全相同。



3、如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。



案例：划分好的网格是 3 行 3 列，但是，8 号项目指定在第 4 行，9 号项目指定在第 5 行。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>grid-auto</title>
    <style>
        #container {
            display: grid;
            grid-template-columns: 100px 100px 100px;
            grid-template-rows: 100px 100px 100px;
            grid-auto-rows: 50px;
        }

        .item {
            font-size: 2em;
            text-align: center;
            border: 1px solid #e5e4e9;
        }

        .item-1 {
            background-color: #ef342a;
        }

        .item-2 {
            background-color: #f68f26;
        }

        .item-3 {
            background-color: #4ba946;
        }

        .item-4 {
            background-color: #0376c2;
        }

        .item-5 {
            background-color: #c077af;
        }

        .item-6 {
            background-color: #f8d29d;
        }

        .item-7 {
            background-color: #b5a87f;
        }

        .item-8 {
            background-color: #d0e4a9;
            grid-row-start: 4;
            grid-column-start: 2;
        }

        .item-9 {
            background-color: #4dc7ec;
            grid-row-start: 5;
            grid-column-start: 3;
        }
    </style>
</head>
<body>
<div id="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-8">8</div>
    <div class="item item-9">9</div>
</div>
</body>
</html>
```

上面代码指定新增的行高统一为 50px（原始的行高为 100px）。

<img src="mark-img/bg2019032525.png" alt="img" style="zoom:50%;" />



## 2.9 grid-template、grid

`grid-template` 属性是 `grid-template-columns`、`grid-template-rows` 和 `grid-template-areas` 这三个属性的合并简写形式。



`grid` 属性是 `grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow` 这六个属性的合并简写形式。



从易读易写的角度考虑，还是建议不要合并属性，所以这里就不详细介绍这两个属性了。



# 三、项目属性

首先在容器中划分好单元格，即网格布局后。**再定义项目在单元格的位置。**

grid 里面所谓的项目就是容器里面的子元素，下面是子元素常见的属性



## 3.1 项目单独指定位置

**项目在网格布局中的位置**是可以指定的，网格布局完成后会有网格线。

项目单独指定位置的具体方法就是**指定项目的四个边框，分别定位在哪根网格线。**

- `grid-column-start` 属性：左边框所在的垂直网格线
- `grid-column-end` 属性：右边框所在的垂直网格线
- `grid-row-start` 属性：上边框所在的水平网格线
- `grid-row-end` 属性：下边框所在的水平网格线

```css
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

上面代码指定，1 号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。

<img src="mark-img/image-20230210172555514.png" alt="image-20230210172555514" style="zoom:33%;" />

上图中，只指定了 1 号项目的左右边框，没有指定上下边框，所以会采用默认位置，即上边框是第一根水平网格线，下边框是第二根水平网格线。



除了 1 号项目以外，其他项目都没有指定位置，由浏览器自动布局。

这时它们的位置由容器的 `grid-auto-flow` 属性决定，这个属性的默认值是 `row`，因此会 “先行后列” 进行排列。读者可以把这个属性的值分别改成 `column`、`row dense` 和 `column dense`，看看其他项目的位置发生了怎样的变化。



下面的例子是指定四个边框位置的效果。

```css
.item-1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
```

<img src="mark-img/bg2019032527.png" alt="img" style="zoom:50%;" />

这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。

```css
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}
```

上面代码中，左边框和右边框的位置，都指定为网格线的名字。

这四个属性的值还可以使用 `span` 关键字，表示 “跨越”，即左右边框（上下边框）之间跨越多少个网格。

```css
.item-1 {
  grid-column-start: span 2;
}
```

上面代码表示，1 号项目的左边框距离右边框跨越 2 个网格。

<img src="mark-img/bg2019032528.png" alt="img" style="zoom:50%;" />

这与下面的代码效果完全一样。

```css
.item-1 {
  grid-column-end: span 2;
}
```



## 3.2 grid-column/row

`grid-column` 属性是 `grid-column-start` 和 `grid-column-end` 的合并简写形式

`grid-row` 属性是`grid-row-start` 属性和 `grid-row-end` 的合并简写形式。

```css
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}
```



下面是一个例子。

```css
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

上面代码中，项目 `item-1` 占据第一行，从第一根列线到第三根列线。

这两个属性之中，也可以使用 `span` 关键字，表示跨越多少个网格。

```css
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```

上面代码中，项目 `item-1` 占据的区域，包括第一行 + 第二行、第一列 + 第二列。

<img src="mark-img/bg2019032529.png" alt="img" style="zoom:50%;" />

斜杠以及后面的部分可以省略，默认跨越一个网格。

```css
.item-1 {
  grid-column: 1;
  grid-row: 1;
}
```

上面代码中，项目 `item-1` 占据左上角第一个网格。



## 3.3 grid-area 区域属性

`grid-area` 属性**指定项目放在哪一个区域。**

```css
.item-1 {
    grid-area: e;
}
```

上面代码中，1 号项目位于 `e` 区域，效果如下图。

<img src="mark-img/bg2019032530.png" alt="img" style="zoom:50%;" />

`grid-area` 属性还可用作 `grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end` 的合并简写形式，直接指定项目的位置。

```css
.item {
	grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

下面是一个例子。

```css
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

<img src="mark-img/image-20220228102207300.png" alt="image-20220228102207300" style="zoom: 33%;" />



## 3.4 justify/align/place-self

作用：在项目属性中单独设置该项目在单元格内容的位置

`justify-self` 属性设置水平位置（左中右），跟 `justify-items` 属性的用法完全一致

`align-self` 属性设置垂直位置（上中下），跟 `align-items` 属性的用法完全一致

```css
.item {
    justify-self: start | end | center | stretch;
    align-self: start | end | center | stretch;
}
```

这两个属性都可以取下面四个值。

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。



下面是 `justify-self: start` 的例子。

```css
.item-1  {
    justify-self: start;
}
```

![img](mark-img/bg2019032532.png)



`place-self` 属性是 `align-self` 属性和 `justify-self` 属性的合并简写形式。

```css
place-self: <align-self> <justify-self>;
```

下面是一个例子。

```css
place-self: center center;
```

> 如果省略第二个值，`place-self` 属性会认为这两个值相等。

