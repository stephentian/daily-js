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
    // 是：从末尾添加元素
    // 否：从 start 位置开始操作
// 2. 小于 0
    // -n 表示 倒数第 n 个元素。等价于 arr.length - n
    // n 大于 arr.length，则表示开始位置为第 0 位。

function ComputeSpliceStartIndex(start_i, len) {
    if (start_i < 0) {
        start_i += len
        return start_i < 0 ? 0 : start_i
    }

    return start_i > len ? len : start_i
}

// delete_count
// 1. 被省略，或者 它大于 arr.length - start
    // start 和 start 后面的所以元素都被删除
// 2. 小于 0
    // 不移除元素

function ComputeSpliceDeleteCount(delete_count, num_arguments, len, start_i) {
    if (num_arguments == 1) {
        return len - start_i
    }
    
    let del_count = delete_count
    if (del_count < 0) {
        return 0
    }

    if (del_count > len - start_i) {
        return len - start_i
    }
    return del_count
}

// 拷贝需要删除的元素
// SparseSlice

function SparseSlice(array, start_i, del_count, deleted_elements) {
    for (let i = 0; i < del_count; i++) {
        const element = array[start_i + i];
        deleted_elements[i] = element
    }
}

// 移动元素
// SparseMove
function SparseMove(array, start_i, del_count, num_elements_to_add) {
    if (num_elements_to_add === del_count)  return

    let new_array = new Array(array.length - del_count + num_elements_to_add)

    for (let i = 0; i < new_array.length; i++) {
        if (i < start_i) {
            new_array[i] = array[i]
        } else if (num_elements_to_add < del_count && i >= start_i + (del_count - num_elements_to_add)) {
            // 如果 添加数目 < 删除数目，i 填充位为 start_i + (del_count - num_elements_to_add)
            new_array[i] = array[i+(del_count - num_elements_to_add)]
        } else if (num_elements_to_add > del_count && i >= start_i + num_elements_to_add) {
            new_array[i] = array[i-(num_elements_to_add - del_count)]
        } else {
            continue
        }
    }
    console.log('new_array：', new_array)

    // array = new_array
    return new_array
}

function ArraySplice(start, delete_count, ...item) {
    let num_arguments = arguments.length
    let array = Object(this)
    let len = array.length;

    let start_i = ComputeSpliceStartIndex(start, len)
    let del_count = ComputeSpliceDeleteCount(delete_count, num_arguments, len, start_i)
    
    let deleted_elements = new Array(del_count)
    let num_elements_to_add = item ? item.length : 0

    console.log('array: ', array)
    console.log('len: ', len)
    console.log('start_i: ', start_i)
    console.log('del_count: ', del_count)
    console.log('num_elements_to_add: ', num_elements_to_add)

    SparseSlice(array, start_i, del_count, deleted_elements)
    array = SparseMove(array, start_i, del_count, num_elements_to_add)

    // 添加/替换元素
    let i = start_i
    let j = 0
    while (j < item.length) {
        array[i++] = item[j++]
    }

    console.log('array: ', array)
    console.log('deleted_elements: ', deleted_elements)

    return deleted_elements
}

const months = ['Jan', 'March', 'April', 'June']

var splice1 = ArraySplice.bind(months)

splice1(1, 0, 'Feb')
splice1(4, 1, 'May')