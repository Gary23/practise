if(document.addEventListener) {
	document.addEventListener("DOMContentLoaded", sellerMain);
} else {
	window.onload = sellerMain;
}


function sellerMain() {
	// 更新
	document.querySelector('.updata').addEventListener('tap', function() {
		window.location.reload();
	})

	if(window.location.hash == '') {
		// 打开页面首页通过ajax获取数据，页面刷新时未消费和已消费同时获取
		// 定时器是模拟ajax延迟，实际需要删除
		setTimeout(function() {
			// success
			// 假设接收到名为first_lis的json数据
			var first_lis = '{"before":' +
				'[' +
				'{"shop_name":"首次进入加载的商品一","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","start_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"},' +
				'{"shop_name":"首次进入加载的商品二","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","start_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"}' +
				'],' +
				'"after":' +
				'[' +
				'{"shop_name":"首次进入加载的已消费商品一","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","finsh_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"},' +
				'{"shop_name":"首次进入加载的已消费商品二","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","finsh_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"}' +
				']' +
				'}';

			ajaxList(first_lis, 0)

			// 如果error
			// mui.toast("您的网络异常，请连接网络后重试",{ duration:'short', type:'div' }) 

		}, 1000)
	} else
	// 如果是验证页面，和商品列表是一个页面，通过url的hash判断发送哪个ajax
	if(window.location.hash.indexOf('#validation') != -1) {
		// 这里要发送用户的券密码数据？ 如果需要，券密码为：psd = window.location.hash.substr(10,20); // 假设密码长度是20

		// 定时器是模拟ajax延迟，实际需要删除
		setTimeout(function() {
			// success
			// 假设接收到名为first_lis的json数据
			var first_lis = '{"before":' +
				'[' +
				'{"shop_name":"需要验证的商品","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","start_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"}' +
				'],' +
				'"after":' +
				'[' +
				'{"shop_name":"首次进入加载的已消费商品一","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","finsh_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"},' +
				'{"shop_name":"首次进入加载的已消费商品二","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","finsh_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"}' +
				']' +
				'}';

			ajaxList(first_lis, 1)

			// 如果error
			// mui.toast("您的网络异常，请连接网络后重试",{ duration:'short', type:'div' })

		}, 1000)
	}

	function ajaxList(data, type) {
		// 数据接收完毕，不论有没有数据都改变加载中...样式
		if(data == '') {
			document.querySelectorAll('.first-loading')[0].innerHTML = '商品列表为空'
			document.querySelectorAll('.first-loading')[1].innerHTML = '商品列表为空'
		} else {
			// 解析json数据
			var first_shop_obj = JSON.parse(data);
			// 判断数据中有没有未消费内容
			if(first_shop_obj.before == '') {
				document.querySelectorAll('.first-loading')[0].innerHTML = '商品列表为空'
			} else {
				var first_shop_before = template("shop-list-before", first_shop_obj);
				document.querySelector('.list-before').innerHTML += first_shop_before;
				if(type == 1) {
					document.querySelector('.before-validation').style.display = 'block';
				} else {
					document.querySelector('.before-load').style.display = 'block';
				}
				document.querySelectorAll('.first-loading')[0].style.display = 'none';
			}

			// 判断数据中有没有已消费内容
			if(first_shop_obj.after == '') {
				document.querySelectorAll('.first-loading')[1].innerHTML = '商品列表为空'
			} else {
				var first_shop_after = template("shop-list-after", first_shop_obj);
				document.querySelector('.list-after').innerHTML += first_shop_after;
				document.querySelector('.after-load').style.display = 'block';
				document.querySelectorAll('.first-loading')[1].style.display = 'none';
			}
		}
	}

	//初始化mui
	mui.init();
	//未消费商品点击加载更多
	mui(document.body).on('tap', '.before-loading', function(e) {
		// 按钮变为loading样式
		mui(this).button('loading');
		// 发送ajax
		// 定时器是模拟ajax延迟，实际需要删除
		setTimeout(function() {
			// 假设接收到名为lis的json数据
			var before = '{"before":' +
				'[' +
				'{"shop_name":"未消费区域加载更多的商品一","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","start_time":"2017.03.03 16:30","beizhu":"备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1备注信息1","img_url":"../common/images/1.jpg"},' +
				'{"shop_name":"未消费区域加载更多的商品二","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","start_time":"2017.03.03 16:30","beizhu":"备注信息2","img_url":"../common/images/1.jpg"}' +
				']}';
			// 按钮文字恢复
			mui(this).button('reset');
			// 将数据添加到html中
			ajaxMore(before,'before');
			
		}.bind(this), 1000);
	});

	//已消费商品点击加载更多
	mui(document.body).on('tap', '.after-loading', function(e) {
		// 按钮变为loading样式
		mui(this).button('loading');
		// 发送ajax
		// 定时器是模拟ajax延迟，实际需要删除
		setTimeout(function() {
			// 假设接收到名为lis的json数据
			var after = '{"after":' +
				'[' +
				'{"shop_name":"已消费区域加载更多的商品一","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","finsh_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"},' +
				'{"shop_name":"已消费区域加载更多的商品一","price":200.00,"num":5,"order":"1703171155485101","user_name":"186XXXXXXXX","finsh_time":"2017.03.03 16:30","beizhu":"备注信息","img_url":"../common/images/1.jpg"}' +
				']}';
			// 按钮文字恢复
			mui(this).button('reset');
			// 将数据添加到html中
			ajaxMore(after,'after');
			
		}.bind(this), 1000);
	});
	
	function ajaxMore (data,type){
		if(data == ''){
			mui.toast("已经到底啦",{ duration:'short', type:'div' })
		}else{
			var shop_obj = JSON.parse(data);
			var shop_list = template('shop-list-' + type, shop_obj);
			document.querySelector('.list-' + type).innerHTML += shop_list;
		}
	}
	
	

	//备注按钮的点击事件
	var items = document.querySelectorAll('.mui-table-view');

	var popup_title = '<div class="mui-popup-title">备注信息</div>';
	var popup_wapper = '<div class="mui-scroll-wrapper">' + '<div class="mui-scroll">' + '<p class="popover-bz"></p>' + '</div>' + '<div class="mui-scrollbar mui-scrollbar-vertical">' + '<div class="mui-scrollbar-indicator"></div>' + '</div>' + '</div>';
	var popup_btn = '<div class="mui-popup-buttons">' + '<span class="mui-popup-button mui-popup-button-bold">确定</span>' + '</div>';
	var popup_inner = '<div class="mui-popup-inner">' + popup_title + popup_wapper + '</div>' + popup_btn;

	for(var i = 0, items_len = items.length; i < items_len; i++) {
		mui(items[i]).on('tap', '.mui-table-view-cell', function() {
			var text_bz = this.querySelector('.beizhu-text').innerHTML;

			setTimeout(function() {
				document.querySelector('.mui-popup').innerHTML = popup_inner;
				var popover_bz = document.querySelector('.popover-bz');
				popover_bz.innerHTML = text_bz;
				//备注信息滚动
				mui('.mui-scroll-wrapper').scroll();
				mui('body').on('shown', '.mui-popover', function(e) {});
				mui('body').on('hidden', '.mui-popover', function(e) {
					document.querySelector('.mui-scroll').style.transform = 'translate3d(0px, 0px, 0px) translateZ(0px)';
				});
			}, 5);

			mui.alert('', '', function() {

			});
		})
	}

	// 立即验证券密码
	if(document.querySelector('.validation')) {
		document.querySelector('.validation').addEventListener('tap', function() {
			// 按钮变为loading样式
			mui(this).button('loading');
			// 发送ajax
			// 定时器是模拟ajax延迟，实际需要删除
			setTimeout(function() {
				// 按钮文字恢复
				mui(this).button('reset');

				// 接收到数据
				mui.alert('成功或者失败的提示', '提示', function() {
					window.location.reload();
				});
				// success

				// error
			}.bind(this), 1000);
		})
	}

}