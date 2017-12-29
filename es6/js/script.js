// fill  实例方法

// 作用是替换数组中的元素,接收三个参数，第一个是要替换的内容，第二个是原数组要替换的开始索引位置，第三个是替换结束位置，要注意的是第二个参数数组的索引，也从0开始的，第三个参数是数组元素的长度，也就是从1开始的。比如下面的例子就是要从第二个替换到第三个

let arr4 = ['price', 'sale', 'cart'];

arr4.fill('web', 1, 3);
console.log(arr4);   // 打印 ['price', 'web', 'web']



// for of 数组循环

// 用来代替原本的for循环，of 前面声明的变量永远是 of 后面的数组的每一个元素。而根据数组使用不同的方法可以改变item的值。

let arr5 = ['price', 'sale', 'cart'];

// 默认情况下item是数组的每个元素的值

for ( let item of arr5 ) {
	console.log(item);  // 分别打印 price  sale  cart.
}

// 数组使用keys方法则item是数组的索引

for ( let item of arr5.keys() ) {
	console.log(item)  // 分别打印 0 1 2
}

// 使用entries方法是生成数组条目，item是数组的每一个条目，此时item是一个数组

for ( let item of arr5.entries() ) {
	console.log(item)  // 分别打印 [0, 'price'] [1, 'sale'] [2, 'cart']
}

// 将item改为数组，这样就可以分别接收数组的索引和值。

for ( let [index, val] of arr5.entries() ) {
	console.log(index)  // 分别打印 0 1 2
	console.log(val)  // 分别打印 price  sale  cart
}

// entries

// 生成数组条目，生成条目的优点是可以手动循环数组，手动循环的用处是当每次循环要执行的东西规则都不一样时，就很方便操作。

// 假设下面打印的符号就是三条不规则的执行语句

let arr6 = ['price', 'sale', 'cart'];

let list = arr6.entries();

// .next()方法就是手动执行下一次循环的方法
console.log(list.next().value);   // 打印 [0, 'price']
console.log('-----')
console.log(list.next().value);   // 打印 [1, 'sale']
console.log('*****')
console.log(list.next().value);   // 打印 [2, 'cart']
console.log('=====')

