/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-8-14
**/


// 快速排序

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
