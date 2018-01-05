// class 类

// 其实在 es5 中就已经开始模拟 class，而 es6 不需要再模拟了已经实现了。

// 类的名称首字母最好大写，比较规范，类的内部都是方法，如果有属性要写在 constructor 方法里面。最重要的是方法之间不要去加逗号。

// 在类的方法内部，this 指向的是这个类本身，所以可以通过 this 调用类的其他方法。方法之间相互获取值的时候不要忘记 return，负责会是 undefined。

class Coder {
	name(val) {
		console.log(val);
		return val;
	}
	skill(val) {
		console.log(this.name('tim') + ':' + 'skill-' + val);
	}
}

let coder = new Coder;

coder.name('tim');   // tim

coder.skill('web')   // tim:skill-web

// 上面例子中的 val 参数是类函数 name 方法的参数，而不是类的参数。这是有区别的。如果要给类传递参数，需要 constructor 方法，constructor 的参数都是属于类的参数。

class Coder1 {
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}
	add() {
		return this.a + this.b
	}
}

let coder1 = new Coder1(1, 2);

console.log(coder1.add());  // 3

// 类的继承

// 下面的例子是 htmler 类继承自 Coder 类，Coder类是父类。

class htmler extends Coder{

}

let coder2 = new htmler;

coder2.name('jack')   // jack

// 这里虽然 htmler 类是空的，但是因为继承自 Coder 类，所以也有 name 方法。