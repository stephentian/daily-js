/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-5
**/

// 工厂模式

// 一个简单的例子

class Man {
  constructor (name) {
    this.name = name
  }
  alertName() {
    console.log(this.name)
  }
}

class Factory {
  static create(name) {
    return new Man(name)
  }
}

Factory.create('stephen').alertName()

// 工厂模式不仅仅是用了 new 实例
// 假设有一份很复杂的代码需要用户调用, 用户不关心代码, 只需要一个接口去调用, 传递需要的参数即可
// 这个构建过程就是工厂
