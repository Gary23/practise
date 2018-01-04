'use strict';

// Promise

// 在es5中，有一种回调地狱的比喻，指的就是层级特别深的回调函数，一层函数套着一层函数套了很多层，这样非常不便于后期维护代码。由此便有了es6中的promise。

// 要是用 promise 的函数要接收两个参数，resolve（成功时调用） 和 reject（失败时调用），调用时需要传递相应参数，参数可以是字符串、代码、业务逻辑等等。

var state = 1;

function step1(resolve, reject) {
	console.log('第一步-注册');
	if (state == 1) {
		resolve('第一步-完成');
	} else {
		reject('第一步-失败');
	}
}

function step2(resolve, reject) {
	console.log('第二步-登录');
	if (state == 1) {
		resolve('第二步-完成');
	} else {
		reject('第二步-失败');
	}
}

function step3(resolve, reject) {
	console.log('第三步-购物');
	if (state == 1) {
		resolve('第三步-完成');
	} else {
		reject('第三步-失败');
	}
}

new Promise(step1).then(function (val) {
	console.log(val);
	return new Promise(step2);
}).then(function (val) {
	console.log(val);
	return new Promise(step3);
}).then(function (val) {
	console.log(val);
});