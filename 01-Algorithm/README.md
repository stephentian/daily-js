# Algorithm 算法学习

## 目录

- **[Factorial 递归](https://github.com/stephentian/daily-js/blob/master/01-Algorithm/01-Factorial/factorial.js)**
- **[Palindrome 回文](https://github.com/stephentian/daily-js/blob/master/01-Algorithm/02-Palindrome/01-Palindrome.js)**
- **[SubString 字符串切割](https://github.com/stephentian/daily-js/blob/master/01-Algorithm/03-SubString/SubString.js)**
- **[]()**


## 排序

### 冒泡排序
时间复杂度：O(n^2)
空间复杂度：O(1)

### 快速排序
时间复杂度：O(n log n)
空间复杂度：O(log n)

思路：
先从数列中取出一个数作为“基准”；
将比这个“基准”小的数全放到“基准”的左边，大于或等于的数全放到“基准”的右边，。
再对左右区间重复第二步，直到各区间只有一个数

```
const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr
  }
  // 基准位置(理论上可以选取任意位置)
  let midIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(midIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort((left).concat([pivot], quickSort(right)))
}
```


### 选择排序
时间复杂度：O(n^2)
空间复杂度：O(1)

```

```
