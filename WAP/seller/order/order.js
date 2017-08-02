if(document.addEventListener) {
	document.addEventListener("DOMContentLoaded", sellerOrder);
} else {
	window.onload = sellerOrder;
}

function sellerOrder() {
	document.querySelector('.updata').addEventListener('tap', function() {
		window.location.reload();
	})

	// 打开页面首页通过ajax获取数据
	// 定时器是模拟ajax延迟，实际需要删除
	setTimeout(function() {
		// success
		// 假设接收到名为first_lis的json数据
		var order = '{"order":' +
			'[' +
			'{"id":"1703171155485101","price":200.00,"user_name":"186XXXXXXXX","user_phone":"186XXXXXXXX","finsh_time":"2017.03.03 16:30"},' +
			'{"id":"1703171155485101","price":200.00,"user_name":"186XXXXXXXX","user_phone":"186XXXXXXXX","finsh_time":"2017.03.03 16:30"}' +
			']}';

		if(order == '') {
			document.querySelector('.first-loading').innerHTML = '暂无订单';
		} else {
			// 解析json数据
			var order_obj = JSON.parse(order);
			var order_list = template("order-list", order_obj);
			document.querySelector('.mui-table-view').innerHTML += order_list;
			document.querySelector('.first-loading').style.display = 'none';
			document.querySelector('.order-load').style.display = 'block';
		}

		// 如果error
		// mui.toast("您的网络异常，请连接网络后重试",{ duration:'short', type:'div' }) 

	}, 1000)

	//加载更多
	mui(document.body).on('tap', '.order-loading', function(e) {
		// 按钮变为loading样式
		mui(this).button('loading');
		// 发送ajax
		// 定时器是模拟ajax延迟，实际需要删除
		setTimeout(function() {
			// 假设接收到名为lis的json数据
			var order = '{"order":' +
				'[' +
				'{"id":"1703171155485101","price":200.00,"user_name":"186XXXXXXXX","user_phone":"186XXXXXXXX","finsh_time":"2017.03.03 16:30"},' +
				'{"id":"1703171155485101","price":200.00,"user_name":"186XXXXXXXX","user_phone":"186XXXXXXXX","finsh_time":"2017.03.03 16:30"}' +
				']}';
			// 按钮文字恢复
			mui(this).button('reset');
			// 将数据添加到html中
			if(order == '') {
				mui.toast("已经到底啦", {
					duration: 'short',
					type: 'div'
				})
			} else {
				var order_obj = JSON.parse(order);
				var order_list = template("order-list", order_obj);
				document.querySelector('.mui-table-view').innerHTML += order_list;
			}
		}.bind(this), 1000);
	});
}