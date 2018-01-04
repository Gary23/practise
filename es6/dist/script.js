'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Symbol

// Symbol是es6中新增加的数据类型。是原始数据类型。

// 声明

var s = Symbol();
console.log(typeof s === 'undefined' ? 'undefined' : _typeof(s)); // Symbol

var skill = Symbol('web');
console.log(skill);
console.log(skill.toString());