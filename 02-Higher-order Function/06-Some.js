/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2020-04-28
 **/

// MDN:
// The some() method tests whether at least one element in the array passes the test implemented by the provided function.
// It returns a Boolean value

const array = [1, 2, 3, 4]

const even = e => e % 2 === 0

console.log(array.some(even))
// true
