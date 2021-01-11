/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-8-28
**/

// 冒泡排序

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
