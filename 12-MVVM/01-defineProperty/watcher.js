/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-13
**/

// Watcher

// Watcher 订阅者作为 Observer 和 Compile 之间的通信桥梁
// 主要作用：
// 1. 在自身实例化时往属性订阅器(dep) 里添加自己
// 2. 自身有个 update() 方法
// 3. 待属性变动 dep.notice() 通知时, 能调用自身的 update() 方法, 并触发 Compile 中绑定的回调

function Watcher(vm, exp, cb) {
  this.cb = cb
  this.vm = vm
  this.exp = exp
  // 此处为了触发属性的 getter, 从而在 dep 添加自己, 结合 Observer 更易理解
  this.value = this.get()
}

Watcher.prototype = {
  update: function () {
    this.run
  },
  run: function () {
    let value = this.value
    const oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)  // 执行 Compile 中绑定的回调, 更新视图
    }
  },
  get: function () {
    // 将当前的订阅者指向自己
    Dep.target = this
    // 触发 getter, 添加自己到属性订阅器
    let value = this.vm[exp]
    // 添加完毕, 重置
    Dep.target = null
    return value
  }
}
