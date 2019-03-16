/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-03-16
**/

function MVVM(options) {
  this.$options = options || {}
  const data = this._data = this.$options.data
  const me = this

  // 数据代理
  // 实现 vm.xxx ---> vm._data.xxx
  Object.keys(data).forEach(function (key) {
    me._proxyData(key)
  })

  this._initComputed()
  observe(data, this)
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb)
  },
  _proxyData: function (key, setter, getter) {
    const me = this
    setter = setter || Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return me._data[key]
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal
      }
    })
  },
  _initComputed: function () {
    const me = this
    const computed = this.$options.computed
    if (typeof computed === 'object') {
      Object.defineProperty(me, key, {
        get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
        set: function () { }
      })
    }
  }
}
