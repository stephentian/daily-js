/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-11
 **/

// Find the longest word in a string


// for loop

function findLongestWord1(str) {
  let arr = str.split(" ")
  let long = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i], length > long) {
      long = arr[i].length
    }
  }
  return long
}


// map() sort()
// map 匹配数组中各个字符串的长度， 返回字符串长度
// sort 由大到小排序

function findLongestWord2(str) {
  let arr = str.split(" ")
  arr = arr.map(function (item) {
    return item.length
  }).sort(function (a, b) {
    return b - a
  })
  return arr[0]
}


// map() reduce()

function findLongestWord3(str) {
  let arr = str.split(" ")
  return arr.map(function (val) {
    return val.length
  }).reduce(function (p, c) {
    return Math.max(p, c)
  })
  // ES6
  // return arr.map(val => val.length).reduce((a, b) => Math.max(a, b))
}

findLongestWord3('Find the longest word in a string')