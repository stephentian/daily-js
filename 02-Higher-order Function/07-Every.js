/**
 * author: stephentian
 * email: tianre96@gmail.com
 * day: 2020-04-28
 **/

// The every() method tests whether all elements in the array pass the test impletmented by the provided function.
// return a Boolean value.

const isBelowFourty = v => v < 40
const isBelowSixty = v => v < 60

const array = [1, 10, 20, 30, 40, 50]

console.log(array.every(isBelowFourty))
// false
console.log(array.every(isBelowSixty))
// true
