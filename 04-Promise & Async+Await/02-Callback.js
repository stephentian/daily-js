/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019/2/28
**/

// 回调函数

// 写一个异步读取 txt 文件的函数, 使用回调函数接收信息
// error first, 回调函数的第一个参数为错误对象

let fs = require('fs')

// fs.readFile('./a.txt', 'utf8', function (err, data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })
// 打印出 aaa

// 用一个函数把上面的封装起来
function read(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    // throw Error('报错了！')
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}
// read('./a.txt')


// 以前的 coder 发现有以下问题
// 1. 不能 return, 没有返回值
let returnData = read('./a.txt')
console.log('returnData: ', returnData) // undefined

// 2. 不能使用 try catch 捕获错误
try {
  let returnData = read('./a.txt')
} catch (e) {
  console.log('err:', e) // 当 read 函数 throw Error 时, catch 没捕获到错误
}

// 3. 回调地狱
// 比如你要读取多个文件，并且要把文件内容拼接起来
// 假设 3 个文件

fs.readFile('./a.txt', 'utf8', function (err, dataA) {
  if (err) {
    console.log(err)
  } else {
    fs.readFile('./b.txt', 'utf8', function (err, dataB) {
      if (err) {
        console.log(err)
      } else {
        fs.readFile('./c.txt', 'utf8', function (err, dataC) {
          if (err) {
            console.log(err)
          } else {
            console.log(dataA + dataB + dataC)
          }
        })
      }
    })
  }
})
