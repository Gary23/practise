// 对象的函数解构
// 如果在函数中传的参数是对象中的一个属性值，在es5中就要从对象中获取这个属性值。而通过es6的函数的解构功能，直接传递这个对象就可以。
// 函数的参数必须是对象中的属性名，顺序是无所谓的，函数中需要什么属性值就在形参中写其属性名即可。注意要写大括号。
let json = {
	a: 'js',
	b: 'html'
}

function fun({a, b}) {
	console.log(a, b);  // 打印 js html
}

fun(json);


// 数组的函数解构
// 使用方式和对象的函数解构相同，区别就是数组作为参数必须按顺序获取，不用加大括号，实际上的用途并没有对象的函数解构多。
let arr = ['html', 'js', 'css'];

function fun1(a, b, c) {
	// console.log(arg[0]);
	console.log(a, b, c);  // 打印 html js css
}

fun1(...arr);

// in运算符 的用法

// in运算符的作用是通过索引来判断数组里有没有值。

// es5中判断有没有值的方式是判断数组的length，这样的缺点是如果数组是这样 `[,,,]` ，那么length为3，但实际上是空的。这样很大可能会对之后的代码造成影响。在es6中用in来判断就可以解决这个问题。

let arr1 = ['html',,,];
console.log(0 in arr1);  // 打印 true
console.log(1 in arr1);  // 打印 false
console.log(2 in arr1);  // 打印 false

