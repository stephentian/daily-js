// 箭头函数

// js
var arr = [1, 2, 3]
arr.map(function(item) {
    return item + 1
})

// es6
const arr1 = [1, 2, 3, 4]
arr1.map(item => item + 1)
arr1.map((item, index) => {
    console.log(index)
    return item + 1
})