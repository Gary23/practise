var loca = window.location;
var host = loca.host;
var path = loca.pathname;

if (host == 'detail.m.tmall.com' && path == '/item.htm'){
	var tmElem = document.querySelector('.smart-jump');
	var tmContent = document.querySelector('#content');
	if(tmElem){
		var tmParent = tmElem.parentNode;
		tmParent.removeChild(tmElem);
		tmContent.style.paddingTop = 0;
	}
}else
if (host == 'h5.m.taobao.com' && path == '/awp/core/detail.htm'){
	var elem = document.querySelector('._1OgXhl_flwlyUHwE89wic1');
	var body = document.querySelector('body');
	if(elem){
		body.removeChild(elem);
		body.style.paddingTop = 0;
	}
}