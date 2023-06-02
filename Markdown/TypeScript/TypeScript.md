# 第一章 快速入门

TypeScript 简介

1. TypeScript是JavaScript的超集。
2. 它对JS进行了扩展，向JS中引入了类型的概念，并添加了许多新的特性。
3. TS代码需要通过编译器编译为JS，然后再交由JS解析器执行。
4. TS完全兼容JS，换言之，任何的JS代码都可以直接当成JS使用。
5. 相较于JS而言，TS拥有了静态类型，更加严格的语法，更强大的功能；TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；TS代码可以编译为任意版本的JS代码，可有效解决不同JS运行环境的兼容问题；同样的功能，TS的代码量要大于JS，但由于TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS。



## 1.1 开发环境搭建

1. 下载Node.js
   - 64位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
   - 32位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi
   
2. 安装Node.js

3. 使用 npm 全局安装 typescript
   - 进入命令行
   - 输入：`npm i -g typescript`
   
4. 创建一个 ts 文件

5. 使用 tsc 对 ts 文件进行编译
   - 进入命令行
   - 进入ts文件所在目录
   - 编译文件：`tsc xxx.ts`
   - 编译并监听文件：`tsc xxx.ts -w`
   

在 vs code 中关闭对 js 文件校验：`搜索 validata 点击 TypeScript`
     

## 1.2 基本类型 

注：小写表示 TS 的类型，大写 Boolean、Number、String 是 JavaScript 的构造函数！！！



- **类型声明**

  - 类型声明是TS非常重要的一个特点

  - 通过类型声明可以指定TS中变量（参数、形参）的类型

  - 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

  - 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

  - 语法：

    - ```typescript
      let 变量: 类型;
      
      let 变量: 类型 = 值;
      
      function fn(参数: 类型, 参数: 类型): 类型{
          ...
      }
      ```

  

- **自动类型判断**

  - TS拥有自动的类型判断机制
  - 当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型
  - 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

  

- number

  ```typescript
  let decimal: number = 6;
  let hex: number = 0xf00d;
  let binary: number = 0b1010;
  let octal: number = 0o744;
  let big: bigint = 100n;
  ```

  

- boolean

  ```typescript
  let isDone: boolean = false;
  ```

  

- string

  ```typescript
  let color: string = "blue";
  color = 'red';
  
  let fullName: string = `Bob Bobbington`;
  let age: number = 37;
  let sentence: string = `Hello, my name is ${fullName}.
  
  I'll be ${age + 1} years old next month.`;
  ```

  

- 字面量：通过字面量可以确定变量的取值范围

  ```typescript
  let color: 'red' | 'blue' | 'black';
  let num: 1 | 2 | 3 | 4 | 5;
  ```

  

- any

  ```typescript
  let d: any = 4;
  d = 'hello';
  d = true;
  
  // any 接收任何数据类型
  ```

  

- unknown

  ```typescript
  let notSure: unknown = 4;
  notSure = 'hello';
  
  // unknow 也作为一个数据类型！
  ```

  

- void

  ```typescript
  let unusable: void = undefined;
  
  // 函数没有返回值
  function show(): void
  ```

  

- never

  ```typescript
  // 函数永远没有返回值
  function error(message: string): never {
    throw new Error(message);
  }
  ```




- 对象类型：`{}`

  ```typescript
  // 定义一个必须包含 string 类型的 name 属性，且其他属性为任意类型的对象
  let c: { name: string, [propName: string]: any };
  c = { name: '123', n: 123 }
  ```




- **array（重点关注）**

  ```typescript
  // 单类型数组
  let list: number[] = [1, 2, 3];
  let list: Array<number> = [1, 2, 3];
  
  // 多类型数组
  const sss: (number | string)[] = [123,'123'];
  ```

  

- tuple：元组就是固定长度的数组

  ```typescript
  let x: [string, number];
  x = ["hello", 10]; 
  ```

  

- enum：创建一个枚举类型，默认按顺序给属性赋值，也可以手动给属性赋值

  ```typescript
  enum Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  
  enum Color {
    Red = 1,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  
  enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
  }
  let c: Color = Color.Green;
  ```

  

- 类型断言

  有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

  - 第一种

    - ```typescript
      let someValue: unknown = "this is a string";
      let strLength: number = (someValue as string).length;
      ```

  - 第二种

    - ```typescript
      let someValue: unknown = "this is a string";
      let strLength: number = (<string>someValue).length;
      ```

      



## 1.3 编译选项

在项目根目录下创建 `tsconfig.json`，再执行 `tsc` 命令则会根据配置来编译 TS 文件，默认编译所有文件

接下来介绍一些配置选项



### 1.3.1 include/exclude

- include

指定某些目录或文件被编译，默认值：`["**/*"]` 即所有 TS 文件 

`**`：表示所有目录，`*`：表示所有文件

```js
// 所有src目录和tests目录下的文件都会被编译

"include":["src/**/*", "tests/**/*"]
```



- exclude

**指定某些目录或文件不被编译（并不能阻止 VScode 检查）**

默认值：`["node_modules", "bower_components", "jspm_packages"]`

```js
// src下hello目录下的文件都不会被编译

"exclude": ["./src/hello/**/*"]
```



- extends

定义被继承的配置文件

```js
// 当前配置文件中会自动包含config目录下base.json中的所有配置信息

"extends": "./configs/base"
```



- files

指定被编译文件的列表，只有需要编译的文件少时才会用到

```js
"files": [
    "core.ts",
    "sys.ts",
    "types.ts",
  ]
```





### 1.3.2 compilerOption

`compilerOption`：编译选项，它是配置文件中非常重要也比较复杂的配置选项

下面是它的子选项介绍



- target

设置 TS 代码编译成 JS 代码版本，选项有 `ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext` ，通常为 ES5 版本

```js
"compilerOptions": {
    "target": "ES5"
}
```



- module

设置编译后 JS 代码使用的模块化系统，选项有 `CommonJS、UMD、AMD、System、ES6、ESNext、None`

```js
"compilerOptions": {
    "module": "CommonJS"
}
```





- lib

设置代码运行时所包含的库（宿主环境），**一般不写**，默认为浏览器环境所依赖的库

```js
"compilerOptions": {
    "lib": ["ES6", "DOM"]
}
```



- outDir

设置编译后文件的所在目录

```js
"compilerOptions": {
    "outDir": "./dist"
}
```



- outFile

将所有的文件编译为一个 js 文件，另外 `module` 最好指定为 `System`、`AMD`，否则模块化编译会报错

```js
"compilerOptions": {
    "outFile": "dist/app.js"
}
```





- 关于编译的配置

```js
// 是否对js文件进行编译，默认是false
"allowJs": true,

// 是否检查js代码是否符合语法规范，默认值是false
"checkJs": true,

// 是否移除注释
"removeComments": true,

// 不生成编译后的文件
"noEmit": false,

// 当有错误时不生成编译文件
"noEmitOnError": true,
```



- 关于检查的配置

```js
// 所有严格检查的总开关
"strict": true,

// 用来设置编译后的文件是否使用严格模式，默认是false
"alwaysStrict": true,

// 不允许隐式的any类型
"noImplicitAny": true,

// 不允许不明确类型的this
"noImplicitThis": true,

// 严格检查空值
"strictNullChecks": true
```





## 1.4 webpack 打包 TS

通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS 同样也可以结合构建工具一起使用，下边以 webpack 为例介绍一下如何结合构建工具使用 TS。



执行命令，都安装最新版本的包

``` npm init -y```

`npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin html-webpack-plugin`

```
- 共安装了7个包
 - webpack
   - 构建工具webpack
   
 - webpack-cli
   - webpack的命令行工具
   
 - webpack-dev-server
   - webpack的开发服务器
   
 - typescript
   - ts编译器
   
 - ts-loader
   - ts加载器，用于在webpack中编译ts文件
   
 - html-webpack-plugin
   - webpack中html插件，用来自动创建html文件
   
 - clean-webpack-plugin
   - webpack中的清除插件，每次构建都会先清除目录
```



`webpack.config.js` 配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 单入口
    entry: './src/index.ts',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
        
    },

    module: {
        rules: [
            // ts 编译规则
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader"
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        // dist 文件夹清理
        new CleanWebpackPlugin(),
        
        // HTML 自动生成
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        })
    ],

    // webpack-dev-server 服务
    devServer: {
        static: './dist'
    },
    
    // 这些文件可以被当做模块引入
    resolve: {
        extensions: ['.ts', '.js']
    }

    mode: 'development',
}
```



添加执行命令

```json
"bulid": "webpack",
"dev": "webpack-dev-server"
```

运行服务：`npm run dev`

打包：`npm run bulid`



随后在 src 文件夹中开发即可，`tsconfig.json` 可自行配置

```json
{
    "compilerOptions": {
        "target": "ES2015",
        "module": "ES2015",
        "strict": true
    }
}
```




​      

## 1.5 Babel 配置

经过一系列的配置，使得 TS 和 webpack 已经结合到了一起，除了 webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将 babel 引入到项目中。

近一步将 JS 代码更加兼容



配置方法一：在 `Webpack` 笔记中的 `babel-loader` 这一节有详细步骤



配置方法二

安装依赖包：`npm i -D @babel/core @babel/preset-env babel-loader core-js`

```
 - 共安装了4个包，分别是：
   - @babel/core
     - babel的核心工具
     
   - @babel/preset-env
     - babel的预定义环境
     
   - @babel-loader
     - babel在webpack中的加载器
     
   - core-js
     - core-js用来使老版本的浏览器支持新版ES语法
```



`webpack.config.js` 配置

```js

rules: [
    {
        test: /\.ts$/,
        use: [
            // bable 配置
            {
                loader: "babel-loader",
                options:{
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "targets":{
                                    "chrome": "58",
                                    "ie": "11"
                                },
                                "corejs":"3",
                                "useBuiltIns": "usage"
                            }
                        ]
                    ]
                }
            },
            
            // ts 编译
            {
                loader: "ts-loader",

            }
        ],
        exclude: /node_modules/
    }
]
```

> 可以在配置选项的 targets 中指定要兼容的浏览器版本





# 第二章：面向对象

面向对象是程序中一个非常重要的思想，它被很多同学理解成了一个比较难，比较深奥的问题，其实不然。面向对象很简单，简而言之就是程序之中所有的操作都需要通过对象来完成。

- 举例来说：
  - 操作浏览器要使用window对象
  - 操作网页要使用document对象
  - 操作控制台要使用console对象

一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。



## 2.1 类（class）

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象。

- 定义类

  ```typescript
  class 类名 {
  	属性名: 类型;
  	
  	constructor(参数: 类型){
  		this.属性名 = 参数;
  	}
  	
  	方法名(){
  		....
  	}
  
  }
  ```

- 示例

  ```typescript
  class Person{
      name: string;
      age: number;
  
      constructor(name: string, age: number){
          this.name = name;
          this.age = age;
      }
  
      sayHello(){
          console.log(`大家好，我是${this.name}`);
      }
  }
  ```

- 使用类

  ```typescript
  const p = new Person('孙悟空', 18);
  p.sayHello();
  ```



**简单定义：可以直接将属性定义在构造函数中**

```js
class C{
    constructor(public name: string, public age:number){

    }
}

const c = new C('cocoon',18);
console.log(c);
```





## 2.2 面向对象的特点

### 2.2.1 封装

- 对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装
- 默认情况下，对象的属性是可以任意的修改的，为了确保数据的安全性，在TS中可以对属性的权限进行设置
- 只读属性（readonly）：

  - 如果在声明属性时添加一个readonly，则属性便成了只读属性无法修改
- TS中属性具有三种修饰符：

  - public（默认值），可以在类、子类和对象中修改
  - protected ，可以在类、子类中修改
  - private ，可以在类中修改



**pubilc**

```js
class Person{
    public name: string; // 写或什么都不写都是public
    public age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以在类中修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{
    constructor(name: string, age: number){
        super(name, age);
        this.name = name; //子类中可以修改
    }
}

const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 可以通过对象修改
```



**protected：受保护的属性,只能在当前类和当前类的子类中访问(修改)**

```js
class Person{
    protected name: string;
    protected age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{

    constructor(name: string, age: number){
        super(name, age);
        this.name = name; //子类中可以修改
    }
}

const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```



**private：私有属性, 私有属性只能在类内部进行访问（修改）**

```js
class Person{
    private name: string;
    private age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{

    constructor(name: string, age: number){
        super(name, age);
        this.name = name; //子类中不能修改
    }
}

const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```



### 2.2.2 属性存取器

- 对于一些不希望被任意修改的属性，可以将其设置为 private
- 直接将其设置为 private 将导致无法再通过对象修改其中的属性
- 我们可以在类中定义一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器
- 读取属性的方法叫做 setter 方法，设置属性的方法叫做 getter 方法

```js
class Person{
    private _name: string;

    constructor(name: string){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }

}

const p1 = new Person('孙悟空');
console.log(p1.name); // 通过getter读取name属性
p1.name = '猪八戒'; // 通过setter修改name属性
```



### 2.2.3 静态属性

- 静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用
- 静态属性（方法）使用static开头

```js
class Tools{
    static PI = 3.1415926;
    
    static sum(num1: number, num2: number){
        return num1 + num2
    }
}

console.log(Tools.PI);
console.log(Tools.sum(123, 456));
```



### 2.2.4 继承

- 继承时面向对象中的又一个特性
- 通过继承可以将其他类中的属性和方法引入到当前类中
- 发生继承时，如果子类中的方法会替换掉父类中的同名方法，这就称为方法的重写
- `super`：在构造函数中必须声明 `super ` 函数，继承父类同名属性

```js
class Animal{
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    run(){
        console.log(`父类中的run方法！`);
    }
}

class Dog extends Animal {
    constructor(name: string, age: number){
     	super(name, age);
    }    

    bark(){
        console.log(`${this.name}在汪汪叫！`);
    }

    run(){
        console.log(`子类中的run方法，会重写父类中的run方法！`);
    }
}

const dog = new Dog('旺财', 4);
dog.bark();
```



###  2.2.5 抽象类（abstract）

- 抽象类是专门用来被其他类所继承的类，**它只能被其他类所继承不能用来创建实例**（只能当爸爸）
- 使用 abstract 开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，**继承抽象类时抽象方法必须要实现**

```js
// 定义抽象类
abstract class Animal{
   	// 定义抽象方法
    abstract run(): void;
    
    bark(){
        console.log('动物在叫~');
    }
}

class Dog extends Animals{
    run(){
        console.log('狗在跑~');
    }
}
```



​    

## 2.3 接口（Interface）

这个 API 才符合 TS 特性，它用来规范类的属性、方法的类型，规范类的结构。还可以用来规范对象



定义接口：`interface`

```js
interface Human {
    name: string;
    sayHello(): void;
}
```

该接口使得受规范的对象或者类必须包含 `name`、`sayHello` 属性和方法



规范：`implements`

```js
// 规范类
class Person extends Animal implements Human {
    constructor(name: string, age: number) {
        super(name, age);
    }

    say(): void {
        console.log(this.name);
    }

    sayHello(): void {
        console.log(this.age);
    }
}

// 规范对象
const o: Human = {
    name: 'cocoon',

    sayHello() {
        console.log(1111);
    },
}
```



还有个 `type` 类型，功能和接口一致。理解的话就照着接口理解就行

参考文档：https://dengxi.blog.csdn.net/article/details/112625953



## 2.4 属性的封装

- 我们定义一个私有属性时，一般变量名以下划线开头
- 如果我要在类的外部使用、修改该私有属性，那么我们要定义 `set`、`get` 方法

```js
class Person {
    // 定义一个私有属性
    constructor(private _age: number) {
    }

    // 设置私有属性外部访问方法
    get age() {
        return this._age;
    }

    // 设置私有属性外部修改方法
    set age(value: number) {
        if(value > 0) this._age = value;
    }
}
```

```js
// 创建实例
const p = new Person(12);

// 外部修改
p.age = -10; // 无法修改

p.age = 10; // 允许修改
```







## 2.5 泛型（Generic）

在定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。以便我们在调用时定义实际类型



**函数使用泛型**

```js
// 定义函数
function test<T,K>(name: T, age: K) {
    console.log(name,age);
}

// 直接调用，泛型会根据类型自动匹配
test('cocoon',12);

// 指定类型调用，T: string K: number
test<string,number>('cocoom',12);
```



**类使用泛型**

```js
class MyClass<T>{
    prop: T;

    constructor(prop: T){
        this.prop = prop;
    }
}

// T: number
const m = new MyClass<number>(12)
```



**将泛型指定为接口**

```js
interface MyInter {
    length: number;
}

function test<T>(name: T) {
    console.log(name);
}

// 将泛型指定为接口，参数必须带有 length 属性
test<MyInter>({length: 12});
```

> `<T extends MyInter>`：或者让泛型继承于接口

