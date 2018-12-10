'use strict'

// console.log(window)

console.log(this === exports)
// true
console.log(this === module.exports)
// true

function f1() {
  return this
}

console.log(f1() === global)
// false

// 严格模式下
console.log(f1() === undefined)
// true