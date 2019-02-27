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
// 写一个函数判断类型, 通过它批量生成函数
function isType(type) {
  return function (param) {
    return Object.prototype.toString.call(param) === `[object ${type}]`
  }
}

let isString1 = isType('String')
let isArray1 = isType('Array')
console.log(isString1('11'))
console.log(isArray1([1]))

// 类似函数工厂, 生产函数
// 这其实也是闭包的应用, 当函数执行时, 会产生私有作用域, 上下文执行环境, 可以一直引用里面的 type


// 三、
// lodash 中有个 after 方法
// 作用: 指定一个函数被调用多少次才会执行
function sleep() {
  console.log('睡着了')
}

// 函数 after
// 接受参数 times 和 fn(函数)
// 返回一个新的函数, 当新的函数执行 times 次后, 执行 fn
// function after(times, fn) {
//   ...
// }
// let newSleep = after(3, sleep)
// newSleep()
// newSleep()
// newSleep() // 执行 sleep

// 思考:  after 里的内容

function after(times, fn) {
  let count = 1
  return function () {
    if (count++ == times) {
      fn()
    }
  }
}
let newSleep = after(3, sleep)
newSleep()
newSleep()
newSleep()
