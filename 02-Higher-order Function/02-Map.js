/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-12
 **/

// the function will runs on each element of the array

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function pow(x) {
  return x * x
}

var results = arr.map(pow)
console.log(results)