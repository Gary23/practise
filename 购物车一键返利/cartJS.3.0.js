(function () {

	function FanliCart() {
		this.ua = window.location.pathname;

		if (this.ua === '/mlapp/cart.html') {
			this.cartInit();
		} else if (this.ua === '/item.htm') {
			this.tmallInit();
		} else if (this.ua === '/awp/core/detail.htm') {
			this.taobaoInit();
		}
	};

	// 设置本地缓存
	FanliCart.prototype.setLocal = function(k, v) {
		if (!k && !v) return false;
		if (!v) {
			for (i in k) {
				window.localStorage.setItem(i, k['i']);
			}
		} else {
			window.localStorage.setItem(k, v);
		}
	};

	// 获取本地缓存
	FanliCart.prototype.getLocal = function(k) {
		return window.localStorage.getItem(k);
	};

	// 删除本地缓存
	FanliCart.prototype.removeLocal = function(k) {
		window.localStorage.removeItem(k);
	};

	// 购物车页面----初始化操作
	FanliCart.prototype.cartInit = function() {
		var _this = this;
		this.$parent = $('.bundlev2').not('#bundlev2_invalid');
		this.$item = this.$parent.find('.o-t-item');
		this.btn = this.createBtn();

		if (!this.getLocal('item_index') || this.getLocal('item_index') === '0') {
			this.setLocal('item_index', '0');
			this.setLocal('start', '0');
			var index = 0;
		} else {
			var index = +this.getLocal('item_index');
		}

		if (this.getLocal('item_max') && this.getLocal('start') == '1') {
			if (index < +this.getLocal('item_max')) {
				this.fanliMain(index);
			} else {
				this.removeLocal('allId');
				this.removeLocal('item_max');
				this.setLocal('item_index', '0');
				this.setLocal('start', '0');
				this.btn.remove();
				alert('已完成');
			}
		}

		// 根据进度改变开始按钮
		if (this.getLocal('start') == '0') {
			this.btn.html('开始');
			this.btn.click(function () {
				// 初始化缓存
				_this.setLocal('item_max', _this.$item.length);
				_this.setLocal('allId', _this.getAllId());
				_this.setLocal('start', '1');
				_this.fanliMain(index);
			})
		} else {
			this.btn.html('进行中');
		}
	};

	// 天猫商品页----初始化操作
	FanliCart.prototype.tmallInit = function() {
		var _this = this;
		this.btn = document.querySelector('#s-actionBar-container .trade .cart');
		var time_count = 0;

		this.btn.click();		
		this.fanli_search = this.getSearch(window.location.search);

		var timer = window.setInterval(function () {
			time_count++;
			if (_this.fanli_search) {
				var widgets = decodeURI(window.location.search);
				if (widgets.indexOf('decision=cart') != -1) {
					window.clearInterval(timer);
					_this.$parent = document.querySelector('.widgets-cover');
					if (_this.fanli_search['sku']) {
						_this.setSku();
					} else {
						_this.setNum();
					}

				} else {
					if (time_count > 50) {
						window.clearInterval(timer);
						_this.notSkuCart(_this.fanli_search['num'] - 1); // 因为getSearch已经点了一下，所以这里要少点一次
					}
				}
			}
		}, 20);
		
	};

	// 淘宝商品页----初始化操作
	FanliCart.prototype.taobaoInit = function() {
		var _this = this;
		var bottom = document.querySelector('.bottom_bar.homePage');
		this.btn = bottom.querySelector('.sys_button.cart ');
		var time_count = 0;

		this.fanli_search = this.getSearch(window.location.search);

		this.btn.click();

		var timer = window.setInterval(function () {
			time_count++;
			if (_this.fanli_search) {
				_this.$parent = document.querySelector('#J_skuPop');
				if (_this.$parent.className.indexOf('show') != -1) {
					window.clearInterval(timer);
					if (_this.fanli_search['sku']) {
						_this.setSku();
					} else {
						_this.setNum();
					}
				} else {
					if (time_count > 50) {
						window.clearInterval(timer);
						_this.notSkuCart(_this.fanli_search['num'] - 1); // 因为getSearch已经点了一下，所以这里要少点一次
					}
				}
			}
		}, 10)
	};

	// 购物车页面----获取缓存商品id的数组中相对应的购物车商品
	FanliCart.prototype.getCurrentItem = function(index, arr_id) {
		if (typeof index != 'number') return false;
		var obj = {};
		for (var i = 0, l = this.$item.length; i < l; i++) {
			var link = this.$item.eq(i).find('.item-img > a').prop('href');
			if (link.indexOf(arr_id[index]) >= 0) {
				obj['$cur'] = this.$item.eq(i);
				obj['index'] = i;
				break;
			}
		}
		
		return obj;
	};

	// 购物车页面----创建按钮
	FanliCart.prototype.createBtn = function() {
		var span = $('<span id=\'getFanliAili\'></span>');

		span.css({
			display: 'block',
			position: 'absolute',
			right: '0.15rem',
			top: '0.15rem',
			background: '#f50',
			width: '2.2rem',
			height: '0.9rem',
			borderRadius: '30px',
			color: '#fff',
			textAlign: 'center',
			lineHeight: '0.9rem',
			fontSize: '0.38rem',
			zIndex: '999999999999'
		});
		$('body').append(span);
		return span;
	};

	// 购物车页面----将购物车所有商品id缓存
	FanliCart.prototype.getAllId = function() {
		var arr = [];
		for (var i = 0, l = this.$item.length; i < l; i++) {
			var link = this.$item.eq(i).find('.item-img > a').prop('href').split('/');
			var id = link[link.length - 1].match(/\d+/g);
			arr.push(id);
		}
		return arr;
	};

	// 购物车页面----删除商品前获取商品信息和按钮元素
	FanliCart.prototype.fanliMain = function(index) {
		var _this = this;
		this.item_obj = {};
		// 判断是否已经存储了全部id，用来获取本次要删除的id。
		if (!this.getLocal('allId')) {
			this.setLocal('allId', this.getAllId());
		}
		var arr_id = this.getLocal('allId').split(',');
		
		var curObj = this.getCurrentItem(index, arr_id);

		this.item_obj['$item_sku'] = curObj['$cur'].find('.sku > p');
		// 获取店铺的标题
		this.$bundlev = curObj['$cur'].parents('.bundlev2');

		// 获取当前店铺全部编辑按钮
		var $shop_t = this.$bundlev.find('.o-t-title-shop .edit');

		// 获取当前编辑按钮
		for (var i = 0, shop_t_l = $shop_t.length; i < shop_t_l; i++) {
			if ($shop_t.eq(i).html() === '编辑') {
				$shop_t.eq(i).click(); // 点击编辑按钮
			}
		}

		window.setTimeout(function(){
			var parent = _this.$parent.find('.o-t-item').eq(curObj['index']);
			_this.item_obj['$item_del'] = parent.find('.item-del.c-edit-delshow');
			_this.item_obj['$input'] = parent.find('.btn-input > input');
			_this.delItem(arr_id, index);
		},200);

	};

	// 购物车页面----删除商品
	FanliCart.prototype.delItem = function(arr, i) {
		var _this = this;
		this.item_obj['$item_del'].click();

		var $pop = $('.confirmMode'),
			$del_btn = $pop.find('.ok');

		var timerDel = window.setInterval(function () {
			if ($pop && $pop.css('display') === 'block') {
				window.clearInterval(timerDel);
				$del_btn.click();
				// 在这里发送ajax
				_this.ajaxItemLink(arr[i], i);
			}
		}, 20);
	};

	// 购物车页面----获取返利链接并跳转，改变本地缓存中的item_index
	FanliCart.prototype.ajaxItemLink = function(data, index) {
		var _this = this;
		index++;
		this.setLocal('item_index', index);
		// 模拟ajax的success
		window.setTimeout(function () {
			var sku = _this.item_obj['$item_sku'].html() || '';
			var num = _this.item_obj['$input'].val();

			// 获取店铺图标，用来判断是天猫还是淘宝
			var $shop_icon = _this.$bundlev.find('.ico > span');

			if ($shop_icon.hasClass('shopIco_B') || $shop_icon.hasClass('shopIco_SM')) {
				var url = '//detail.m.tmall.com/item.htm?id=' + data;
				url = url + '&sku=' + sku + '&num=' + num;
				window.open(encodeURI(url), '_self');
			} else if ($shop_icon.hasClass('shopIco_C')) {
				var url = '//h5.m.taobao.com/awp/core/detail.htm?id=' + data;
				url = url + '&sku=' + sku + '&num=' + num;
				window.open(encodeURI(url), '_self');
			}
		}, 500);
	};

	// 商品页----获取url中的sku和num
	FanliCart.prototype.getSearch = function(search) {
		var arr = search.split('&');
		var obj = {};
		
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].indexOf('num=') >= 0) {
				obj['num'] = arr[i].split('=')[1];
			}
			if (arr[i].indexOf('sku=') >= 0) {
				var sku = decodeURI(arr[i].split('=')[1]);
				obj['sku'] = sku ? sku.split(';') : '';
			}
		}
		return obj;
	};

	// 商品页----没有sku弹出的情况改变商品数量并加入购物车返回
	FanliCart.prototype.notSkuCart = function(num) {
		var count = 0;
		var _this = this;
		var timer_num = window.setInterval(function () {
			if (count < num) {
				count++;
				window.setTimeout(function(){
					_this.btn.click();
				},100)
			} else {
				window.setTimeout(function () {
					window.history.go(-1);
				}, 500)
			}
		}, 300)
	};

	// 商品页----选择商品的sku
	FanliCart.prototype.setSku = function() {

		if (this.ua === '/item.htm') {
			var list_sku = this.$parent.querySelectorAll('.sku-list-wrap li .items a');	
			var str = 'checked';		
		} else if (this.ua === '/awp/core/detail.htm') {
			var list_sku = this.$parent.querySelectorAll('.sku-info > div > ul > li');		
			var str = 'sel';	
		}

		if (!list_sku) return false;
		
		var sku_arr = this.fanli_search['sku'];

		for (var i = 0, sku_l = sku_arr.length; i < sku_l; i++) {
			for (var j = 0, list_l = list_sku.length; j < list_l; j++) {
				if (sku_arr[i] == list_sku[j].innerHTML) {
					if (list_sku[j].className.indexOf(str) < 0) {
						list_sku[j].click();
						break;
					}
				}
			}
		}
		this.setNum();
	};

	// 商品页----有sku弹出的情况下改变商品数量
	FanliCart.prototype.setNum = function() {
		if (this.ua === '/item.htm') {
			var input = document.querySelector('.number .increase');
		} else if (this.ua === '/awp/core/detail.htm') {
			var input = document.querySelector('.quantity-info .btn-plus');	
		}

		if (!input) {
			this.skuCart();
		};
		var num = this.fanli_search['num']
		if (num) {
			for (var i = 1; i < num; i++) {
				input.click();
			}
		}
		this.skuCart();
	};

	// 加入购物车并返回
	FanliCart.prototype.skuCart = function() {
		if (this.ua === '/item.htm') {
			var enter_btn = this.$parent.querySelector('.footer .ok');
		} else if (this.ua === '/awp/core/detail.htm') {
			var enter_btn = this.$parent.querySelector('.sku-btns .addcart');
		}
		
		window.setTimeout(function () {
			enter_btn.click();
			window.setTimeout(function () {
				window.history.go(-1);
			}, 500);
		}, 500);
	};

	new FanliCart();

})()