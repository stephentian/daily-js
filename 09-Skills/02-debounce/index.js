window.onload = function () {
  // 简单版本
  // fn 为需要防抖的函数， wait 为等待时间
  const debounce = (fn, wait = 50) => {
    // 创建一个定时器
    let timer = 0
    return function (...args) {
      // 如果 timer 没到时间，用户再点击就不断清除定时器
      // 然后 生成一个新定时器，并不会执行函数
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
  // 缺点是，第一次调用，也要等待。

  // 带有立即执行选项版
  // immediate 是否立即调用函数
  function decounce2(fn, wait = 50, immediate = true) {
    let timer, context, args

    // 延迟执行函数
    const later = () => setTimeout(() => {
      timer = null

      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        fn.apply(context, args)
        context = args = null
      }
    }, wait)

    return function (...args) {
      if (!timer) {

        // 如果没有延迟时间定时器，就创建一个
        timer = later()
        if (immediate) {
          fn.apply(this, params)
        } else {
          context = this
          args = params
        }
      } else {
        // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
        // 这样做延迟函数会重新计时
        clearTimeout(timer)
        timer = later()
      }
    }
  }
  // 获取当前时间戳
  function now() {
    // '+'将 new Date() 由 'object' 转换为 'number'
    return +new Date()
  }
}