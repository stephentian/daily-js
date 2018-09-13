/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-12
 **/

// The filter() method creates a new array with all elements that pass the test implemented by the provided function
// filtering out all value
// filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
// filter() 在于实现一个“筛选”函数

var arr = [1, 2, 3, 4, 5, 6]
var result = arr.filter(v => v > 3)
//console.log(result)

var result1 = arr.filter((ele, index, self) => {
  // element value
  console.log(ele)
  // element index
  console.log(index)
  // arr
  //console.log(self)
  return true
})

// Array remove duplicated
// 数组去重

var r,
  arr1 = [1, 2, 2, 3, 4, 4, 5, 1]
r = arr1.filter((ele, index, self) => self.indexOf(ele) === index)
console.log(r)