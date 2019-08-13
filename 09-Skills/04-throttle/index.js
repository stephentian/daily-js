/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-8-13
**/

// 节流

function throttle(fn, time) {
  let timer = null
  return function name() {
    let context = this,
      args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, time);
    }
  }
}

function throttle1(fn, delay) {
  let canUse = true
  return function () {
    if (canUse) {
      fn.apply(this, arguments)
      canUse = false
      setTimeout(() => {
        canUse = true
      }, delay);
    }
  }
}
