# shuffle 洗牌
> 洗牌算法，将数组随机排序

### 关于 sort

JavaScript 开发中有时会遇到要将一个数组随机排序（shuffle）的需求，一般采用array.sort()方法，传入一个比较函数

```
var arr = [1, 2, 3, 4, 5]
arr.sort(function() {
  return .5 - Math.random()
})

// ES6
arr.sort(() => .5 - Math.random())

```

这种写法看似都是随机，但其实是有问题的，**它不是真正的随机**

### 验证 sort 随机性

使用 表格及动画

见 self-training.html

### 解决方案

#### 使用 Fisher–Yates shuffle

Lodash 库中的 shuffle 算法, 使用的实际是 Fisher–Yates 洗牌算法

```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

function shuffle(arr) {
  var i = arr.length,
      t,
      j;
  while(i) {
    // 在剩下的元素随机选择一位
    j = Math.floor(Math.random() * i--);
    t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr
}

// ES6
function shuffle(arr) {
  let i = arr.length
  while(i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]]
  }
  return arr
}

shuffle(arr)
```

### 洗牌算法思路

取自：[刘哇勇进阶方案](http://www.cnblogs.com/Wayou/p/fisher_yates_shuffle.html)

#### 1. 随机取数

如果要给每张洗牌， 最随机的方法是，在牌组里随机抽一张，放进另一个牌组，直到所有牌被抽出；
在代码里，在数组里随机抽取一个数（数组下标），放入一个空数组中，直到原数组所有元素都取掉。

```
function shuffle(arr) {
  var copy = [],
      n = arr.length,
      i;
  while(n) {
    // 在数组里随机选取数组下标
    i = Math.floor(Math.random() * arr.length)
    if (i in arr) {
      copy.push(arr[i])
      delete arr[i]
      n--
    }
  }
  return copy
}
```

**注意：**
1. Math.random()产生[0,1)的小数
2. delete 操作只将数组元素的值删除，但不影响数组长度，删除后原来位置的值变为undefined

即使一个序号上的元素已经被处理过了，由于随机函数产生的数是随机的，所有这个被处理过的元素序号可能在之后的循环中不断出现，
一是效率问题，另一个就是逻辑问题了，存在一种可能是永远运行不完！

#### 2. 改进方案
