/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019/3/1
**/

// 手写一个 Promise

// 定义状态
// 等待
// 成功
// 失败
const PENDING = 'pending';
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  let self = this // 先缓存当前 promise 实例, 避免异步执行时, this 获取不对
  self.value = null // promise 的值
  self.status = PENDING // 设置初始状态
  self.onResolvedCallbacks = [] // 存放成功的回调函数数组
  self.onRejectedCallbacks = [] // 存放失败的回调函数数组

  // 1. resolve 方法
  // 只有 promise 状态为 pending, 可以转成成功状态
  // 并将成功的返回值赋值给 value
  // 如果已经是成功状态, 则什么都不做
  function resolve(value) {
    if (value != null && value.then && typeof value.then == 'function') {
      return value.then(resolve, reject)
    }

    // 思考: 为什么要用 setTimeout 包起来
    setTimeout(function () {
      if (self.status == PENDING) {
        self.status = FULFILLED
        self.value = value
        // 调用所有成功回调函数
        self.onResolvedCallbacks.forEach(cb => cb(self.value))
      }
    })
  }

  // 2. reject 方法
  // 如果是 pending, 转成失败状态
  // 并将失败原因赋值给 value
  function reject(reason) {
    setTimeout(function () {
      if (self.status == PENDING) {
        self.status = REJECTED
        self.value = reason
        self.onRejectedCallbacks.forEach(cb => cb(self.value))
      }
    })
  }

  // 函数可能出现异常
  // 需要捕获,  如果出错了需要使用 reject
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}


// then

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 判断 then 接收的参数是否为 function, 是则忽略
  onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function (value) { return value }
  onRejected = typeof onRejected == 'function' ? onRejected : function (reason) { throw reason }

  // 如果当前 promise 已经是成功状态, 直接将值 传递给 onFulfilled
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

  // 因为 then 有链式调用, 所以返回一个新的 promise 对象
  // 状态为 FULFILLED, 即为成功状态时, 直接调用 onFulfilled
  // 考虑到有可能 throw, 将代码包在 try catch 里
  if (self.status == FULFILLED) {
    return promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}


function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环使用'))
  }

  let called = false
  if (x instanceof MyPromise) {
    if (x.status == PENDING) {
      x.then(function (y) {
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
  } else if (x != null && ((typeof x == 'objec') || (typeof x == 'function'))) {
    try {

    } catch (error) {

    }
  }
}
