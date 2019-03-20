/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-19
**/

// zepto

var zepto = {}

// 构造函数

function Z(dom, selector) {
  var i, len = dom ? dom.length : 0
  for (i = 0; i < len; i++) {
    this[i] = dom[i]
  }
  this.length = len
  this.selector = selector || ''
}

zepto.Z = function (dom, selector) {
  return new Z(dom, selector)
}

zepto.init = function (selector) {
  // 源码比较复杂, 处理情况很多, 这里简化举例
  var dom = document.querySelectorAll(selector)
  return zepto.Z(dom, selector)
}

// 使用 zepto 时的 $

var $ = function (selector) {
  return zepto.init(selector)
}

$.fn = {
  constructor: zepto.Z,
  css: function (key, value) { },
  html: function (value) { }
}

zepto.Z.prototype = Z.prototype = $.fn
