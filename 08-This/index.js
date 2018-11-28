/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-11-28
 **/

// 简单回调

// 情形一
var a = 'Window环境'

function foo() {
  console.log(this.a)
}

var obj = {
  a: 'Obj环境',
  foo: foo
}

function doFoo() {
  obj.foo()
}

function doFoo2(fn) {
  fn()
}

doFoo()
doFoo2(obj.foo)

// 情形二
var a = 'Window环境'

var obj = {
  a: 'Obj环境',
  foo: function () {
    console.log(this.a)
  }
}

function doFoo() {
  obj.foo()
}

function doFoo2(fn) {
  fn()
}

doFoo()
doFoo2(obj.foo)

// 两次的结果是一样的
// 由此可以看出 this 指向函数 执行时的当前对象，而非声明环境
// 这个方法还学到了: 如何让 函数里的 this, 指向全局