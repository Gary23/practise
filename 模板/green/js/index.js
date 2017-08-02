$(function () {

    carousel({
        images: $('.slide ul a'),
        tabs: $('.slide .tabs span'),
        parent: $('.slide'),
        time: 3000,
        animateTime: 400,
        animateType: 'tabs'
    });


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
            obj.circle.find('li').eq(0).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)
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
            obj.circle.find('li').on('mouseenter', function () {
                $(this).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack);
                index =  $(this).index() - 1
                move('next', true, false);
            })
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
                obj.tabs.eq(index).addClass('current').siblings().removeClass('current');
                obj.parent.find('ul').stop(true, false).animate({
                    'left': -index * obj.parent.find('ul li').width() + 'px'
                }, animateTime);
            }

            if (obj.circle) {
                obj.circle.find('li').eq(index).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)
            }
        }
    }





})
