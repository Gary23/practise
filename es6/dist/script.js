'use strict';

// map的声明和赋值

// map 比 Set 用的更加广泛。

// map 的灵活性比 json 更加优秀，像下面这种 json.name 的获取 value 的方式实际上是遍历了整个 json 对象。

var json = {
	name: 'tim',
	skill: 'web'
};
console.log(json.name); // tim

// map就是用箭头声明 key 和 value，可以是任何数据类型。

var map = new Map();
map.set(json, 'Iam');
console.log(map); // {{name: "tim", skill: "web"} => "Iam"}

// 上面的例子就体现了 key 可以是任何数据类型，这里 => 前面的就是 key 之后的就是 value。同样 value 也可以是任何数据类型

// map 的长度

// 和数组查看长度一样，通过 size 来查看 map 中有多少条数据。

console.log(map.size); // 1

// map 的增删查

map.set('Iam', json); // {{name: "tim", skill: "web"} => "Iam", "Iam" => {name: "tim", skill: "web"}}
console.log(map);
console.log(map.has('Iam')); // true
console.log(map.has('Iam`')); // false
console.log(map.get(json)); // Iam
console.log(map.get('Iam')); // {name: "tim", skill: "web"}
map.delete(json);
console.log(map); // {"Iam" => {name: "tim", skill: "web"}}
map.clear();
console.log(map); // {}