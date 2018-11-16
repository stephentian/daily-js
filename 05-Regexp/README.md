# Regex 正则表达式

> 多看，多认，多写

## 目录

- **[前提知识](#前提知识)**
- **[语法 Grammar](#语法-grammar)**
- **[方法 Function](#方法-function)**
- **[常见用例](#常见用例)**

## 前提知识

#### 1. **创建正则**
- 字面量方式
```
var regex = /***/
```
- 实例方式
```
var reg = new Regep('/***/')
```
#### 2. **贪婪模式 Greedy**
默认模式，正则表达式一般趋向于最大长度匹配(往长了走)

#### 3. **非贪婪模式**
非贪婪模式, 懒惰匹配, 匹配长度更短的字符(往短了走)

#### 4. **lastIndex**
整数, 下一个匹配字符位置, 从 0 开始算

## 语法 Grammar

### 基本元字符

1. `.`: 匹配任何单个字符（除了换行符）
2. `\`: 将特殊字符转为字面量
3. `|`: "或" 操作符
4. `[]`: 字符集合，匹配集合中的一个字符
5. `[^]`: 对集合里， "非" 操作符
6. `-`: 定义一个区间，比如 `[a-d]` 表示去 a-d 之间(a, b, c, d)

### 数量元字符

1. `{n}`: 匹配 n 次
2. `{m, n}`: 匹配字符至少 m 次, 至多 n 次
3. `+`: 匹配字符一次或多次
4. `*`: 匹配字符 0 次或多次
5. `?`: 匹配字符 0 次或 1 次

> 在这些量词后加 `?` 会变成 **非贪婪模式**

### 位置元字符

1. `^`: 匹配表达式的开始
2. `$`: 匹配表达式的结束
3. `\b`: 匹配单词边界
4. `\B`: 匹配非单词边界
5. `(?=p)`: 匹配 p 前面的位置
6. `(?!p)`: 匹配不在 p 的位置

### 特殊元字符

1. `\d`: 数字, 同 `[0-9]`
2. `\D`: 非数字, 同 `[^0-9]`
3. `\s`: 空白符, 包括空格, 水平制表符(`\t`), 垂直制表符(`\v`), 换行符(`\n`), 回车符(`\r`), 换页符(`\f`)
4. `\S`: 非空白符
5. `\w`: 数字、字母、下划线, 同 [0-9a-zA-Z]
6. `\W`: 非数字字母字符
7. `\n`: 换行符

### 标志字符

1. `g`: global, 全局搜索
2. `i`: ignore, 不区分大小写
3. `m`: multiline, 多行搜索

## 方法 Function

### 正则对象方法

#### 1. `test`
匹配返回 true, 不匹配则返回 false
```
  var regex = /a/
  var string = 'aaa'
  regex.test(string)  // return true
```

#### 2. `exec`
没有匹配是返回 null, 匹配时返回
```
[0: (整个模式匹配的最长的字符串), 
1: (第二长的字符串), 
...(没有则为 null), 
index: 0, 
input: ''(要匹配的字符串), 
length: 1(前面匹配到的个数)]
```

### string 的方法

#### 1. `match`

返回值和接受参数(正则)是否包含 `g` 有关
 - 如果没有 `g` 标志, match 对 string 做一次匹配
 ```
 var regex = /[a-d]/i
 var string = 'aBcDef'
 string.match(regex)
 // ouput
  [
    0: "a"
    groups: undefined
    index: 0
    input: "aBcDef"
  ]
 ```
 - 如果有, 会返回一个数组
 ```
 var regexg = /[a-d]/gi
 string.match(regexg)
 // output
 ['a', 'B', 'c', 'D']
 ```

#### 2. `search`

- 接受一个正则作为参数
- 如果参数不为正则, 会隐式的使用 new Regexp() 将其转化为正则
- 匹配到返回 0, 没匹配到返回 -1

#### 3. `replace`

- 接受两个参数, 第一个为被替换文本, 第二个为要替换的文本
- 第一个参数可以是正则, 也可以是字符串
- 第二个参数可以是字符串, 也可以是函数

| 变量名 | 作用 |
| ------ | ------ |
| $$ | 插入一个 $ |
| $& | 	插入匹配的子串 |
| $` | 插入当前匹配的子串左边的内容 |
| $' | 插入当前匹配的子串右边的内容 |
| $n | 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串 |

```
var re = /(\w+)\s(\w+)/
var str = "John Smith"
var newstr = str.replace(re, "$2, $1")
console.log(newstr)
// Smith, John

var string = '2018-11-12'
var today = string.replace(/-/g, '/')
console.log(today)
// '2018/11/12'

string.replace(/-/g, function(result, key, index, group) {
  // 输出 三个参数
  // 匹配的正则
  // 捕获到的字符
  // 正则匹配到的每段字符的第一个字符的索引
  // 用于匹配的字符串
})
```

#### 4. `split`

- 接受两个参数, 返回一个数组
- 第一个是用来分割字符串的字符或者正则
- 第二个参数可选作为限制分割多少个字符，也是返回的数组的长度限制

```
var string = '123a4Bc56Def'
console.log(string.split(/[a-z]+/i))
// output
["123", "4", "56", ""]

console.log(string.split(/[a-z]+/i, 2))
// output
["123", "4"]
```

## 常见用例

1. 写一个 function , 将 'get-element-by-id', 转换为驼峰命名法形式的字符串 'getElementById'
```
var f = function(str) {
	return str.replace(/-\w/g, function(v) {
  		return v.slice(1).toUpperCase()
	})
}
```

2. 