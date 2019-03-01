/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019/3/1
**/

// 生成器
// 生成器是一个函数, 可以用来生成迭代器
// 生成器和普通函数不同,
// 普通函数一旦调用必须执行完,
// 生成器函数中间可以暂停, 执行一会儿停一下再执行

// 生成器特点: 函数名前加 *

function* go(a) {
  console.log(1)
  let b = yield a
  console.log(2)
  let c = yield b
  console.log(3)
  return c
}

let it = go('a')
console.log(it)

// 生成器函数不会立即执行, 而是返回一个迭代器
// 迭代器是一个对象, 每调用一次 next 就会返回一个对象
// next 第一次被调用不需要参数, 传参数也没意义
// 对象有两个属性, 一个是 value(yield后面的值), 一个是 done(表示是否迭代完成)

let r1 = it.next()
console.log(r1)
//{ value: 'a', done: false }

let r2 = it.next('B')
console.log(r2)
//{ value: 'B', done: false }

let r3 = it.next('C')
console.log(r3)
//{ value: 'C', done: true }
