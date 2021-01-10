# TypeScript

## 介绍

官方：TypeScript 是 JavaScript 类型的超集，它可以编译成纯 JavaScript。

可以把 TypeScript 看作是 JavaScript + 一些扩展包。

## 引导

参考官方文档: [TypeScript 文档简介](https://www.tslang.cn/docs/home.html)

+ 基础类型
+ 接口
+ 类
+ 函数
+ 泛型
+ 装饰器
+ 类型声明

## 基础类型

+ number
+ string
+ boolean
+ `[]` / Array 数组
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

## 函数

主要定义 行为 的地方。

### 函数类型

```ts
let myAdd: (x: number, y: number) => number = 
    function(x: number, y: number): number { return x + y }
```

只要参数类型是匹配的，即有效，不需要确认参数名是否正确

推断类型（赋值语句的一边指定类型另一边没有类型的话，TypeScript 编译器会自动识别出类型）

```ts
let myAdd = function(x: number, y: number): number { return x + y; }
// 或者
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; }
```

### 参数

可选参数和默认参数

！可选参数必须跟在必须参数后面

```ts
function(x: number, y?: number) {}
function(x: number, y = 1) {}
```

剩余参数

剩余参数会被当做个数不限的可选参数。可以一个都没有，同样也可以有任意个。

```ts
function(x: number, ...restOfNumber: number[]) {}
```

### `this`

箭头函数能保存函数创建时的 this值，而不是调用时的值。

```ts
let deck = {
    createCardPicker: function() {
        () => {
            return { suits: this.suits }
        }
    }
}
```

但是，TypeScript 会警告你犯了一个错误：`this.suits` 为 `any` 。

修改的方法是，提供一个显式的 this参数。

```ts
interface Card {
    suit: string;
}
interface Deck {
    suits: string[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["a", "b", "c", "d"],
    createCardPicker: function(this: Deck) {
        () => {
            return { suits: this.suits }
        }
    }
}
```

## 泛型

泛型 Generics。像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。

在定义函数、接口或者类的时候，不需要先指定具体的类型，增加复用性。

泛型变量

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

泛型接口

```ts
interface GenericIdentityFn {
    <T>(arg: T): T;
}

let myIdentity: GenericIdentityFn = function identity<T>(arg: T): T {
    return arg;
}
```

泛型方法

```ts
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```

泛型类

泛型类型放在类后面。

```ts
class GenericsClass<T> {
    value: T,
    add: (x: T, y: T) => T
}
```

泛型约束

对比操作 `any` 类型，想要限制函数去处理 `.length` 属性的类型。 定义一个接口来描述约束条件。使用这个接口和 `extends` 关键字来实现约束

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {}
```

! 传入符合约束类型的值，必须包含必须的属性

## 装饰器

装饰器 Decorators，为我们在类的声明及成员上通过元编程语法添加标注提供了一种方式。

它能够被附加到类声明，方法， 访问符，属性或参数上。

简而言之：用于扩展类、类的属性或者方法。

```ts
// vue @Props
export default class App extends Vue {
    @Props({ type: Boolean, required: true })
    msg!: Boolean
}
// 事件处理：@Emit
// 变更监测：@Watch
```

类装饰器

类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。

！类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）。

```ts
// 当 @sealed 被执行的时候，它将密封此类的构造函数和原型。
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

方法装饰器

被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。

3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员名字。
3. 成员的属性描述符。

### 属性装饰器

属性装饰器声明在一个属性声明之前（紧靠着属性声明）。

2个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。

## 类型声明

模块补充

```ts
declare module "vue/types/vue" {
    interface Vue {
        $axios: AxiosInstance
    }
}
```
