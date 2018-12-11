/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-11-28
 **/


// 1. 函数内部

// function f1() {
//   return this
// }

// // 浏览器环境
// true
// console.log('this === window:', this === window)

// // node 环境
// // true
// console.log('f1() === global:', f1() === global)
// // true
// console.log(this === module.exports)



// 2. 简单回调

// 情形一
// var a = 'Window环境'

// function foo() {
//   console.log(this.a)
//   console.log(global)
// }

// var obj = {
//   a: 'Obj环境',
//   foo: foo
// }

// function doFoo() {
//   obj.foo()
// }

// function doFoo2(fn) {
//   fn()
// }

// doFoo()
// doFoo2(obj.foo)

// 情形二
// var a = 'Window环境'

// var obj = {
//   a: 'Obj环境',
//   foo: function () {
//     console.log(this.a)
//   }
// }

// function doFoo() {
//   obj.foo()
// }

// function doFoo2(fn) {
//   fn()
// }

// doFoo()
// doFoo2(obj.foo)

// 两次的结果是一样的
// 由此可以看出 this 指向函数 执行时的当前对象，而非声明环境
// 这个方法还学到了: 如何让 函数里的 this, 指向全局


// 3. call 和 apply
// 在浏览器中

var obj = {
  a: 'Custom'
}

var a = 'Global'

function whatsThis(arg) {
  console.log(this.a)
}

whatsThis()
// 'Global'

whatsThis.call(obj)
whatsThis.apply(obj)
// 'Custom'

// 3. node 环境中的 this

// node 环境中把 var 去掉，将变量挂载到全局变量中