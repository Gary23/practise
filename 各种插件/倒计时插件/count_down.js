(function ($) {


    $.fn.countDown = function (option) {


        // 参数有效性和默认值
        // if (!element || typeof element !== 'string') return false;

        var _this = this;

        // 初始化通用参数
        var time = option.time || 60,
            type = option.type || 0,
            bgColor = option.bgColor || 'transparent',
            color = option.color || '#ffffff',
            size = option.size || '16px',
            family = option.family || 'Arial',
            margin = option.margin || '0 2px',
            padding = option.padding || '2px 1px',
            weight = option.weight || 100,
            fn = option.fn || null;

        // 初始化时间参数
        var sizeT = option.sizeT || size,
            familyT = option.familyT || family,
            weightT = option.weightT || weight,
            colorT = option.colorT || color,
            bgColorT = option.bgColorT || '#000000',
            borderT = option.borderT || '2px';

        // 初始化文字参数
        var sizeF = option.sizeF || size,
            familyF = option.familyF || family,
            weightF = option.weightF || weight,
            colorF = option.colorF || '#000000';

        // 初始化时间	
        var startTime = Math.round(+new Date() / 1000),
            endTime = startTime + time;

        var box = $('<div></div>');

        timeout();

        setInterval(timeout, 1000);

        function timeout() {
            var str = '',
                flag = false,
                arrT = {
                    d: 0,
                    h: 0,
                    m: 0,
                    s: 0,
                    t: 0
                },
                current = Math.round(+new Date() / 1000),
                data = {
                    d: '天',
                    h: '时',
                    m: '分',
                    s: '秒'
                };

            if (type === 2) {
                data.d = data.h = data.m = ':';
                data.s = '';
            }


            arrT.s = endTime - current;

            function timeVerify(time, data) {
                time = time >= 10 ? time : '0' + time;
                str += '<i>' + time + '</i>' + '<span>' + data + '</span>';
            }

            if (arrT.s < 0) {
                return;
            } else if (arrT.s == 0) {
                fn && fn();
            }

            if (type !== 3) {
                if (Math.floor(arrT.s / 86400) >= 0 && type !== 2) {
                    arrT.d = Math.floor(arrT.s / 86400);
                    arrT.s = arrT.s % 86400;
                    flag = true;
                    if (type === 0) {
                        timeVerify(arrT.d, data.d);
                    } else
                    if (type === 1 && arrT.d > 0) {
                        timeVerify(arrT.d, data.d);
                    }
                }

                if (Math.floor(arrT.s / 3600) >= 0) {
                    arrT.h = Math.floor(arrT.s / 3600);
                    arrT.s = arrT.s % 3600;
                    flag = arrT.h > 0 ? true : false;
                    if (type === 0 || type === 2) {
                        timeVerify(arrT.h, data.h);
                    } else
                    if (type === 1 && !!flag) {
                        timeVerify(arrT.h, data.h);
                    }
                }
                if (Math.floor(arrT.s / 60) >= 0) {
                    arrT.m = Math.floor(arrT.s / 60);
                    arrT.s = arrT.s % 60;
                    flag = arrT.m > 0 ? true : false;
                    if (type === 0 || type === 2) {
                        timeVerify(arrT.m, data.m);
                    } else
                    if (type === 1 && !!flag) {
                        timeVerify(arrT.m, data.m);
                    }
                }
            }

            if (Math.floor(arrT.s) >= 0) {
                flag = true;
                if (type === 0 || type === 2 || type === 3) {
                    timeVerify(arrT.s, data.s);
                } else
                if (type === 1 && !!flag) {
                    timeVerify(arrT.s, data.s);
                }

            }


            box.html($(str));
            _this.append(box);

            _this.css({
                'textAlign': 'center',
                'backgroundColor': bgColor,
            })

            _this.find('div').css({
                'display': 'inline-block',
                'lineHeight': _this.height() + 'px'
            })

            _this.find('i').css({
                'backgroundColor': bgColorT,
                'color': colorT,
                'margin': margin,
                'padding': padding,
                'fontWeight': weightT,
                'fontSize': sizeT,
                'fontFamily': familyT,
                'borderRadius': borderT
            })

            _this.find('span').css({
                'color': colorF,
                'fontSize': sizeF,
                'fontFamily': familyF,
                'fontWeight': weightF
            })
        }
    }



})(jQuery);