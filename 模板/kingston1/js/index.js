$(function () {
	// 变换透明度的轮播图
    carousel({
        images:$('.slide .bg'),
        circle:$('.slide .circle'),
        next:$('.slide .next'),
        prev:$('.slide .prev'),
        parent:$('.slide'),
        arrow:$('.slide .arrow'),
        circleBack:'url(image/point_1.png)',
        circleCurrent:'url(image/point_2.png)',
        time:2000,
        animateTime:400
    });
	// tab栏切换
    changeTab({
    	tabs:$('.shop .tabs span'),
    	product:$('.shop .small-item ul'),
    	speed:300
    });
    
    // 动态添加遮罩层
    $('.main .main a').on('mouseenter',function(){
		var shade = $(this).before($('<a href=' + $(this).attr('href') + ' class="shade"></a>'))
		shade.parent().css('position','relative');
    	shade.prev().css({
    		'display':'block',
    		'position':'absolute',
    		'width':'100%',
    		'height':'100%',
    		'background':'#999999',
    		'opacity':'0',
    	}).animate({'opacity':'0.2'},200)
    })
    $('.main .main a').parent().on('mouseleave',$('.main .shade'),function(){
		$('.main .shade').remove();
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
        obj.circle.css({
            'left':'50%',
            'marginLeft': - obj.circle.width()/2 + 'px'
        })
        obj.images.eq(0).css('opacity', '1').siblings().css('opacity', '0');
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

        // 右方向点击事件
        obj.next.on('click', function () {
            count ++;
            changeCount();
            move(count, true, true);
        })

        // 左方向点击事件
        obj.prev.on('click', function () {
            count --;
            changeCount();
            move(count, true, true);
        })

        var timer = null;
        timer = setInterval(function () {
            count ++;
            changeCount();
            move(count, true, true);
        }, time)


        // 鼠标移入轮播图的操作，取消定时器，显示左右箭头
        obj.parent.on('mouseenter', function () {
            clearInterval(timer);
            obj.arrow.animate({
                'opacity': '1'
            }, 200)
        })
        obj.parent.on('mouseleave', function () {
            timer = setInterval(function () {
                count ++;
                changeCount();
                move(count, true, true);
            }, time)
            obj.arrow.animate({
                'opacity': '0'
            }, 200)
        })

        // 小圆点移入事件
        obj.circle.find('li').on('mouseenter', function () {
            $(this).css('backgroundImage', obj.circleCurrent).siblings().css('backgroundImage', obj.circleBack)
            count = $(this).index()
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

    //---------------------------商品详情tabs栏切换--------------------------------
    function changeTab(obj){
    	var speed = obj.speed || 300;
        var Tabslength = obj.tabs.length;     // 获取tab栏长度
        obj.product.css('width', Tabslength * obj.product.find('li').width() + 'px')    // 设置商品列表ul元素的宽度
        // tabs栏切换样式
        obj.tabs.on('mouseover', function () {
            var index = $(this).index();  // 获取当前索引
            $(this).addClass('current').siblings().removeClass('current');

            $(this).parent().parent().next().find('.small-item ul').stop(true, false).animate({
                'left': -index * obj.product.find('li').width() + 'px'
            }, speed);
        })
    }

})

