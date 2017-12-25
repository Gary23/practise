'use strict';

// json数组格式

// es6中，数组的相关操作都放到了Array对象中。jsonp的数组格式key值必须是数字字符串才可以转换为数组。length属性也是必须的。

var json = {
	'0': 'price',
	'1': 'sale',
	'2': 'cart',
	length: 3
};

var arr = Array.from(json);
console.log(arr);