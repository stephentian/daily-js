/**
 * author: stephentian
 * email: tianre96@gmail.com
 * day: 2020-04-29
 **/

// javascript is wired
// one of those things is the error when I try to access a nested object:

// cannot read property 'xxx' of undefined

const nestObject = {
  id: "1",
  name: "nestObject",
  options: [
    {
      item1: "item1",
    },
    {
      item2: "item2",
    },
  ],
  child1: {
    name: "child1",
    child2: {
      name: "child2",
    },
  },
}

// to access the name of child1, the most usual way

let child1Name = nestObject.child1.name

// or

child1Name = nestObject && nestObject.child1 && nestObject.child1.name

// and if you want access the name of child2

let child2Name

// child2Name =
//   nestObject && nestObject.child1 && nestObject.child1.child2
//     ? nestObject.child1.child2.name
//     : ""

// the code look realy messy

// or you can pick this trick

// child2Name = (((nestObject || {}).child1 || {}).child2 || {}).name

// but if the data nested 5 or more levels deep, the code will more worse.
// and you cannot access nested array with this trick

// use reduce
// reduce is a very powerful method and it can be used to access nested objects

// pass the Access path as array
const getNestObject = (nestObject, pathArr) => {
  return pathArr.reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined
  }, nestObject)
}

child2Name = getNestObject(nestObject, ["child1", "child2", "name"])

console.log(child2Name)
