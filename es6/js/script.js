// Array.from方法

// json数组格式

// es6中，数组的相关操作都放到了Array对象中。jsonp的数组格式key值必须是数字字符串才可以转换为数组。length属性也是必须的。

let json = {
	'0': 'price',
	'1': 'sale',
	'2': 'cart',
	length: 3
}

let arr = Array.from(json);
console.log(arr);

// Array.of方法
// 这个方法的作用是把字符串转为数组

let arr1 = Array.of('3','4','5','6');
console.log(arr1);

// find() 实例方法（声明好Array实例之后的方法叫做实例方法）
// 在数组中查找匹配条件的数组中的数组元素
// value 是当前查找的值
// index 是当前查找的值得索引
// arr 数组原型
let arr2 = [1,2,3,4,5,6,7];
console.log(arr2.find(function(value, index, arr){
	return value > 5;   // 打印6 如果不匹配条件则返回undefined
}))
