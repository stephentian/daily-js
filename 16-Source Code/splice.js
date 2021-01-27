/**
 * author: stephentian
 */

// 实现 Array.prototype.splice

// ES5 规范
// https://262.ecma-international.org/5.1/#sec-15.4.4.12
// ES6 规范
// https://262.ecma-international.org/6.0/#sec-array.prototype.splice

// splice 参数：
// 1. start 
    // 起始位
// 2. delete_count
    // 可选，移除数组元素个数
// 3. item1, item2, ...
    // 可选，添加数组元素

// 返回值:
// 被删元素组成的数组。


// start
// 1. 超出数组长度 
// 2. 小于 0

function ComputeSpliceStartIndex(start_i, len) {
    if (start_i < 0) {
        start_i += len
        return start_i < 0 ? 0 : start_i
    }

    return start_i > len ? len : start_i
}

// delete_count
// 1. 是否有 delete_count
// 2. 小于 0
// 3. 大于 start_i 后面的元素数目

function ComputeSpliceDeleteCount(deleteCount, num_arguments, len, start_i) {
    let del_count = deleteCount
    if (num_arguments == 1) {
        return len - start_i
    }

    if (del_count < 0) {
        return 0
    }

    if (del_count > len - start_i) {
        return len - start_i
    }
    return del_count
}

function ArraySplice(start, delete_count, ...item) {
    let array = Object(this)
    let num_arguments = arguments.length
    let len = array.length;

    let start_i = ComputeSpliceStartIndex(start, len)
    let del_count = ComputeSpliceDeleteCount(delete_count, num_arguments, len, start_i)
    
}