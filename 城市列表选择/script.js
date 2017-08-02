/**
 * Created by Administrator on 2017/2/10 0010.
 */

(function($){
    $.fn.jScroll = function(settings){
        var settings = $.extend();
        return this.each(function(settings){
            var $this = $(this);
            var Bool=false;
            var Scrbody = $this.find(".scrollBody");	//城市选择区域
            var Scro=Scrbody.find(".scrollBar");	//滚动条背景
            var Scrp=Scro.find("p");	//滚动条滑动块
            var Scrobd=Scrbody.find(".all-list");	//所有城市的div
            var Scroul=Scrobd.find("ul");	//所有城市div里的ul
            var letter = Scrbody.prev();	//字母区域
            var Scrp_Height = Scrp.outerHeight()/2;		//滑动块的2/1高度，为了让鼠标总是处于滑动块的中间
            var Num2=Scro.outerHeight()-Scrp.outerHeight();		//滚动条背景高-滑动块高
            var offsetX=0;
            var offsetY=0;

            Scrp.mousedown(function(e){
                Bool=true;
            });
            $(document).mouseup(function(){
                Bool=false;
            });
            $(document).mousemove(function(e){
                if(Bool){		//虽然事件是给了document，但是只有点击Scrop时才能执行下面方法
                    var top = Scro.offset().top;	//滚动条的top值
                    var topHeight = top + Scro.outerHeight();	//滚动条底部的值
                    var value = $this.outerHeight()+$this.offset().top;	 //城市选择列表区域距离页面顶部的距离

                    if(e.pageY>=top && e.pageY <= topHeight){	//如果鼠标位置在滚动条的范围内
                        var Num1= e.pageY - value - 70;	//为了将滚动条滚动时设置为0-150的值
                        var y = Num1 - Scrp_Height;	//不管上滑还是下滑，都等鼠标移入滑动块的中间后在开始滚动
                        //鼠标在最顶端时是0，0-滚动条的一半是负数，只有鼠标滑到滑动块一半时才是正值。
                    }
                    if(y<=1){	//滑动块为0时列表不动
                        Scrll(0);
                        Scrp.css("top",1);
                    }else if(y>=Num2){	//鼠标滑到最后，出了滑动块一半后列表也不动
                        Scrp.css("top",Num2);
                        Scrll(Num2);
                    }else{		// 正常滑动，
                        Scrll(y);
                    }
                }
            });
            function Scrll(y){
                Scrp.css("top",y);	//时时设置滑动块的top值
                //随着滑动块滚动设置城市选择列表的margin-top为负值，产生向上滚动的效果
                Scroul.css("margin-top",-(y/(Scro.outerHeight()-Scrp.outerHeight()))*(Scroul.outerHeight()-Scrobd.height()));
            }
            function wheel(e){
                var Distance=Num2*0.1;	//滚动条-滑动块剩下的区域*0.1，也就是用鼠标时每次滑动的距离
                var evt = e || window.event;
                var wheelDelta = evt.wheelDelta || evt.detail;	//webkit和firedox兼容，
                // webkit向上滚是120，向下滚是-120,firefox向上是-3，上下是3
                //火狐浏览器禁止页面滚动轴滚动
                if (navigator.userAgent.toLowerCase().indexOf('firefox')>=0){
                    if (e.preventDefault)
                        e.preventDefault();
                    e.returnValue = false;
                }

                if(wheelDelta == -120 || wheelDelta == 3){	// 向下滑
                    var Distances=Scrp.position().top+Distance;	//滑动块现在的top值+每次滑动的距离
                    if(Distances>=Num2){	//这个值超过了Num2视为滑动块滑到底了
                        Scrp.css("top",Num2);
                        Scrll(Num2);
                    }else{
                        Scrll(Distances);
                    }
                    return false;
                }else if (wheelDelta == 120 || wheelDelta == -3){	//向上滑
                    var Distances=Scrp.position().top-Distance;	//滑动块现在的top值-每次滑动的距离
                    if(Distances<=1){	//这个值小于1视为滑动块滑到顶了
                        Scrll(0);
                        Scrp.css("top",1);
                    }else{
                        Scrll(Distances);
                    }
                    return false;
                }
            }

            //测试ie滚动兼容
            var isIE = !!window.ActiveXObject;
            var isIE6 =isIE&&!window.XMLHttpRequest;
            var isIE8=isIE&&!!document.documentMode;
            var isIE7=isIE&&!isIE6&&!isIE8;

            //onmousewheel和DOMMouseScroll事件，在没有滚动条或者内容没有被滚动的时候也会发生，意思是只要鼠标动不管页面动不动。如果你是想一个元素内容滚动后接受一个通知的话，使用onscroll事件
            if(isIE8 || isIE7){
                if(document.getElementById("scrollBody").attachEvent)
                    document.getElementById("scrollBody").onmousewheel = wheel;
                document.getElementById("scrollBody").attachEvent('DOMMouseScroll',wheel,false);
            }else{
                if(document.getElementById("scrollBody").addEventListener)
                    document.getElementById("scrollBody").addEventListener('DOMMouseScroll',wheel,true);
                document.getElementById("scrollBody").onmousewheel=wheel;
            }

            function searchClick(letter){
                letter.find("a").hover(function(){	//字母区域所有a的移入事件。
                    var index = $(this).index();	//当前移入的字母
                    var scrollBody = $(this).parent().next();	//选择城市列表区域
                    var top = scrollBody.find("li").eq(index).position().top;	//城市列表区域对应字母的索引的城市的top值
                    var ulHeight = Scroul.height();		//城市选择div里的ul的高度
                    var mapHeight = Scrobd.height();	//城市选择的div的高度
                    function Scrll2(top){
                        //停止时，清除动画队列，不要完成当前目标
                        //Scrp:城市列表具体某个城市的top位置在整个ul的比例*滚动条的背景高度，得出滑动块应在存在的位置
                        Scrp.stop(true,false).animate({"top":top/(ulHeight-mapHeight)*(Scro.outerHeight()-Scrp.outerHeight())},500);
                        Scroul.stop(true,false).animate({"margin-top":-top},500);
                    }
                    if(top<=1){
                        Scrp.stop(true,false).animate({"top":1},500);
                        Scroul.stop(true,false).animate({"margin-top":0},500);
                    }else if(top>=(ulHeight-mapHeight)){
                        Scrp.stop(true,false).animate({"top":Num2},500);
                        Scroul.stop(true,false).animate({"margin-top":-(ulHeight-mapHeight)},500);
                    }else{
                        Scrll2(top);
                    }
                });
            }
            searchClick(letter);
        });
    }
})(jQuery);

