/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-5-21
**/


// ~ 和 ~~

// 1. 介绍

// ~ 通俗的讲, 就是 x 进行按位非操作, 结果为 -(x + 1)
// 对于浮点数的结果, 负的向上取整, 正的向下取整

// console.log(~2.5)
// -3

// console.log(~3.6)
// -4



// 同理, ~~ 就是对 x 取 -(-(x+1) + 1)

// console.log(~~2.5)
// 2


// 2. 延伸

// 利用两个按位取反的符号，进行类型的转换，转换成数字符号

// true
console.log(~~false === 0)
console.log(~~true === 1)
console.log(~~undefined === 0)
console.log(~~!undefined === 1)
console.log(~~null === 0)
console.log(~~!null === 1)
console.log(~~'' === 0)
// console.log(~~false === 0)



// ~ 用法

// 判断数值中是否有某元素时

// 原来： if(arr.indexOf(ele) > -1) { ... }
// 现在： if(~arr.indexof(ele)) { ... }


// ~~ 用法

// ~~value 可以代替 parseInt
// 原来： parseInt(-2.99) //-2
// 现在： ~~(2.99) // -2
