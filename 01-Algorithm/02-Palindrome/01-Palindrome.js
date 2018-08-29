/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-8-29
 **/

// Palindrome 回文：字符串中顺读和倒读都一样的词语
// 增加一个处理，忽略标点符号、大小写和空格，顺读和倒读一样。

function palindrome(str) {
  let regex = /[\W_]/g;
  str = str.replace(regex, '')
  let str1 = str.toLowerCase()
  let str2 = str.split('').reverse().join('').toLowerCase()
  return str1 === str2
}