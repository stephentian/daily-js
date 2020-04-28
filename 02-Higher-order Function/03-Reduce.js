/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-12
 **/

// The reduce() method executes a reducer function (that you provide) on each member of the array resulting in a single output value
// reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值

var arr = [1, 2, 3, 4, 5]
var results = arr.reduce((x, y) => x + y)
console.log(results)

// Transform [1, 2, 3, 4, 5] into 12345
var results1 = arr.reduce((x, y) => x * 10 + y)
console.log(results1)
