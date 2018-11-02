# Regex 正则表达式

## 目录

- **[前提知识](#前提知识)**
- **[语法 Grammar](#语法-grammar)**

## 前提知识

1. **贪婪模式 Greedy**: 默认模式，正则表达式一般趋向于最大长度匹配(往长了走)
2. **非贪婪模式**: 非贪婪模式，懒惰匹配，匹配长度更短的字符(往短了走)

## 语法 Grammar

### 基本元字符

1. `.`: 匹配任何单个字符（除了换行符）
2. `\`: 将特殊字符转为字面量
3. `|`: "或" 操作符
4. `[]`: 字符集合，匹配集合中的一个字符
5. `[^]`: 对集合里， "非" 操作符
6. `-`: 定义一个区间，比如 `[a-d]` 表示去 a-d 之间(a, b, c, d)

### 数量元字符

1. `a{m, n}`: 匹配 a 字符至少 m 次, 至多 n 次
2. `a+`: 匹配 a 字符一次或多次
3. `a*`: 匹配 a 字符 0 次或多次
4. `a?`: 匹配 a 字符 0 次或 1 次

> 在这些量词后加 `?` 会变成 **非贪婪模式**