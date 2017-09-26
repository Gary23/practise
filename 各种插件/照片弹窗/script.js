/**
 *  点击图片后放大查看的方法
 *  先new一个对象，var img = new imgClick();  在需要弹窗的事件中用 img.showLock(url); 当前图片即可放大查看
 *  
 */
function imgClick() {
	this.ww = window.innerWidth;
	this.wh = window.innerHeight;
	this.init();
}

imgClick.prototype = {
	constructor: imgClick,
	init: function () {
		this.wResize();
		this.createLock();
		this.hideLock();
	},
	wResize: function(){
		var _this = this;
		$(window).on('resize',function(){
			_this.ww = window.innerWidth;
			_this.wh = window.innerHeight;
			if(_this.lock.css('display') !== 'none'){
				_this.showLock(_this.url);
			}
		})
	},
	bodyLock: function(){
		$('body.lock-html,html.lock-html').css({
			'width':'100%',
			'position':'fixed',
		})
	},
	afterTop: function () {
		this.scrollTop = $(window).scrollTop();
		$('body,html').addClass('lock-html');
		this.bodyLock();
		$('body').css('top', -this.scrollTop + 'px');
	},
	beforeClose: function () {
		$('body,html').removeClass('lock-html');
		$(window).scrollTop(this.scrollTop);
	},

	createLock: function () {
		this.lock = $('<div class="imgClick-lock"><img src="" alt="" style="display:block;"></div>');

		this.img = this.lock.find('img');

		this.lock.css({
			'display': 'none',
			'position': 'fixed',
			'zIndex': '99999',
			'bottom': '0',
			'left': '0',
			'backgroundColor': 'rgba(0, 0, 0, 0.7)',
			'overflow':'auto',
		});

		$('body').append(this.lock);
	},
	showLock:function(url){
		this.afterTop();
		this.url = url
		console.log(this.ww + '   ' + this.wh);

		this.lock.css({
			width: this.ww,
			height: this.wh,
			display: 'block',
		});

		this.changeSrc();
	},
	hideLock:function(){
		var _this = this;
		$(document).on('click', '.imgClick-lock', function () {
			_this.beforeClose();
			$(this).hide();
		})
	},
	changeSrc: function () {
		var _this = this;
		this.img.hide();
		this.img.prop('src',this.url);
		this.img.on('load',function(){
			var img_w = $(this).width();
			var img_h = $(this).height();
			var Prop = img_h / img_w;

			if(_this.ww < _this.wh){
				$(this).css({
					'width': '90%',
					'height': Prop * (_this.ww * 0.9),
					'margin': _this.wh > _this.ww * 0.9 * Prop ? (_this.wh - _this.ww * 0.9 * Prop) / 2 + 'px auto' : '20px auto',
				});
			}else{
				$(this).css({
					'width': '70%',
					'height': 'auto',
					'margin': _this.wh > _this.ww * 0.7 * Prop ? (_this.wh - _this.ww * 0.7 * Prop) / 2 + 'px auto' : '20px auto',
				});
			}
			$(this).show();
		})
	}
}
