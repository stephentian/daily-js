# JavaScript General Knowledge

> JS 常识

- [JavaScript General Knowledge](#javascript-general-knowledge)
  - [1. 真值与虚值](#1-真值与虚值)
    - [真值](#真值)
    - [虚值](#虚值)
  - [2. Chrome 上返回的 undefined](#2-chrome-上返回的-undefined)
  - [3. ~ 和 ~~](#3--和-)
  - [this 和 var 定义的变量](#this-和-var-定义的变量)
    - [在函数中](#在函数中)
    - [在{}对象中](#在对象中)

## 1. 真值与虚值

### 真值

### 虚值

## 2. Chrome 上返回的 undefined

函数没有返回值的情况下默认返回 undefined

## 3. ~ 和 ~~

~ 为 按位取反

## this 和 var 定义的变量

### 在函数中

```js
function Fool() {
    let name = "Jack"
    this.name = "Mick"
    funtion fn() {
        console.log("name:", name)
        console.log("this.name:", this.name)
    }
    fn()
}

Fool()
// Jack
// Mick
```

- 在函数中，var定义的是局部变量，而this定义的是属性。
- 这两者没有覆盖。
- 新创建的对象是无法获取到局部变量的。

### 在{}对象中

和 window 对象一样，{} 创建的对象不能用 new ，因为没有构造函数
