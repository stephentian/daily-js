# TypeScript

## 介绍

官方：TypeScript 是 JavaScript 类型的超集，它可以编译成纯 JavaScript。

可以把 TypeScript 看作是 JavaScript + 一些扩展包。

## 引导

参考官方文档: [TypeScript 文档简介](https://www.tslang.cn/docs/home.html)

+ 基础类型
+ 接口
+ 类
+ 泛型
+ 装饰器
+ 类型声明

## 基础类型

+ number
+ string
+ boolean
+ [] / Array 数组
+ Tuple 元组
+ enum 枚举
+ any 未指定类型
+ 无类型 Void
  + 用于函数，表示没有返回值
  + 用于变量，表示它只能为 `undefined` 和 `null`
+ null
+ undefined
+ never 永不存在的值的类型
  + 用于函数，表示存在无法到达的终点
+ object

类型断言

好比其他语言的类型转换，告诉编译器，这是什么类型。

两种形式，第一种 “尖括号” 语法：

```ts
let str:any = "this is a string"
let strLength:number = (<string>str).length
```

第二种，`as` 语法：

```ts
let str:any = "this is a string"
let strLength:number = (str as string).length
```

注意：如果在 TypeScript 使用 JSX 时，只有 `as` 语法断言时生效的。

## 接口

约束对象接口，不需要全部实现，只会检查必需属性。

```ts
interface LabelValue {
    label: string
}
function printLabel(obj: LabelValue) {
    console.log(obj.label)
}
```

可选属性（`?:`）

```ts
interface LabelValue {
    name?: string
    label: string
}
```

可读属性（`readonly`）

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
```

## 类

`class` 和 es6 里的功能相同，不过 `ts` 里创建类还会创建一个类的实例类型。

`extends` 继承

修饰符:

+ public
+ private
+ protected
+ readonly

存取器：`get`，`set`

静态属性：`static`

抽象类：`abstract`

因为创建类会生成一个类的实例类型，类可以用作 接口。
