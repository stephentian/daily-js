/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019/2/26
**/

// 一、
// 写一些判断参数类型的函数
// 1. 判断一个参数是否是字符串
function isString(param) {
  return Object.prototype.toString.call(param) === '[object String]'
}
// 2. 判断一个参数是否为数组
function isArray(param) {
  return Object.prototype.toString.call(param) === '[object Array]'
}
// 3. isNumber ...
console.log(isString({}))
console.log(isArray([]))
// 如果要判断其他类型的话，js 中类型很多，就要写很多函数

// 思考：能不能写一个方法直接批量返回这些函数呢？

// 二、
function isType(type) {
  return function (param) {
    return Object.prototype.toString.call(param) === `[object ${type}]`
  }
}

let isString1 = isType('String')
let isArray1 = isType('Array')
console.log(isString1('11'))
console.log(isArray1([1]))
