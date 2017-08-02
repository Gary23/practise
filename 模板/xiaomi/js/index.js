$(function(){
    navScroll({
        elem:$('.aside-nav'),
        scrollVal:700,
        fixedTop:100,
        absoluteTop:800
    })

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
