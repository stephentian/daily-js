# 查找算法

## 目录

## 顺序查找

简而言之，就是从第一个元素开始，遍历全部元素，也叫暴力查找。

```js
function search(arr, target) {
    for (let i = 0; i<arr.length; ++) {
        if  (arr[i] === target) {
            return i
        }
    }
    return -1
}
```

## 二分查找

也叫 折半查找。顾名思义，就是对将序列分成两半，进行匹配。

条件：

1. 顺序存储结构；
2. 里面的值按从小到大排列。

分析：

最佳情况：O(log n)

最差情况：O(log n)

平均情况：O(log n)

```js
function binarySearch(arr, target) {
    let low = 0
    let high = arr.length - 1
    while(low <= high) {
        let mid = Max.floor((low + high)/2)
        if  (target < arr[mid]) {
            high = mid - 1
        } else if (target > arr[mid]) {
            low = mid + 1
        } else {
            return mid
        }
    }
    return -1
}
```
