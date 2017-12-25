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

// 图片url: http://picabstract.preview.ftn.qq.com:8080/ftn_pic_abs_v2/72cfec93fb96c8caf4c2b3b7f48a7345cb2d0845a5290b0d0baf7841a99c1e6f55af7d68fa61cfe2bb27deee992e27b5?pictype=scale&from=30113&version=2.0.0.2&uin=406490508&fname=20171223-4.png&size=1024