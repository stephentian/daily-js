/**
* author: stephentian
* email: stephentian@foxmail.com
* day: 2019-4-24
**/

// 红路灯问题

// Details

// You're writing code to control your town's traffic lights. You need a function to handle each change from green, to yellow, to red, and then to green again.
// Complete the function that takes a string as an argument representing the current state of the light and returns a string representing the state the light should change to.
// For example, update_light('green') should return 'yellow'.

// 解决方法

// 普通

// funciton updateLight(current) {
//   switch(current) {
//     case 'green':
//       return 'yellow';
//     case 'yellow':
//       return 'red';
//     case 'red':
//       return 'green';
//     default:
//       throw 'Error: wrong input';
//       break;
//   }
// }


// 很聪明的方式

// const updataLight = current => ({
//   green: 'yellow',
//   yellow: 'red',
//   red: 'yellow'
// })[current]

// 最优解

// function updateLight(current) {
//   return current === 'yellow' ? 'red' : current === 'green'?'yellow':'green';
// }
