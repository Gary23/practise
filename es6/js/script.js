// 用proxy进行预处理

// Proxy 就是代理的意思。

// Proxy 在 ES6 中作用是增强函数和对象。增强的是声明周期。相当于于一种钩子函数，只不过是在处理任何方法之前进行的，所以叫做预处理。

// es5 中对象的声明和使用

let obj = {
	add: function(val) {
		return val + 100;
	},
	name: 'tim'
}
console.log(obj.add(100))   // 200
console.log(obj.name)   // tim

// es5 这种方式如果要在 obj 声明之前先处理一些东西就要再写一个方法。Proxy 就是为了解决这个问题。

// Proxy 的声明

// Proxy 声明时传递两个参数，第一个就是对象的内容，第二个就是预处理的内容，都是对象的数据结构。

let pro = new Proxy({
	add: function(val) {
		return val + 100;
	},
	name: 'tim'
},{

})