/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-6
**/

// function foo() {
//   console.log('1')
// }
// function bar() {
//   console.log('2');
//   foo()
// }
// bar()


// setImmediate(() => {
//   console.log('1')
// })

// process.nextTick(() => {
//   console.log('2')
// })

// setImmediate(() => {
//   console.log('3')
// })

// new Promise((resolve, reject) => {
//   resolve(true)
// }).then(() => {
//   console.log('4')
// })

// setTimeout(() => {
//   console.log('5')
// }, 0)

// setTimeout(() => {
//   console.log('6')
// }, 0)

// process.nextTick(() => {
//   console.log('7')
// })



console.log('1');

setTimeout(function () {
  console.log('2');
  // process.nextTick(function () {
  //   console.log('3');
  // })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5')
  })
})

new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8')
})

process.nextTick(function () {
  console.log('6');
})


setTimeout(function () {
  console.log('9');
  // process.nextTick(function () {
  //   console.log('10');
  // })
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })
})

// 1, 7, 6, 8
// 2, 4, 9, 11, 3, 10, 5, 12
