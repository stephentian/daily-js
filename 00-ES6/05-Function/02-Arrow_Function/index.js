// 箭头函数

// js
var arr = [1, 2, 3]
arr.map(function (item) {
  return item + 1
})

// es6
const arr1 = [1, 2, 3, 4]
arr1.map(item => item + 1)
arr1.map((item, index) => {
  console.log(index)
  return item + 1
})

// js

function fn() {
  console.log('real', this)
  var arr2 = [1, 2, 3]
  // js
  arr2.map(function (item) {
    console.log('js', this)
    return item + 1
  })

  // 箭头函数
  arr2.map(item => {
    console.log('es6', this)
    return item + 1
  })
}
fn.call({ a: 100 })
