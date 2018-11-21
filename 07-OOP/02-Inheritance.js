/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018/11/21
 **/

//  1. New
function Animals(name) {
  this.name = name
}

var animal1 = new Animals('animal1')

console.log('animal1:', animal1)

// 2. New 相当于如下
var animal2 = {}

animal2.__proto__ = Animals.prototype

Animals.call(animal2, 'animal2')

console.log('animal2:', animal2)