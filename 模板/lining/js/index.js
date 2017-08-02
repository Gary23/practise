$(function(){

    // 变换透明度的轮播图
    carousel({
        images:$('.slide .main .bg'),
        circle:$('.slide .nav'),
        parent:$('.slide'),
        circleBack:'url(./image/circle.png)',
        circleCurrent:'url(./image/circlecurrent.png)',
        time:3000,
        animateTime:400
    });

    navScroll({
        elem:$('.aside-nav'),
        scrollVal:700,
        fixedTop:100,
        absoluteTop:800
    })


    ////---------------------------顶部轮播图--------------------------------
    function carousel(obj) {
        var time = obj.time || 2000,
            animateTime = obj.animateTime || 400;
        // 获取所有轮播图数量
        var sideLength = obj.images.length;
        // 根据数量添加小圆点
        var i = 0;
        for (; i < sideLength; i++) {
            obj.circle.append($('<li></li>'));
        }


        // 初始化轮播图的透明度
        obj.images.eq(0).css('opacity', '1').siblings().css('opacity', '0');
        obj.circle.css({
            'left':'50%',
            'marginLeft': - obj.circle.width()/2 + 'px'
        })
        obj.circle.find('li').eq(0).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)

        // 全局计数器
        var count = 0;
        function changeCount(){
            if (count < 0) {
                count = sideLength - 1;
            } else if (count > sideLength - 1) {
                count = 0;
            }
        }


        if(obj.arrow){
            //右方向点击事件
            obj.next.on('click', function () {
                count ++;
                changeCount();
                move(count, true, true);
            })
            //左方向点击事件
            obj.prev.on('click', function () {
                count --;
                changeCount();
                move(count, true, true);
            })
        }


        var timer = null;
        timer = setInterval(function () {
            count ++;
            changeCount();
            move(count, true, true);
        }, time)


        // 鼠标移入轮播图的操作，取消定时器，显示左右箭头
        obj.parent.on('mouseenter', function () {
            clearInterval(timer);
            if(obj.arrow){
                obj.arrow.animate({
                    'opacity': '1'
                }, 200)
            }
        })
        obj.parent.on('mouseleave', function () {
            timer = setInterval(function () {
                count ++;
                changeCount();
                move(count, true, true);
            }, time)
            if(obj.arrow){
                obj.arrow.animate({
                    'opacity': '1'
                }, 200)
            }
        })

        // 小圆点移入事件
        obj.circle.find('li').on('mouseenter', function () {
            $(this).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack);
            count = $(this).index();
            move(count, true, false);
        })


        // 轮播图移动的方法
        function move(index, wait, finsh) {
            var wait = wait || true;
            var finsh = finsh || false;
            obj.images.eq(index).stop(wait, finsh).animate({
                'opacity': '1',
                'zIndex': '9'
            }, animateTime).siblings().stop(wait, finsh).animate({
                'opacity': '0',
                'zIndex': '1'
            }, animateTime * 2);
            obj.circle.find('li').eq(index).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)
        }
    }





    function navScroll(obj){
        var fixedTop = obj.fixedTop || 100,
            absoluteTop = obj.absoluteTop || 800,
            scrollVal = obj.scrollVal || 700;
        var leftVal = $('.shop .title').offset().left - obj.elem.width() - 20 + 'px';
        obj.elem.css({
            'position':'absolute',
            'left':leftVal,
            'top':absoluteTop + 'px'
        })
        $(document).on('scroll',function(){
            if($(document).scrollTop() >= scrollVal){
                obj.elem.css({
                    'position':'fixed',
                    'left':leftVal,
                    'top':fixedTop + 'px'
                })
            }else{
                obj.elem.css({
                    'position':'absolute',
                    'left':leftVal,
                    'top':absoluteTop + 'px'
                })
            }
        })

    }

})
