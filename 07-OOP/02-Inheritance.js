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

// New 相当于如下
var animal2 = {}

animal2.__proto__ = Animals.prototype

Animals.call(animal2, 'animal2')

console.log('animal2:', animal2)


// 2. 原型继承
function Student(name) {
  this.name = name || 'Unnamed'
}

// 简单把功能及参数继承过来
function PrimaryStudent(name, grade) {
  // 将 Student 里的变量继承过来，即把 this 作用域转移过来
  Student.call(this, name)
  this.grade = grade || 1
}

// 使用构造函数创建对象
var student1 = new Student('aaa')
var student2 = new PrimaryStudent('bbb')

console.log(student1)
console.log(student2)
console.log(student2 instanceof Student)
console.log()
console.log(student2 instanceof PrimaryStudent)