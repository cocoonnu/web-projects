## 5、项目环境配置

 这里记录 Vue2 实战项目遇到的问题、单页面多页面网站的部署、Node.js的一些问题

**基于 vue_project_sph**



### 5.1 关于打包部署

当 vue 项目完成后，执行 `npm run build` ，会生成 dist 文件夹，里面只有HTML、CSS、JS和其他资源文件

其中 `public` 文件夹会原封不动的打包下来



#### 5.1.1 打包相关的问题

一般都是配置 `vue.config.js`，这里就要了解脚手架的配置了。

参考文档：[Vue 脚手架的一些配置介绍](https://blog.csdn.net/Superman_H/article/details/122834542?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167524315216800215023233%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=167524315216800215023233&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-122834542-null-null.142^v72^insert_chatgpt,201^v4^add_ask&utm_term=transpileDependencies&spm=1018.2226.3001.4187)



参考模板：

```js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    // 取消打包产生 map 文件
    productionSourceMap:false,

    //关闭eslint校验
    lintOnSave: false,

    // 配置服务器代理
	devServer: {
        proxy: {

            // 匹配所有以 '/api'开头的请求路径
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn', // 硅谷后台管理系统接口  
            },
            
        }
    },

    configureWebpack: {
        performance: {
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
        }
    }
})
```



- 取消静态资源太大的警告

  ```js
  // vue.config.js
  
  configureWebpack: {
      performance: {
          //入口起点的最大体积
          maxEntrypointSize: 50000000,
          //生成文件的最大体积
          maxAssetSize: 30000000,
      }
  }
  ```

  

- 取消打包产生 map 文件，map 文件是未加密的 JS 文件，类似于源码，体积较大

  ```js
  productionSourceMap:false,
  ```



- `transpileDependencies`：默认情况下，`babel-loader` 会忽略 `node_modules` 中的文件

  为避免构建后的代码中出现未转译的第三方依赖，可以设置为 `true`，表示对 node_modules 中的文件也进行编译。不过，对所有的依赖都进行转译会降低构建速度。

  

#### 5.1.2 服务器简单部署

进入服务器（这里选择express框架），新建静态文件夹 static 存储 dist 的所有文件



基本部署代码

```js
const express = require('express');
const app = express();

// 解决路由器history模式刷新页面服务端404问题
const history = require('connect-history-api-fallback');
app.use(history());

// 设置静态资源
app.use(express.static('./static'));

app.listen(5000,(err)=>{
	if(!err) console.log('服务器启动成功');
})
```



### 5.2 关于文件夹文件命名

我们是这样，**用一个文件夹来封装一个组件，入口vue文件命名为index.vue**。文件夹里面有这个组件用到的图片、字体图标等静态资源，还有其他该组件用到的一些小组件

```js
// 引入组件
import Header from '@/components/Header' // 自动引入index.vue
```



如果一个组件仅仅用一个 vue 文件就可以封装好，则可以不用建一个文件夹

<img src="D:\文档\学习文件\GitWebProjects\Markdown\Vue\mark-img\image-20230109221854190.png"/>



### 5.3 注册全局组件

当某个小组件在很多组件中都有用到时，我们可以去 main.js 里面把在这个组件注册成全局组件，然后使用这个小组件都可以不用先引入了！！



全局组件要放在components文件夹中

 main.js：

```js
// 注册全局组件
import TypeNav from '@/components/TypeNav.vue'
Vue.component(TypeNav.name,TypeNav)
```



#### 5.3.1 App根组件发送请求

当一个全局组件在多个组件中用到，则到碰到路由跳转时，**这个全局组件不断会被新建销毁新建销毁**。。。

如果该组件中的数据需要发送请求才能获取，那么我们不能在这个组件里面发，**我们应该去App组件里面发。**



这样就只需要发送一次请求即可！！（App根组件 mounted 只执行一次）



App.vue

```js
// 请求一般在 mounted 这里发送
// 这里是申请通过 vuex 获取数据

mounted() {
    this.$store.dispatch('home/updataNavList');
}
```



store/home.js（vuex）

```js
// home仓库

// 引入请求函数
import { reqgetCategoryList } from '@/api'

export default {
	namespaced: true,

    actions: {
        async updataNavList(context) {
            let result = await reqgetCategoryList();

            if(result.code == 200) {
                context.commit('updataNavList',result.data)
            }
        }
    },

    mutations: {
        updataNavList(state,value) {
            state.navList = value;
        }
    },

    state: {
        navList: [],
    },
}
```





### 5.4 正确发送请求的方式

#### 5.4.1 多接口模式

1、首先我们要明确我们是要在一个大型接口网站下发送多个请求，那个网站会提供多个接口



2、所以我们要用到：

- 服务器配置代理：实现本地端口到目标端口的映射，解决跨域问题
- axios二次封装：发送请求前可以做一些事情，响应之后可以写回调函数
- 接口统一管理：当需要修改请求时，只需要改这里，不用动组件



**3、配置步骤：**

3.1 服务器配置代理

在 vue.config.js 配置具体代理规则（其他参数暂不用配置）

```js
// 配置服务器代理
devServer: {
    proxy: {

        // 匹配所有以 '/api'开头的请求路径
        '/api': {
            target: 'http://gmall-h5-api.atguigu.cn', // 硅谷后台管理系统接口  
        },

    }
}
```

当有请求 url 以 `/api` 开头时：

1、`http://localhost:8080/api...` 会**映射**为 `http://gmall-h5-api.atguigu.cn/api...`

2、并且还会解决跨域问题



3.2 axios二次封装

在 src 文件夹下新建 api 文件夹，新建 `requests.js` 来二次封装 axios

 requests.js：（固定模板）

```js
// 对axios进行二次封装！让requests代替axios

import axios from "axios";

const requests = axios.create({

    //基础路径 请求url默认开头会加上baseURL
    baseURL: "/api",
    
    //请求不能超过5S
    timeout: 5000,

});

//请求拦截器----在项目中发请求前执行的函数
requests.interceptors.request.use(function(config) {
    // config 为一个 AJAX 对象，内含请求头等数据

    return config;
})

//响应拦截器----当服务器响应请求后的回调函数
requests.interceptors.response.use(
    // 成功回调
    function(res) {
        // 直接返回响应体的 data 作为 promise 对象的value
        return res.data
    },

    // 失败回调
    function(err) {
        // 打印发送请求失败结果
        console.log('发送请求失败，请检查 api 接口');

        // 返回一个 AxiosError
        return err;
    }
)

export default requests;
```



**3.3 接口统一管理**

在 src/api 文件夹下新建 `index.js` 来封装所有 发送请求函数。当一个组件想要发送请求时，只需要引入 `src/api/index.js` 中的某个发送请求函数，之后调用该函数即可。



1、如果请求发送成功，**那么请求函数返回一个 promise 对象！！** 分为成功态和失败态

2、如果请求发送失败，则返回一个 AxiosError 对象。



封装一个 `reqgetCategoryList` 函数来发送 

`url = 'http://localhost:8080/api/product/getBaseCategoryList'` 的请求

index.js：

```js
// 统一接口管理：封装所有请求函数

// 1、如果请求发送成功，那么请求函数返回一个 promise 对象！！分为成功态和失败态

// 2、如果请求发送失败，则返回一个 AxiosError 对象。

import requests from "./requests";

// api 接口
// 普通请求函数
export const reqgetCategoryList = function() {
    return requests.get(`/product/getBaseCategoryList`); // 本地端口号可以不写
}

// 带 data 参数的请求函数
export const reqgetSearchData = function(value) {
    return requests({
        method: 'POST',
        url: '/list',
        data: value,
    })
} 

// 带内置参数的请求函数
export const reqCheckCart = function(skuId,isChecked) {
    return requests({
        method: 'GET',
        url: `/cart/checkCart/${skuId}/${isChecked}`,
    })
} 
```



**3.4 调用请求函数**

我们来简单调用一下刚刚封装的 `reqgetCategoryList` 函数，并处理 result 

有两种方式：then、async/await（笔记在后面的 `async/await 处理 promis`）

```js
import { reqgetCategoryList } from './api'

// then
reqgetCategoryList().then(function(value) {
    coonsole.log(value);
})

// async/await
async updataNavList(context) {
    let value = await reqgetCategoryList();
    console.log(value);
}
```



#### 5.4.2 单接口模式

如果一个请求的 url 网站只会它的一个或两个接口，并且只会用一次两次。那么直接用 axios 发送请求即可

```
npm i axios
```

```js
import axios from 'axios'

let url = 'http://localhost:8080/api2/cars';
axios.get(url, {
}).then(value => {
    console.log(value.data);
})
```



### 5.5 实现加载进度条

NProgress.js：https://ricostacruz.com/nprogress/

使用文档：https://blog.csdn.net/weixin_44171004/article/details/106397571



发送请求后我们可以用进度条在展示进展

安装进度条

```
npm i nprogress
```



在 requests.js 下添加如下配置：

```js
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'; // 可以进去修改样式

requests.interceptors.request.use(function(config) {

    // 加载进度条
    nprogress.start();

    return config;
})

requests.interceptors.response.use(
    function(res) {
        // 进度条结束
        nprogress.done();
        return res.data
    },
    
    function(err) {
        nprogress.done();

        console.log('发送请求失败，请检查 api 接口');
        return err;
    }
)
```



### 5.6 关于vuex的运用

一般在项目中**全局组件或大组件的数据**，或者**需要从服务器获取的数据都储存在 vuex** 中

vuex 中的 **action 主要用来发送请求**，不在组件中发送了！

而且vuex需要模块化。



工作模式（三连环）： api 编写发送请求函数  ->  vuex 调用请求函数并存储数据  ->  组件利用 vuex 发送请求获取数据 



#### 5.6.1 组件中使用 vuex

1、读取数据

```js
import { mapState, mapGetters } from 'vuex'

computed: {
    ...mapState('home',['navList']),
    ...mapGetters('detail',['spuSaleAttrList','skuInfo','categoryView'])
},
```



监视 vuex 数据

```js
watch: {
    navList(newValue) {
        .
    }
}
```





2、修改 vuex 数据

必须通过调用 dispatch 或者 commit

```js
this.$store.commit('user/upDataCountdown');
```



调用 dispatch

```js
this.$store.dispatch('home/updataNavList');
```





#### 5.6.1 vuex工作模式

**案例：home 组件中的 nav 组件展示时自动更新数组 navList**



1、新建 src/store 文件夹 新建 index.js

```js
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

// 引入仓库
import home from './home'

//创建并暴露store
export default new Vuex.Store({
	modules: {
        home,
	}
})
```



2、nav组件：获取 vuex 中的 navList  和 申请更新 navList

```js
import {mapState} from 'vuex'

export default {
    name: 'TypeNav',

    computed: {
        ...mapState('home',['navList']),
    },

    mounted() {
        // 更新 vuex/home 里的 navList
        this.$store.dispatch('home/updataNavList');
    },
}
```



3、配置 home.js

（一）**在 actons 向服务器发送请求**

- 调用请求函数（提前在 api 里面写好）获取到 promise 对象，
- 通过异步函数处理 promise 对象（使用 async/await 获取具体的值）



（二）通过 context.commit 近一步申请更新 NavList



（三）在 mutations 中直接更新



```js
// home仓库

// 引入axios请求函数
import { reqgetCategoryList } from '@/api'

export default {
	namespaced: true,

    actions: {
        async updataNavList(context) {
            let result = await reqgetCategoryList();

            if(result.code == 200) {
                context.commit('updataNavList',result.data)
            }
        }
    },

    mutations: {
        updataNavList(state,value) {
            state.navList = value;
        }
    },

    state: {
        navList: {},
        goodData: {},
    },

    // 一般通过 getter 简化 state 中复杂对象的数据（
    getters: {
        categoryView(state) {
            return state.goodData.categoryView || {};
        },

        skuInfo(state) {
            return state.goodData.skuInfo || {};
        },       
    }

}
```



### 5.7 防抖与节流（lodash.js）

我们这里用到一个第三方库：lodash.js   

中文文档： https://www.lodashjs.com/docs/lodash.throttle

CDN：

```html
<script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.corejs"></script>
```



vue里面安装及使用：

```
npm i lodash
```

```js
// 按需引入
import {debounce,throttle} from 'lodash'

methods: {
    addColor: throttle(function(index) {
        this.currentIndex = index;
    },50)
},
```





#### 5.7.1 防抖

1、概念：前面的所有的触发都被取消，**最后一次执行** 在 **规定的时间** 之后才会触发，也就是说如果连续快速的触发,只会执行最后一次



2、loadsh 中的 debounce 函数，参数为一个函数和防抖时间



3、一般用于表单的输入而触发的回调函数，实现当用户输入完成之后再执行回调函数



4、具体案例：当输入停止 且1s后 才会打印111

```js
const input = document.querySelector('input');

input.oninput = _.debounce(function() {
    console.log('111');
},1000)
```



#### 5.7.2 节流

1、概念：在规定的 **间隔时间** 内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发



2、**一般防止用户快速点击，例如1s内只能执行函数一次**



3、loadsh 中的 throttle 函数，参数为一个函数和节流时间



4、使用（注意这里的 methods 函数使用方法）

```js
import {throttle} from 'lodash'

methods: {
    addColor: throttle(function(index) {
        this.currentIndex = index;
    },50)
},
```



### 5.8 事件委派+编程式路由

1、事件委派：如果一个父节点有多个子节点，且多个子节点都需要绑定同一个函数。那么我们应该把事件委派给父节点！！只给父节点添加绑定事件



2、编程式路由：如果通过 v-for 会有多个 router-link 生成，那么我们要取消使用 router-link ，改用编程式路由节约编译时间！！！用绑定事件实现路由跳转



3、事件委派+编程式路由：**两个结合用于解决多子节点路由跳转问题**   既在父节点中添加绑定事件，在绑定事件中实现路由跳转！！！



#### 5.8.1 设置自定义属性

1、作用：子节点要想在父节点中独一无二必须要加上自定义属性！



2、自定义属性命名方式：`data-单词全部小写`

```js
:data-itemname="item.categoryName"
```



3、具体使用：获取节点（e.target）    获取节点自定义属性对象（e.target.dataset）

```js
goSearch(e) {
    
    let itemname = e.target.dataset.itemname; // 普通获取值
    
    let { itemname } = e.target.dataset; // 对象结构获取值
}
```



#### 5.8.2 案例

使每个 a 标签实现路由跳转

```vue
// 父组件未展示

<a href="javascript:void(0);" :data-dataname="item_c_c.categoryName">
    {{item_c_c.categoryName}}
</a>
```

```js
goSearch(e) {
    let { dataname } = e.target.dataset;

    if(dataname) {
        this.$router.push({
            path: '/search',
            query: { dataname }
        })
    }
}
```



### 5.9 transition标签搭配动画

Vue封装了一个标签 `<transition>` 来实现一个元素的显示与隐藏（v-show） 产生的过渡动画

第三方库这里用到`animate.css` 、 `transition.css`（这个直接复制）

https://www.transition.style/#out:circle:center

https://www.dowebok.com/demo/2014/98/



下面两个案例自己复制看看效果！！！

#### 5.9.1 animate.css

```js
npm i animate.css

// 在 mian.js 全局安装
import animated  from 'animate.css'
Vue.use(animated)
```

```vue
<template>
	<div>
		<button @click="show = !show;">点击</button>

		<transition
			enter-active-class="animate__animated animate__swing"
			leave-active-class="animate__animated animate__backOutUp"
		>
			<!-- 导航下拉面板 -->
			<div class="nav" v-show="show"></div>
		</transition>

	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				show: false
			}
		},
	}
</script>

<style scoped>
	.nav {
		width: 100px;
		height: 200px;
		background: red;
	}
</style>
```



如果在某个元素使用动画，可以设置持续时间和延时

```css
div {
    animation-duration: 2s;
    animation-delay: 0.4s;    
}
```

要修改其他配置 只能去修改源码？！



#### 5.9.2 transition.css

1、需要手动复制动画 并将 `[transition-style="..."]`  改为类名

```vue
<template>
	<div>
		<button @click="show = !show;">点击</button>

		<transition
			enter-active-class="down"
			leave-active-class="up"
		>
			<!-- 导航下拉面板 -->
			<div class="nav" v-show="show"></div>
		</transition>

	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				show: false
			}
		},
	}
</script>

<style scoped>
	.nav {
		width: 100px;
		height: 200px;
		background: red;
	}

    @keyframes wipe-in-down {
		from {
			clip-path: inset(0 0 100% 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
    }

    .down {
        animation: 1s cubic-bezier(.25, 1, .30, 1) wipe-in-down both;
    }

    @keyframes wipe-out-up {
		from {
			clip-path: inset(0 0 0 0);
		}
		to {
			clip-path: inset(0 0 100% 0);
		}
    }

    .up {
        animation: 1s cubic-bezier(.25, 1, .30, 1) wipe-out-up both;
    }


</style>
```



### 5.10 mockjs 的使用

概念：自娱自乐的发送请求，因为 mock 自己存储数据，然后又发送请求从 mock 读取数据。发送请求还是和 ajax 一致。就安装下面的教程来，完全不用跨域和处理 http 域名前缀什么的！



安装：`npm i mockjs -D  @types/mockjs`



1、创建 mock 文件夹，存储 json 数据 和 mockServe.js （json 数据：自己模拟的，不是从服务器里获取）

banner.json：（轮播图数据）

```json
[
  {
    "id": "1",
    "imgUrl": "/images/banner1.jpg"
  },
  {
    "id": "2",
    "imgUrl": "/images/banner2.jpg"
  },
  {
    "id": "3",
    "imgUrl": "/images/banner3.jpg"
  },
  {
    "id": "4",
    "imgUrl": "/images/banner4.jpg"
  }
]
```



2、mockServe.js：mock 服务器，设置响应体，就用自己写的数据

```js
import Mock from 'mockjs'

// 引入 json 数据
import banner from './banner.json'

// 设置响应
Mock.mock('/mock/banner',{
    data: banner,    
})
```



3、去 main.js 里面激活一下 mock 服务

```js
import '@/mock/mockServe'
```



4、在 mock 文件夹，新建 mockRequests.js

mockRequests.js

```js
// mockRequests：mock 的 ajax 封装

import axios from 'axios';

// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';

const mockRequests = axios.create({

    //基础路径 请求url默认开头会加上baseURL
    baseURL: "/mock",
    
    //请求不能超过5S
    timeout: 5000,

});

//请求拦截器----在项目中发请求前执行的函数
mockRequests.interceptors.request.use(function(config) {

    // 加载进度条
    nprogress.start();

    return config;
})

//响应拦截器----当服务器响应请求后的回调函数
mockRequests.interceptors.response.use(
    // 成功回调
    function(res) {
        // 进度条结束
        nprogress.done();

        // 直接返回响应体的 data 作为 promise对象 的value
        return res.data
    },

    // 失败回调
    function(err) {
        nprogress.done();

        console.log('mock数据请求失败');
        return err;
    }
)

export default mockRequests;
```



5、进入 api/index.js 写 mock 请求函数

```js
import mockRequests from './mockRequests'

// mock 接口
export const reqgetBannerList = function() {
    return mockRequests.get('/banner');
}
```



6、最后！在组件中发送 mock 请求，例如调用 reqgetBannerList 函数

```js
import { reqgetBannerList } from '@/api'

async updataBannerList(context) {
    let result = await reqgetBannerList();

    if(result) {
        console.log(result.data)
    }
}
```



### 5.11 swiper.js 的使用

官网 API（部署在 swiper 实例中）：https://www.swiper.com.cn/api/index.html



官网轮播图（查看源代码）：https://www.swiper.com.cn/demo/index.html



接下来介绍怎么在 vue2 里使用 swiper.js （vue2 使用 swiper5版本）

1、安装、引入css

```
npm i swiper@5
```

```js
// main.js

// 引入 swiper.css
import "swiper/css/swiper.css";
```



2、在组件中使用：引入 js  引入 html 结构 

```js
import Swiper from 'swiper'
```



html 结构：

1、开始先放个图片占个位置确定布局，再把图片换成下面的结构

2、注意最外层的 `class="swiper-container"` 必须！且后面的 swiper 实例也要改！

```html
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(img,index) in bannerList" :key="index">
            <img :src="img.imgUrl" />
        </div>
    </div>

    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
</div>
```



3、最后关键是创建 swiper 实例！ 有两种方式

**方式一：**

如果图片已经固定（或图片url数组已经确定 ）那么**直接在 mounted 函数中创建**

```js
mounted() {
    // 下面是普通swiper模板
    new Swiper(".swiper-container", {
        loop: true,
        mousewheel: true,
        keyboard: true,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
        },                    
    });
}
```



**方式二：**

用到 v-for 遍历图片url数组（**并且该数组是在本组件中通过发请求获取的**），那么就要用到 watch + $nextTick



#### 5.11.1 watch+$nextTick

当一个数据发生改变时，此时 DOM 还没有更新，所以在监视属性中的 handle 函数中 写一个 $nextTick 可以实现 **数据发生改变且 DOM 更新后执行代码**



回到 swiper ，我们在这个时候 创建 swiper 实例

bannerList：图片url数组

```js
watch: {
    bannerList: {
        handler() {
            this.$nextTick(function() {
                new Swiper(".swiper-container", {
                    loop: true,
                    mousewheel: true,
                    keyboard: true,

                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },

                    pagination: {
                        el: ".swiper-pagination",
                    },                    
                });
            })
        }
    }
},
```



#### 5.11.2 修改分页器样式

1、添加属性

```js
pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletClass : 'my-bullet', // 这个
    bulletActiveClass: 'my-bullet-active',
},
```



2、在组件里面写 css （不要加 scope）

```less
// 分页器样式
.my-bullet{
    position: relative;
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: black;
    opacity: 0.5;
    margin: 0 4px;
}

// 选中的分页器样式（会继承上面那个样式）
.my-bullet-active {
    background: #ff6600;
    opacity: 1;
}
```



#### 5.11.3 封装轮播图组件

当一个图片需要变为轮播图时，我们把 img 标签 换成 Carousel 组件即可！

1、Carousel 组件需要一个参数：图片 url 数组

```js
imgList = [
    {imgUrl: '...'}
    {imgUrl: '...'}
]
```



2、将 Carousel 组件注册为全局组件

```js
// 在 components 中新建 Carousel 文件夹

// main.js
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)
```



3、Carousel/index.vue （直接照搬即可 样式可自行修改）

```vue
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img,index) in imgList" :key="index">
                <img :src="img.imgUrl" />
            </div>
        </div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'

    export default {
        name: 'Carousel',

        props: ['imgList'],

        watch: {
            imgList: {
                immediate: true,
                handler() {
                    this.$nextTick(function() {
                        new Swiper(".swiper-container", {
                            loop: true,

                            pagination: {
                                el: ".swiper-pagination",
                                clickable: true,
                                bulletClass : 'my-bullet',
                                bulletActiveClass: 'my-bullet-active',

                            },
                            
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        });
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    // 分页器样式
    .my-bullet{
        position: relative;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background: black;
        opacity: 0.5;
        margin: 0 4px;
    }

    // 选中的分页器样式（会继承上面那个样式）
    .my-bullet-active {
        background: #ff6600;
        opacity: 1;
    }
</style>
```



4、组件中使用（传入图片 url 数组即可）

```vue
<Carousel :imgList="bannerList" />
```



#### 5.11.4 swiper 属性

1、`    <div class="swiper-container">`：为轮播图大盒子



2、`<div class="swiper-slide">`：为装图片的盒子，可以指定大小，那么图片直接适配。或者不指定大小，则需要指定图片大小。



3、`slidesPerView`：设置 轮播图大盒子 显示 轮播图 张数，轮播图 会被修改宽度适配 轮播图大盒子 



4、`slidesPerGroup`：每次切换 轮播图 张数



5、给 `<div class="swiper-slide">` 添加类名 `swiper-no-swiping` ：禁止滑动



### 5.12 Element-ui 按需引入

> 一般还是用全局引入...



```bash
npm i element-ui -S

npm install babel-plugin-component -D
```

babel.config.js

```js
module.exports = {
  "presets": [
        "@vue/cli-plugin-babel/preset",
        ["@babel/preset-env", { "modules": false }]
   ],

  "plugins": [
    [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
    ]
  ]
}
```

main.js

```js
// 引入 element-ui
import { Button, Select } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
```



### 5.13 路由滚动行为

当路由跳转时，我们可以指定滚动条滚动的位置。

设置为滚动到顶端：

```js
scrollBehavior() {
    return {
        y: 0, // vue3 用top
        behavior: 'smooth',
    }
},
```



API 文档：https://v3.router.vuejs.org/zh/guide/advanced/scroll-behavior.html



### 5.14 防止 undefined 报错

- 数组 arr 为 undefined ，那么如果使用了 arr[0] 则会报错；
- 数组 obj 为 undefined ，那么如果使用了 obj.name 则会报错；



解决方法：加个问号直接解决！！！`obj?.name`



### 5.15 计算属性的使用

**computed 里面可以读取 props 参数！！！**



知识点回顾：就是计算属性的依赖属性变化，计算属性就变！

1、set 函数执行：当手动修改了计算属性时，在 set 函数中利用 value **修改 计算属性 所依赖的数据**，从而修改该计算属性



2、get函数执行：初次读取时会执行一次，当**依赖的数据发生改变时**会被再次调用



案例：一个图片数组，有一个默认图片（默认图片会添加 active）；当点击某个图片时，该图片变为默认图片。

数组：imgList，内置属性有 imgUrl、isDefault。

```vue
// html

<img 
    v-for="(img,index) in imgList"
    :src="img.imgUrl" 
    @click="imgClick(imgIndex = index)"
    :class="{ active: imgIndex == index}"
>
```

```js
// 直接设置一个计算属性控制即可！

props: ['imgList'],

computed: {
    imgIndex: {
        get() {
            for(let i=0;i<this.imgList.length;i++) {
                if(this.imgList[i].isDefault == 1) return i;
            }         
        },

        set(value) {
            for(let i=0;i<this.imgList.length;i++) {
                this.imgList[i].isDefault = 0;
            }   

            this.imgList[value].isDefault = 1;
        }
    }
},
```



### 5.16 在本地存储 vuex 数据

注意这个只能用于存储静态数据！缓存之后方便迅速获取



1、在组件使用 vuex 时判断

```js
mounted() {
    if(JSON.parse(localStorage.getItem('navList'))) {
        this.$store.state.home.navList = JSON.parse(localStorage.getItem('navList'));
    } else {                
        this.$store.dispatch('home/updataNavList');
    }
},
```



2、在 vuex 对应的仓库中判断

```js
mutations: {
    updataNavList(state,value) {
        if(!JSON.parse(localStorage.getItem('navList'))) 
        {
            localStorage.setItem('navList', JSON.stringify(value));
        }
        state.navList = value;
    },
},
```





## 6、实际功能开发



### 6.1 vuex 中的函数传参

函数参数：第一个必须是 `context` 或者它的解构 `{dispatch,commit,state}` ，第二个是其他参数

当其他参数需要传入多个参数时，必须用**对象参数**

vuex：

```js
actions: {
    async addShopCart(context,{skuId,skuNum}) {
        let result = await reqAddShopCart(skuId,skuNum);

        console.log(result);
    }
},
```



组件：

```js
this.$store.dispatch('detail/addShopCart',{
    skuId: this.$route.params.goodId,
    skuNum: this.itxtValue
});
```



### 6.2 async/await 处理 promis

请求函数  `reqLogin(user)`  返回一个 promise 对象，如果我们要获取该 promise 对象的值 PromiseResult，我们就需要用到 async/await 。



因为这个请求函数可能返回三个值 **1、成功态  2、失败态  3、请求失败：AxiosError** 。

（某些请求里面，其中成功态又分为任务失败或者任务成功，用 result.code 区分）

完整功能模板：

```js
async login(context,user) {
    try {
        let result = await reqLogin(user);

        if(result.code == 200) {

            // result为 成功态的值 并且任务完成
            
        } else if(result.code == 207) {
            
            // result为 成功态的值 并且任务失败

        } else {
            
            // 发送请求失败 result 为一个 AxiosError
            
        }

    } catch (error) {
        // error 为失败态的值
        console.log(error);
    }
},
```

简化功能模板：

```js
async logout() {
    let result = await reqLogout();

    if(result.code == 200) {
        // 当成功态并且 code == 200
        ......

    } else {
        // 失败态或请求失败返回 自定义失败态 promise
        return Promise.reject(new Error('退出登录失败'));
    }
}
```

```js
// 调用端
async logout() {
    try {
        await this.$store.dispatch('user/logout');

        // 成功态处理

    } catch (error) {
        // 失败态打印
        console.log('退出登录失败');
    }
}
```





#### 6.2.1 关于登录业务的案例

首先明确发送完一个登录的请求 `reqLogin(user)`，可以获取到什么数据：

```js
// result为 成功态的值 并且任务完成

{
    "code": 200,
    "message": "成功",
    "data": {
        "nickName": "185123",
        "name": "185123",
        "userId": 6036,
        "token": "b484fb811705476da3e85c7a32199524"
    },
    "ok": true
}
```

```js
// result为 成功态的值 并且任务失败

{
    "code": 207,
    "message": "账号不正确",
    "data": null,
    "ok": false
}
```

```js
// result 为一个 AxiosError

{
    "message": "Request failed with status code 404",
    "name": "AxiosError",
	......
    "status": 404
}
```

 ```js
 // error 为失败态的值
 ...
 ```



那么在 vuex 里面是这样处理的

`store/user.js`

```js
async login(context,user) {
    try {
        let result = await reqLogin(user);

        // result为 成功态的值 并且任务完成
        if(result.code == 200) {

            localStorage.setItem('token', result.data.token); // 本地存储 token

            return {message: '登录成功'};

        // result为 成功态的值 并且任务失败
        } else if(result.code == 207) {

            return result; // 里面带有 message

        // 发送请求失败 result 为一个 AxiosError
        } else {
            return {message: '登录失败'}
        }

        // error 为失败态的值
    } catch (error) {
        console.log(error);

        return {message: '登录失败'}
    }
},
```

> 这个函数直接返回的是一个 promise，且一定为成功态，里面有属性 message



在组件的登录函数是这样调用 vuex 的

简单逻辑，没有加正则

```js
async login() {
    if(this.phone && this.password ) {
        let result = await this.$store.dispatch('user/login',{
            phone: this.phone,
            password: this.password,
        });

        // 打印不同的 result.message
        alert(result?.message);

        // 登录成功跳转
        if(result.code == 200) this.$router.push("/");

    } else {
        alert('请填写正确信息');
    }
}
```



### 6.3 vue 项目文件夹介绍

public：存放 index.html 以及该文件用到的 css、img 等静态文件

src：vue 项目工作根文件夹

src/api：封装所有请求函数的文件夹

src/assets：提供所有组件共享的静态资源

src/components：存放全局组件

src/pages、views：存放局部组件

src/router：封装路由

src/store：vuex 仓库

src/utils：封装所有公共函数的文件夹（uuid，正则等）

src/plugins：vue 用到的插件



### 6.4 身份认证实现

#### 6.4.1 uuid 实现游客认证

1、在 src/utils 文件夹创建 uuid_token.js

```js
// 导出函数 getUUID() 用于生成 uuid

import { v4 as uuidv4 } from 'uuid';

export const getUUID = function() {
    // 将 uuid 存储与浏览器中 避免每次产生新id
    let uuid = localStorage.getItem('uuid');

    if(!uuid) {
        uuid = uuidv4();
        localStorage.setItem('uuid', uuid);
    }

    return uuid;
}
```



2、在 api/requests.js （axios 封装文件）中对请求头添加 uuid

```js
import { getUUID } from '@/utils/uuid_token'

//请求拦截器----在项目中发请求前执行的函数
requests.interceptors.request.use(function(config) {
    // config 为一个 AJAX 对象

    // 给请求头添加游客 uuid （userTempId 为后端提供的请求头属性）
    config.headers.userTempId = getUUID();

    // 加载进度条
    nprogress.start();

    return config;
})
```



这样每个请求的请求头的 `userTempId` 都为游客的 uuid，且游客的 uuid 存在浏览器本地存储里



#### 6.4.2 token 实现身份认证

我们登录之后可以从服务器获取到 token，我们将 token 存到本地存储中，并在发送请求前在请求头中配置 token 属性。

```js
if(result.code == 200) {
    localStorage.setItem('token', result.data.token); // 本地存储 token

    return {message: '登录成功'};
}
```

```js
requests.interceptors.request.use(function(config) {
    ...
    // 给请求头添加 token
    let token = localStorage.getItem('token');
    if(token) config.headers.token = token;
    ...
})
```



通过 token 我们可以向服务器发送请求获取用户数据，首先在 APP 里面申请！



### 6.5 组件中使用 api 接口

进入 main.js 

```js
// 引入 api 接口
import * as api from '@/api'

new Vue({
    ......
    beforeCreate() {
        Vue.prototype.$bus = this; // 安装全局事件总线
        Vue.prototype.$api = api;
    },
}).$mount('#app')
```



组件中直接使用即可

```js
this.$api.reqGetTradeList();
```



### 6.6 支付弹窗业务处理

#### 6.6.1 二维码生成

下载 qrcode

```
npm i qrcode
```

使用 qrcode

```js
import QRCode from 'qrcode';

async getQRcode(url) {
    let ORcode = await QRCode.toDataURL('url');
    return QRcode; // 二维码图片
}
```



#### 6.6.2 MessageBox

我们使用 elementUI 中的 MessageBox 弹窗来实现支付弹窗效果

https://element.eleme.cn/#/zh-CN/component/message-box



在 html 中给一个按钮添加回调函数实现弹窗

```html
<button @click="openMsgBox" class="btn">立即支付</button>
```



配置回调函数

```js
async openMsgBox() {
    let url = await QRCode.toDataURL('WeChatUrl');

    this.$alert(`<img src=${url} />`, "微信支付", {
        dangerouslyUseHTMLString: true,
        //中间布局
        center: true,
        //是否显示取消按钮
        showCancelButton: true,
        //取消按钮的文本内容
        cancelButtonText: "支付遇见问题",
        //确定按钮的文本
        confirmButtonText: "已支付成功",
        //右上角的关闭按钮
        showClose: false,

        //关闭弹出框前的回调
        beforeClose: (type, instance, done) => {
            // 如果点击取消按钮
            if (type == "cancel") {
                alert("请联系管理员");
                clearInterval(this.timer);
                this.timer = null;
                done();
                
            } else {
                if (this.code == 200) {
                    clearInterval(this.timer);
                    this.timer = null;
                    done();
                    this.$router.push("/paysuccess");
                }
            }
        },
    });

    // 设置定时器不断发送请求
    if (!this.timer) {
        this.timer = setInterval(async () => {
        //发请求获取用户支付状态
        let result = await this.$api.reqPayStatus(this.orderId);

        // 停止发送请求 关闭定时器 跳转页面
        if (result.code == 200) {
            clearInterval(this.timer);
            this.timer = null;
            this.code = result.code;
            //关闭弹出框
            this.$msgbox.close();
            this.$router.push("/paysuccess");
        }
        }, 1000);
    }

},
```

> 手动关闭：`this.$msgbox.close()`





### 6.7 使用图片懒加载

利用一个 vue 插件：vue-lazyload

https://www.npmjs.com/package/vue-lazyload	

```
安装低版本
npm install vue-lazyload@1.3.3 --save
```



```js
// 使用图片加载
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/loading.gif'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: errorimage,
    loading: loadimage,
    attempt: 1
})
```



用自定义指令 `v-lazy` 来接管 src

```vue
单个图片
<img v-lazy="imgUrl">

图片列表
<div v-lazy-container="{ selector: 'img' }">
    <img :data-src="img_list[1]">
    <img :data-src="img_list[2]">
</div>
```



### 6.8 使用路由懒加载

作用：当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

一个 index.js 变成了多个 js 文件

以前的路由加载：

```js
import Home from '@/pages/Home'

{
    path: '/home',
    component: Home
},
```



路由懒加载：

```js
{
    path: '/home',
    component: () => import('@/pages/Home')
},
```



###  6.9 yarn 的安装使用

这里介绍一下 yarn 的安装和使用 

```
npm i -g yarn // 全局安装
```



通过 yarn 下载依赖包的优点：

1. 安装速度快 (服务器速度快 , 并且是**并行下载**)
2. 版本锁定，安装版本统一
3. 缓存机制，如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了
4. 输出简洁并且多注册来源处理。安装包时，直观地打印出必要的信息；不管包被不同的库间接关联引用多少次，只会从一个注册来源去装，防止出现混乱不一致。



npm 和 yarn 命令对比

![image-20230114104150953](D:\文档\学习文件\GitWebProjects\Markdown\Vue\mark-img\image-20230114104150953.png)

还要改一下镜像下载源

```
# 查看当前的下载包镜像源
npm config get registry

# 将下载包镜像源切换为淘宝镜像源
npm config set registry=https://registry.npm.taobao.org

# 查看镜像源是否下载成功
npm config get registry
```







### 6.11 `jsconfig.json` 介绍

当您在工作空间中有一个定义项目上下文的 jsconfig.json 文件时，JavaScript体验会得到改进。

说白了**就是提高在写项目时舒适度的**。



参考文档：https://blog.csdn.net/weixin_44067347/article/details/125632655



普通模板：

```js
{
    "compilerOptions": {
        "target": "es5",
        "module": "esnext",
        "baseUrl": "./",
        "moduleResolution": "node",
        "paths": {
            "@/*": [
                "src/*"
            ]
        },
        "lib": [
            "esnext",
            "dom",
            "dom.iterable",
            "scripthost"
        ]
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```



### 6.12 设置并删除定时器

```js
let timer = setInterval(() => this.$store.commit('user/upDataCountdown'), 1000);

clearInterval(this.timer);
```



###  6.13 Element UI 使用技巧

- 侧边栏实现路由跳转

参考文档：https://blog.csdn.net/qq_22182989/article/details/106262211



参考模板

```vue
<el-menu :default-active="this.$route.path" router>
    <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>导航</template>
        <el-menu-item index="/mytopic">我的题目</el-menu-item>
        <el-menu-item index="/myexam">我的试卷</el-menu-item>
        <el-menu-item index="/myrepo">我的试卷库</el-menu-item>
        <el-menu-item index="/mytest">我的考试记录</el-menu-item>
    </el-submenu>
</el-menu>
```



侧边栏参数介绍：

1、`default-openeds` ：选择默认展开的数组 `default-openeds="['1']"`

