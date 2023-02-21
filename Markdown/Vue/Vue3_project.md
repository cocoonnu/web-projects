以下是项目开发课程步骤及简单笔记



### 1、nvm 管理 node.js 版本

`nvm list`  `nvm use`  `nvm install` `nvm unistall`



### 2、`vue-router4` 使用方法在文档



### 3、vue3 模板

```vue
<script setup lang="ts">
</script>

<template>
</template>

<style scoped>
</style>
```





### 4、ElementPlus 按需引入

下载依赖：

`npm install element-plus --save`

`npm install -D unplugin-vue-components unplugin-auto-import`



vite.config.ts

```ts
...
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

plugins: [
    vue(),
    AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),
],
...
```



main.ts

```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
```



官方文档：https://element-plus.gitee.io/zh-CN/component/button.html

查看官方文档，基础组件中直接使用即可，反馈组件需要更复杂的引入方式



### 5、ElementPlus - Message 全局生效

在 main.ts 中配置

```ts
// 全局生效 ElementPlus - Message
import { ElMessage } from 'element-plus'
app.config.globalProperties.$message = ElMessage
```



组件中使用

```ts
import { h,getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()

// proxy.$message() 等效于 ElMessage()
```

> 感觉更麻烦了...





### 6、配置 Eslint

`npm i eslint`

`npx eslint --init`



最后配置选项按照这个

![image-20230221102452](mark-img/image-20230221102452.png)





### 7、scss 的使用方法

scss 帮助我们集中式管理 css 样式

下载依赖：`npm i sass -D`  注意是 SASS ！！！



使用文档：https://blog.csdn.net/weixin_67745264/article/details/125141904

特性：index.scss

```scss
// 定义变量
$red: red;

// 定义函数（css 集中样式）
@mixin background-black {
    background-color: black;
}
```

组件中使用

```vue
<style lang="scss" scoped>
@import "@/assets/scss/app/index.scss";

div {
    width: 100px;
    height: 200px;
    color: $red;
    @include background-black;
}   
</style>
```



**将某个 scss 文件注册为全局**

在 `assets` 下新建 `variable.scss` ，里面存放项目全局样式

在 `vite.config.ts` 中添加配置

```ts
// 配置 scss 入口文件
css: {
    preprocessorOptions: {
        scss: {
            additionalData: `@import "@/assets/scss/variable.scss";`
        }
    }
},
```

> 之后其他 scss 文件就不用引入 variable.scss 了





### 8、对 axios 进行 ts 封装

在 untils 下新建 `http.ts` ，下面是封装模板

```ts
// 1、如果请求发送成功，那么请求函数返回一个 promise 对象 分为成功态和失败态

// 2、如果请求发送失败，则返回一个 AxiosError 对象

// 对象里面是两个类型 用作 ts 封装
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const defaultConfig = {
    timeout: 5000,
    // baseURL: import.meta.env.PROD ? 'http://110.42.184.111' : 'http://localhost:3000/release'
}

// TS 封装
class Http {
    constructor() {
        // 实例化请求响应拦截
        this.httpInterceptorsRequest()
        this.httpInterceptorsResponse()
    }

    private static axiosInstance = axios.create(defaultConfig)

    // 请求拦截 config 为一个 axios 请求类型
    private httpInterceptorsRequest() {
        Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            return config
        }, err => {
            return Promise.reject(err)
        })
    }

    // 响应拦截 response 为一个 axios 响应类型
    private httpInterceptorsResponse() {
        Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
            return response
        }, err => {
            return Promise.reject(err)
        })
    }


    // 封装请求（公有属性） 函数返回类型为一个泛式
    public httpRequestGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.get(url, { params }).then(res => res.data).catch()
    }

    public httpRequestPost<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.post(url, params).then(res => res.data).catch()
    }
}

// 导出 http 实例 内部包含 httpRequestPost httpRequestGet
export const http = new Http()
```



### 9、ElementPlus 配置国际化

直接参考文档，很简单的。就是中英文交换

https://element-plus.gitee.io/zh-CN/guide/i18n.html



### 10、实现网站全局国际化

下载依赖：`npm install vue-i18n@next`



**在 src 下新建 `language `文件夹**

新建 `i18n.ts` 、`zn.ts`、`en.ts`

```ts
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 返回一个语言配置
const i18n = createI18n({
    legacy: false, // 这个不能缺！不然
    locale: 'zh', // 默认语言
    messages: {
        zh,
        en
    }
})

export default i18n
```

```ts
// zn.ts

export default {
    message: {
        name: '陈'
        sex: '男'
    }
}
```

```ts
// en.ts

export default {
    message: {
        name: 'cocoon'
        sex: '女'
    }
}
```



**配置 `main.ts`** 

```ts
// 语言配置
import i18n from '@/language/i18n'
app.use(i18n)
```



**组件中使用**

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 改变语言
function changeLan(lan: string) {
    locale.value = lan
}

</script>

<template>
    <button @click="changeLan('zh')">中文</button>
    <button @click="changeLan('en')">英文</button>

    <h1>{{ t('header.orders') }}</h1>
</template>
```





### 11、IndexedDB 数据存储方案

- 前言：IndexedDB 是一种底层 API ，用于在客户端存储大量的结构化数据，该 API 使用索引实现对数据的高性能搜索。 IndexedDB 是一个事务型数据库系统，也是一个基于 JavaScript 的面向对象数据库，它提供了类似数据库风格的数据储存和使用方式，**我们只需要指定数据库模式，打开与数据库的连接，然后检索和更新一系列事务**
- 目的：当我们进行一些较大的SPA页面开发时，我们会需要进行一些数据的本地存储。当数据量不大时，我们可以通过 `SessionStorage` 或者 `LocalStorage` 来进行存储，但是当数据量较大，或符合一定的规范时，我们可以使用数据库来进行数据的存储。
- 解决的问题：
  - 我们可以提前根据后端开发者提供的接口文档，来自行开发一套 Mock 接口，供前端项目来调用
  - 需要调用什么接口，直接使用 IndexedDB 自行封装就行，不需要建立 http 连接、处理跨域、联调等等
  - 等到自测或者发布测试阶段，直接将 Mock 接口替换成真实线上接口就可以了
  - 这样不仅提升了前后端开发效率，也使得前后端在某种程度上做到解耦



#### 11.1 基本概念和 API

数据库：存储数据的地方，每个域名可以创建多个数据库

对象仓库：也就是 `objectStore` ，每个数据库包含若干个对象仓库

索引：**可以为对象仓库中的属性创建对应的索引**，并且根据索引来查询数据，**一般索引名称和索引属性一致**

事务：数据库里的**增删改查操作都是通过事务（ transaction ）来完成**

数据记录：每一条数据都是一条记录，有对应的 key 、 value 、主键、索引等属性



推荐文档：https://blog.csdn.net/imagine_tion/article/details/115000245



**基本步骤：1、创建数据库连接 2、创建 objectStore 3、创建一些索引 4、通过事务来进行数据库操作**



#### 11.2 数据库与对象仓库的创建

在 `utils` 文件夹下新建 `indexedDB.ts`

```ts
export default class IndexedDB {
    private dbName: string

    constructor(dbName: string) {
        this.dbName = dbName
    }

    // 打开数据库 参数：对象仓库名称、主键、索引数组（可选） 
    openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
        let request = window.indexedDB.open(this.dbName, 2) // 名称 版本号（不可回退）

        // 数据库打开成功的回调
        request.onsuccess = function(e) {
            console.log('数据库打开成功')
            console.log(e);
        }

        // 数据库打开失败的回调
        request.onerror = function (e) {
            console.log('数据库打开失败')
            console.log(e);
        }

        // 数据库更新成功的回调
        request.onupgradeneeded = function (e) {
            console.log('数据库更新成功')
            const { result } = e.target   

            // 创建对象仓库
            const store = result.createObjectStore(storeName, {
                autoIncrement: true, keyPath
            })

            // 创建该对象仓库属性的索引
            if(indexs && indexs.length > 0) {
                indexs.map(function(i: string) {
                    store.createIndex(i, i, { unique: true })
                })
            }

            // 对象仓库创建成功的回调
            store.transaction.oncomplete = function(e) {
                console.log('对象仓库创建成功');
                console.log(e);
            }
        }
        
    }
}
```



实例化数据库

```ts
import IndexedDB from '@/utils/indexedDB'

// 创建数据库
const airbnDB = new IndexedDB('airbnDB')
airbnDB.openStore('room','id', ['hose', 'shu'])
```

