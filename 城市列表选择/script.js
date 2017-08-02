/**
 * Created by Administrator on 2017/2/10 0010.
 */

(function($){
    $.fn.jScroll = function(settings){
        var settings = $.extend();
        return this.each(function(settings){
            var $this = $(this);
            var Bool=false;
            var Scrbody = $this.find(".scrollBody");	//����ѡ������
            var Scro=Scrbody.find(".scrollBar");	//����������
            var Scrp=Scro.find("p");	//������������
            var Scrobd=Scrbody.find(".all-list");	//���г��е�div
            var Scroul=Scrobd.find("ul");	//���г���div���ul
            var letter = Scrbody.prev();	//��ĸ����
            var Scrp_Height = Scrp.outerHeight()/2;		//�������2/1�߶ȣ�Ϊ����������Ǵ��ڻ�������м�
            var Num2=Scro.outerHeight()-Scrp.outerHeight();		//������������-�������
            var offsetX=0;
            var offsetY=0;

            Scrp.mousedown(function(e){
                Bool=true;
            });
            $(document).mouseup(function(){
                Bool=false;
            });
            $(document).mousemove(function(e){
                if(Bool){		//��Ȼ�¼��Ǹ���document������ֻ�е��Scropʱ����ִ�����淽��
                    var top = Scro.offset().top;	//��������topֵ
                    var topHeight = top + Scro.outerHeight();	//�������ײ���ֵ
                    var value = $this.outerHeight()+$this.offset().top;	 //����ѡ���б��������ҳ�涥���ľ���

                    if(e.pageY>=top && e.pageY <= topHeight){	//������λ���ڹ������ķ�Χ��
                        var Num1= e.pageY - value - 70;	//Ϊ�˽�����������ʱ����Ϊ0-150��ֵ
                        var y = Num1 - Scrp_Height;	//�����ϻ������»�������������뻬������м���ڿ�ʼ����
                        //��������ʱ��0��0-��������һ���Ǹ�����ֻ����껬��������һ��ʱ������ֵ��
                    }
                    if(y<=1){	//������Ϊ0ʱ�б���
                        Scrll(0);
                        Scrp.css("top",1);
                    }else if(y>=Num2){	//��껬����󣬳��˻�����һ����б�Ҳ����
                        Scrp.css("top",Num2);
                        Scrll(Num2);
                    }else{		// ����������
                        Scrll(y);
                    }
                }
            });
            function Scrll(y){
                Scrp.css("top",y);	//ʱʱ���û������topֵ
                //���Ż�����������ó���ѡ���б��margin-topΪ��ֵ���������Ϲ�����Ч��
                Scroul.css("margin-top",-(y/(Scro.outerHeight()-Scrp.outerHeight()))*(Scroul.outerHeight()-Scrobd.height()));
            }
            function wheel(e){
                var Distance=Num2*0.1;	//������-������ʣ�µ�����*0.1��Ҳ���������ʱÿ�λ����ľ���
                var evt = e || window.event;
                var wheelDelta = evt.wheelDelta || evt.detail;	//webkit��firedox���ݣ�
                // webkit���Ϲ���120�����¹���-120,firefox������-3��������3
                //����������ֹҳ����������
                if (navigator.userAgent.toLowerCase().indexOf('firefox')>=0){
                    if (e.preventDefault)
                        e.preventDefault();
                    e.returnValue = false;
                }

                if(wheelDelta == -120 || wheelDelta == 3){	// ���»�
                    var Distances=Scrp.position().top+Distance;	//���������ڵ�topֵ+ÿ�λ����ľ���
                    if(Distances>=Num2){	//���ֵ������Num2��Ϊ�����黬������
                        Scrp.css("top",Num2);
                        Scrll(Num2);
                    }else{
                        Scrll(Distances);
                    }
                    return false;
                }else if (wheelDelta == 120 || wheelDelta == -3){	//���ϻ�
                    var Distances=Scrp.position().top-Distance;	//���������ڵ�topֵ-ÿ�λ����ľ���
                    if(Distances<=1){	//���ֵС��1��Ϊ�����黬������
                        Scrll(0);
                        Scrp.css("top",1);
                    }else{
                        Scrll(Distances);
                    }
                    return false;
                }
            }

            //����ie��������
            var isIE = !!window.ActiveXObject;
            var isIE6 =isIE&&!window.XMLHttpRequest;
            var isIE8=isIE&&!!document.documentMode;
            var isIE7=isIE&&!isIE6&&!isIE8;

            //onmousewheel��DOMMouseScroll�¼�����û�й�������������û�б�������ʱ��Ҳ�ᷢ������˼��ֻҪ��궯����ҳ�涯���������������һ��Ԫ�����ݹ��������һ��֪ͨ�Ļ���ʹ��onscroll�¼�
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
                letter.find("a").hover(function(){	//��ĸ��������a�������¼���
                    var index = $(this).index();	//��ǰ�������ĸ
                    var scrollBody = $(this).parent().next();	//ѡ������б�����
                    var top = scrollBody.find("li").eq(index).position().top;	//�����б������Ӧ��ĸ�������ĳ��е�topֵ
                    var ulHeight = Scroul.height();		//����ѡ��div���ul�ĸ߶�
                    var mapHeight = Scrobd.height();	//����ѡ���div�ĸ߶�
                    function Scrll2(top){
                        //ֹͣʱ������������У���Ҫ��ɵ�ǰĿ��
                        //Scrp:�����б����ĳ�����е�topλ��������ul�ı���*�������ı����߶ȣ��ó�������Ӧ�ڴ��ڵ�λ��
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

