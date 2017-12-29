'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// fill  实例方法

// 作用是替换数组中的元素,接收三个参数，第一个是要替换的内容，第二个是原数组要替换的开始索引位置，第三个是替换结束位置，要注意的是第二个参数数组的索引，也从0开始的，第三个参数是数组元素的长度，也就是从1开始的。比如下面的例子就是要从第二个替换到第三个

var arr4 = ['price', 'sale', 'cart'];

arr4.fill('web', 1, 3);
console.log(arr4); // 打印 ['price', 'web', 'web']


// for of 数组循环

// 用来代替原本的for循环，of 前面声明的变量永远是 of 后面的数组的每一个元素。而根据数组使用不同的方法可以改变item的值。

var arr5 = ['price', 'sale', 'cart'];

// 默认情况下item是数组的每个元素的值

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = arr5[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var item = _step.value;

		console.log(item); // 分别打印 price  sale  cart.
	}

	// 数组使用keys方法则item是数组的索引
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

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = arr5.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var _item = _step2.value;

		console.log(_item); // 分别打印 0 1 2
	}

	// 使用entries方法是生成数组条目，item是数组的每一个条目，此时item是一个数组
} catch (err) {
	_didIteratorError2 = true;
	_iteratorError2 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion2 && _iterator2.return) {
			_iterator2.return();
		}
	} finally {
		if (_didIteratorError2) {
			throw _iteratorError2;
		}
	}
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
	for (var _iterator3 = arr5.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
		var _item2 = _step3.value;

		console.log(_item2); // 分别打印 [0, 'price'] [1, 'sale'] [2, 'cart']
	}

	// 将item改为数组，这样就可以分别接收数组的索引和值。
} catch (err) {
	_didIteratorError3 = true;
	_iteratorError3 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion3 && _iterator3.return) {
			_iterator3.return();
		}
	} finally {
		if (_didIteratorError3) {
			throw _iteratorError3;
		}
	}
}

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
	for (var _iterator4 = arr5.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
		var _ref = _step4.value;

		var _ref2 = _slicedToArray(_ref, 2);

		var index = _ref2[0];
		var val = _ref2[1];

		console.log(index); // 分别打印 0 1 2
		console.log(val); // 分别打印 price  sale  cart
	}

	// entries

	// 生成数组条目，生成条目的优点是可以手动循环数组，手动循环的用处是当每次循环要执行的东西规则都不一样时，就很方便操作。

	// 假设下面打印的符号就是三条不规则的执行语句
} catch (err) {
	_didIteratorError4 = true;
	_iteratorError4 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion4 && _iterator4.return) {
			_iterator4.return();
		}
	} finally {
		if (_didIteratorError4) {
			throw _iteratorError4;
		}
	}
}

var arr6 = ['price', 'sale', 'cart'];

var list = arr6.entries();

// .next()方法就是手动执行下一次循环的方法
console.log(list.next().value); // 打印 [0, 'price']
console.log('-----');
console.log(list.next().value); // 打印 [1, 'sale']
console.log('*****');
console.log(list.next().value); // 打印 [2, 'cart']
console.log('=====');