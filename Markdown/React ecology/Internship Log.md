# 第一章 实习日志
## 6.27

入职第一天的步骤记录：

- 首先 HR 会要求你发送身份证、学生证、银行卡照片的电子稿。然后会发给你一份入职指南，按照上面的流程下载各个软件并注册



- 通常一个企业会使用企业微信或者钉钉进行团队管理沟通，另外会分配一个 SSO 账号（最好重置一下密码），以便登录公司的内置网站、系统和 Gitlab。其次就是用飞书来实现团队之间代码、文档的共享。不过注册飞书需要企业邀请码，这个可能需要排队



- 另外需要在企业微信中申请访问公司项目。**申请的审批下来了就可以 clone 公司的项目代码了，需要切换成开发版本的分支**。接下来就是配置项目所需要的环境：VScode 版本、Nodejs 版本、npm 或 yarn 的镜像源



- 最后下载依赖，阅读项目的介绍文档、前端开发代码规范、学习 Git、GitLens 的使用、学习代码管理



## 6.28

从拉取代码到配置环境再到运行代码整体流程:

- 修改 Git 全局配置和设置 VScode 默认换行符为 LF，防止 ESlint delete cr 报错

```bash
$ git config --global core.autocrlf false
```

```bash
# 在设置综合搜索 files:eol，将选项修改为 '/n'
```



- 下载 nvm、yarn、nrm

```bash
$ nvm use 14.7.0
$ nrm use ekb
$ yarn config set registry https://npm.ekuaibao.com/
```



- 下载依赖，并运行项目，必须按照文档步骤来！！

```bash
$ yarn install
$ yarn run build:pre:dev
$ yarn run start
```



- 最好在本地新建一个分支进行个人开发

```bash
$ git checkout -b feature/N/czyTest
```



- 记住公司的项目端口号地址：http://localhost:9966/web/app.html



- VScode 工作区适配 prettier：.vscode/setting.json

```json
{
  "files.eol": "\n",
  "editor.tabSize": 2,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 设置自动保存
  }
}
```



- **将工作区 TS 的版本设置为项目所需的版本：**在右下角的编辑器语言里面进行 TS 版本的选择，在 @types/react 中查看项目对应的 TS 版本：www.npmjs.com/package/@types/react?activeTab=versions





## 6.29

Gitlab、公司 SSO 账户：chenzhiyi@hosecloud.com 2002CZYczy，记得申请电脑补贴！！

发送一个请求有这些参数：URL 上的参数，params：URL 参数键值对，请求体对象，请求头对象

后端请求会接收到：Body 请求参数，Query 请求参数（对应 params），Header 请求参数





## 7.03

今天参照 archives-box 做了一个简单页面，包含了一下功能点

- 新增按钮，弹层页面展示，内部展示基础表单数据（有必填参数），点击确定的时候（打印出所有参数，并且把参数转换成后端正常的数据值），然后取消弹层

- 表单由公共表单组件 FormGenerator 生成，且在未填写必填参数时，点击确认不可取消弹层

-  通过调用接口展示一个列表，有分页、搜索功能，列表由 TableWrapper 组件生成

  列表具有缓存能力，切换左侧菜单之后，再切换回来的时候，能够读取上次操作数据，缓存的数据有搜索、分页（PS：例如分页切换到第五页时，切换到其它页面菜单后，在切换回来的时候，此页面正常是展示第五页的列表数据）





## 7.04

一般我们的语法没报错的时候，我们注入一个 VM，或者函数组件使用 VM、引入一个内部封装好的组件比如 FormGenerator、BaseLayer 等常用表单页面组件之后报错时，**那么大部分情况下重启一下项目就可以解决！**



今天整理了一下各个功能点的使用，主要还是熟悉表单组件，弹窗页面生成的流程和规范。明天要实现一个存储多个路由数据的功能，实现性能优化



昨天的话实现了志强哥关于页面提的几个功能点比如熟悉表单组件、弹窗页面生成的流程和规范还有存储路由数据的功能等，今天的话就还是完成志强哥给的任务吧，然后就是继续熟悉项目



## 7.05

昨天的话整体还是熟悉表单组件的使用吧，实现了几个复杂表单项的配置，深入了解了由一个表单的配置对象到表单渲染的大致流程。然后的话还熟悉了几个表单组件 API 的使用。今天的话就是继续完成志强哥给的任务，熟悉一下那个公共的页面组件，和一些细节方面的使用。

```ts
setTimeout(() => {
  runInAction(() => {
    delete vm.formHelpType?.directoryFormId
    vm.formHelpType = { ...vm.formHelpType }
  })
}, 1000)
```

> 异步修改 mobx 数据时需要用到 runInAction，删除对象属性并实现响应式用下面这两行代码





## 7.06 

我昨天把那个前台中台的公共页面组件大致看了一些，了解了一些组件复用的逻辑。然后就是完成了志强哥之前安排的一个任务，在 Layout.vm 中封装了一个能一次存储多个路由 key-value 对象的方法，内部是用了一个 map 数据类型来实现的。然后今天主要就是催一下那个飞书账号的申请，之后就是看一下日钦哥昨天发的那几个 PRD。最后就是今天继续深入了解一下那个公共页面组件的逻辑



## 7.07

PRD发布
1、业务检测模块升级
https://hose2019.feishu.cn/docx/HaHudfD8couJrCxgQlfc3XeTnQe
2、扫描仪接入
https://hose2019.feishu.cn/docx/XT1ndyASuo7IBbxbujmcXS4tnhc
3、项目需求回头看
https://hose2019.feishu.cn/docx/OBeWdQuO5oj0xUxQtA5ckKSknWe



electronic-archive 的每个页面通过路由获取 `id：center_aebd0e80bc2d28802000:salesInvoiceDocument`

再通过 this.layoutVM.menuIdMap[id] 获取当前页面的 menu，从 menu 可以解析出 config，就是顶部 Cascader 组件的 option 下拉菜单

每个下拉菜单又对应一个 directoryFormId，通过这个 id 可以从后端获取当前菜单的数据，把数据中的 templateAndPath 存储在 this.layoutVM.currentGroupTabList 里面，即路由存储。

electronic-archive.vm 里面封装了一个 this.document 用来管理后端获取当前菜单的数据，实现动态响应式

又可以中 this.document 中提取出 TableWrapper 需要的 columns

产研+UI交互协议方案：https://hose2019.feishu.cn/docx/N861da82soKZrEx6JiUcegmwnOe
dev环境：【开发自己玩的分支，没有提测就不要合并到dev分支】
    命名空间：efile-base-dev、efile-app
    登陆地址：http://ea.dev.ekuaibao.com.cn/web/app.html
    数据库地址：192.168.100.133:4306  
    数据库用户名/密码：root/efiledev@soft
    minio网页：http://minio-efile.dev.ekuaibao.com.cn
    minio用户名/密码：minio/minio123
test环境：【部署dev分支，测试稳定使用】
    命名空间：efile-base-test、efile-app-test
    登陆地址：http://ea-test.dev.ekuaibao.com.cn/web/app.html
    数据库地址：192.168.100.133:5306  
    数据库用户名/密码：root/efiletest@soft
    minio网页：http://minio-efile-test.dev.ekuaibao.com.cn
    minio用户名/密码：minio/minio123




# 第二章 项目功能点记录

## 2.1 使用 MobX5 流程
项目使用 Mobx5 进行对一个页面的数据仓库的管理，一个页面仓库就是一个 vm，本质是一个类实例

在当前页面文件夹下创建 vms 文件夹存储 MobX vm：新建 `ekb-collection.vm.ts`

```ts
import { action, observable, reaction } from 'mobx'
import { fetchCollectionSourceList } from '@/servers/collection.server'
import { tabPage } from '../ekb-collection'

export class EkbCollectionVM {
  @observable activeTab = tabPage[0].key
  @observable tableList = []
  ......

  @action
  changePageTab = (activeKey) => {
    this.activeTab = activeKey
    if (this.currentPage === 1) this.fetchTableList()
    else this.currentPage = 1
  }

  /** 初始化页面操作 */
  initPage = () => {
    reaction(
      () => [this.currentPage, this.pageSize],
      (data, reaction) => {
        this.fetchTableList()
      },
      { fireImmediately: true }
    )
  }

  /** 获取表格数据 */
  fetchTableList = async () => {
    let res = null
    const limit = { start: (this.currentPage - 1) * this.pageSize, count: this.pageSize }
    this.loading = true
    switch (this.activeTab) {
      case tabPage[0].key:
        res = await fetchCollectionSourceList({ limit })
        break
      case tabPage[1].key:
        res = await fetchCollectionTaskList({ limit })
        break
      default:
        res = await fetchCollectionTaskLog({ limit })
    }
    this.loading = false
    if (res?.data) {
      this.tableList = res.data
      this.totalCount = res?.meta?.count ?? 0
    }
  }
}

export default EkbCollectionVM
```



最外层页面组件必须使用类组件，类组件中注入 VM 并实现响应式的方式如下：

```tsx
import EkbCollectionVM from './vms/ekb-collection.vm'
import { inject, provider } from '@ekuaibao/react-ioc'
import { observer } from 'mobx-react'

@provider(EkbCollectionVM) // 提供之后就可以直接this.props访问VM里的属性了
@observer
export class EkbCollection extends React.Component {
  @inject vm: EkbCollectionVM // 注入一下会更方便使用


  render(): React.ReactNode {
    console.log(this.vm)
      
    return (
      <div className={styles['box-wrapper']}>
        <HeaderAction actions={this.renderActions()} />
        <div className={styles['tab-content']}>
          <TableListComponet />
        </div>
      </div>
    )
  }
}
```



页面组件内部的子组件用函数组件，注入 VM 并实现响应式的方式如下（前提是外层的页面组件注入了 VM）：

```tsx
import { useInstance } from '@ekuaibao/react-ioc'
import { useObserver } from 'mobx-react-lite'

export const Operation = (value, record) => {
  const vm = useInstance(EkbCollectionVM)

  return useObserver(() => {
      
    return (
        ......
    )
      
  })
}
```



在 VM 注入一个其他的 VM 方式如下：

```ts
import LayoutVM from '@/plugins/layout/vms/layout.vm'
import FormTestVM from './formTest.vm'
import { inject } from '@ekuaibao/react-ioc'

export class TestVM {
  @inject layoutVM: LayoutVM

  // this.layoutVM 直接使用即可
```



打印一个被 Mobx 观察的数组：点击 $mobx 里面的 value 进行查看它的值，而不是看外层的其他数据

![image-20230707143902984](mark-img/image-20230707143902984.png)





## 2.2 发送请求 API 流程

URL = proxyURL（代理成本地） + baseAPI + 具体业务 api



webpack.config.js 里面配置 proxyURL 代理跨域

```js
let proxyURL = ''
// proxyURL = 'http://ea.dev.ekuaibao.com.cn/' // dev环境
proxyURL = 'http://ea-test.dev.ekuaibao.com.cn/' // test环境
// proxyURL = 'https://efile.hosecloud.com/' // sass 生产环境
// proxyURL = 'https://efile-pre.hosecloud.com/' // 预发布环境
// proxyURL = 'http://192.168.200.128:1338/' // 本地
// proxyURL = 'http://ea-debug.k8s03.ekuaibao.net/' // 南昌本地环境（最新）

config.devServer
  .contentBase(path.resolve(process.cwd(), 'src'))
  .host('0.0.0.0')
  // .https(true)
  .port(9966)
  .watchContentBase(true)
  .disableHostCheck(true)
  .proxy([{ context: ['/api/**', '/static/**'], changeOrigin: true, target: proxyURL }])
  .publicPath('/web')
  .stats('errors-only')

module.exports = config.toConfig()
```



src/lib/baseApi.ts 存储 baseAPI 用到的所有常量并导出



src/servers 文件夹中的文件导出请求函数，项目使用封装好的 `app.collection.request` 或者 `fetch` 而不是 axios 进行接口请求

```js
app.collection.request(endPoint, opstions) // endPoint主要是请求url的前半部分，options为请求接口的其他选项

opstions: {
    action: '/computed', // 是请求的后半部分
    method: 'POST',  // 是请求的类型
    data: Object, // 请求体参数对象
    params: Object, // 添加在请求url上的键值对参数对象
}
```

```js
app.collection.fetch(model, opstions)
//model是datx的model，这个model一般在另外一个项目electronic-archives-definition中定义，然后在电档项目引入model
//options主要参数和request类似
```



请求函数定义如下，和写过的项目一样返回一个 Promise 对象，所以使用方式就是处理 Promise

```ts
import { app } from '@ekuaibao/whispered'
import { DIRECTORY_V1 } from '@/lib/baseApi'
const COLLECTION_URL = DIRECTORY_V1 + '/ekbFusion'

/**
 * 获取采集来源页面的表格数据
 * @see https://console-docs.apipost.cn/preview/......
 */
export const fetchCollectionSourceList = ({ limit }: { limit: PaginationOpts }) => {
  return app.collection.request(COLLECTION_URL, {
    action: '/collection/queryCollection',
    method: 'POST',
    data: { limit }
  })
}
```



## 2.3 存储路由数据流程

当我们在左侧菜单来回切换页面的时候，将页面中的数据存储的的方式如下：

利用 Layout 组件里面的 Layout.vm，因为每个页面都会包含一个 Layout 组件

代码参考 `src/electronic-archive/electronic-archive.vm.ts`

```ts
// 首先注入
import LayoutVM from '@/plugins/layout/vms/layout.vm'
import { inject } from '@ekuaibao/react-ioc'
import { getFrontRoute } from '@/lib/utils'

export default class ElectronicArchiceVM extends DocumentV2VM {
  @inject('collection') collection: Collection
  @inject layoutVM: LayoutVM
  ......
  
  
  // 在路由中存储templateAndPath数据
  recordTemplateAndPath = (template, path) => {
    const route = getFrontRoute()
    this.layoutVM.changeGroupTabsListAttr({
      route,
      key: 'templateAndPath',
      value: { filterTemplate: template, path }
    })
  }

  // this.layoutVM.currentGroupTabList 这个变量存的是所有路由页面存储的数据
  getTemplateAndPath = () => {
    const route = getFrontRoute()
    const cacheRouteData = this.layoutVM.currentGroupTabList?.find((item) => {
      return item?.route === route 
    })

    if (cacheRouteData?.templateAndPath) return tcacheRouteData?.templateAndPath
    else return {}
  }  
```

![image-20230707141403153](mark-img/image-20230707141403153.png)

具体源码实现可以去 `@/plugins/layout/vms/layout.vm` 查看



## 2.4 FormGenerator 表单组件

### 2.4.1 表单组件的基本使用

使用一个表单组件，只需要配置一个 formComponents 对象即可 

整个表单组件路径：`src\plugins\common\components\index.ts`

FormGeneratorProps：`src\plugins\common\components\types.ts`

```tsx
  <FormGenerator
    formRef={formRef}
    isDraft={true}
    span={24}
    itemLayout={{
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }}
    noTransferDir={true}
    noFullHeight={true}
    components={this.renderComponents()}
    selectOptionsData={{
      collectingStatus: this.radioOptions
    }}
  />
```



renderComponents 函数返回一个表单单项的配置

对应属性 components，参数 FormComponentModel：：`src\plugins\common\components\types.ts`

```tsx
  renderComponents = () => {
    const components: any[] = [
      {
        type: FORM_TYPE.radioGroup,
        field: 'collectingStatus',
        label: getI18n('状态'),
        optional: true,
        direction: 'horizontal'
      },
      {
        type: FORM_TYPE.text,
        field: 'collectingName',
        label: getI18n('采集源名称'),
        optional: true
      },
      {
        type: FORM_TYPE.text,
        field: 'collectingCode',
        label: getI18n('采集源编码'),
        optional: false
      }
    ]

    return components
  }
```



对表单的校验和输入默认值通过 formRef 进行设置，一下代码是在 VM 中写的

```ts
// 设置表单值
this.formRef.current.setFieldsValue({
  collectingStatus: data?.status,
  collectingName: data?.name,
  collectingCode: data?.code
})

// 校验表单
const formValue = await this.formRef.current.validateFields()
```



### 2.4.2 自定义表单单项流程

以 FieldTextInput 组件为例，它是一个默认 text 输入框的表单单项，整体渲染流程如下：

我们也直接通过一个配置渲染出来：

```tsx
  renderComponents = () => {
    const components: any[] = [
      {
        type: FORM_TYPE.text,
        field: 'collectingStatus',
        label: getI18n('状态'),
        optional: true,
        direction: 'horizontal'
      },
    ]

    return components
  }
  
  <FormGenerator
    components={this.renderComponents()}
  />  
```



首先我们进入 `src\plugins\common\components\Fields\index.tsx`，这是表单单项组件渲染入口文件

```tsx
export const renderField = (opts: RenderFieldOpts) => {
  const {
    item, // 这个变量就是我们定义的components对象，类型为FormComponentModel
    data,
    isDraft,
    disabledDateObj,
    disabledItems = [],
    value,
    warnings,
    customRenderField,
    previewMode,
    readOnlyFormList = [],
    observerData
  } = opts
}
```

> 该渲染函数在 FormGenerator 中被使用，所以传入的不止是 item：components 配置项



根据 item.type 进行组件匹配，props 基本是将 item 的配置参数依次传入即可

```tsx
import FieldTextInput from './FieldTextInput' 

switch (item.type) {   
    case FORM_TYPE.text:
      return (
        <FieldTextInput
          {...getAntdOptions(item)} // 包装过滤item的一些基本参数然后依次传入 
          style={item.style}
          placeholder={placeholder.text} // placeholder由一个封装好的函数获得
          disabled={disabled}
          maxLength={item.maxLength}
          prefix={item.prefix}
          suffix={item.suffix}
          readOnly={isReadOnly}
          tipsEnable={item.tipsEnable}
          tipsPlacement={item.tipsPlacement}
          customizeBtn={item.customizeBtn}
        />
      )
 }
```



接下来就是写 FieldTextInput 组件了：src\plugins\common\components\Fields\FieldTextInput\index.tsx

这个组件获取的 props 是入口文件封装 item 的一些配置参数加其他生成的参数

```tsx
interface FieldTextInputProps extends FormItemCommonProps {
  disabled: boolean
  maxLength: number
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  customizeBtn?: React.ReactNode
  size: SizeType
  allowClear: boolean
  onPressEnter: any
}

const FieldTextInput = ({
  value,
  onChange,
  style,
  placeholder,
  disabled,
  readOnly,
  maxLength,
  prefix,
  suffix,
  tipsPlacement,
  tipsEnable,
  customizeBtn,
  size,
  allowClear,
  onPressEnter
}: FieldTextInputProps) => {
    ......<Input />
}
export default FieldTextInput
```



这就是由一个 item 配置对象生成一个表单单项的大致流程

```tsx
  {
    type: FORM_TYPE.text,
    field: 'collectingStatus',
    label: getI18n('状态'),
    optional: true,
    direction: 'horizontal'
  },
```

> 参数类型经过 renderField 封装之后由 FormComponentModel 变成  FormItemCommonProps + FieldTextInputProps



## 2.5 TableWrapper 表格组件

渲染一个表格组件，必填项：columns、dataSource，数据由后端返回，服务于 columns 每一项的 key

**columns 参考如下：**

```ts
// 列表表格的columns
export const getColumns = () => {
  const columns: ColumnType<any>[] = [
    {
      title: getI18n('档案盒号'),
      dataIndex: 'documentNumberCode',
      key: 'documentNumberCode',
      width: 160,
      sorter: {
        compare: (a, b) => {
          return tableSorterStr(a?.documentNumberCode, b?.documentNumberCode)
        },
        multiple: 1
      },
      render: (data) => data ?? '-'
    },
    {
      title: getI18n('档案盒类型'),
      dataIndex: 'directoryFormId',
      key: 'directoryFormId',
      width: 110,
      render: (data) => data?.name ?? '-'
    },
  ]

  return columns
}
```



**TableWrapper 同时支持插入一个头部搜索组件，本质为一个表单**

```ts
header={{
  ......
  form: {
    formRef: searchFormRef,
    onSearch: searchData,
    components: formComponets
  }
}}
```



**还支持在表格上面左侧添加一些按钮**

```tsx
tableHeader={<TableHeaderBtn />}
```



**TableWrapper 同时支持分页器功能**

```tsx
pagination={{
  total: totalCount,
  current: currentPage,
  pageSize: pageSize,
  onChange: updateListPage
}}
```



**渲染 TableWrapper**

```tsx
  <TableWrapper
    className={styles['table-wrap']}
      
    header={{
      form: {
        formRef,
        onSearch: searchData,
        components: formComponets
      }
    }}
   
    tableHeader={<TableHeaderBtn />}  
      
    columns={getColumns()}
    dataSource={tableDatas}
   
    isShowTableHeader
    loading={loading}
    bordered={true}
    size="small"
    resize={false}
    pagination={{
      total: totalCount,
      current: currentPage,
      pageSize: pageSize,
      onChange: updateListPage
    }}
      
    emptyText={getI18n('当前档案盒为空')}
  />
```



## 2.6 新建弹窗页面流程

页面文件夹中配置一下

```ts
export default [
  {
    id: '@test',
    path: '/test',
    ref: '/',
    onload: () => import('./test')
  },
  {
    point: '@@layers',
    prefix: '@test',
    onload: () => require('./layers').default
  }
]
```



新建 layers 文件夹，每一个弹窗页面在单独作为一个文件夹，在最外层写一个所有的弹窗配置

内部配置参数参考 antd  modal：https://ant-design.antgroup.com/components/modal-cn#api

有一个生成默认弹窗参数的函数： getModelDefaultOptions

```ts
// layers/index.ts
import { getModelDefaultOptions } from '@/lib/layerOptions'
import { getI18n } from '@/lib/tools/i18n'

export default [
  // //配置方式一
  {
    key: 'TestLayer',
    getComponent: () => import('./TestLayer'),
    enhancerOptions: {
      title: '',
      footer: null,
      bodyStyle: { padding: 0, display: 'flex', flexDirection: 'column' }
    },
    maskClosable: true,
    width: 800
  },
    
  // 配置方式二
  {
    ...getModelDefaultOptions({
      hiddleHeader: true,
      enhancer: 'drawer'
    }),
    key: 'AddTestBoxLayer',
    getComponent: () => import('./AddTestBoxLayer'),
    maskClosable: true,
    width: 800
  }
]
```

> getModelDefaultOptions 封装了一些默认参数，可以代替 enhancerOptions
>
> enhancerOptions 将一些参数做了一个整合，但像 width、maskClosable 这两个常用参数就放在外面
>
> 弹窗页面一般都是隐藏 modal 框的头部和底部的，组件里面自己会写头部和底部



AddTestBoxLayer/index.tsx：固定最外层类组件，并命名为 PreviewLayer，注入对应的 VM

```tsx
import React, { Component } from 'react'
import AddTestBoxLayer, { AddTestBoxLayerProps } from './hook'
import { provider } from '@ekuaibao/react-ioc'
import { AddTestBoxVM } from '@/plugins/test/vms/add-test-box.vm'

@provider(AddTestBoxVM)
class PreviewLayer extends Component<AddTestBoxLayerProps> {
  render() {
    return <AddTestBoxLayer {...this.props} />
  }
}

export default PreviewLayer
```

**this.props 默认会有一个 layer 对象，用于处理该弹窗**，在打开弹窗时还可以接收其他参数



AddTestBoxLayer/hook.tsx：作为函数组件，且为弹窗主组件

```tsx
import React, { FC } from 'react'
import { useInstance } from '@ekuaibao/react-ioc'
import { useObserver } from 'mobx-react-lite'
import { ILayerProps } from '@ekd/enhance-layer-manager'
import { AddTestBoxVM } from '@/plugins/test/vms/add-test-box.vm'

export interface AddTestBoxLayerProps extends ILayerProps {
  title?: string
}

const AddTestBoxLayer: FC<AddTestBoxLayerProps> = ({ title, layer }) => {
  const vm = useInstance(AddTestBoxVM)

  return useObserver(() => {
    return <div>111</div>
  })
}

export default AddTestBoxLayer
```



**弹出弹窗方式，第二个参数作为 PreviewLayer 入口组件的 props 传入**

```ts
onAddTestBox = async () => {
  const result: any = await app.open('@test:AddTestBoxLayer', { title: '添加档案盒' })
  if (result.res) this.resetList()
}
```



**关闭弹窗方式，利用默认传入的 layer 对象**

```tsx
cancelHandler = () => {
  this.props.layer.emitCancel()
}

saveHandler = async () => {
  const res = await this.vm.saveForm()
  if (res) this.props.layer.emitOk({ res })
}
```



## 2.7 全局路由

项目中可以直接使用一个全局路由变量 location

<img src="mark-img/image-20230706115701679.png" alt="image-20230706115701679" style="zoom:50%;" align="left" />



## 2.8 路由数据批量存储函数

**路由信息数组**

this.layout.currentGroupTabList 里面存储所有右上方路由信息数组，内部存在默认三个参数：

**route**、**label**、**filterValue**

```ts
// 本质是一个computed
@computed get currentGroupTabList() {
   return this.groupTabsList[this.currentGroup || this.defaultMenuGroup] ?? []
}
```

![image-20230707143411873](mark-img/image-20230707143411873.png)

<img src="mark-img/image-20230707144141810.png" alt="image-20230707144141810" style="zoom:80%;" align="left"/>





通过 changeGroupTabsListAttrBatch 函数可实现批量添加

```ts
  @action
  changeGroupTabsListAttrBatch = ({ route, routeData }: { route: string; routeData: RouteDataItem[] }) => {
    const currentList = this.groupTabsList[this.currentGroup]?.map((item) => {
      if (item.route === route) {
        routeData.forEach((routeDataItem) => {
          const key = routeDataItem.key
          if (!['route', 'label', 'filterValue'].includes(key)) item[key] = routeDataItem.value
        })
      }

      return item
    })
    this.groupTabsList[this.currentGroup] = currentList
  }
```



`import {  RouteDataItem } from '../types/layout.types'`

```ts
export interface RouteDataItem {
  key: string
  value: any
}
```



使用如下

```ts
  recordRouteDataDatch = () => {
    const route = getFrontRoute()
    this.layoutVM.changeGroupTabsListAttrBatch({
      route,
      routeData: [
        {
          key: 'test-vm-data',
          value: {
            testCurrentPage: this.currentPage,
            testFilterValue: this.filterValue
          }
        },
        {
          key: 'table-data',
          value: {
            totalCount: this.totalCount,
            tableDatas: this.tableDatas
          }
        }
      ]
    })
  }

```



打印 this.layout.currentGroupTabList



