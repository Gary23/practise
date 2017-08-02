$(function(){

    // �任͸���ȵ��ֲ�ͼ
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


    ////---------------------------�����ֲ�ͼ--------------------------------
    function carousel(obj) {
        var time = obj.time || 2000,
            animateTime = obj.animateTime || 400;
        // ��ȡ�����ֲ�ͼ����
        var sideLength = obj.images.length;
        // �����������СԲ��
        var i = 0;
        for (; i < sideLength; i++) {
            obj.circle.append($('<li></li>'));
        }


        // ��ʼ���ֲ�ͼ��͸����
        obj.images.eq(0).css('opacity', '1').siblings().css('opacity', '0');
        obj.circle.css({
            'left':'50%',
            'marginLeft': - obj.circle.width()/2 + 'px'
        })
        obj.circle.find('li').eq(0).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)

        // ȫ�ּ�����
        var count = 0;
        function changeCount(){
            if (count < 0) {
                count = sideLength - 1;
            } else if (count > sideLength - 1) {
                count = 0;
            }
        }


        if(obj.arrow){
            //�ҷ������¼�
            obj.next.on('click', function () {
                count ++;
                changeCount();
                move(count, true, true);
            })
            //�������¼�
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


        // ��������ֲ�ͼ�Ĳ�����ȡ����ʱ������ʾ���Ҽ�ͷ
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

        // СԲ�������¼�
        obj.circle.find('li').on('mouseenter', function () {
            $(this).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack);
            count = $(this).index();
            move(count, true, false);
        })


        // �ֲ�ͼ�ƶ��ķ���
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
