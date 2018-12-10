# This

## 目录
- [简介](#简介)
- [全局环境](#全局环境)
- [函数内部](#函数内部)
 * [非严格模式下](#非严格模式下)
 * []()



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
console.log(f1() === global)
```

### 严格模式

this 默认为 `undefined`

### call 和 apply
