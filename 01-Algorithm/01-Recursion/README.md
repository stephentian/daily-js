# 递归 Recursion

## 何为递归

程序调用自身的编程技巧称为递归，递归做为一种算法在程序设计语言中广泛应用。

**举个例子：**
比如说阶乘，
```
factorial(5) = factorial(4) * 5
factorial(4) = factorial(3) *4
...
...
...
factorial(0) = 1
```
从第一个调用 factorial(5) 开始，一直递归调用 `factorial` 函数直到参数为 0。

总结来说：
```
factorial(n) = factorial(n-1) ) n
factorial(0) = 1
```


## 递归调用栈

回到上面的例子：
```
function factorail(n) {
  if (n === 0) return 1
  return n * factorial(n - 1)
}
```

如果我们传入参数 3，将会递归调用 factorial(2)、factorial(1) 和 factorial(0)，
会调用 3 次。
每次函数调用都会压入调用栈，如下：
```
factorial(0) // 0的阶乘为1 
factorial(1) // 该调用依赖factorial(0)
factorial(2) // 该调用依赖factorial(1)
factorial(3) // 该掉用依赖factorial(2)
```

这样的话，如果传入的 n 值特别大，那么这个调用栈将会非常之大。
如何解决这个问题呢？使用尾递归。

## 尾递归

尾递归是一种递归的写法，可以避免不断的将函数压栈导致堆栈溢出。
通过设置一个累加数，并且每一次都将当前的值累加上去，然后递归调用。

```
function factorial(n, total = 1) {
  if  (n === 0) return total
  return factorial(n-1, n * total)
}
```
