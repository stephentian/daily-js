/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-11-2
 **/

var regex1 = /.a/;
var string1 = 'ba';
var string2 = ' a';
var string3 = '@abc';
var string4 = `
abc
xyz
`;

console.log(regex1.test(string1));
// true
console.log(regex1.test(string2));
// true
console.log(regex1.test(string3));
// true

console.log(regex1.test(string4));
// false 无法匹配换行符