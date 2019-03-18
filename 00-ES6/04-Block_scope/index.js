// 块级作用域

// js

var obj = { a: 100, b: 200 }
for (var i in obj) {
    console.log(i)
}
console.log(i) // b

// es6

const obj1 = { a: 10, b: 20 }
for (let n in obj1) {
    console.log(n)
}
console.log(n) // undefined