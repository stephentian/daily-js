## Promise 学习

### 1. 链式调用

在过去

```
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

通过新式函数, then 里的参数是可选的

```
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

### 2. Catch 的后续操作

```
new Promise((resolve, reject) => {
    console.log('Initial')
    resolve()
  })
  .then(() => {
    throw new Error('Something failed')

    console.log('Do this')
  })
  .catch(() => {
    console.log('Do that')
  })
  .then(() => {
    console.log('Do this whatever happened before')
  })
```

### 3. 创建一个 Promise

```
const myFirstPromise = new Promise((resolve, reject) => {
做一些异步操作,最终会调用下面两者之一
resolve(someValue)
或
reject("failure reason")
})
```

让某个函数有 Promise 功能，只需返回一个 Promise 即可
比如封装一个 get 请求

```
function myAsyncFunc(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}
```

### 4. 解决回调地狱

使用 Promise 前

```
let fs = require('fs')
fs.readFile('./a.txt','utf8',function(err,data){
  fs.readFile(data,'utf8',function(err,data){
    fs.readFile(data,'utf8',function(err,data){
      console.log(data)
    })
  })
})
```

使用 Promise 后

```
let fs = require('fs')
function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', function(error, data) {
      error && reject(error)
      resolve(data)
    })
  })
}

readFile('./a.txt').then(data => {
  return readFile(data)
}).then(data => {
  return readFile(data)
}).then(data => {
  console.log(data)
})
```
