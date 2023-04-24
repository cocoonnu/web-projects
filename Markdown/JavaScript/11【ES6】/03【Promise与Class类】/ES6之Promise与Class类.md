
# 一、Promise

## 1.1 Promise 是什么？

Promise 是异步操作的一种解决方案。具体八股文自己去搜，这里主要讲怎么用！！



Promise 的特点是异步执行，它不会按照 js 代码执行顺序而执行，通常会安排到后面



什么时候使用 Promise 呢？

Promise 一般用来解决层层嵌套的回调函数（回调地狱 callback hell）的问题。



**下面展示回调地狱的例子：**

案例：分别间隔一秒打印省市县

```js
// 通过回调函数的方式，实现异步
setTimeout(() => {
    console.log("云南省");
    let str01 = "云南省";
    setTimeout(() => {
        console.log(str01 + "玉溪市");
        let str02 = "云南省玉溪市";
        setTimeout(() => {
            console.log(str02 + "峨山县");
        }, 1000, str02);
    }, 1000, str01);
}, 1000);
```





## 1.2 Promise 的基本用法

Promise 实质上是一个构造函数，所以我们一般通过实例化的方式来使用它。



创建 promise 对象

```js
let p = new Promise(function(resolve,reject) {
    let flag = 1;

    // 加判断语句 当成功时调用resolve
    if (flag == 1) resolve('success');

    // 失败时调用reject
    if (flag == 0) reject('defeat');
})
```



使用 then 处理

```js
// 设置回调函数then resolve调用第一个函数 rejec调用第二个函数
p.then(function(value) {
    console.log(value);
},function(reason) {
    console.log(reason);
})
```



使用 then 和 catch 一起处理

```js
// 或者使用then和catch搭配使用，等同于上面的写法
p.then(function(result) {
    console.log(result, 'result')
}).catch(function(err) {
    console.log(err, 'err')
})
```



### 1.2.1 Promise 的状态

1、Promise 有三个状态：pending（等待）、fulfilled 或 resolved（成功）、rejected（失败）。



2、并且 Promise 必须接收一个回调函数，这个回调函数有两个参数，这两个参数也是两个函数，

`(resolve, reject) => {}`。

- 实例化 Promise 后，默认是等待状态。

- 当执行 `resolve()` 函数时，Promise 从等待状态——>成功状态。

- 当执行 `reject()` 函数时，Promise 从等待状态——>失败状态。



### 1.2.2 then 方法

当我们需要处理一个 promise 对象时，如果我们要**获取该 promise 对象的值 PromiseResult**，那么我们就需要用到 then 方法，设置回调函数来获取。

当我们实例化 Promise 后得到的 Promise 对象便具有一个 `then` 方法。

then 方法具有两个回调函数作为参数 

- 当 Promise 对象为成功状态时就默认自动执行 then 方法的第一个回调函数resolved
- 当 Promise 对象为失败状态时就默认自动执行 then 方法的第二个回调函数rejected

```js
new Promise(function(resolve,reject) {
        
    if(1) resolve('1111');
    else reject('0000');

}).then(function(value) {
    console.log(value);
})

// 1111
```





## 1.3 链式调用

这里介绍一下then()可以实现链式调用



- 链式调用原理：

  ​    1、调用 then 方法  **then方法的返回结果是 Promise 对象**, 对象状态由回调函数的执行结果决定

  ​    2、如果回调函数中返回的结果是 非 promise 类型的属性, 状态为成功, 返回值为对象的成功的值

  ```js
  let p = new Promise(function(resolve,reject) {
      resolve('111');            
  })
  
  let pthen = p.then(function(value) {
      console.log(value);
  
      // 如果没有return则默认返回undefined
  
      // 返回一个非promise
      // return '222';
  
      // 返回一个promise
      return new Promise(function(resolve,reject) {
          reject('wrong');
      })
  })
  
  console.log(pthen);
  
  ```

  

- 链式回调的应用

  案例一：每个1s按顺序打印 省 市 区

  ```js
  // 创建promise对象
  let p = new Promise(function(resolve) {
      setTimeout(function() {
          let sheng = '江西省';
          console.log(sheng);
          resolve(sheng);
      },1000)
  });
  
  // 设置第一个回调函数
  p.then(function(value) {
  
      // 设置then的返回值为一个新的promise对象
      return new Promise(function(resolve) {
          setTimeout(function() {
              let shi = value + '新余市';
              console.log(shi);
              resolve(shi);
          },1000)
      })
  
  // 设置第二个回调函数
  }).then(function(value) {
  
      return new Promise(function(resolve) {
          setTimeout(function() {
              let qu = value + '渝水区';
              console.log(qu);
          },1000)
      })
  
  })
  
  ```
  
  

  案例二：当我们点击盒子后 盒子依次 “右——>下——>左” 移动
  
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  
      <style>
          .box {
              width: 100px;
              height: 100px;
              background-color: black;
              transition: all 0.5s ease-in-out;
          }
      </style>
  </head>
  <body>
      <div class="box"></div>
  
      <script>
       
          let box = document.querySelector('.box');
  
          // 设置move函数
          function move(box,point,resolve) {
              box.style.transform = `translate(${point.x}px,${point.y}px)`;
  
              // 当过渡完成执行resolve函数
              box.addEventListener('transitionend',function() {
                  resolve();
              })
  
          }
  
          box.addEventListener('click',function() {
              // 先向右移100px
              new Promise(function(resolve) {
                  let point = {x: 100,y: 0};
                  move(box,point,resolve);
  
              // 再向下移100px
              }).then(function(value) {
  
                  return new Promise(function(resolve) {
                      let point = {x: 100,y: 100};
                      move(box,point,resolve);
                  })
  
              // 再向左移100px
              }).then(function(value) {
  
                  return new Promise(function(resolve) {
                      let point = {x: 0,y: 100};
                      move(box,point,resolve);
                  })
  
              // 最后回到原点
              }).then(function(value) {
  
                  return new Promise(function(resolve) {
                      let point = {x: 0,y: 0};
                      move(box,point,resolve);
                  })
  
              })
          })
  
      </script>
  </body>
  </html>
  ```



通过上述两个改造后的例子，可以看到，Promise 让原先回调的“嵌套”型模式转变为了 Promise 的“并列”型模式，这就解决了回调地狱的问题。



## 1.4 Promise.catch

由之前的例子可以看出，我们在使用 Promise 的时候，大部分情况下，我们只用 resolve() 方法（成功态），所以在 Promise 回调函数中我们常常省略 reject 函数参数，**在 then 中我们常常省略第二个回调函数。**



但是我们还是需要处理异步中的异常，所以 ES6 中提供了我们一个 `catch()` 方法专门用来**处理 Promise 的异常部分（失败态）。**



**catch() 的使用**

```javascript
const p = new Promise((resolve, reject)=>{
    
    setTimeout(()=>{
        reject("出错啦!");
    }, 1000)
    
});

p.catch(function(reason){
    console.warn(reason);
});
```



由于 catch 是 then 的特例，所以 catch 依旧返回的是一个 Promise 对象，我们可以在 catch 后继续调用 then。

```javascript
new Promise((resolve, reject) => {
    reject("失败");
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);   // 失败
    return "测试";
}).then(res => {
   console.log(res);	// 测试 
});
```

> 一般总是建议，Promise 对象后面要跟一个或多个 catch 方法，这样可以处理 Promise 内部发生的错误！



## 1.5 Promise.finally

 当 Promise 状态发生变化时，不论如何成功或失败都会执行内部函数

- finally() **不能接收参数**。
- finally 也是 then 的特例。



**finally() 的使用**

```javascript
// 创建promise对象
let p = new Promise(function(resolve,reject) {
    let flag = 1;

    // 加判断语句 当成功时调用resolve
    if (flag == 1) resolve('success');

    // 失败时调用reject
    if (flag == 0) reject('defeat');
})

p.finally(function() {
    console.log(1111);
})
```

>  finally：主要是用来处理一些必做操作，比如在操作数据库之后（无论成功与否）都要关闭数据库连接。



## 1.6 resolve/reject

这里介绍一下 `Promise.resolve` 和 `Promise.reject` 的使用方法。

感觉作用就是实现直接原地执行一个异步函数，不用通过封装一个函数返回了。

参考：https://blog.csdn.net/lq15310444798/article/details/81275278



- **Promise.resolve**

返回一个指定 `value` 的成功的 `Promise` 对象

> 参数如果不是 `thenable` 对象，则原封不动的 `resolve` 返回（包括参数是一个 	Promise`）

```js
Promise.resolve('foo');

//等价于如下
new Promise((resolve)=>{
    resolve('foo');
})
```

> 参数如果是 `thenable` 对象

```js
//thenable对象（存在then属性）
let thenable = {
    then:function(resolve,reject){
        resolve(42);
    }
}

//下面会将thenable对象转换为Promise对象
let p = Promise.resolve(thenable);
p.then((value)=>{
    console.log(value);//42
});
```





- **Promise.reject**

返回一个指定 `value` 的失败的 `Promise` 对象，参数可以是一个 `Promise`，也可以是一个值 `value`

会原封不动的将 `reject` 的理由变成后续方法的参数

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
 
p.then((value)=>{
    	console.log(value);
	},
    (reason)=>{
    	console.log(reason);
    }
);
//输出 '出错了'
```





- **异步执行时机**

异步执行时机 `resolve` 是在本轮事件循环 `event loop` 结束时，不是在下一轮“事件循环”开始时

```js
setTimeout(function () {
    console.log(3);
}, 0);
Promise.resolve().then(function () {
    console.log(2);
});
console.log(1);
 
//输出 1 2 3
```





## 1.7 all/race/allSettled

参考文档：https://blog.csdn.net/m0_68324632/article/details/126459643



- **Promise.all()**

 ```js
 const result = Promise.all([p1,p2,p3])
 ```

如果3个promise都是成功态，则 result 也是成功态，并且保存所有 promise 的 value 值为一个数组

如果3个promise有失败态，则 result 也是失败态，变成 defeat 值



案例：`dispatch('deleteCart',item.skuId)`：函数返回一个 promise

我们将所有 promise 打包到 promiseAll，并返回 `Promise.all(promiseAll)`

如果有失败态，这个函数返回失败态的 promise。

如果全都是成功态，这个函数返回成功态的数组数据。

```js
// 删除所有选中的商品
async delCheckedCart({state,dispatch}) {
    let promiseAll = [];

    state.cartList.forEach(function(item) {
        if(item.isChecked) {
            let result = dispatch('deleteCart',item.skuId);
            promiseAll.push(result);
        }
    })

    return Promise.all(promiseAll);
},
```



调用 `delCheckedCart({state,dispatch})`：

```js
async delCheckedCart() {
    try {
        // 申请删除所有选中的商品
        let result = await this.$store.dispatch('shopcart/delCheckedCart');

        // result 为成功态数组数据

        // 为成功态则刷新购物车列表
        this.$store.dispatch('shopcart/getCartList');

    } catch (error) {
        // 为失败态则输出
        alert('删除所有选中的商品失败');
    }
},
```



- **Promise.race()**

Promise.race() 的状态取决于**第一个完成的 Promise 实例对象**，如果第一个完成的成功了，那么最终就是成功的；如果**第一个完成的失败了**，那么最终就是失败的。

```js
var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'one');
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two');
});
var p3 = new Promise((resolve, reject) => {
    // setTimeout(reject, 2000, 'err');
    setTimeout(reject, 500, 'err');
});

Promise.race([p1, p2, p3]).then(values => {
    console.log(values)
}, reason => {
    console.log(reason) // err
});
```





- **Promise.allSettled()**

Promise.allSettled() 的状态与传入的 Promise 状态无关。它永远都是成功的，只会执行 then 的第一个回调函数。用途：用于记录下各个 Promise 的表现。



## 1.8 async/await 函数

当我们需要处理一个 promise 对象时，如果我们要获取该 promise 对象的结果 PromiseResult，那么我们就需要用到 async/await 。

简单代码介绍：

```js
async function main() {
    try {
        let result = await new Promise(function(resolve,reject) {
            if(0) resolve('111');
            else reject('000');
        }) 
        
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

main(); // 000
```



**1、async**

当一个普通函数加上 `async` 则 **返回值一定是一个 promise 对象**！

- 当函数返回非 promise 对象 ，则为成功态，value 值为返回的 value 值
- 返回 promise 对象，则状态由返回的 promise 对象决定（套娃）

```js
async addShopCart(context,{skuId,skuNum}) {
    let result = await reqAddShopCart(skuId,skuNum); // reqAddShopCart() 返回 promise

    // 成功则返回非 promise 对象
    if(result.code == 200) {
        return '加入购物车成功';
        
    // 返回失败 promise 对象
    } else {
        return Promise.reject(new Error('加入购物车失败'));
    }
}

// 调用 addShopCart
// 得到一个 promise 对象
let result = addShopCart();
```



**2、await**

await 只能运用在 async 函数中！它的右边为 promise 对象或者其他值

- **如果右边是 promise 对象，则返回 promise 对象（成功态+失败态）的值 value**
- 如果是其他值，则直接返回该值
- 如果函数中有多条 await（后面是promise 对象）则会按顺序异步执行

```js
async function main() {
    let b = await new Promise(function(resolve,reject) {
        if(1) resolve('111');
        else reject('000');
    }) 
    let a = await 222;

    console.log(a);
    console.log(b);
}

main(); // 222 111
```



**3、`try {} catch(err) {}`**

如果我们要**分开处理  promise 对象成功态、失败态**，那么我们就要用到它。

如果 await 右边的 promise 对象为成功态，则继续执行 try 语句代码。

如果 await 右边的 promise 对象为失败态，则跳转执行 catch 语句代码

```js
async function main() {
    try {
        let result = await new Promise(function(resolve,reject) {
            if(0) resolve('111');
            else reject('000');
        }) 
        
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

main(); // 000
```





## 1.9 Promise 的注意事项



**1、不推荐在 resolve() 或 reject() 后再写代码**

resolve或reject后的代码依旧是会执行的，但是极度不推荐这么做。

为了确保安全，推荐在调用 resolve 或 reject 函数的时候加上 return，不再执行它们后面的代码。

```javascript
// 推荐加上 return
new Promise((resolve, reject) => {
    return resolve();
    // console.log('hi');	// 不输出
});
```



**2、手写 promise**

参考文档：https://blog.csdn.net/Niall_Tonshall/article/details/122547763



**3、手写实现 promise 三大件**

https://juejin.cn/post/7223046446941110328?share_token=a538459f-309c-43e0-b154-dab71d7c745d#heading-10



# 二、Class类

## 2.1 认识Class

类：人类、狗类

实例、对象：中国人、藏獒

> 类可以看作是对象的模板，用一个类可以创建出许多不同的对象。

## 2.2 Class的基本用法

`class Person{}`

注意：类名 Person 后没有 `()`，同时 `{}` 后也不应该加 `;`。

每一个类中都包含一个构造方法，这个构造方法可以手动写出来，也可以不写，如果手动不写那么浏览器也会默认自动添加。

```javascript
class Person {
    // 实例化时执行构造方法，所以必须有构造方法，但可以不写出来
    constructor() {
        console.log("构造方法自动执行");
    }
}

// 实例化一个 Person 对象（必须采用 new 语法）
const p = new Person();		// 构造方法自动执行
```

通常情况下，我们会在构造函数中进行对象属性初始化。

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const zjr = new Person('jerry', 18);
console.log(zjr.name);		// jerry
console.log(zjr.age);		// 18
```

在构造函数中，我们确实可以添加方法，但是不建议这么做，因为这样的处理方式会导致每一个实例的对象中都单独保存了一份该方法，造成内存的浪费。

我们应该将方法写在 class 类中，这样所有的对象都共享同一个方法。

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.speak = () => {
            console.log(this.name + " say Hi!");
        }
    }
}

const zjr = new Person('jerry', 18);
zjr.speak();	// jerry say Hi!

const lxy = new Person('Dragon', 18);
lxy.speak();	// Dragon say Hi!

console.log(zjr.speak === lxy.speak);	// false
```

```javascript
// 一般我们把属性定义在构造方法中，把方法定义在类中
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // 方法定义在类中的写法
    speak() {
        console.log(this.name + " say Hi!");
    }
}

const zjr = new Person('jerry', 18);
zjr.speak();	// jerry say Hi!

const lxy = new Person('Dragon', 18);
lxy.speak();	// Dragon say Hi!

console.log(zjr.speak === lxy.speak);	// true
```

## 2.3 Class与构造函数

将上述的 Class 改造为之前学习过的构造函数：

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.speak = function() {
    console.log(this.name + " sya Hi!");
}

const zjr = new Person('jarry', 18);
zjr.speak();	// jerry say Hi!
```

> Class 与 构造函数 的关系：
>
> 在 ES6 之前，要在 JavaScript 中实现面向对象编程，便要借助于构造函数。
>
> 在 ES6 之后，实现面向对象编程便可以使用 Class。
>
> 推荐：以后的面向对象编程请优先使用 Class。
>
> > Class 的底层实现机制还是 构造函数 的再次封装！
> >
> > 例如：`console.log(typeof Person);` 结果为：function，所以 Class 的底层实际上还是构造函数。
> >
> > 例如：`console.log(Person.prototype.speak);` 结果可以得到 speak 函数，所以 Class 底层实际上是构造函数，且依旧有原型。
> >
> > 甚至，我们可以给 Person 的原型上添加方法，依旧可以达到相应的效果，但是极不推荐这样做！

## 2.4 Class的两种定义形式

### 2.4.1 声明形式

```javascript
class Person {
    constructor() {
        ...
    }
    speak() {
        ...
    }
}
```

### 2.4.2 表达式形式

```javascript
// 匿名 class 赋给一个变量
const Person = class {
    constructor() {
        ...
    }
    speak() {
        ...
    }
}
```

由于匿名函数可以实现立即执行函数，所以我们模仿立即执行函数的方式也可以实现立即执行类。

```javascript
new (class {
    constructor() {
        console.log("constructor");		// constructor
    }
})();
```

## 2.5 实例属性、静态方法和静态属性

### 2.5.1 实例属性

我们之前将类的属性利用 this 的方式写在了构造方法里，把类的方法写在了 class 里。

现在我们还可以把类的属性和方法写在 class 里，然后在构造方法里进行值的修改，或者是提供一个 get set 方法来间接控制变量。

```javascript
class Person {
    _age = 0;        // 类属性之前不能加 var 或 let
    _sex = 'male';   // 类属性被赋予的值相当于就是属性的默认值
    
    /*
    // get、set 还可以用这样的格式来写
    // 这里其实本质上就是定义一个类属性，只不过这个属性指向一个函数而已
    getSex = function() {
        return this._age;
    };
    */

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get sex() {
        return this._sex;
    }

    set sex(value) {
        this._sex = value;
    }

    constructor(age, sex) {
        this._age = age;
        this._sex = sex;
    }

    // 类的方法不能用 function 关键字
    speak() {
        console.log(this._age + " " + this._sex);
    }
}
```

### 2.5.2 静态方法

对于类的普通方法，我们要调用它，必须先实例化对象，然后再用对象来 “打点” 调用。

如果我们要想直接利用类来调用，那么就要在类中创建静态方法。

**谁调用这个方法，里面的this就指向谁！！**

```javascript
class Person {
    constructor(name, sex) {
        this.name = name;
        this.sex = sex;
    }
    
    // 除了类的静态方法之外，是可以定义类的同名普通方法的
    speak() {
        console.log("说话");
    }
    
    static speak() {
        console.log("人类可以说话")
    }
}

// 一个是类的方法（静态方法），一个是实例对象的方法（普通方法），所以不会冲突
Person.speak();		// 人类可以说话
const p = new Person('Alex', 18);
p.speak();			// 说话
```

静态方法的 this 指向问题：静态方法的 this 指向这个类本身。

注意：普通方法 this 指向具体的对象，而静态方法的 this 指向类本身。

```javascript
class Person {
    // 静态属性
    static _name = "user";
    static _age = 18;

    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

    static test() {
        console.log("静态方法");
    }

    // 静态方法
    static readme() {
        // 静态方法中的 this 指向 Person 类本身
        // 并且静态方法的 this 只能引用到类的静态属性及静态方法
        console.log(this._name + " " + this._age);
        this.test();
    }
}

Person.readme();
console.log(Person._name);
/*
user 18
静态方法
user
*/

/*
再次注意：静态方法中只能使用类的静态属性与静态方法
*/
```

### 2.5.3 静态属性

表示这个属性只属于类，而不属于实例化对象！

```javascript
// 静态属性
class Phone {
    constructor() {
    }

    // 设置静态属性 只属于类，而不属于实例化对象！
    static name = 'phone';
}

let p = new Phone();
console.log(p.name); // undefined
console.log(Phone.name);
```



## 2.6 私有属性和方法

JavaScript 本身没有私有属性和方法，所以我们利用其它方式来实现私有化。

```javascript
// 方式一：在属性开头加上 _ 表示私有
class Person {
    constructor(name) {
        this._name = name;
    }
    
    _speak() {
        console.log("speak");
    }
    
    getName() {
        return this._name;
    }
}

const p = new Person('Alex');
console.log(p.name);	// 报错！
// console.log(p._name);	// Alex，但是这样做就无意义了，违背了私有化的初衷

/*
注意：加下划线的方式实际上只是行业中约定俗成的一种方法，
我们依旧可以通过 p._name，来访问，但是这样做就无意义了！所以这种方法的使用纯靠程序员自觉。
*/
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Class私有属性</title>
</head>
<body>
<script>
    // 方式二：将私有属性和方法移出类（使用模块）
    // 由于我们还没有学习过模块，所以我们目前用立即执行函数（闭包原理）来模拟
    (function () {
        let name = "";
        let speak = function () {
            console.log("speak");
        }

        class Person {
            constructor(username) {
                name = username;
            }

            getName() {
                return name;
            }

            runSpeak() {
                speak();
            }
        }

        // 将类添加到全局作用域中暴露
        window.Person = Person;
    })();

    const p = new Person('Alex');
    console.log(p.name);	// 报错
    console.log(p.getName());	// Alex
    p.runSpeak();	// speak
</script>
</body>
</html>
```

## 2.7 extends

### 2.7.1 子类继承父类

```javascript
class Person {
    constructor(name, sex) {
        this.name = name;
        this.sex = sex;
        this.say = function() {
            console.log("say");
        };
    }
    speak() {
        console.log("speak");
    };
    static speak() {
        console.log("static speak");
    };
}
Person.version = "1.0";

// 子类继承
class Programmer extends Person {
    constructor(name, sex) {
        // 调用父类的构造方法
        super(name, sex);
    }
}

// 测试
const zjr = new Programmer('jerry', '男');
console.log(zjr.name);				// jerry
console.log(zjr.sex);				// 男
zjr.say();						   // say
zjr.speak();					   // speak
Programmer.speak();				    // static speak
console.log(Programmer.version);	 // 1.0 
// 由此可见，子类集成了父类所以属性及方法！
```

### 2.7.2 属性或方法重名

如果子类的方法与父类的方法重名了  则只能调用子类的方法



## 2.8 super

### 2.8.1 在构造函数中调用

```javascript
// super() 必须写在第一行！！

// 作用就是把父类的参数继承！！！！

// 如果子类有构造函数就要先写super()  还要在构造函数和super中写父类构造函数中的参数

class Father {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    sum() {
        console.log(this.x);
    }
}

class Sonn extends Father {
    constructor(x,y,z) {
        super(x,y);
        
        // 接下来可修改父类参数 和 添加自身参数
        this.x = 3;
        this.z = z;
    }
}

var sonn = new Sonn(1,2,3);
console.log(sonn.x,sonn.z); // 3 3
sonn.sum(); // 3
```



### 2.8.2 作为对象使用（调用父类的函数）

```javascript
// super 作为对象使用，代表了父类的原型对象 Person.prototype
// 所以我们可以通过 super 访问父类的方法了
class Person {
    name = "Person";

    constructor(name, sex) {
        this.name = name;
        this.sex = sex;
    }

    speak() {
        console.log("speak");
    }

    static speak() {
        console.log("static speak");
        console.log(this.name);
    }
}

class Programmer extends Person {
    name = "Programmer";

    constructor(name, sex) {
        super(name, sex);
        // 在构造方法中使用
        super.speak();
    }

    speak() {
        // 在一般方法中使用
        super.speak();
        console.log("子类 speak");
    }

    static speak() {
        // 在静态方法中使用
        // 指向父类，而不是父类的原型对象
        // 原因是：我们此时调用的是父类的方法（静态方法属于父类），而不是父类原型对象上的方法
        super.speak();
        console.log("重写 static speak");
        // 通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例
    }
}

const zjr = new Programmer('jerry', '男');
zjr.speak();
Programmer.speak();

/*
speak
speak
子类 speak
static speak
Programmer
重写 static speak
*/

// 注意：super.name 是 undefined！
// 因为 super 作为对象是表示父类的原型对象 Person.prototype，而原型对象上并没有父类属性
```



## 2.9 get/set 函数

```js
class Goods {
    // get 当该属性被读取了 则执行该函数 并具有返回结果
    get price() {
        console.log("属性price被读取");
        return 123;
    }

    // set 当该属性被修改、设置时执行该函数 传参为修改的值（必须要有）
    set price(newVal) {
        console.log("属性被修改为了" + newVal);
    } 
}   

let g = new Goods();

// 读取price属性 调用get
console.log(g.price);

// 修改price属性 调用set
g.price = 1;
```



##  2.10 Object.defineProperty()

![image-20221113121436662](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20221113121436662.png)

```js
var obj = {
    id: 1,
    pname: '小米',
    price: 1999
};

Object.defineProperty(obj, 'address', {
    value: 'ssss',
    // 如果值为false 不允许修改这个属性值 默认值也是false
    writable: true,
    // enumerable 如果值为false 则不允许遍历, 默认的值是 false
    enumerable: true,
    // configurable 如果为false 则不允许删除这个属性 默认为false
    configurable: true
});
```

