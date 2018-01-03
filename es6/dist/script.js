'use strict';

// 对象的函数解构
// 如果在函数中传的参数是对象中的一个属性值，在es5中就要从对象中获取这个属性值。而通过es6的函数的解构功能，直接传递这个对象就可以。
// 函数的参数必须是对象中的属性名，顺序是无所谓的，函数中需要什么属性值就在形参中写其属性名即可。注意要写大括号。
var json = {
	a: 'js',
	b: 'html'
};

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
