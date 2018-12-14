# This

## 目录
- [What is this ?](#what-is-this-)
- [全局环境](#全局环境)
- [函数内部](#函数内部)
  * [非严格模式](#非严格模式)
  * [严格模式](#严格模式)
- [call 和 apply](#call-和-apply)
- [原生 js 实现 call 和 apply](#原生-js-实现-call-和-apply)
  * [Call](#call)
  * [Apply](#apply)
- [bind](#bind)
- [原生 js 实现 bind](#原生-js-实现-bind)
- [箭头函数中的 this](#箭头函数中的-this)
- [原型链中的 this](#原型链中的-this)
- [DOM 中的 this](#dom-中的-this)



## What is this ?

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

---

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

---

## call 和 apply

某个函数通过使用继承自 `Function.prototype` 的 `call` 或 `apply` 方法，
指定一个特定的的 `this` 和传入若干参数，然后调用

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

---

## 原生 js 实现 call 和 apply

由上节内容可知 `call` 和 `apply` 的作用：
- 改变 `this` 指向
- 传入参数(可不传)
- 执行函数

#### Call

1.想看一般怎么改变 `this` 指向：

```
var a = 'global a'
var obj1 = {
  a: 'obj1 a'
}
var obj2 = {
  a: 'obj2 a'
}

function f () {
  console.log(this.a)
}

// 直接运行, 打印 'global a'
f()
```

2.如果 `obj1` 和 `obj2` 里有 `f` 就好了, 就可以直接调用, 就可以打印里面的 `a` 了.
   可惜没有，我们自己造一个吧：

```
obj1.f = f
obj1.f()
// 'obj1 a'
```

3.成功！但是有个缺点，obj1 里多了个 `f` 函数，改变了对象，所以我们要把它删除

```
obj1.f = f
obj1.f()
delete obj1.f
```

4.第一步成功，我们可以实现一个 1.0 版本的 `call`, 并且用 `this` 来指代调用的函数

```
Function.prototype.myCall = function(obj) {
  obj.f = this
  obj.f()
  delete obj.f
}
```

5.传入参数, 第一个为传入对象, 我们要让 `ob.f` 执行 `obj.f(argument[1], arguments[2], ...)`

```
// 新定义一个可接受参数的函数
function fn(b, c) {
  console.log('参数1: ', b)
  console.log('参数2：', c)
  console.log('this.a: ', this.a)
}

Function.prototype.myCall = function(obj) {
  obj.f = this
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  console.log(args)
  // [arguments[1], arguments[2]]

  obj.f(args)
  // '参数1： ["arguments[1]", "arguments[2]"]'
  // '参数2： undefined'
  // 失败！

  obj.f(args.toString())
  // 打印出 '参数1: arguments[1],arguments[2]'
  // '参数2： undefined'
  // 失败！

  obj.f(arg[0], args[1])
  // 参数1:  arguments[1]
  // 参数2： arguments[2]
  // 失败！

  obj.f(arguments[1], arguments[2])
  // 参数1:  1
  // 参数2： abc
  // 成功！

  obj.f(eval(args[0]), eval(args[1]))
  // 参数1:  1
  // 参数2： abc
  // 成功！

  delete obj.f
}

fn.myCall(obj, 1, 'abc')
```
情形一：直接传入是数组；
情形二：传入字符串；
情形三：传入参数两个，但是都是字符串
情形四：传参成功，但是参数不确定的话，这种方式就不能用
情形五：改进 '情形三'，使用 `eval` 函数，传参成功，但是参数不确定的话，这种方式也不能用


6.由上面 **情形三** 可以知道， 我们已经把 传入的参数 传递给函数了，但是传递的是字符串；
我们可以结合 **情形五** 来改进

- 使用 `eval`

```
Function.prototype.myCall = function(obj) {
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  obj.f = this
  eval('obj.f(' + args + ')')
  delete obj.f
}

```

- 使用 ES6 中的解构语法

```
Function.prototype.myCall = function (obj, ...args) {
  obj.f = this
  obj.f(...args)
  delete obj.f
}

fn.myCall(obj, 1, 'abc')
// 参数1:  1
// 参数2： abc
// 成功！
```

7.根据上面的版本进行优化
(1) 如果第一个参数为null(没有传参)，this指向window
(2) 函数调用要有返回值
最终版本:

```
Function.prototype.myCall = function(obj) {
  var args = [],
      argsLength = arguments.length,
      obj = obj || window,
      result;

  for (var i = 1; i < argsLength; i++) {
    args.push('arguments[' + i + ']')
  }

  obj.f = this
  result = eval('obj.f(' + args + ')')
  delete obj.f
  return result
}

function fn(b, c) {
  return this.a + ',' + b + ',' + c
}

console.log(fn.myCall2(obj, 2, 'EFG'))
// 'obj a,2,EFG'
// 成功！
```

#### Apply
`apply` 的实现方式和 `call` 类似，可以先思考下 `apply` 和 `call` 的区别：
`call` 方法接受的是若干个参数的列表，而 `apply` 方法接受的是一个包含多个参数的数组。
所以要判断接收的参数是否为数组，还有循环数组要从 `0` 开始

```
Function.prototype.myApply = function (obj, arr) {
  var obj = obj || window,
      result,
      argsLength = arguments.length;
  obj.f = this
  if (!arr) {
    result = obj.f()
  } else {
    var args = []
    for (var i = 1; i < argsLength; i++) {
      args.push('arguments[' + i + ']')
    }
    result = eval('obj.f(' + args + ')')
  }
  delete obj.f
  return result
}
```

---

## bind

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

---

## 原生 js 实现 bind

---

## 箭头函数中的 this

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

---

## 原型链中的 this

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

---

## DOM 中的 this

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

---
