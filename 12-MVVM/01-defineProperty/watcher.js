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
  this.depIds = {}
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
  addDep: function (dep) {
    // 1. 每次调用 run() 的时候会触发相应的属性 getter
    // getter 里面会触发 dep.depend(), 继而触发 addDep
    // 2. 假如相应的属性的 dep.id 已经在当前 watcher 的 depIds 里, 说明不是一个新属性, 仅仅是改变了其值而已
    // 则不需要将当前 watcher 添加到该属性的 dep 里
    // 3. 假如相应的属性是新属性, 则将当前 watcher 添加到新属性的 dep 里
    // 如通过 vm.child = { name: 'a' } 改变了 child.name 的值, child.name 就是一个新属性
    // 则需要将当前 watcher(child.name) 加入到新的 child.name 的 dep 里
    // 因为此时 child.name 是一个新值, 之前到 setter, dep 都已经失效
    // 如果不把 watcher 加入到新的 child.name 的 dep 中
    // 通过 child.name = xxx 赋值的时候, 对应的 watcher 就收不到通知, 等于失效了
    // 4. 每个子属性的 watcher 在添加子属性的 dep 的同时, 也会添加到父属性的 dep
    // 监听子属性的同时监听父属性的变更, 这样, 父属性改变是, 子属性的 watcher 也能收到通知, 进行 update()
    // 这一步是在 this.get() --> this.getVmVal() 里完成的, forEach 是会从父级开始取值, 间接调用它的 getter
    // 触发了 addDep(), 在整个 forEach 中, 当前 watcher 都会加入到每个父级过程属性的 dep
    // 例如：
    // 当前 watcher 的是 'child.chile.name', 那么 child, child.child, child.child.name 三个属性的 dep 都会加入当前 watcher
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addDep(this)
      this.depIds[dep.id] = dep
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
