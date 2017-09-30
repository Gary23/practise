'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ref = [1],
    a = _ref[0],
    b = _ref[1],
    _ref$ = _slicedToArray(_ref[2], 1),
    z = _ref$[0];

console.log(a);
console.log(b);

var _j = 'j',
    _j2 = _slicedToArray(_j, 2),
    e = _j2[0],
    _j2$ = _slicedToArray(_j2[1], 1),
    f = _j2$[0];

console.log(e);
console.log(f);