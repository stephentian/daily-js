/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-12
 **/

// Higher-order Function
// 高阶函数
// JavaScript 的函数其实都指向某个变量。既然变量可以指向函数，函数的参数就能接收变量
// 一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数

function add(x, y, f) {
  return f(x) + f(y)
}

add(-5, 6, Math.abs)
