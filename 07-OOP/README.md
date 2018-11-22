# OOP 面向对象编程

## 目录

- **[1. 创建对象](#1-创建对象)**
- **[2. 继承]()**
- **[3. 构造函数里的 this 和 参数]()**
- **[4. instanceof 和 constructor]()**
- **[5. prototype、__proto__ 和 constructor]()**
- **[6. ]()**

## 1. 创建对象

### 1. 创建简单对象
```

var obj = {
  name: 'StepenTian',
  age: 18,
  getSex: function() {
    return 'male'
  }
}

console.log(obj.getSex())
// 返回 male
```

### 2. 使用构造函数创建对象
```
function Person(name) {
  this.name = name
}
```
[不懂 this，你可以先去看：this]()