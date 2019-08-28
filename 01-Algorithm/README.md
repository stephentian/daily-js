# Algorithm 算法学习

## 目录

- **[Recursion 递归]()**
- **[Factorial 阶乘](https://github.com/stephentian/daily-js/blob/master/01-Algorithm/01-Factorial/factorial.js)**
- **[Palindrome 回文](https://github.com/stephentian/daily-js/blob/master/01-Algorithm/02-Palindrome/01-Palindrome.js)**
- **[SubString 字符串切割](https://github.com/stephentian/daily-js/blob/master/01-Algorithm/03-SubString/SubString.js)**
- **[Sort 排序]()**


## 排序

### 冒泡排序
时间复杂度：O(n^2)
空间复杂度：O(1)

思路：
1. 比较相邻元素。如果前一个比后一个大，就交换他们。
2. 对每一对相邻元素遍历比对大小，做完之后，最后的元素会是最大的数，把它抛出。
3. 对除去最后元素的数组（因为最后是最大）重复以上步骤。
4. 比对的数组越来越小，直到没有数字比对。
```
function bubbleSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

```


### 快速排序
时间复杂度：O(n log n)
空间复杂度：O(log n)

思路：
1. 先从数列中取出一个数作为“基准”；
2. 将比这个“基准”小的数全放到“基准”的左边，大于或等于的数全放到“基准”的右边，。
3. 再对左右区间重复第二步，直到各区间只有一个数。

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

思路：
1. 在未排序序列中找到最小（大）元素，存放到排序序列的起始位置；
2. 从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾；
3. 重复第二步，直到所有元素均排序完毕。

```
function selection(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let minIndex, temp
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    // 再循环一遍，找最小的数
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // 找到最小数后和 arr[i] 互换位置
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```


### 希尔排序
也称递减增量排序算法

时间复杂度：O(n log n)
空间复杂度：O(1)


思路：
1. 在希尔排序中最重要的是分组，我们先找到一个间隔，每隔一定的间隔将这些数字排位一组；
2. 对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。

```
function shellSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  // 算间隔
  let len = Math.floor(arr.length / 2)
  while (len > 0) {
    for (let i = len; i < arr.length; i++) {
      let temp = arr[i];
      for (let j = i - len; j >= 0 && temp < arr[j]; j = j - len) {
        arr[j + len] = arr[j]
      }
      arr[j + len] = temp
    }
    len = Math.floor(len / 2)
  }
}
```
