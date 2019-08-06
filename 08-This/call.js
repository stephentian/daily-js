/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-7
**/

// call

// ES6

Function.prototype.myCall = function (context) {
  constext = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myCall2 = function (obj, ...args) {
  obj.fn = this
  const result = obj.fn(...args)
  delete obj.fn
  return result
}

// ES5


function myCall(context) {
  let context = context || window
  context.fn = this
  let args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  let result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
