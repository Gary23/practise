(function(){

	function setLocal(k, v) {
		if (!k && !v) return false;
		if (!v) {
			for (i in k) {
				window.localStorage.setItem(i, k['i']);
			}
		} else {
			window.localStorage.setItem(k, v);
		}
	}

	function getLocal(k) {
		return window.localStorage.getItem(k);
	}

	function removeLocal(k) {
		window.localStorage.removeItem(k);
	}

	var ua = window.location.pathname;

	if (ua === '/mlapp/cart.html') {

		var $parent = $('.bundlev2').not('#bundlev2_invalid'),
			$bundlev,
			$item = $parent.find('.o-t-item'),
			edit_btn,
			timerDel,
			index,
			$currentItem,
			$shop_icon,
			$shop_t,
			item_obj = {},
			arr_id = [],
			cur,
			flag = false;

		if (!getLocal('item_index') || getLocal('item_index') === '0') {
			setLocal('item_index','0');
			setLocal('start','0');
		}

		function getCurrentItem(index) {
			if (typeof index != 'number') return false;
			arr_id = getLocal('allId').split(',');
			var $currentItem;
			for (var i = 0,l = $item.length; i < l; i++) {
				var link = $item.eq(i).find('.item-img > a').prop('href');
				if (link.indexOf(arr_id[index]) >= 0) {
					$currentItem = $item.eq(i);
					cur = i;
					break;
				}
			}
			return $currentItem;
		}

		function getAllId() {
			var arr = [];
			for (var i = 0,l = $item.length; i < l; i++) {
				var link = $item.eq(i).find('.item-img > a').prop('href').split('/');
				var id = link[link.length - 1].match(/\d+/g);
				arr.push(id);
			}
			return arr;
		}

		function createBtn() {
			var span = $('<span id="getFanliAili"></span>');
			
			span.css({
				display: 'block',
				position: 'absolute',
				right: '0.15rem',
				top: '0.15rem',
				background: '#f50',
				width:'2.2rem',
				height:'0.9rem',
				borderRadius: '30px',
				color: '#fff',
				textAlign: 'center',
				lineHeight: '0.9rem',
				fontSize: '0.38rem',
				zIndex: '999999999999'
			});

			$('body').append(span);
		}

		function ajaxItemLink(data) {
			index++;
			setLocal('item_index', index);
			// 模拟ajax的success
			window.setTimeout(function(){
				var sku = item_obj['$item_sku'].html() || '';
				var num = item_obj['$input'].val();

				if ($shop_icon.hasClass('shopIco_B') || $shop_icon.hasClass('shopIco_SM')) {
					var url = '//detail.m.tmall.com/item.htm?id=' + data;
					url = url + '&sku=' + sku + '&num=' + num;
					window.open(encodeURI(url),'_self');
				} else if ($shop_icon.hasClass('shopIco_C')) {
					var url = '//h5.m.taobao.com/awp/core/detail.htm?id=' + data;
					url = url + '&sku=' + sku + '&num=' + num;
					window.open(encodeURI(url),'_self');
				}
			},500)
		}

		function delItem() {
			item_obj['$item_del'].click();

			var $pop = $('.confirmMode'),
				$del_btn = $pop.find('.ok');

			timerDel = window.setInterval(function(){
				if ($pop && $pop.css('display') === 'block') {
					window.clearInterval(timerDel);
					$del_btn.click();
					// 在这里发送ajax
					ajaxItemLink(arr_id[index]);
				}
			},20)
		}

		function fanliMain() {
			// 判断是否已经存储了全部id，用来获取本次要删除的id。
			if (getLocal('allId')) {
				$currentItem = getCurrentItem(index);
			} else {
				setLocal('allId',getAllId());
				$currentItem = getCurrentItem(index);
			}

			item_obj['$item_sku'] = $currentItem.find('.sku > p');
			// 获取店铺的标题
			$bundlev = $currentItem.parents('.bundlev2');
			// 获取店铺图标，用来判断是天猫还是淘宝
			$shop_icon = $bundlev.find('.ico > span');
			// 获取当前店铺全部编辑按钮
			$shop_t = $bundlev.find('.o-t-title-shop .edit');

			// 获取当前编辑按钮
			for (var i = 0, shop_t_l = $shop_t.length; i < shop_t_l; i++) {
				if($shop_t.eq(i).html() === '编辑') {
					$shop_t.eq(i).click();   // 点击编辑按钮
				}
			}

			window.setTimeout(function(){
				var parent = $parent.find('.o-t-item').eq(cur);
				item_obj['$item_del'] = parent.find('.item-del.c-edit-delshow');
				item_obj['$input'] = parent.find('.btn-input > input');
				delItem();
			},100)
		}

		// 获取本次索引
		if (getLocal('item_index')) {
			index = +getLocal('item_index');
		}
		
		
		createBtn();

		if (getLocal('item_max') && getLocal('start') == '1') {
			if (index < +getLocal('item_max')) {
				fanliMain();
			} else {
				removeLocal('allId');
				removeLocal('item_max');
				setLocal('item_index','0');
				setLocal('start','0');
				$('#getFanliAili').html('开始');
				alert('已完成');
			}
		}


		// 根据进度改变开始按钮
		if (getLocal('start') == '0') {
			$('#getFanliAili').html('开始')
			$('#getFanliAili').click(function(){
				// 初始化缓存
				setLocal('item_max',$item.length);
				setLocal('allId',getAllId());
				setLocal('start','1');
				fanliMain();
			})
		} else {
			$('#getFanliAili').html('进行中');
		}

	} else if (ua === '/item.htm') {
		
		var btn = document.querySelector('#s-actionBar-container .trade .cart'),
			widgets,
			time_count = 0;
			$parent;
			
		var fanli_search = getSearch(window.location.search);

		var timer = window.setInterval(function(){
			time_count++;
			if (fanli_search) {
				widgets = decodeURI(window.location.search);
				if (widgets.indexOf('decision=cart') != -1) {
					window.clearInterval(timer);
					$parent = document.querySelector('.widgets-cover');
					if (fanli_search["sku"]) {
						setSku();
					} else {
						setNum();
					}

				} else {
					if (time_count > 50) {
						window.clearInterval(timer);
						notSkuCart(fanli_search["num"] - 1);  // 因为getSearch已经点了一下，所以这里要少点一次
					}
				}
			}
		},20)

		function getSearch(search) {
			var arr = search.split('&');
			var obj = {};
			btn.click();
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].indexOf('num=') >= 0) {
					obj['num'] = arr[i].split('=')[1];
				}
				if (arr[i].indexOf('sku=') >= 0) {
					var sku = decodeURI(arr[i].split('=')[1])
					obj['sku'] = sku.split(';');
				}
			}
			return obj;
		}

		function notSkuCart(num) {
			var count = 0;
			var timer_num = window.setInterval(function(){
				if (count < num) {
					count++;
					btn.click();
				} else {
					window.setTimeout(function(){
						window.history.go(-1);
					},300)
				}
			},300)
		}

		function setSku() {
			
			var list_sku = $parent.querySelectorAll('.sku-list-wrap li .items a');
			if (!list_sku) return false;
			var sku_arr = fanli_search["sku"];

			for (var i = 0, sku_l = sku_arr.length; i < sku_l; i++) {
				for (var j = 0, list_l = list_sku.length; j < list_l; j++) {
					if (sku_arr[i] == list_sku[j].innerHTML) {
						if (list_sku[j].className.indexOf('checked') < 0) {
							list_sku[j].click();
							break;
						}
					}
				}
			}
			setNum();
		}

		function setNum() {
			var input = document.querySelector('.number .increase');
			if (!input) {
				skuCart();
			};
			if (fanli_search["num"]) {
				for (var i = 1; i < fanli_search["num"]; i++) {
					input.click();
				}
			}
			skuCart();
		}

		function skuCart() {
			var enter_btn = $parent.querySelector('.footer .ok');
			window.setTimeout(function(){
				enter_btn.click();
				window.setTimeout(function(){
					window.history.go(-1);
				},500)
			},500)
		}
	} else if (ua === '/awp/core/detail.htm') {
		var bottom = document.querySelector('.bottom_bar.homePage');
		var cart_btn = bottom.querySelector('.sys_button.cart ');
		var search = window.location.search;
		var time_count = 0;
		var widgets;
		
		var fanli_search = getSearch(search);

		var timer = window.setInterval(function(){
			time_count++;
			if (fanli_search) {
				widgets = document.querySelector('#J_skuPop');
				if (widgets.className.indexOf('show') != -1) {
					window.clearInterval(timer);
					if (fanli_search["sku"]) {
						setSku();
					} else {
						setNum();
					}
				} else {
					if (time_count > 50) {
						window.clearInterval(timer);
						notSkuCart(fanli_search["num"] - 1);  // 因为getSearch已经点了一下，所以这里要少点一次
					}
				}
			}
		},10)

		function getSearch(search) {
			var arr = search.split('&');
			var obj = {};
			cart_btn.click();
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
		}

		function setSku() {
			var list_sku = widgets.querySelectorAll('.sku-info > div > ul > li');
			if (!list_sku) return false;
			var arr_sku = fanli_search['sku'];
			for (var i = 0; i < arr_sku.length; i++) {
				for (var j = 0; j < list_sku.length; j ++) {
					if (arr_sku[i] == list_sku[j].innerHTML) {
						if (list_sku[j].className.indexOf('sel') < 0) {
							list_sku[j].click();
							break;
						}
					}
				}
			}
			setNum();
		}

		function setNum() {
			var input = document.querySelector('.quantity-info .btn-plus');
			if (!input) {
				skuCart();
			};
			if (fanli_search["num"]) {
				for (var i = 1; i < fanli_search["num"]; i++) {
					input.click();
				}
			}
			skuCart();
		}

		function skuCart() {
			var enter_btn = widgets.querySelector('.sku-btns .addcart');
			window.setTimeout(function(){
				enter_btn.click();
				window.setTimeout(function(){
					window.history.go(-1);
				},500)
			},500)
		}
	}
})()