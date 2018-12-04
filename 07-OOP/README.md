# OOP 面向对象编程
> JavaScript在设计之初就是一种面向对象的语言，虽然我们在日常的开发中很少能体验到这一点。

## 目录

**[1. 创建对象](#1-创建对象)**
  * [原始对象](#原始对象)
  * [初级封装](#初级封装)
  * [构造函数](#构造函数)
  * [原型 prototype](#原型-prototype)
  * [new 的作用](#new-的作用)

**[2. 一些概念](#2-一些概念)**
  * [instanceof](#instanceof)
  * [constructor](#constructor)
  * [instanceof 和 constructor](#instanceof-和-constructor)
  * [isPrototypeOf](#isprototypeof)
  * [hasOwnProperty](#hasownproperty)
  * [prototype、\__proto__ 和 constructor](#prototype-__proto__-和-constructor)

**[3. 封装]()**

**[4. 继承]()**

**[5. 多态]()**

## 前言
 
JavaScript是一款基于 `原型`模式的面向对象语言。

我们可以把`原型(prototype)`理解为是一个**使用说明书**，每一个类型都会有一个对应的使用说明书，凡是使用说明上规定的成员(参数方法)，都是可以使用的。(记住这个概念，后面必考)

比如电脑的说明书上规定了开机、关机等行为，配备了GTX1060显卡、I9处理器等参数，那么带有这个说明书的每一台电视机都会具备这些功能及配置。

记住面向对象拥有三大特征:
1. 封装
2. 继承
3. 多态

后面我们会讲。


## 1. 创建对象

### 原始对象

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

我们可以为该实例手动添加任何成员，可以是字符、数字、布尔甚至于一个方法。
定义的方式，即可以用`实例名.成员名 = 内容`，也可以使用`实例名["成员名"] = 内容`。

```
var str = "phone"
obj[str] = 15900000000

console.log(obj['phone'])
console.log(obj['name'])
```

创建一个 Array

```
var arr = [1, 2, 3, 4, 5]
console.log(arr)
```

在 Chrome 控制台打印出
展开数组发现， 数组里怎么还有个 `__proto__：Array` ？(但其实 `arr.__proto__` 不是 Array 对象)
展开 `__proto__`, 可以发现一系列数组(`pop, push, shift, unshift`)的方法, 原来操作 `arr` 的方法是从这来的


### 封装

为了能够得到更好的封装效果， 我们通过一个 function 来统一地构建一个对象的实例

```
function Person(name, age) {
  return {
    name: name,
    age: age,
    getSex: function() {
      return 'male'
    }
  }
}

```

### 构造函数

上面的 Person 并不是真正的构造函数，JavaScript中提供了真正的构造函数，它的语法和定义一个 function 其实是一样的：

```
function Person(name, age) {
  this.name = name,
  this.age = age,
  this.sayName = function() {
    return this.name
  }
}
```
<font size="2">[不懂 this，你可以先去看：this]()</font>

Person 内部通过 this 关键字给实例增加了新的属性和方法。使用 new 来创造 Person 实例

可以想象成，我们就是造物主，在创造一个一个人，这些人有名字，有年龄，会说话
我们可以创造两个例子 亚当和夏娃

```
var adam = new Person('adam', 22) // 设定一个法定结婚年龄好
var eva = new Person('eva', 20)
console.log(adam.sayName == eva.sayName)
// false
```
我们还可以发现 adam 和 eva 的 sayName 并不指向不一个内存，
也就意味着，当我们有很多实例的时候，内存开销会非常大。

造两个人好累啊，要教他们各种技能，生火，做饭，缝衣服......
生小孩这种技能不好教，得想个办法，所以
为什么不给他们发个说明书呢？(还记得说明书的概念吗？)

### 原型 prototype

任何类型都会有属于自己的原型，并且原型上定义的成员，可以在每个实例中引用，并且是共用的。

可以理解为，每个人都有一本属于自己的使用手册，在人类这本使用手册上说明的属性和技能，每个人都可以有。

所以我们在 prototype 上定义方法时，发现不同实例运用的方法是相同的

```
function Person(name, age) {
  this.name = name,
  this.age = age
}

Person.prototype.sayName = function() {
  return this.name
}

var adam = new Person('adam', 22)
var eva = new Person('eva', 20)
console.log(adam.sayName == eva.sayName)
// true
```

由此在设计JavaScript面向对象类型的时候，我们一般遵循以下规则:

1. 因为实例不同而不同的内容，用this关键字声明
2. 无论实例怎样内容完全相同的成员，定义在prototype上


### new 的作用

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


## 2. 一些概念

### instanceof

使用 构造函数 创建一个 新的对象, 该对象被认为是构造函数的一个 实例(即 `instance`), 
`instanceof`就是来判断 该对象 是否由 某个构造函数 创建

### constructor

### instanceof 和 constructor

### isPrototypeOf

### hasOwnProperty

### prototype、\__proto__ 和 constructor
