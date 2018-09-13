/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-9-13
 **/

// The sort() method sorts the elements in Place of an array and returns the array.
// The default sort order is according to string Unicode code points. !important
// sort() 方法用原地算法对数组的元素进行排序
// 默认排序顺序是根据字符串Unicode码点

// 直接在原数组上改变

var arr = [10, 20, 1, 2]
arr.sort((x, y) => x - y)
console.log(arr)

var items = [{
    name: 'Edward',
    value: 21
  },
  {
    name: 'Sharpe',
    value: 37
  },
  {
    name: 'And',
    value: 45
  },
  {
    name: 'the',
    value: -12
  },
  {
    name: 'Magnetic',
    value: 100
  },
  {
    name: 'Zeros',
    value: 37
  }
];

// sort by value
var arr1 = items.sort(function (a, b) {
  return (a.value - b.value)
});
console.log('arr1: ', arr1)

// sort by name
var arr2 = items.sort(function (a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});
console.log('arr2: ', arr2)