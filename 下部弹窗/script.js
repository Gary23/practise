
/**
 * 页面底部弹出列表选项
 * option：数组，数组的元素是弹出的列表内容，元素是对象类型，对象内容如下：
 * {
 *   title: 字符串，是列表项的内容
 *   link: 字符串，是列表项的链接，没有则不填
 *   fun: 是列表项的事件函数，没有则不填，另外如果要点击当前选项为取消功能的话就直接传 fun: 'cancel'
 * }
 * 使用：
 * 初始化：var fun = new popBottom([{...},{...},{...}])
 * 弹出事件：fun.popup()
/ */

function popBottom(option){
    if(!option) return fasle;
    this.option = option;
    this.scrollTop = 0;
	// 获取窗口宽高
	var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if(!w || !h){
        return false
    }

    if (w >= 750) {
        this.fontSize = '100px';
    } else {
        this.fontSize = 100 * (w / 750) + 'px';
    }

    var fs = this.fontSize;
    var item_h = 140;

	var pop_items = $('<div class="pop-items"></div>');
    var link,fun;

	$.each(this.option,function(index,item){
        item_h += 80;
		if(item['link']){
			link = item['link'];
		}else{
			link = 'javascript:;'
		}
		var item = $('<div class="pop-item item' + (index + 1) + '"><a href="' + link + '">' + item['title'] + '</a></div>');
		pop_items.append(item)
	})
	var pop_content = $('<div class="pop-content"></div>').append(pop_items).append($('<div class="pop-cancel">取消</div>'));
    var pop_bottom = $('<div class="pop-bottom"></div>').append($('<div class="shade-lock"></div>')).append(pop_content);
    
	$('body').append(pop_bottom);

	$('.pop-bottom, .shade-lock').css({
		'width': w + 'px',
		'height': h + 'px'
    })
    
    this.item_h = item_h / 100 * fs;
    this.init();
}

popBottom.prototype = {
    constructor: popBottom,
    init: function(){
        this.screen();
        this.onEvent();
        this.style();
        this.pop = $('.pop-bottom');
        this.body = $('body');
        this.content = $('.pop-content');
        this.pop.hide();
    },
    style: function(){
        $('body.lock, html.lock').css({
            'width': '100%',
            'position': 'fixed'
        });

        $('.shade-lock, .pop-content').css({
            'position': 'fixed',
            'bottom': '0',
            'left': '0',
            'zIndex': '999999',
        });
        
        $('.shade-lock').css({
            'backgroundColor': 'rgba(0,0,0,0.4)',
        });
        
        $('.pop-content').css({
            'padding': 0.2 * this.fontSize + 'px ' + 0.25 * this.fontSize + 'px',
            'width': '100%',
        });

        $('.pop-cancel').css({
            'borderRadius': 0.08 * this.fontSize + 'px',
        });

        $('.pop-item, .pop-cancel').css({
            'height': 0.8 * this.fontSize + 'px',
            'lineHeight': 0.8 * this.fontSize + 'px',
            'width': 7 * this.fontSize + 'px',
            'backgroundColor': '#fff',
            'margin': '0 auto',
            'textAlign': 'center',
            'fontSize': 0.32 * this.fontSize + 'px',
            'color': '#007aff',
            'borderBottom': '1px solid #f0f0f0',
        });

        $('.pop-item:first-child').css({
            'borderRadius': 0.08 * this.fontSize + 'px ' + 0.08 * this.fontSize + 'px' + ' 0 0',
        });

        $('.pop-item:last-child').css({
            'borderRadius': '0 0 ' + 0.08 * this.fontSize + 'px ' + 0.08 * this.fontSize + 'px',
            'borderBottom': 'none',
        })

        $('.pop-item:active').css({
            'backgroundColor': '#f8f8f8',
        })
    },
    popup: function(){
        var _this = this;
        window.setTimeout(function(){
            _this.pop.show();
            _this.afterTop();
            _this.content.css({
                'bottom': -(_this.item_h) + 'px'
            }).animate({
                'bottom': '0'
            },200)
        },100)
    },
    onEvent: function(){
        var _this = this;

        $('.pop-cancel').click(function(){
            _this.cancel();
        });

        $('.pop-item').each(function(index,elem){
            if(_this.option[index]['fun']){
                fun = _this.option[index]['fun'];
                if(fun == 'cancel'){
                    $(elem).on('click', function(){
                        _this.cancel();
                    });
                }else{
                    $(elem).on('click', fun);
                    $(elem).on('click', function(){
                        _this.cancel();
                    });
                }
            } 
        })
    },
    cancel: function(){
        var _this = this;
        $('.pop-content').animate({
            'bottom': -(this.item_h) + 'px'
        },200)
        window.setTimeout(function(){
            _this.beforeClose();
            _this.pop.hide();
        },200)
    },
    afterTop: function(){
        this.scrollTop = $(window).scrollTop();
        $('body,html').addClass('lock');
        $('body,html').css('top', -this.scrollTop + 'px');
    },
    beforeClose: function(){
        $('body,html').removeClass('lock');
        $(window).scrollTop(this.scrollTop);
    }
}
