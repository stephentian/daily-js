# This

## 目录
- [简介](#简介)
- [全局环境](#全局环境)
- [函数内部](#函数内部)
  * [非严格模式](#非严格模式)
  * [严格模式](#严格模式)
  * [call 和 apply](#call-和-apply)
  * [原生 js 实现 call 和 apply](#原生-js-实现-call-和-apply)
  * [bind](#bind)
  * [原生 js 实现 bind](#原生-js-实现-bind)
  * [箭头函数中的 this](#箭头函数中的-this)
  * [原型链中的 this](#原型链中的-this)
  * [DOM 中的 this](#DOM-中的-this)



## 简介

在中文中，人们常常用“这个、这个”来指代一些东西，但是如果不加 “手势、眼神”等肢体语言的话，是无法理解的。
在代码中，`this` 也一样，有全局环境和函数内，在严格模式和非严格模式，都有不同的作用；
在一般情况下，**`this` 只受最靠近的执行环境影响**

## 全局环境

全局环境，即全局执行上下文

```
// 在浏览器中
console.log(this === window)  // true

// 在 Node 中
console.log(this === module.exports) // true
```

## 函数内部

### 非严格模式

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

### 原生 js 实现 call 和 apply


### bind

ES5 引入了 `Function.prototype.bind`。 
`f.bind(someObject)` 会创建一个与 `f`具有相同函数体和作用域的函数。
在新函数中， `this` 被 **永久** 绑定到 `bind` 的第一个参数，无论函数如何被调用。

```
function f() {
  return this.a
}
var obj1 = {
  a: 'obj1 的 a'
}
var obj2 = {
  a: 'obj2 的 a'
}

var firstBind = f.bind(obj1)
console.log(firstBind)
// 'obj1 的 a'
// 创建了 firstBind 函数，和 f 具有相同函数体和作用域

var secondBind = firstBind.bind(obj2)
console.log(secondBind)
// 新函数中, this 被永久绑定到 bind 的第一个参数了
```

### 原生 js 实现 bind

### 在箭头函数中

在箭头函数中，`this` 与封闭词法上下文的 `this` 保持一致。
1. 箭头函数在全局代码中，`this` 将被设置为全局对象

```
var a = 'global'
var foo = (() => this.a)
console.log(foo())
// global
```

**注意** 将this传递给call、bind、或者apply，它将被忽略

```
var a = 'global a'
var foo = (() => this.a)
var obj = {
  a: 'obj a',
  f: foo
}
console.log('obj.f(): ', obj.f())
console.log('foo.call(obj): ', foo.call(obj))
console.log('foo.apply(obj): ', foo.apply(obj))
// 都为 'global a'
```

2. 对象里的 箭头函数 this 将始终指向对象，
但是若不执行情况下赋值给另一个函数， `this` 将指向另一个函数的执行环境

```
var a = 'global a'
var obj = {
  a: 'obj a',
  f: function() {
    var x = (() => this.a)
    return x
  }
}

var fn1 = obj.f()
console.log('fn1: ', fn1())
// 'obj a'

var fn2 = obj.f
console.log('fn2: ', fn2()())
// 'global a'
```

### 原型链中的 this

类似于在 原型链 中定义方法一样，`this` 指向调用该方法的对象

```
var obj = {
  a: 1,
  b: 2,
  f: function() {
    return this.a + this.b
  }
}

var objChild = Object.create(obj)
objChild.a = 1
objChild.b = 4

console.log(obj.f())
// 3
console.log(objChild.f())
// 5
// objChild 中没有 `f` 属性，于是在原型链中查找，在 `obj` 中找到 `f`，
// 但是
// 最先查找是以 `objChild.f` 开始查找，所以 `this` 指向 `objChild`
```

### DOM 中的 this

当函数被用作事件处理函数时，它的 `this` 指向触发事件的元素

```
function bluify(e) {
  // console.log(this === e.currentTarget)
  // true

  if (this.style.backgroundColor == 'blue') {
    this.style.backgroundColor = 'red'
  } else {
    this.style.backgroundColor = 'blue'
  }
}

// 获取所有 li 元素
var elements = document.getElementsByTagName('li')

// 当被点击时，元素变蓝色
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false)
}
```
