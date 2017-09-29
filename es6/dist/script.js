'use strict';

/**
 * 变量的解构赋值。
 * 可以用于 请求返回的json数据。
 */

// let a = 0;
// let b = 1;
// let c = 2;

// 和上面是相同的作用,这就相当于解构了一个数组。
var a = 0,
    b = 1,
    c = 2;

// 但是两边数组的结构必须一样，如果是[d,e,f] = [4,[5,6]] 这样就会报错。
// 效果等同于 var d = 4,e = 5;f = 6;

var d = 4,
    e = 5,
    f = 6;

// 有时解构可以设置一个默认值

var _ref = [],
    _ref$ = _ref[0],
    foo = _ref$ === undefined ? 'true' : _ref$;

console.log(foo);