'use strict';

<<<<<<< HEAD
// Array.from方法

// json数组格式

// es6中，数组的相关操作都放到了Array对象中。jsonp的数组格式key值必须是数字字符串才可以转换为数组。length属性也是必须的。

=======
// 对象的函数解构
// 如果在函数中传的参数是对象中的一个属性值，在es5中就要从对象中获取这个属性值。而通过es6的函数的解构功能，直接传递这个对象就可以。
// 函数的参数必须是对象中的属性名，顺序是无所谓的，函数中需要什么属性值就在形参中写其属性名即可。注意要写大括号。
>>>>>>> add394510a386786d3e5cf724ed6955de3b7a934
var json = {
	a: 'js',
	b: 'html'
};

<<<<<<< HEAD
var arr = Array.from(json);
console.log(arr);

// Array.of方法
// 这个方法的作用是把字符串转为数组

var arr1 = Array.of('3', '4', '5', '6');
console.log(arr1);

// find() 实例方法（声明好Array实例之后的方法叫做实例方法）
// 在数组中查找匹配条件的数组中的数组元素
// value 是当前查找的值
// index 是当前查找的值得索引
// arr 原型
var arr2 = [1, 2, 3, 4, 5, 6, 7];
console.log(arr2.find(function (value, index, arr) {
	console.log(value);
	console.log(index);
	console.log(arr);
	return value > 5; // 打印6 如果不匹配条件则返回undefined
}));
=======
function fun(_ref) {
	var a = _ref.a,
	    b = _ref.b;

	console.log(a, b); // 打印 js html
}

fun(json);

// 数组的函数解构
var arr = ['html', 'js', 'css'];

function fun1() {
	console.log(arguments.length <= 0 ? undefined : arguments[0]);
	// console.log(a, b, c);  // 打印 html js css
}

fun1.apply(undefined, arr);
>>>>>>> add394510a386786d3e5cf724ed6955de3b7a934
