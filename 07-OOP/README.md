# OOP 面向对象编程
> JavaScript在设计之初就是一种面向对象的语言，虽然我们在日常的开发中很少能体验到这一点。

## 目录

- **[1. 创建对象](#1-创建对象)**
- **[2. new 的作用](#2-new-的作用)**
- **[3. instanceof 和 constructor]()**
- **[4. prototype、__proto__ 和 constructor]()**
- **[5. 关于面向对象的一些方法]()**

## 前言

面向对象拥有三大特征:
1. 封装
2. 继承
3. 多态
 
JavaScript是一款基于 `原型`模式的面向对象语言。
我们可以把`原型(prototype)`理解为是一个使用说明书，每一个类型都会有一个对应的使用说明书，凡是使用说明上规定的成员，都是可以使用的。

比如电视器的说明书上规定了开机、关机、换台等行为，那么每一台电视机都会具备这些功能。

并且我们还可以通过 JavaScript 代码为指定的类型的使用说明添加新的参数和功能。


## 1. 创建对象

### 1. 创建简单对象

可以创建一个 Object 对象
```
var obj = {
  name: 'StepenTian',
  age: 18,
  getSex: function() {
    return 'male'
  }
}
console.log(obj.getSex())

// 返回 male
```

或者创建一个 Array

```
var arr = [1, 2, 3, 4, 5]
console.log(arr)
```

在 Chrome 控制台打印出
展开数组发现， 数组里怎么还有个 `__proto__：Array` ？(但其实 `arr.__proto__` 不是 Array 对象)
展开 `__proto__`, 可以发现一系列数组(`pop, push, shift, unshift`)的方法, 原来操作 `arr` 的方法是从这来的


### 2. 使用构造函数创建对象
```
function Person(name, age) {
  this.name = name,
  this.age = age
}
```
<font size="2">[不懂 this，你可以先去看：this]()</font>


## 2. new 的作用
1. 定义一个函数 Animal

```
function Animals(name) {
  this.name = name
}
```

2. 仔细看, 发现其实就是个首字母大写的普通函数; 可以使用 `new` 让它变成构造函数

```
var animal1 = new Animals('animal1')
console.log('animal1:', animal1)
```

3. 打印出 `animal1`, 发现 `name` 变为了 `animal1`

4. 让我们换一种方式实现, 先定义一个 `animal2` 空对象, 它是由 Animals 构造的， 所以 `__proto__` 应该为构造函数的原型

```
var animal2 = {}
animal2.__proto__ = Animals.prototype
Animals.call(animal2, 'animal2')

console.log('animal2:', animal2)
```

会发现，两次打印出的内容是一样的(除了 name 属性)

## 3. instanceof 和 constructor

### instanceof 验证对象的构造函数

使用 构造函数 创建一个 新的对象, 该对象被认为是构造函数的一个 实例(即 `instance`), `instanceof`就是来判断 该对象 是否由 某个构造函数 创建


## 4. prototype、__proto__ 和 constructor


## 5. 关于面向对象的一些方法
### 1. instanceof

### 2. constructor

### 3. isPrototypeOf

### 4. hasOwnProperty