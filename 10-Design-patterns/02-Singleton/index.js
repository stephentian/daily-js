/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-5
**/

// 单例模式

class Singleton {
  constructor () { }
}

Singleton.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()

let s1 = Singleton.getInstance()

let s2 = Singleton.getInstance()

console.log(s1 === s2)
