Function.prototype.myBind0 = function (context) {
  const self = this,
    args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, args.concat(...arguments))
  }
}

Function.prototype.myBind1 = function (obj, ...arg1) {   //arg1收集剩余参数
  return (...arg2) => {   //返回箭头函数, this绑定调用这个方法(myFind)的函数对象
    return this.apply(obj, arg1.concat(arg2));   // 将参数合并
  }
}

Function.prototype.myBind2 = function (obj, ...arg1) {
  return (...arg2) => {
    let args = arg1.concat(arg2);
    let val;
    obj._fn_ = this;
    val = obj._fn_(...args);
    delete obj._fn_;
    return val
  }
}

Function.prototype.myBind3 = function (obj) {
  let _this = this;
  let argArr = [];
  let arg1 = [];
  for (let i = 1; i < arguments.length; i++) { // 从1开始 
    arg1.push(arguments[i]); // 这里用arg1数组收集下参数
    // 获取arguments是从1开始, 但arg1要从 0(i-1)开始
    // 若是用Array.prototype.slice.call(argument)就方便多了
    argArr.push('arg1[' + (i - 1) + ']'); // 如果用arguments在返回的函数里运行 会获取不到这个函数里的参数了
  }
  return function () {
    let val;
    for (let i = 0; i < arguments.length; i++) { // 从0开始
      argArr.push('arguments[' + i + ']');
    }
    obj._fn_ = _this;
    val = eval('obj._fn_(' + argArr + ')');
    delete obj._fn_;
    return val
  };
}

Function.prototype.myFind4 = function (obj) {
  if (obj === null || obj === undefined) {
    obj = window;
  } else {
    obj = Object(obj);
  }
  let _this = this;
  let argArr = [];
  let arg1 = [];
  for (let i = 1; i < arguments.length; i++) {
    arg1.push(arguments[i]);
    argArr.push('arg1[' + (i - 1) + ']');
  }
  return function () {
    let val;
    for (let i = 0; i < arguments.length; i++) {
      argArr.push('arguments[' + i + ']');
    }
    obj._fn_ = _this;
    console.log(argArr);
    val = eval('obj._fn_(' + argArr + ')');
    delete obj._fn_;
    return val
  };
}
