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
// function read(path) {
//   fs.readFile(path, 'utf8', function (err, data) {
//     // throw Error('报错了！')
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data)
//     }
//   })
// }
// read('./a.txt')



// 回调函数有以下问题
// 1. 不能 return, 无法正确获取返回值
// let returnData = read('./a.txt')
// console.log('returnData: ', returnData) // undefined

// 2. 不能使用 try catch 捕获错误
// try {
//   let returnData = read('./a.txt')
// } catch (e) {
//   console.log('err:', e) // 当 read 函数 throw Error 时, catch 没捕获到错误
// }

// 3. 回调地狱
// 比如你要读取多个文件，并且要把文件内容拼接起来
// 假设 3 个文件

// fs.readFile('./a.txt', 'utf8', function (err, dataA) {
//   if (err) {
//     console.log(err)
//   } else {
//     fs.readFile('./b.txt', 'utf8', function (err, dataB) {
//       if (err) {
//         console.log(err)
//       } else {
//         fs.readFile('./c.txt', 'utf8', function (err, dataC) {
//           if (err) {
//             console.log(err)
//           } else {
//             console.log(dataA + dataB + dataC)
//           }
//         })
//       }
//     })
//   }
// })
/**
* 这种回调金字塔有以下问题
* 1. 非常难看
* 2. 难以维护
* 3. 效率低, 需要一步一步等待结果
**/



// 如何解决回调函数嵌套问题?

// 1. 事件发布订阅
// EventEmitter 是 node.js  核心模块 event 的一个类
// 通过它可以创建事件发射器的实例, 实例有两个主要方法: 1. on(注册监听), 2. emit(发射事件)
// let EventEmitter = require('events')
// let task = new EventEmitter()
// let html = {}
// html 来存放最终拼接数据

// task.on('ready', function (key, value) {
//   html[key] = value;
//   if (Object.keys(html).length == 2) {
//     console.log('html:', html)
//   }
// })

// 将读取文件函数分开写, 无需等待读取完第一个文件再读取第二个, 两个读取文件函数同步执行
// fs.readFile('./a.txt', 'utf8', function (err, dataA) {
//   task.emit('ready', 'dataA', dataA)
// })
// fs.readFile('./b.txt', 'utf8', function (err, dataB) {
//   task.emit('ready', 'dataB', dataB)
// })

// 2. 通过哨兵函数来处理
// let html1 = {}
// function done(key, value) {
//   html1[key] = value;
//   if (Object.keys(html1).length == 2) {
//     console.log(html1)
//   }
// }
// fs.readFile('./d.txt', 'utf8', function (err, dataC) {
//   done('dataC', dataC)
// })
// fs.readFile('./b.txt', 'utf8', function (err, dataB) {
//   done('dataB', dataB)
// })

// 但是上面的写法不通用
// 我们可以将函数内的数据抽象化, 
// 比如 done 里面的 2, 可能我们要读取 3 个文件, ... n 个文件, 故不能写死
// 可以写个工厂函数

function render(length, cb) {
  let html2 = {};
  return function (key, value) {
    html2[key] = value;
    if (Object.keys(html2).length == length) {
      cb(html2)
    }
  }
}
let done = render(2, function (html) {
  console.log(html)
})
fs.readFile('./c.txt', 'utf8', function (err, dataC) {
  done('dataC', dataC)
})
fs.readFile('./b.txt', 'utf8', function (err, dataB) {
  done('dataB', dataB)
})
