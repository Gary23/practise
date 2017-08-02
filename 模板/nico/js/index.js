
$(function(){
    carousel({
        images: $('.slide .slide-pic .bg'),
        circle: $('.slide .circle'),
        parent: $('.slide'),
        circleBack:'url(./image/circle.png)',
        circleCurrent:'url(./image/circlecurrent.png)',
        time: 3000,
        animateTime: 400,
        animateType: 'opacity'
    });

    carousel({
        images: $('.nav .right .main li'),
        circle: $('.nav .circle'),
        parent: $('.nav'),
        product: $('.nav .right .main ul'),
        time: 3000,
        animateTime: 400,
        animateType: 'tabs'
    });

    // tab���л�
    changeTab({
        tabs:$('.shop .tabs span'),
        product:$('.shop .items ul'),
        speed:300
    });



    //console.log($('.shop .items li a').height() * 2 + 22);

////---------------------------�����ֲ�ͼ--------------------------------
    function carousel(obj) {
        var time = obj.time || 2000,
            animateTime = obj.animateTime || 400;
        // ��ȡ�����ֲ�ͼ����
        var sideLength = obj.images.length;

        if (obj.circle) {
            // �����������СԲ��
            var i = 0;
            for (; i < sideLength; i++) {
                obj.circle.append($('<li></li>'));
            }
            // ��ʼ��СԲ��λ��
            obj.circle.css({
                'left': '50%',
                'marginLeft': -obj.circle.width() / 2 + 'px'
            })
            if(obj.circleBack && obj.circleCurrent){
                obj.circle.find('li').eq(0).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)
            }else{
                obj.circle.find('li').eq(0).addClass('current').siblings().removeClass('current');
            }
        }

        if(obj.animateType == 'tabs'){
            obj.product.css({
                'width': sideLength * obj.product.find('li').width() + 'px',    // ������Ʒ�б�ulԪ�صĿ��
                'height': '100%'
            })
        }

        if (obj.animateType == 'opacity') {
            // ��ʼ���ֲ�ͼ��͸����
            obj.images.eq(0).css('opacity', '1').siblings().css('opacity', '0');
        }


        // ȫ�ּ�����
        var index = 0;
        function changeCount(){
            if (index < 0) {
                index = sideLength - 1;
            } else if (index > sideLength - 1) {
                index = 0;
            }
        }


        if (obj.arrow) {
            //�ҷ������¼�
            obj.next.on('click', function () {
                move('next', true, true);
            })
            //�������¼�
            obj.prev.on('click', function () {
                move('prev', true, true);
            })
        }


        var timer = null;
        timer = setInterval(function () {
            move('next', true, true);
        }, time)


        // ��������ֲ�ͼ�Ĳ�����ȡ����ʱ������ʾ���Ҽ�ͷ
        obj.parent.on('mouseenter', function () {
            clearInterval(timer);
            if (obj.arrow) {
                obj.arrow.animate({
                    'opacity': '1'
                }, 200)
            }
        })
        obj.parent.on('mouseleave', function () {
            timer = setInterval(function () {
                move('next', true, true);
            }, time)
            if (obj.arrow) {
                obj.arrow.animate({
                    'opacity': '1'
                }, 200)
            }
        })

        // �����������¼�
        if (obj.circle) {
            // СԲ�������¼�
            if(obj.circleBack && obj.circleCurrent){
                obj.circle.find('li').on('mouseenter', function () {
                    $(this).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack);
                    index =  $(this).index() - 1
                    move('next', true, false);
                })
            }else {
                obj.circle.find('li').on('mouseenter', function () {
                    $(this).addClass('current').siblings().removeClass('current');
                    index =  $(this).index() - 1
                    move('next', true, false);
                })
            }

        }
        if (obj.tabs) {
            // tab���л������¼�
            obj.tabs.on('mouseenter', function () {
                $(this).addClass('current').siblings().removeClass('current');
                index =  $(this).index() - 1
                move('next', true, false);
            })
        }


        // �����ֲ�ͼ�ƶ��ķ���
        function move(type, wait, finsh) {
            var wait = wait || true;
            var finsh = finsh || false;
            if(type == 'next'){
                index++;
                changeCount();
            }else if(type == 'prev'){
                index--;
                changeCount();
            }
            if (obj.animateType == 'opacity') {
                obj.images.eq(index).stop(wait, finsh).animate({
                    'opacity': '1',
                    'zIndex': '9'
                }, animateTime).siblings().stop(wait, finsh).animate({
                    'opacity': '0',
                    'zIndex': '1'
                }, animateTime * 2);
            }
            if (obj.animateType == 'tabs') {
                var nav = obj.tabs || obj.circle.find('li');
                //console.log(nav);
                nav.eq(index).addClass('current').siblings().removeClass('current');
                obj.parent.find('.main ul').stop(true, false).animate({
                    'left': -index * obj.parent.find('ul li').width() + 'px'
                }, animateTime);
            }

            if (obj.circleBack && obj.circleCurrent) {
                obj.circle.find('li').eq(index).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)
            }else{
                obj.circle.find('li').eq(index).addClass('current').siblings().removeClass('current');
            }
        }
    }



    //---------------------------��Ʒ����tabs���л�--------------------------------
    function changeTab(obj){
        var speed = obj.speed || 300;
        var Tabslength = obj.tabs.length;     // ��ȡtab������
        obj.product.css('width', Tabslength * obj.product.find('li').width() + 'px')    // ������Ʒ�б�ulԪ�صĿ��

        // tabs���л���ʽ
        obj.tabs.on('mouseover', function () {
            var index = $(this).index();  // ��ȡ��ǰ����
            $(this).addClass('current').siblings().removeClass('current');

            $(this).parent().parent().find('.items ul').stop(true, false).animate({
                'left': -index * obj.product.find('li').width() + 'px'
            }, speed);
        })
    }
})

