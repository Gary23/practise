'use strict';

// 对象扩展运算符
/**
 *  这是对象扩展运算符的写法，在参数的位置写 ...arg（...后加任意字符），函数内部就可以用arg这个数组来获取参数，主要用于不确定参数长度的情况，实际和arguments的使用很像。 
 */
function fun() {
	console.log(arguments.length <= 0 ? undefined : arguments[0]);
	console.log(arguments.length <= 1 ? undefined : arguments[1]);
	console.log(arguments.length <= 2 ? undefined : arguments[2]);
	console.log(arguments.length <= 3 ? undefined : arguments[3]);
	// 打印 1,2,3,undefined
}

fun(1, 2, 3);

/**
 * 这里虽然代码上只修改了arr2，但是由于arr1和arr2用一块内存空间，所以实际上也更改了arr1。
 */
var arr1 = ['a', 'b', 'c'];
var arr2 = arr1;
console.log(arr2); // ["a", "b", "c"]
arr2.push('d');
console.log(arr1); // ["a", "b", "c", "d"]


/**
 * 这样写便解决了上面的问题，...arr3表示将 arr3数组中的元素依次添加到arr4中，也就是说arr4是相当于新建一个数组，然后将arr3中的元素依次添加到新数组中，arr4并没有和arr3指向同一个内存中的空间
 */
var arr3 = ['a', 'b', 'c'];
var arr4 = [].concat(arr3);
console.log(arr4); // ["a", "b", "c"]
arr2.push('d');
console.log(arr3); // ["a", "b", "c"]


// rest运算符 ...
/**
 * 从示例可以看出，rest运算符适用于知道前面的一部分参数的数量，而又对于后面剩余的参数数量未知的情况。
 */
function fun1(first) {
	console.log(first); // 0

	for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		arg[_key - 1] = arguments[_key];
	}

	console.log(arg.length); // 5

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = arg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var val = _step.value;

			console.log(val); // 1,2,3,4,5
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}
fun1(0, 1, 2, 3, 4, 5);