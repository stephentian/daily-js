/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018/8/28
 **/

// while
// 阶乘

function factorialWhile(num) {
  let result = 1
  while (num) {
    result *= num
    num--
  }
  return result
}
console.log('factorialWhile(3): ', factorialWhile(3))


// for
function factorialFor(num) {
  let result = 1
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result
}
console.log('factorial(4): ', factorialFor(4))


// recursion 递归
function factorialRec(num) {
  if (num <= 0) {
    return 1
  } else {
    return num * arguments.callee(num - 1)
  }
}
console.log('factorialRec(5): ', factorialRec(5))


// tail recursion 尾递归
function factorialTail(num) {
  let total = 1
  if (num === 0) return total
  return (num * factorialTail(num - 1))
}
console.log('factorialTail(6): ', factorialTail(6))

// in "use strict"
// recursion 严格模式下的递归
var factorialStrict = (function fun(num) {
  if (num <= 1) return 1
  return num * fun(num - 1)
})
console.log('Recursion in use strict:', factorialStrict(5))
