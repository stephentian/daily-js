/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-8-14
**/


// 选择排序

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
