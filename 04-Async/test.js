/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019/3/2
**/

// MyPromise 测试用例

let MyPromise = require('./06-CreatPromise')
let p1 = new MyPromise(function (resolve, reject) {
  setTimeout(function () {
    let num = Math.random()
    if (num < .5) {
      resolve(num)
    } else {
      reject('失败, 小于0.5')
    }
  })
})
p1.then(function (data) {
  console.log(data)
}, function (err) {
  console.log(err)
})
