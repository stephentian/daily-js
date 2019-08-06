/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-8
**/

// apply

Function.prototype.myApply = function (context) {
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

// ES5
Function.prototype.myApply2 = function (obj, arr) {
  obj = obj || window
  let result
  let argsLength = arguments.length
  obj.fn = this
  if (!arr) {
    result = obj.fn()
  } else {
    let args = []
    for (let i = 0; i < argsLength; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('obj.fn(' + args + ')')
  }
  delete obj.fn
  return result
}
