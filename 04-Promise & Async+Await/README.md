# Promise 及 Async + Await 学习

- **[Promise](#promise)**
- **[Async + Await](#async--await)**
- **[异步函数的比较](#异步函数的比较)**
- **[避免太过循序](#避免太过循序)**

## Promise

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

## Async + Await

### 1. 与其他异步操作的对比

先定义一个 Fetch 方法

```
var fetch = require('node-fetch')

function fetchUser() {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/users/stephentian')
      .then((res) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
  })
}
```

(1) Promise 方式, 使用上面封装好的函数

```
function getUserByPromise() {
  fetchUser()
    .then((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
}
getUserByPromise()
```

Promise 的方式虽然解决了 callback hell
但是这种方式充满了 Promise 的 then() 方法，如果处理流程复杂的话，整段代码将充满 then

(2) Generator 方式

```
function* fetchUserByGenerator() {
  const user = yield fetchUser()
  return user
}
const g = fetchUserByGenerator()
const result = g.next().value
result.then((v) => {
  console.log(v)
}, (error) => {
  console.log(error)
})
```

(3) Async 方式

```
async function getUserBuAsync() {
  let user = await fetchUser()
  return user
}
getUserBuAsync()
  .then(v => console.log(v))
```

### 2. async 返回一个 Promise 对象

```
async function f() {
  return "Hello World"
}
f().then(v => console.log(v))
```

如果 async 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 reject 状态
抛出的错误而会被 catch 方法回调函数接收到

```
async function e() {
  throw new Error('error!')
}
e().then(v => console.log(v))
  .catch(err => console.log(err))
```

### 3. Async 其他函数的用法

(1) 箭头函数

```
// map some URLs to json-promises
const jsonPromises = urls.map(async url => {
  const response = await fetch(url);
  return response.json();
});
```

> array.map(func) 不在乎我提供给它的是不是异步函数，只把它当作一个返回 Promise 的函数来看待
> 它不会等到第一个函数执行完毕就会调用第二个函数

(2) 对象方法

```
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars')
    return cache.match(`/avatars/${name}.jpg`)
  }
}
storage.getAvatar('abcsss').then()
```

(3) 类方法

```
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars')
  }

  async getAvatar(name) {
    const cache = awat this.cachePromise
    return cache.match(`/avatars/${name}.jpg`)
  }
}

const storage = new Storage()
storage.getAvatar('aabbb').then()
```

> 类构造函数以及 getter/settings 方法不能是异步的

## 异步函数的比较

假设我们想获取某个网址并以文本形式记录响应日志

**Promise 编写代码**

```
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
```

**利用异步函数 Async + Await 具有相同作用的代码**

```
async function logFetch(url) {
    try {
      const response = await fetch(url);
      console.log(await response.text());
    }
    catch (err) {
      console.log('fetch failed', err);
    }
}
```

> 代码行数虽然相同，但去掉了所有回调
> 这可以提高代码的可读性，对不太熟悉 Promise 的人而言，帮助就更大了

## 避免太过循序

尽管编写的是看似同步的代码，也一定不要错失并行执行的机会

```
async function series() {
  await wait(500);
  await wait(500);
  return "done!";
}
```

以上代码执行完毕需要 1000 毫秒

```
asyc function parallel() {
  const wait1 = wait(500)
  const wait2 = wait(500)
  await wait1
  await wait2
  return 'done!'
}
```

以上代码只需 500 毫秒就可执行完毕，因为两个 wait 是同时发生的

**按顺序输出获取的数据**
假定我们想获取一系列网址，并尽快按正确顺序将它们记录到日志中

```
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

如果使用异步函数改写以上代码，又容易让代码变得过于循序

```
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

**推荐的编码方式** - 可读性强、并行效率高

```
async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

以并行方式获取和读取网址，但将“智能”的 reduce 部分替换成标准单调乏味但可读性强的 for 循环
