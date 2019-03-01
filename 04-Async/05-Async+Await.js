/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-10-26
 **/

// 1. 与其他异步操作的对比

// 先定义一个 Fetch 方法
// var fetch = require('node-fetch')

// function fetchUser() {
//   return new Promise((resolve, reject) => {
//     fetch('https://api.github.com/users/stephentian')
//       .then((res) => {
//         resolve(res)
//       }, (error) => {
//         reject(error)
//       })
//   })
// }

// Promise 方式
// function getUserByPromise() {
//   fetchUser()
//     .then((data) => {
//       console.log(data)
//     }, (error) => {
//       console.log(error)
//     })
// }
// getUserByPromise()

// Promise 的方式虽然解决了 callback hell
// 但是这种方式充满了 Promise的 then() 方法，如果处理流程复杂的话，整段代码将充满 then

// Generator 方式
// function* fetchUserByGenerator() {
//   const user = yield fetchUser()
//   return user
// }
// const g = fetchUserByGenerator()
// const result = g.next().value
// result.then((v) => {
//   console.log(v)
// }, (error) => {
//   console.log(error)
// })

// Async 方式
// async function getUserBuAsync() {
//   let user = await fetchUser()
//   return user
// }
// getUserBuAsync()
//   .then(v => console.log(v))

// 2. async 返回一个 Promise 对象
async function f() {
  return "Hello World"
}
f().then(v => console.log(v))
// 如果 async 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 reject 状态
// 抛出的错误而会被 catch 方法回调函数接收到
async function e() {
  throw new Error('error!')
}
e().then(v => console.log(v))
  .catch(err => console.log(err))