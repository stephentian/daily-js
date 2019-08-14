/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-8-14
**/


// 希尔排序

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
