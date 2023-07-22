# daily-js

> JavaScript Book

## 目录

**[前言](#前言)**

0. **[ES6](https://github.com/stephentian/daily-js/tree/master/00-ES6)**
1. **[算法 Algorithm](https://github.com/stephentian/daily-js/tree/master/01-Algorithm)**
2. **[高阶函数 Higher-order Function](https://github.com/stephentian/daily-js/tree/master/02-Higher-order%20Function)**
3. **[JS 常识 General Knowledge](https://github.com/stephentian/daily-js/tree/master/03-General%20Knowledge)**
4. **[异步 Async](https://github.com/stephentian/daily-js/tree/master/04-Async)**
5. **[正则表达式 Regexp](https://github.com/stephentian/daily-js/tree/master/05-Regexp)**
6. **[Date](https://github.com/stephentian/daily-js/tree/master/06-Date)**
7. **[面向对象编程 OOP](https://github.com/stephentian/daily-js/tree/master/07-OOP)**
8. **[this](https://github.com/stephentian/daily-js/tree/master/08-This)**
9. **[Skills 一些技巧](https://github.com/stephentian/daily-js/tree/master/09-Skills)**
10. **[设计模式 Design patterns](https://github.com/stephentian/daily-js/tree/master/10-Design-patterns)**
11. **[事件循环 Event Loop](https://github.com/stephentian/daily-js/tree/master/11-Event%20Loop)**
12. **[MVVM](https://github.com/stephentian/daily-js/tree/master/12-MVVM)**
13. **[原型 Prototype](https://github.com/stephentian/daily-js/tree/master/13-Prototype)**
14. **[数据结构](https://github.com/stephentian/daily-js/tree/master/14-DataStructure)**
15. **[TypeScript](https://github.com/stephentian/daily-js/tree/master/15-TypeScript)**
16. **[Source Code](https://github.com/stephentian/daily-js/tree/master/16-Source%20Code)**

## 前言

### 简介

JavaScript 和 C++、Java、C# 等语言一样，是一种语言。他和其它所有语言一样，拥有基本类型（字符，数字，布尔）与三大语句（顺序、条件、循环），基于JavaScript我们可以做很多事情，最重要的是 JavaScript 不仅仅运行于浏览器，还可以直接运行于操作系统（有兴趣的同学可以查看有关“windows脚本宿主”的信息）

我们平时所使用到的修改DOM的功能，仅仅是浏览器开发商提供给开发者所使用的. 那么只要浏览器开发商乐意，他们还可以提供更多的功能给我们使用。我们也可以理解为，我们写的JavaScript脚本是在浏览器厂商允许的范围内，对浏览器进行二次开发

若浏览器允许，JavaScript 还可以调用运行机器上的 ActiveX 组件（比如使用 Scripting.FileSystemObject 对客户端电脑上的文件进行各种操作）. 遗憾的是，由于加载 ActiveX 组件可以变向的调用控件台等存在风险的行为，因此大部分浏览器已经禁止了这项操作

### 解释型语言和编译型语言

JavaScript是一种解释型语言，解释型语言不需要编译也能立刻执行代码，非常适合用于变动性大的场景，比如浏览器，我们可以在任意一个时间将head中添加一个新的js引用，由于是解释型语言，浏览器能够立刻解释这段脚本并执行

**解释型语言：**
程序不需要编译，程序在运行时才翻译成机器语言，每执 行一次都要翻译一次。因此效率比较低。比如 Basic 语言，专门有一个解释器能够直接执行 Basic 程序，每个语句都是执行的时候才翻译

解释型语言有 Python/JavaScript / Perl /Shell 等

**编译型语言：**
程序在执行之前需要一个专门的编译过程，把程序编译成 为机器语言的文件，运行时不需要重新翻译，直接使用编译的结果就行了。程序执行效率高，依赖编译器，跨平台性差些。

编译型语言有 C、C++、Delphi 等

**区别：**

解释型语言，执行速度慢、效率低；依靠解释器、跨平台性好
编译型语言，执行速度快、效率高；依靠编译器、跨平台性差些

### 兼容性问题

JavaScript 语言就好比是我们说的“四川话”、“北京话”、“湖南话”等语言中的语法。只要按照这个语法的规则来，就是正确的语言，也就是说是正确的代码

电脑其实是一个笨家伙，他虽然看的懂语法，但他看不懂名词。如果规定电脑是 computer，那么他只知道 compouter 是电脑，PC 就不认识了。这就是兼容性

随着技术的发展，大家也正在不停地出台各种规范，希望能有一天所有浏览器都能识别完全一样的JavaScript代码

**浏览器厂商比较常见的差异有：**

1. 创建XmlHttpRequest的方式不同
2. 创建Xml解析器的方式不同
3. innerText和innerHtml可能存在的差异
4. 是否提供Json序列化功能等
