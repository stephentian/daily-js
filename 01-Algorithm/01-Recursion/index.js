/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-8-14
**/

// 递归

function factorail(n) {
  if (n === 0) return 1
  return n * factorial(n - 1)
}
