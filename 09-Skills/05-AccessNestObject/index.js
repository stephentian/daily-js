/**
 * author: stephentian
 * email: tianre96@gmail.com
 * day: 2020-04-29
 **/

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
      // child3: {
      //   name: "child3",
      // },
    },
  },
}

let child1Name = nestObject.child1.name

child1Name = nestObject && nestObject.child1 && nestObject.child1.name

let child2Name

child2Name =
  nestObject && nestObject.child1 && nestObject.child1.child2
    ? nestObject.child1.child2.name
    : ""

child2Name = (((nestObject || {}).child1 || {}).child2 || {}).name

// pass the Access path as array
const getNestObject = (nestObject, pathArr) => {
  return pathArr.reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined
  }, nestObject)
}

child2Name = getNestObject(nestObject, ["child1", "child2", "name"])

console.log(child2Name)

// ---- update nest object

/**
 * @param path: array
 **/

const setNestObject = (nestObject, pathArr, val) => {
  if (!pathArr || pathArr.length === 0) {
    return
  }

  // the end
  if (pathArr.length === 1) {
    nestObject[pathArr[0]] = val
    return true
  }

  // if the property is a Object
  // the property doesn't exists or not a Object
  if (
    !nestObject.hasOwnProperty(pathArr[0]) ||
    typeof nestObject[pathArr[0]] !== "object"
  ) {
    nestObject[pathArr[0]] = typeof pathArr[1] === "number" ? [] : {}
  }
  return setNestObject(nestObject[pathArr[0]], pathArr.slice(1), val)
}
