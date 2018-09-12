/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-12
 **/

// The filter() method creates a new array with all elements that pass the test implemented by the provided function
// filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

var arr = [1, 2, 3, 4, 5, 6]
var result = arr.filter(v => v > 3)
console.log(result)

var result1 = arr.filter((ele, index, self) => {
  // element value
  console.log(ele)
  // element index
  console.log(index)
  // arr
  console.log(self)
  return true
})