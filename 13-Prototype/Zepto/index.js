/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-19
**/

// zepto

var zepto = {}

zepto.init = function (selector) {
  // 源码比较复杂, 处理情况很多, 这里简化举例
  // 比如要解析命令等
  var dom = document.querySelectorAll(selector)
  return zepto.Z(dom, selector)
}

// 使用 zepto 时的 $
// 先定义 $

var $ = function (selector) {
  return zepto.init(selector)
}

// 构造函数

function Z(dom, selector) {
  var i, len = dom ? dom.length : 0
  // 把 DOM 元素的属性赋值给自己
  for (i = 0; i < len; i++) {
    this[i] = dom[i]
  }
  this.length = len
  this.selector = selector || ''
}

zepto.Z = function (dom, selector) {
  return new Z(dom, selector)
}

$.fn = {
  constructor: zepto.Z,
  css: function (key, value) { },
  html: function (value) {
    return '这是一个模拟的html方法'
  }
}

zepto.Z.prototype = Z.prototype = $.fn
