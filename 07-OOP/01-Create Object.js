/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018/11/16
 **/

// 1. 创建对象
var arr = [1, 2, 3, 4, 5]

// 可以在 arr 里看到 __proto__
console.log(arr)

var str = 'StepenTian'

console.log(str.__proto__)
// 虽然在 str 看不到 __proto__，但它其实有这个隐式属性，指向 String.prototype