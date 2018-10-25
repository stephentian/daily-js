/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-10-25
 **/

// 链式调用

// const promise = doSomething()
// const promise2 = promise.then(successCallback, failureCallback)
// 或者
// const promise2 = doSomething().then(successCallback, failreCallback)

// 在过去

// doSomething(function(result) {
//   doSomethingElse(result, function(newResult) {
//     doThirdThing(newResult, function(finalResult) {
//       console.log('Got the final result: ' + finalResult);
//     }, failureCallback);
//   }, failureCallback);
// }, failureCallback);

// 通过新式函数, then里的参数是可选的

// doSomething().then(function(result) {
//   return doSomethingElse(result);
// })
// .then(function(newResult) {
//   return doThirdThing(newResult);
// })
// .then(function(finalResult) {
//   console.log('Got the final result: ' + finalResult);
// })
// .catch(failureCallback);

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
