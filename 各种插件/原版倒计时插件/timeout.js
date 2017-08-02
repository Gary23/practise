
// 通用倒计时，包括倒计时所在容器，倒数秒数，显示方式，回调。
/**
 * 现在的功能是传入元素、{start时间长度,secondOnly是否只显示秒数,读完秒的回调}
 * 要增加的功能：
 * 1、现在读秒时如果不够1小时那么不会显示00时，而是直接取消小时,要改成可以选择是否消失
 * 2、现在时间和单位都是一个整体的值,要改成时间和单位分开元素展示,可以选择传入字号、字体、颜色
 * @param {*} element 
 * @param {*} options 
 */
function countdown(element, options){
    var self = this;
    console.log(self);
    options = $.extend({
        start: 60,
        secondOnly: false,
        callback: null
    }, options || {});
    var t = options.start;      // 开始秒数
    var sec = options.secondOnly;
    var fn = options.callback;
    var d = +new Date();
    var diff = Math.round((d + t * 1000) / 1000);   // 结束时间
    this.timer = timeout(element, diff, fn);    // 参数:限时元素\结束时间\回调
    this.stop = function() {
        clearTimeout(self.timer);
    };

    function timeout(element, until, fn) {
        var str = '',
            started = false,
            left = {d: 0, h: 0, m: 0, s: 0, t: 0},
            current = Math.round(+new Date() / 1000),
            data = {d: '天', h: '时', m: '分', s: '秒'};

        left.s = until - current;   // 实际秒数 = 截止秒数 - 现在秒数

        if (left.s < 0) {
            return;
        }
        else if(left.s == 0) {      // 到时间后执行回调
            fn && fn();
        }
        if(!sec) {
            if (Math.floor(left.s / 86400) > 0) {
              left.d = Math.floor(left.s / 86400);  // 算实际秒数有多少天
              left.s = left.s % 86400;  // 算去掉那些天数后的秒数
              str += left.d + data.d;   // 实际显示的 10天
              started = true;   
            }
            if (Math.floor(left.s / 3600) > 0) {
              left.h = Math.floor(left.s / 3600);   // 算实际秒数有多少小时
              left.s = left.s % 3600;   // 算去掉那些小时的秒数
              started = true;
            }
        }
        if (started) {
          str += ' ' + left.h + data.h;     // 实际显示的 10时
          started = true;
        }
        if(!sec) {
            if (Math.floor(left.s / 60) > 0) {
              left.m = Math.floor(left.s / 60);     // 算实际有多少分钟
              left.s = left.s % 60;     // 算去掉那些分钟的秒数
              started = true;
            }
        }
        if (started) {
          str += ' ' + left.m + data.m;     // 实际显示的分钟 20分
          started = true;
        }
        if (Math.floor(left.s) > 0) {   
          started = true;
        }
        if (started) {
          str += ' ' + left.s + data.s;
          started = true;
        }

        $(element).html(str);
        return setTimeout(function() {timeout(element, until,fn);}, 1000);
    }
}