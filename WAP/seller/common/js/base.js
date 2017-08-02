// 判断浏览器是否加载完DOM
// addDomLoaded(function(){})
function addDomLoaded(fn) {
    var isReady = false,
        timer = null;

    if (document.addEventListener) {         // 高版本浏览器标准(W3C标准)
        addEvent(document, 'DOMContentLoaded', function () {
            fn();
            removeEvent(document, 'DOMContentLoaded', arguments.callee);    // 匿名函数没有具体的函数名，就可以用arguments.callee获取
        });
    } 
}