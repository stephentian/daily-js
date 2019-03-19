// 默认参数

// js

function A(a, b) {
    if (b == null) {
        b = 0
        a = 1
    }
    console.log(a)
}

// es6

function B(a, b = 0) {
    a = 1
    console.log(a, b)
}
