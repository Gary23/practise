'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// class 类

// 其实在 es5 中就已经开始模拟 class，而 es6 不需要再模拟了已经实现了。

// 类的名称首字母最好大写，比较规范，类的内部都是方法，如果有属性要写在 constructor 方法里面。最重要的是方法之间不要去加逗号。

// 在类的方法内部，this 指向的是这个类本身，所以可以通过 this 调用类的其他方法。方法之间相互获取值的时候不要忘记 return，负责会是 undefined。

var Coder = function () {
	function Coder() {
		_classCallCheck(this, Coder);
	}

	_createClass(Coder, [{
		key: 'name',
		value: function name(val) {
			console.log(val);
			return val;
		}
	}, {
		key: 'skill',
		value: function skill(val) {
			console.log(this.name('tim') + ':' + 'skill-' + val);
		}
	}]);

	return Coder;
}();

var coder = new Coder();

coder.name('tim'); // tim

coder.skill('web'); // tim:skill-web

// 上面例子中的 val 参数是类函数 name 方法的参数，而不是类的参数。这是有区别的。如果要给类传递参数，需要 constructor 方法，constructor 的参数都是属于类的参数。

var Coder1 = function () {
	function Coder1(a, b) {
		_classCallCheck(this, Coder1);

		this.a = a;
		this.b = b;
	}

	_createClass(Coder1, [{
		key: 'add',
		value: function add() {
			return this.a + this.b;
		}
	}]);

	return Coder1;
}();

var coder1 = new Coder1(1, 2);

console.log(coder1.add()); // 3

// 类的继承

var htmler = function (_Coder) {
	_inherits(htmler, _Coder);

	function htmler() {
		_classCallCheck(this, htmler);

		return _possibleConstructorReturn(this, (htmler.__proto__ || Object.getPrototypeOf(htmler)).apply(this, arguments));
	}

	return htmler;
}(Coder);

var coder2 = new htmler();

coder2.name('jack'); //