# 3. 核心原理&源码

## Diff 算法

> 这里参考大佬文章：https://mp.weixin.qq.com/s/oAlVmZ4Hbt2VhOwFEkNEhw
>



### diff 算法的进化

关于 diff 算法的最经典的就是 Matt Esch 的 virtual-dom，以及 snabbdom（被整合进 vue 2.0中）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mHok2esm9oKJIexA6G523p59icbfTQ0LZbcVXoV5sqAkzI0W7l21icS3l4qggSJjvQqvxxeSZyB0icFA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> 最开始出现的是 virtual-dom 这个库，是大家好奇 React 为什么这么快而搞鼓出来的。它的实现是非常学院风格，通过深度优先搜索与 in-order tree 来实现高效的 diff 。
> 然后是 cito.js 的横空出世，它对今后所有虚拟 DOM 的算法都有重大影响。它采用两端同时进行比较的算法，将 diff 速度拉高到几个层次。
> 紧随其后的是 kivi.js，在 cito.js 的基出提出两项优化方案，使用 key 实现移动追踪以及及基于 key 的最长自增子序列算法应用（算法复杂度 为O(n^2)）。
> 但这样的 diff 算法太过复杂了，于是后来者 snabbdom 将 kivi.js 进行简化，去掉编辑长度矩离算法，调整两端比较算法。速度略有损失，但可读性大大提高。再之后，就是著名的vue2.0 把sanbbdom整个库整合掉了。

下面我们就来讲讲这几个虚拟 DOM 库 diff 算法的具体实现：





### virtual-dom

virtual-dom 作为虚拟 DOM 开天辟地的作品，采用了对 DOM 树进行了深度优先的遍历的方法。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/CBxTibNZG9mHok2esm9oKJIexA6G523p5B9hlJmjNfr7uGJzGduSiaUu5q78KhiaJ1CckicyJwnHM7cYX74zHicpjGw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



体现到代码上：(可以看成伪代码)

```vue
<script>
    function diff(oldTree, newTree) {
        let index = 0; // 当前节点的标志(树形层数)
        let patches = [] // 用来记录每个节点差异的对象
        dfsWalk(oldTree, newTree, patches, index); // 进行深度优先遍历
        return patches;
    }

    // 对两棵树进行深度优先遍历
    function dfsWalk(oldNode, newNode, patches, index) {
        if (newNode === oldNode) {
            return
        }

        const patch = { type: 'update', vNode: newNode }

        const oldChildren = oldNode.children;
        const newChildren = newNode.children;
        const oldLen = oldChildren.length;
        const newLen = newChildren.length;
        const len = oldLen > newLen ? oldLen : newLen // 取长的
        // 找到对应的子节点进行比较
        for (let i = 0; i < len; i++) {
            const oldChild = oldChildren[i];
            const newChild = newChildren[i];
            index++;
            // 相同节点进行比对
            dfsWalk(oldChild, newChild, patches, index)
            if (isArray(oldChild.children)) {
                index += oldChild.children.length
            }
        }

        if (patch) {
            patches[index] = patch
        }
    }
</script>
```



#### VDOM 节点的对比

上面代码只是对 VDOM 进行了简单的深度优先遍历，在遍历中，还需要对每个 VDOM 进行一些对比，具体分为以下几种情况：

1. 旧节点不存在，插入新节点；新节点不存在，删除旧节点
2. 新旧节点如果都是 VNode，且新旧节点 tag 相同
   * 对比新旧节点的属性
   * 对比新旧节点的子节点差异，通过 key 值进行重排序，key 值相同节点继续向下遍历
3. 新旧节点如果都是 VText，判断两者文本是否发生变化
4. 其他情况直接用新节点替代旧节点

> 详细代码加详细注释

```vue
<script>
    function diff(oldTree, newTree) {
        let index = 0; // 当前节点的标志(树形层数)
        let patches = [] // 用来记录每个节点差异的对象
        dfsWalk(oldTree, newTree, patches, index); // 进行深度优先遍历
        return patches;
    }

    import { isVNode, isVText, isArray } from './utils/type.js'

    // 对两棵树进行深度优先遍历
    function dfsWalk(oldNode, newNode, patches, index) {
        if (newNode === oldNode) {
            return
        }

        let patch = patches[index];

        if (!oldNode) {
            // 旧节点不存在，直接插入
            // appendPatch 是用来存节点之间差异的
            patch = appendPatch(patch, {
                type: PATCH.INSERT,
                vNode: newNode,
            })
        } else if (!newNode) {
            // 新节点不存在，删除旧节点
            patch = appendPatch(patch, {
                type: PATCH.REMOVE,
                vNode: null
            })
        } else if (isVNode(newNode)) { // 新节点是 VNode，就相当于前面写的Element
            if (isVNode(oldNode)) { // 旧节点也是 VNode，就要比较这两个节点的 tagName是否一致
                // 新旧节点 tagName 一致，并且 key 也一致。
                if (newNode.tagName === oldNode.tagName && newNode.key === oldNode.key) {
                    // 新老节点属性的对比, diffProps方法就是对新旧节点自身属性的对比
                    // 属性如果有差异，propsPatch的长度 > 0,且差异存在 propsPatch中
                    const propsPatch = diffProps(newNode.props, oldNode.props)
                    if (propsPatch && propsPatch.length > 0) {
                        patch = appendPatch(patch, {
                            type: PATCH.PROPS, // props这个表示是节点的属性差异
                            patches: propsPatch // 这里存的是差异的内容
                        })
                    }
                    // 新老节点子节点的对比
                    // diffChildren 方法是专门来对比子节点的。
                    patch = diffChildren(oldNode, newNode, patches, patch, index)
                } 
            } else {
                // 旧节点不是 VNode， 新节点替换旧节点
                patch = appendPatch(patch, {
                    type: PATCH.REPLACE,
                    vNode: newNode
                })
            }
        } else if (isVText(newNode)) { // 既然新节点不是 VNode，就判断新节点是否是文本节点
            // 旧节点不是文本节点
            if (!isText(oldNode)) {
                // 将旧节点替换成文本节点
                patch = appendPatch(patch, {
                    type: PATCH.VTEXT,
                    vNode: newNode,
                })
            } else if (newNode.text !== oldNode.text) { // 判断两者内容是否相等
                // 替换文本
                patch = appendPatch(patch, {
                    type: PATCH.VTEXT,
                    vNode: newNode,
                })
            } 

        }

        if (patch) {
            // 将补丁放入对应位置
            patches[index] = patch
        }

    }
</script>
```

#### 属性的对比

```vue
<script>
	function diffProps(newProps, oldProps) {
        const patches = [];
        // 将新旧属性都浅拷贝进 props
        const props = Object.assign({}, newProps, oldProps)

        // 将props对象的键转换成数组
        Object.keys(props).forEach(key => {
            // 如果新属性里有这个键，就能获取到这个键的属性值
            const newVal = newProps[key];
            // 旧属性也一样
            const oldVal = newProps[key];
            // 新属性这个键不存在
            if (!newVal) {
                // 那就直接用旧的
                patches.push({
                    type: PATCH.REMOVE_PROP,
                    key,
                    value: oldVal,
                })
            }
            // 旧的不存在或者新的不等于旧的
            if (oldVal === undefined || newVal !== oldVal) {
                patches.push({
                    type: PATCH.SET_PROP,
                    key,
                    value: newVal,
                })
            }
        })
    }
</script>
```

#### 子节点的对比

这一部分可以说是 diff 算法中，变动最多的部分，因为前面的部分，各个库对比的方向基本一致，而关于子节点的对比，各个仓库都在前者基础上不断得进行改进。

首先需要明白，为什么需要改进子节点的对比方式。如果我们直接按照深度优先遍历的方式，一个个去对比子节点，子节点的顺序发生改变，那么就会导致 diff 算法认为所有子节点都需要进行 replace，重新将所有子节点的虚拟 DOM 转换成真实 DOM，这种操作是十分消耗性能的。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/CBxTibNZG9mHok2esm9oKJIexA6G523p5XMLoDYgicF3zGzJJk1ia2OicD9m3ZcRhTcybGezxTbgNxh9PYAqKAxP6w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

但是，如果我们能够找到新旧虚拟 DOM 对应的位置，然后进行移动，那么就能够尽量减少 DOM 的操作。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/CBxTibNZG9mHok2esm9oKJIexA6G523p5G0bTOJdCQuw9iaicGSaeasibyhf3OdNjqC0NlibKZzF8w42bafRs008Ohw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

virtual-dom 在一开始就进行了这方面的尝试，对子节点添加 key 值，通过 key 值的对比，来判断子节点是否进行了移动。通过 key 值对比子节点是否移动的模式，被各个库沿用，这也就是为什么主流的视图库中，子节点如果缺失 key 值，会有 warning 的原因。

![图片](https://mmbiz.qpic.cn/mmbiz_png/CBxTibNZG9mHok2esm9oKJIexA6G523p5v3fYN0rWTVPc2ZkUL0pMoMd9gNHZANicSgOzlUcynpjVzlkPS4tD8gA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

具体是怎么对比的，我们先看代码：

```vue
<script>
	function diffChildren(oldNode, newNode, patches, patch, index) {
        const oldChildren = oldNode.children;
        // 新节点按照旧节点的顺序重新排序
        const sortedSet = sortChildren(oldChildren, newNode.children)
        // 拿到新节点的子节点
        const newChildren = sortedSet.children;
        const oldLen = oldChildren.length;
        const newLen = newChildren.length;

        const len = oldLen > newLen ? oldLen : newLen
        for (let i = 0; i < len; i++) {
            let leftNode = oldChildren[i];
            let rightNode = newChildren[i];
            index++;

            if (!leftNode) {
                if (rightNode) {
                    // 旧节点不存在，新节点存在，进行插入操作
                    patch = appendPatch(patch, {
                        type: PATCH.INSERT,
                        vNode: rightNode,
                    })
                }
            } else {
                // 相同节点进行比对
                dfsWalk(leftNode, rightNode, patches, index)
            }
            if (isVNode(leftNode) && isArray(leftNode.children)) {
                index += leftNode.children.length
            }

        }

        if (sortedSet.moves) {
            // 最后进行重新排序
            patch = appendPatch(patch, {
                type: PATCH.ORDER,
                moves: sortedSet.moves,
            })
        }

        return patch
    }
</script>
```

这里首先需要对新的子节点进行重排序，先进行相同节点的 diff ，最后把子节点按照新的子节点顺序重新排列。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/CBxTibNZG9mHok2esm9oKJIexA6G523p5bwlgXNbruAp1IHFRjhpkARicIYsicaOIbnibnhzCeibQicgh0ZDA5GBDACA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

这里有个较复杂的部分，就是对子节点的重新排序。







