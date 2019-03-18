/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-18
**/

// 变量的解构赋值

// js

// var obj = { a: 100, b: 200 }
// var a = obj.a
// var b = obj.b

// var arr = ['xx', 'xxx', 'x']
// var x = arr[0]

// es6

const obj = { a: 10, b: 20, c: 30 }
const { a, c } = obj
console.log(a)
console.log(c)

const arr = ['xx', 'xxx', 'x']
const [x, y, z] = arr
console.log(x)
console.log(y)
console.log(z)
