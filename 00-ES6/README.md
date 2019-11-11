# ES6 常见知识

## 目录

- let/const
  - 块级作用域(Block scope)
- 字符串扩展
  - 模板字符串(Template string)
- 解构赋值(Destructuring)
- 函数扩展(Funnction)
  - 函数默认参数
  - 箭头函数
- 箭头函数

### let/const

#### let

let 用来声明变量, 作用类似 var;
但是 let 声明的变量, 只在所写的代码块有效.

比如中函数体内使用 let 声明变量, 在函数外部使用会报错.

#### const

const 是用来声明一个不可变的常量

```js
const PI = 3.1415;
PI = 3.14; // TypeError: Assignment to constant variable
```

### template string

模板字符串顾名思义，就是在字符串的基础上，使用变量，甚至进行简单的计算。
使用方式：

```js
var n = "stephen";
console.log(`my name is ${n}`);
// 等价于
console.log("my name is" + n + "");
```

### spread operator in es5

ES5 实现扩展府。先了解扩展符的功能：

- 使用在函数参数, 相当于 apply
- 对数组进行操作, 相当于 concat
- 对对象进行浅拷贝, 相当于 Object.assign()
