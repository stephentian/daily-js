/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-11-27
 **/

// Class 继承

// 普通构造函数
function Student(name) {
  this.name = name || 'Unnamed'
}

Student.prototype.sayName = function () {
  console.log('name: ', this.name)
}

// Class 来实现
// 
class Student {
  constructor(name) {
    this.name = name
  }
  sayName() {
    console.log('name: ', this.name)
  }
}

// class 继承
class PrimaryStudent extends Student {
  constructor(name, grade) {
    // 需要用 super 来调用父类的构造函数
    super(name)
    this.grade = grade
  }
  myGrade() {
    console.log('My grade is: ', this.grade)
  }
}