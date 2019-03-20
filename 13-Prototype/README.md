# 原型的使用
> prototype

### 目录

- jquery
- zepto


### jQuery

jQuery 为入口函数, 接收一个 selector; 返回一个 jQuery.fn.init(selector) 构造函数.

定义 init 为 jQuery.fn.init, 并给 jQuery.fn.init 为一个接收 selector 为参数的函数.

函数中根据 selector 获取 dom, 并遍历 dom 属性, 赋值为函数的属性.

jQuery.fn 赋值给 jQuery.prototype, jQuery.prototype 定义为一个对象,

构造器为 jQuery, 还有 jQuery 的相关功能方法.

最后定义原型, init.prototype = jQuery.fn

**jQuery.protorype 为什么要赋值给 jQuery.fn 和 构造函数的 init 的原型呢？**

1. 存在即合理

2. 为了扩展插件

一个简单的插件例子

```
$.fn.getNodeName = function () {
  return this[0].nodeName
}
```

不通过直接 jQuery.prototype 暴露出来, 虽然最终的目的是放入原型里.

**好处:**

- 只用 $ 会暴露在 window 全局变量
- 将插件扩展统一到 $.fn.xxx 这一个接口中, 方便使用(这符合软件设计模式)
- 设计库, 只暴露一个变量就好了.


### zepto

$ 为入口函数, 接收 selector 参数, 返回一个 zepto.init(selector) 函数.

zepto.init 通过 selector 获取到 dom;

将 dom 和 selector 传给 zepto.Z;

zepto.Z 里初始化构造函数, new Z(dom, selector)

Z 为构造函数, 将 dom 的属性映射给自身.

Z.prototype 被赋值给了 $.fn

$.fn 为对象, 构造器为 zepto.Z, 里面存有 zepto 的相关方法.

最后定义原型, zepto.Z.prototype = Z.prototype = $.fn

**为什么要把 zepto 原型方法赋值给 $.fn, 而不直接给 Z.prototype 赋值？**


### 插件机制

