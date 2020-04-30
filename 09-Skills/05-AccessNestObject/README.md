# Access Nested Object

> 访问嵌套对象

- [Get Nested Object 获取嵌套对象](#get-nested-object)
- [更新嵌套对象](#update-nested-object)

## Get Nested Object

javascript is wired, one of those things is the error when I try to access a nested object:

`cannot read property 'xxx' of undefined`

```js
const nestObject = {
  id: "1",
  name: "nestObject",
  options: [
    {
      item1: "item1",
      childItem: {
        name: "childItem",
      },
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
```

to access the name of child1, the most usual way

```js
let child1Name = nestObject.child1.name

child1Name = nestObject && nestObject.child1 && nestObject.child1.name
```

and if you want access the name of child2

```js
let child2Name

child2Name =
  nestObject && nestObject.child1 && nestObject.child1.child2
    ? nestObject.child1.child2.name
    : ""

// or you can pick this trick

child2Name = (((nestObject || {}).child1 || {}).child2 || {}).name

// you cannot access nested array with this trick
```

the code look really messy, and if the data nested 5 or more levels deep, the code will more worse.

### Reduce

Reduce is a very powerful method and it can be used to access nested objects

pass the Access path as Array

```js
const getNestObject = (nestObject, pathArr) => {
  return pathArr.reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined
  }, nestObject)
}
```

or pass the Access path as String

```js
const getNestObject2 = (nestObject, pathString) => {
  let pathArr = Array.isArray(pathString) ? pathString : pathString.split(".")
  return pathArr.reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined
  }, nestObject)
}

child2Name = getNestObject(nestObject, ["child1", "child2", "name"])

console.log(child2Name)
```

## Update Nested Object

Set the `nestOject.chlid1.child2.child3` property

```js
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
```

```js
const setNestObject = (nestObject, pathArr, val) => {
  if (!pathArr || pathArr.length === 0) {
    return
  }

  if (pathArr.length === 1) {
    nestObject[pathArr[0]] = val
    return true
  }

  if (
    !nestObject.hasOwnProperty(pathArr[0]) ||
    typeof nestObject[pathArr[0]] !== "object"
  ) {
    nestObject[pathArr[0]] = typeof pathArr[1] === "number" ? [] : {}
  }
  return setNestObject(nestObject[pathArr[0]], pathArr.slice(1), val)
}
```
