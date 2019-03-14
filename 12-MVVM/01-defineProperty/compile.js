/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-3-14
**/

// Compile

// Compile 主要做解析模板指令, 将模板的变量替换成数据, 然后初始化渲染页面视图
// 将每个指令对应的节点绑定更新函数, 添加监听数据的订阅者, 一旦数据变动, 收到通知, 更新视图

// 因为遍历解析过程中有多次操作 DOM 节点, 为提高性能和效率, 会先将跟节点 el 转换成文档碎片 fragment 进行解析编译操作
// 解析完成, 再将 fragment 添加回原来的真实的 DOM 节点中

function Compile(el) {
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  init: function () {
    this.compileElement(this.$fragment)
  },
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;
    // 将原生节点拷贝到 fragment
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  },
  compileElement: function (el) {
    var childNodes = el.childNodes,
      me = this;
    [].slice.call(childNodes).forEach(function (node) {
      const text = node.textContent
      const reg = /\{\{.*)\}\}/
      // 按元素节点方式编译
      if (me.isElementNode(node)) {
        me.compileElement(node)
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1)
      }
      // 遍历编译子节点
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node)
      }
    })
  },
  compile: function (node) {

  },

}

// 指令处理集合
const compileUtil = {
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },
  bind: function (node, vm, exp, dir) {
    const updaterFn = updater[dir + 'Updater']
    // 第一次初始化视图
    updaterFn && updaterFn(node, vm[exp])
    // 
  }
}
