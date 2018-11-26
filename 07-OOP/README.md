# OOP 面向对象编程

## 目录

- **[1. 创建对象](#1-创建对象)**
- **[2. new 的作用](#2-new-的作用)**
- **[2. 继承]()**
- **[3. 构造函数里的 this 和 参数]()**
- **[4. instanceof 和 constructor]()**
- **[5. prototype、__proto__ 和 constructor]()**

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

// 在 Chrome 控制台打印出
// 展开数组发现， 数组里怎么还有个 __proto__：Array？(但其实 arr.__proto__ 不是 Array 对象)
// 展开 __proto__，可以发现一系列数组的方法, 原来操作 arr 的方法是从这来的
```


### 2. 使用构造函数创建对象
```
function Person(name, age) {
  this.name = name,
  this.age = age
}
```
<font size="2">[不懂 this，你可以先去看：this]()</font>

## 2. new 的作用

```
// 方法一：

function Animals(name) {
  this.name = name
}

var animal1 = new Animals('animal1')
console.log('animal1:', animal1)

// 方法二：
var animal2 = {}

animal2.__proto__ = Animals.prototype

Animals.call(animal2, 'animal2')
console.log('animal2:', animal2)
```

会发现，两次打印出的内容是一样的(除了 name )