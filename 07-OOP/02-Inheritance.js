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
console.log(Student.prototype.isPrototypeOf(PrimaryStudent.prototype))
// false, 说明不是继承

// 当前的原型链是: 
// student1 --> Student.prototype --> Object.prototype --> null
// student2 --> PrimaryStudent.prototype --> Object.prototype --> null

// 如果是 继承, 原型链应该为:
// student2 --> PrimaryStudent.prototype --> Student.prototype --> Object.prototype --> null

// 有这种方式：
function Student(name) {
  this.name = name || 'Unnamed'
}

// 利用 call 把 Student 中通过 this 指定的属性和方法复制到子类的实例中
function PrimaryStudent(name, grade) {
  Student.call(this, name)
  this.grade = grade || 1
}
PrimaryStudent.prototype = new Student()
PrimaryStudent.prototype.constructor = PrimaryStudent

// 验证
var student3 = new PrimaryStudent('ccc', 3)
console.log(student3)
console.log(student3.__proto__ === PrimaryStudent.prototype)
console.log(student3.__proto__.__proto__ === Student.prototype)
console.log(Student.prototype.isPrototypeOf(PrimaryStudent.prototype))
