# 扩展运算符(spread)

## es5 实现扩展符

```javascript
...a

=

function _toConsumableArray (e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread();
}

function _nonIterableSpread () {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// 将 e 变换为数组
function _iterableToArray (e) {
  if (
    Symbol.iterator in Object(e) ||
    "[object Arguments]" === Object.prototype.toString.call(e)
  )
    return Array.from(e);
}
// 拷贝数组并返回
function _arrayWithoutHoles (e) {
  if (Array.isArray(e)) {
    for (var t = 0, o = new Array(e.length); t < e.length; t++) o[t] = e[t];
    return o;
  }
}

```
