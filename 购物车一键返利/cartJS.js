(function(){
	var ua = window.location.host;
	if (ua === 'h5.m.taobao.com') {
		var $shop_t = $('.o-t-title-shop .edit'),
			shop_t_l = $shop_t.length,
			arr_shop_t = [],
			arr_id = [];

		var items,
			timerDel,
			$item_del,
			item_del_l,
			$item_link,
			$item_sku,
			item_count = 0,
			flag_del = false;

		for (var i = 0; i < shop_t_l; i++) {
			if($shop_t.eq(i).html() === '编辑') {
				arr_shop_t.push($shop_t.eq(i));
			}
		}

		for (var k = 0, kl = arr_shop_t.length; k < kl; k++) {
			arr_shop_t[k].click();
			if (k == kl - 1) {
				falg_del = true;
			}
		}

		var timer = window.setInterval(function(){
			if (falg_del) {
				window.clearInterval(timer);
				var obj = getItemDel();
				$item_del = obj['$item_del'];
				$item_link = obj['$item_link'];
				$item_sku = obj['$item_sku'];
				item_del_l = $item_del.length;
				delItem(item_count);
			}
		},10)

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
			window.localStorage.getItem(k);
		}

		function removeLocal(k) {
			window.localStorage.removeItem(k);
		}

		function getItemDel() {
			var parent = $('.bundlev2').not('#bundlev2_invalid');
			return obj = {
				'$item_del': parent.find('.o-t-item .item-del'),
				'$item_link': parent.find('.o-t-item .item-img > a'),
				'$item_sku':  parent.find('.o-t-item .sku > p')
			}
		}

		function getItemLink(index) {
			var link = $item_link.eq(index).prop('href').split('/');
			var id = link[link.length - 1];
			var data = id.match(/\d+/g);
			ajaxItemLink(index,data);

		}

		function ajaxItemLink(index,data) {
			// 模拟ajax
			window.setTimeout(function(){
				// var sku = $item_sku.eq(index).html();
				// setLocal({
				// 	'index_77258': index,
				// 	'sku_77258': sku
				// })
				arr_id.push($item_link.eq(index).prop('href'));
				console.log(arr_id);
			},100)
		}

		function delItem(count) {
			$item_del[count].click();
			getItemLink(count);

			var $pop = $('.confirmMode'),
				$del_btn = $pop.find('.ok');

			timerDel = window.setInterval(function(){
				if ($pop.css('display') != 'none') {
					window.clearInterval(timerDel);
					$del_btn.click();
					count++;
					// if (count >= item_del_l) {
					if (count >= 3) {
						openItemLink();
						return count;
					} else {
						delItem(count);
					}
				}
			},500)
		}

		function openItemLink() {
			var timerArr = window.setInterval(function(){
				// arr_id.length == item_del_l;
				if (arr_id.length === 3) {
					window.clearInterval(timerArr);
					var sku = $item_sku.eq(0).html();
					setLocal({
						'index_77258': 0,
						'sku_77258': sku,
						'item_del_77258': 1
					})
				};
			},100)
		}

		// function setIframe(url) {
		// 	var iframe = $('<iframe src="' + url + '" style="width: 1px;height: 1px;"></iframe>');
		// 	$('body').append(iframe);
		// 	iframe[0].onload(function(){

		// 	})
		// }
	} else if (ua === 'detail.m.tmall.com') {

	}

})()
