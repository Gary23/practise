// Symbol

// Symbol 是 es6 中新增加的数据类型。是原始数据类型。

// 声明

let s = Symbol();
console.log(typeof s);   // Symbol

let skill = Symbol('web');
console.log(skill);   // Symbol(web)   Symbol类型
console.log(skill.toString());   // Symbol(web)  这里转为了字符串


// Symbol 在对象中的应用

// 在 node 中的用处比较大，在页面中的用处不是很大











