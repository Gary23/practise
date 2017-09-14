
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
    
    var pop_items = $('<div class="pop-items"></div>');

    if(option){
        this.setItems(option, pop_items);
    }

	var pop_content = $('<div class="pop-content"></div>').append(pop_items).append($('<div class="pop-cancel">取消</div>'));
    var pop_bottom = $('<div class="pop-bottom"></div>').append($('<div class="shade-lock"></div>')).append(pop_content);
    
	$('body').append(pop_bottom);

	$('.pop-bottom, .shade-lock').css({
		'width': w + 'px',
		'height': h + 'px'
    })
    
    this.init();
}

popBottom.prototype = {
    constructor: popBottom,
    init: function(){
        this.createElem();
        this.onEvent();
        this.style();
        this.pop = $('.pop-bottom');
        this.body = $('body');
        this.content = $('.pop-content');
        this.pop.hide();
    },
    setItems: function(option, parent){
        var link,fun;
        var item_h = 140;
        var ft = parseFloat(this.fontSize);
        parent = parent || $('.pop-items');
        this.option = option;
        $.each(this.option,function(index,item){
            item_h += 80;
            if(item['link']){
                link = item['link'];
            }else{
                link = 'javascript:;'
            }
            var item = $('<div class="pop-item pop-btn' + (index + 1) + '"><a href="' + link + '">' + item['title'] + '</a></div>');
            parent.append(item)
        })
        this.item_h = item_h / 100 * ft;

        $('.pop-item:first-child').css({
            'borderRadius': 0.1 * ft + 'px ' + 0.1 * ft + 'px' + ' 0 0',
        });

        $('.pop-item:last-child').css({
            'borderRadius': '0 0 ' + 0.1 * ft + 'px ' + 0.1 * ft + 'px',
            'borderBottom': 'none',
        })

        $('.pop-item:active').css({
            'backgroundColor': '#f8f8f8',
        })

        $('.pop-items').css({
            'margin-bottom': 0.2 * ft + 'px',
        })

        $('.pop-item').css({
            'height': 0.8 * ft + 'px',
            'lineHeight': 0.8 * ft + 'px',
            'width': '85%',
            'backgroundColor': '#fff',
            'margin': '0 auto',
            'textAlign': 'center',
            'fontSize': 0.32 * ft + 'px',
            'borderBottom': '1px solid #e0e0e0',
        });

        $('.pop-item a').css({
            'color': '#007aff',
            'display': 'block',
            'width': '100%',
            'height': '100%',
        })
    },
    style: function(){
        var ft = parseFloat(this.fontSize);
        $('body.lock, html.lock').css({
            'width': '100%',
            'position': 'fixed'
        });

        $('.shade-lock, .pop-content, .pop-bottom').css({
            'position': 'fixed',
            'bottom': '0',
            'left': '0',
            'zIndex': '999999',
        });
        
        $('.shade-lock').css({
            'backgroundColor': 'rgba(0,0,0,0.4)',
        });

        $('.pop-content').css({
            'padding': 0.2 * ft + 'px ' + '0',
            'width': '100%',
        });

        $('.pop-cancel').css({
            'borderRadius': 0.1 * ft + 'px',
        });

        $('.pop-cancel').css({
            'height': 0.8 * ft + 'px',
            'lineHeight': 0.8 * ft + 'px',
            'width': '85%',
            'backgroundColor': '#fff',
            'margin': '0 auto',
            'textAlign': 'center',
            'fontSize': 0.32 * ft + 'px',
            'color': '#007aff',
            'borderBottom': '1px solid #e0e0e0',
        });
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
