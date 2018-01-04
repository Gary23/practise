// Promise

// 在es5中，有一种回调地狱的比喻，指的就是层级特别深的回调函数，一层函数套着一层函数套了很多层，这样非常不便于后期维护代码。由此便有了es6中的promise。

// 要是用 promise 的函数要接收两个参数，resolve（成功时调用） 和 reject（失败时调用），调用时需要传递相应参数，参数可以是字符串、代码、业务逻辑等等。

let state = 1;

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

new Promise(step1)
.then(function(val) {
	console.log(val);
	return new Promise(step2);
})
.then(function(val) {
	console.log(val);
	return new Promise(step3);
})
.then(function(val) {
	console.log(val);
});

// 最终打印:
/**
第一步-注册
第一步-完成
第二步-登录
第二步-完成
第三步-购物
第三步-完成
 */

// 上面的例子中 then 方法中的匿名函数的 val 就是 resolve 或者 reject 传递的参数。

// 在 es5 中 step2 肯定是 step1 的回调，step3 肯定是 step2 的回调。如果回调太多，就会很乱难以维护，通过 promise 的 then 方法就解决了这个问题。