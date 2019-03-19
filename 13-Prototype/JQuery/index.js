/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-19
**/

// jQuery

var JQuery = function (selector) {
  return new JQuery.fn.init(selector)
}

// 定义构造函数

var init = JQuery.fn.init = function (selector) {
  var slice = Array.prototype.slice
  var dom = slice.call(document.querySelectorAll(selector))

  var i, len = dom ? dom.length : 0
  for (i = 0; i < len; i++) {
    this[i] = dom[i]
  }
  this.length = len
  this.selector = selector || ''
}

// 初始化 JQuery.fn
JQuery.fn = JQuery.prototype = {
  constructor: JQuery,
  // 其他函数
  css: function (key, value) { },
  html: function (value) { }
}

// 定义原型
init.prototype = JQuery.fn
