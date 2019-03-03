import { type } from "os";

/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019/3/1
**/

// 手写一个 Promise
// 首先分析 Promise 内部结构


// 1. 标准 Promise

// 1.1 promise 主体函数

// 1.1.1 定义状态
// 等待
// 成功
// 失败

// const PENDING = 'pending'
// const FULFILLED = 'fulfilled'
// const REJECTED = 'rejected'

// function MyPromise(executor) {
//   let self = this // 先缓存当前 promise 实例, 避免异步执行时, this 获取不对
//   self.value = null // promise 的值
//   self.status = PENDING // 设置初始状态
//   self.onResolvedCallbacks = [] // 存放成功的回调函数数组
//   self.onRejectedCallbacks = [] // 存放失败的回调函数数组

//   // 1.1.2 resolve 方法
//   // 只有 promise 状态为 pending, 可以转成成功状态
//   // 并将成功的返回值赋值给 value
//   // 如果已经是成功状态, 则什么都不做
//   function resolve(value) {
//     if (value != null && value.then && typeof value.then == 'function') {
//       return value.then(resolve, reject)
//     }

//     // 思考: 为什么要用 setTimeout 包起来?
//     setTimeout(function () {
//       if (self.status == PENDING) {
//         self.status = FULFILLED
//         self.value = value
//         // 调用所有成功回调函数
//         self.onResolvedCallbacks.forEach(cb => cb(self.value))
//       }
//     })
//   }

//   // 1.1.3 reject 方法
//   // 如果是 pending, 转成失败状态
//   // 并将失败原因赋值给 value
//   function reject(reason) {
//     setTimeout(function () {
//       if (self.status == PENDING) {
//         self.status = REJECTED
//         self.value = reason
//         self.onRejectedCallbacks.forEach(cb => cb(self.value))
//       }
//     })
//   }

//   // 1.1.4 函数可能出现异常
//   // 需要捕获,  如果出错了需要使用 reject
//   try {
//     executor(resolve, reject)
//   } catch (e) {
//     reject(e)
//   }
// }


// 1.2 resolvePromise 函数

// resolvePromise 针对 resolve 不同值的情况进行处理

// 1.2.1 函数包含参数
// promise2: promise1.then 返回的新的 promise 对象
// x: promise1 中 onFulfilled 的返回值
// resolve: promise2 的 resolve 方法
// reject: promise2 的 reject 方法

function resolvePromise(promise2, x, resolve, reject) {
  // 如果 onFulfilled 返回的的 x 就是 promise2, 就导致循环引用出错
  if (promise2 === x) {
    return reject(new TypeError('循环使用'))
  }

  // 避免多次调用
  let called = false
  // 如果 x 是一个 promise 对象
  if (x instanceof MyPromise) {
    // 如果为等待状态需等待直至 x 被执行或拒绝, 并解析 y 值
    if (x.status == PENDING) {
      x.then(function (y) {
        resolvePromise(promise2, y, resolve, reject)
      }, reason => {
        reject(reason)
      })
    } else {
      // 如果 x 处于 执行状态/拒绝状态(值已经被解析为普通值), 用相同的值执行传递下去
      x.then(resolve, reject)
    }
    // 如果 x 为对象 或者 函数
  } else if (x != null && ((typeof x == 'objec') || (typeof x == 'function'))) {
    // 是否为 theneable 对象(具有 then 方法的对象/函数)
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call((x, y) => {
          if (called) return
          called = true
          resolvePromise(newPromise, y, resolve, reject)
        }, reason => {
          if (called) return
          called = true
          reject(reason)
        })
      } else {
        // 否说明为普通对象/函数, 直接 resolve
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // 如果 x 是一个普通的值, 则用 x 的值去 resolve promise2
    resolve(x)
  }
}

// 1.3 then 方法

// onFulfilled 用来接收 promise 成功或者失败的返回值
// 如果成功和失败的回调没有传, 则表示 then 没有逻辑, 会把值往后抛

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 判断 then 接收的参数是否为 function, 是则忽略
  onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function (value) { return value }
  onRejected = typeof onRejected == 'function' ? onRejected : function (reason) { throw reason }


  let self = this
  let promise2

  // 根据三种情况处理
  // if (self.status == PENDING) {
  //   self.onResolvedCallbacks.push(onFulfilled)
  // }
  // if (self.status === FULFILLED) {
  //   onFulfilled(self.value)
  // }
  // if (self.status === REJECTED) {
  //   onRejected(self.value)
  // }

  // 如果当前 promise 已经是成功状态, 直接将值 传递给 onFulfilled
  // 因为 then 有链式调用, 所以返回一个新的 promise 对象
  // 状态为 FULFILLED, 即为成功状态时, 直接调用 onFulfilled
  // 考虑到有可能 throw, 将代码包在 try catch 里
  if (self.status == FULFILLED) {
    return promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onFulfilled(self.value)
          // 如果获取了返回值 x, 则走解析 promise 的过程
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          // 如果执行成功的回调过程中出错了, 用错误原因把 promise2 rejecte
          reject(e)
        }
      })
    })
  }

  if (self.status == REJECTED) {
    return promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  if (self.status == PENDING) {
    return promise2 = new MyPromise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallbacks.push(function () {
        try {
          let x = onRejected(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}


// 1.4 catch
// catch 的原理就是只传失败的回调
MyPromise.prototype.catch = function (onRejected) {
  this.then(null, onRejected)
}

MyPromise.deferred = MyPromise.defer = function () {
  let defer = []
  defer.promise = new MyPromise(function (resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}






// 2. 实现一个同步的 Promise

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function SyncPromise(executor) {
  let self = this
  self.status = PENDING
  self.value = undefined
  self.reason = undefined

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

SyncPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this
  if (self.status === FULFILLED) {
    onFulfilled(self.value)
  }
  if (self.status === REJECTED) {
    onRejected(self.reason)
  }
}

// 测试同步 Promise
new SyncPromise((resolve, reject) => {
  resolve('1')
}).then((data) => {
  console.log(data)
}, (reason) => {
  console.log(reason)
})

new SyncPromise((resolve, reject) => {
  reject('请求失败')
}).then((data) => {
  console.log(data)
}, (reason) => {
  console.log(reason)
})

// resolve 和 reject 都能准确输出

// 发现存在的问题

// 1. 异步不支持
new SyncPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  })
}).then((data) => {
  console.log(data)
}, (reason) => {
  console.log(reason)
})
// 同步的话, 会先执行 .then()
// 而 status 还是 PENDING, 无法进入 FULFILLED

// 2. then 没有容错
new SyncPromise((resolve, reject) => {
  resolve(1)
}).then()

// 比如没有给 then 传递参数, 程序就会报错


// 3. 实现异步 Promise

const APENDING = 'pending'
const AFULFILLED = 'fulfilled'
const AREJECTED = 'rejected'
function AsyncPromise() {
  let self = this
  self.status = APENDING
  self.value = undefined
  self.reason = undefined
  self.onFulfillCallbacks = []
  self.onRejectedCallbacks = []

  function resolve(value) {
    if (self.status === APENDING) {
      self.status = AFULFILLED
      self.value = value
    }
  }

  function reject(reason) {
    if (self.status === APENDING) {
      self.status = AREJECTED
      self.reason = reason
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

function resolveAsyncPromise(newPromise, x, resolve, reject) {
  if (newPromise === x) {
    return reject(new TypeError('循环使用'))
  }

  let called = false
  if (x instanceof AsyncPromise) {
    if (x.status === APENDING) {
      x.then(y => {
        resolveAsyncPromise(newPromise, y, resolve, reject)
      }, reason => {
        reject(reason)
      })
    } else {
      x.then(resolve, reject)
    }
  } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolveAsyncPromise(promise, y, resolve, reject)
        }, reason => {
          if (called) return
          called = true
          reject(reason)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

AsyncPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this
  let newPromise
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason }

  if (self.status === APENDING) {
    return newPromise = new AsyncPromise((resolve, reject) => {
      self.onFulfillCallbacks.push((value) => {
        try {
          let x = onFulfilled(value)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(reason)
          resolveAsyncPromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
