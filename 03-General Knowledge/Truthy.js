/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-17
 **/

// A truthy value is a value that is considered 'true' when evaluated in a Boolean context
// Truthy(真值)指的是在Boolean上下文中转换后的值为真的值

// true
// {}
// []
// numbers !== 0 (e.g. 1, 2, ...)
// String (e.g. 'string')
// new Date()
// -42
// 3.14
// -3.14
// Infinity
// -Infinity

console.log('true: ', Boolean(true))
console.log('{}: ', Boolean({}))
console.log('[]: ', Boolean([]))
console.log('1: ', Boolean(1))
console.log('0: ', Boolean(0))
console.log('-1: ', Boolean(-1))
console.log('string: ', Boolean('string'))
console.log('new Date(): ', Boolean(new Date()))
console.log('-42: ', Boolean(-42))
console.log('-41: ', Boolean(-41))
console.log('3.14: ', Boolean(3.14))
console.log('-3.14: ', Boolean(-3.14))
console.log('-3.1: ', Boolean(-3.1))
console.log('Infinity: ', Boolean(Infinity))
console.log('-Infinity: ', Boolean(-Infinity))
console.log('PI: ', Boolean(Math.PI))
// console.log(Boolean())