# This

## 目录
- [简介](#简介)
- [全局环境](#全局环境)
- [函数内部](#函数内部)
  * [非严格模式下](#非严格模式下)
  * [严格模式](#严格模式)
  * [call 和 apply](#call-和-apply)
  * [bind](#bind)



## 简介

在中文中，人们常常用“这个、这个”来指代一些东西，但是如果不加 “手势、眼神”等肢体语言的话，是无法理解的。
在代码中，`this` 也一样，有全局环境和函数内，在严格模式和非严格模式，都有不同的作用；
在一般情况下，**`this` 指向最后调用它的那个对象**

## 全局环境

全局环境，即全局执行上下文

```
// 在浏览器中
console.log(this === window)  // true

// 在 Node 中
console.log(this === module.exports) // true
```

## 函数内部

### 在非严格模式下

this 默认指向全局对象 window
```
function f1() {
  return this
}

// 在浏览器中
console.log(f1() === window) // true

// 在 Node 中
console.log(f1() === global) // true
```

### 严格模式

this 默认为 `undefined`

### call 和 apply

通过使用函数继承自 `Function.prototype` 的 `call` 或 `apply` 方法

1. 将 `this` 的指从一个上下文传到另一个

```
var obj = {
  a: 'Custom'
}

var a = 'Global'

function whatsThis(arg) {
  console.log(this.a)
}

whatsThis()
// 'Global'

whatsThis.call(obj)
whatsThis.apply(obj)
// 'Custom'
```

2. 在绑定到调用的对象时，还可以传入参数(提现 `call` 和 `apply` 的区别)

```
function add(c, d) {
  console.log(this.a + this.b + c + d)
}

var o = {
  a: 1,
  b: 3
}

add.call(o, 5, 7)
// 16

add.apply(o, [0, 1])
// 5
```

### bind