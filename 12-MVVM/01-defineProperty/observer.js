/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-12
**/

// Observer 观察员


// 利用 Object.defineProperty 来监听属性变动
// 将需要 observe 的数据进行递归遍历, 包括子属性对象的属性, 都加上 setter 和 getter
// 这样的话, 给对象的某个值赋值就会触发 setter, 达到监听数据变化的目的

function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}

// function defineReactive(obj, key, val) {
//   observe(val)
//   Object.defineProperty(obj, key, {
//     enumerable: true,
//     configurable: false,  // 不能再 define, 再使用 defineProperty 会报错
//     get: function () {
//       return val
//     },
//     set: function (newVal) {
//       console.log('value changed', val, '--->', newVal)
//       val = newVal
//     }
//   })
// }

// 测试

// let data = { name: 'stephentian' }
// observe(data)
// data.name = 'tian'


// 可以监听到每个数据变化了, 接下来是通知订阅者, 实现一个消息订阅器
// 很简单, 维护一个数组, 用来收集订阅者, 数据变动触发 notify, 在调用订阅者的 update 方法

function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  depend: function () {
    Dep.target.addDep(this)
  },
  removeSub: function (sub) {
    let index = this.subs.indexOf(sub)
    if (index != -1) {
      this.subs.splice(index, 1)
    }
  },
  notify: function () {
    this.subs.forEach(sub => {
      // 调用订阅者 update 方法
      sub.update()
    })
  }
}

// 代码改善后：

// function defineReactive(data, key, val) {
//   let dep = new Dep()
//   observe(val)
//   Object.defineProperty(data, key, {
//     enumerable: true,
//     configurable: false,
//     get: function () {
//       return val
//     },
//     set: function (newVal) {
//       if (val === newVal) return
//       console.log('value changed', val, '--->', newVal)
//       val = newVal
//       dep.notify() // 通知所有订阅者
//     }
//   })
// }


// 如何分辨谁是 订阅者, 怎么往订阅器添加订阅者呢？
// 整理上面的思路, 可以明确订阅者应该是 Watcher, 
// 而且 let dep = new Dep()
// 是在 defineReactive 方法内部定义的, 所以想通过 dep 添加订阅者, 就必须在闭包内操作
// 所以我们在 getter 里操作

function defineReactive(data, key, val) {
  let dep = new Dep()
  observe(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      // 由于需要在闭包内添加 watcher, 所以通过 Dep 定义一个全局 target 属性, 暂存 watcher, 添加完移除
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set: function (newVal) {
      if (val === newVal) return
      console.log('value changed', val, '--->', newVal)
      val = newVal
      dep.notify() // 通知所有订阅者
    }
  })
}

Dep.target = null
