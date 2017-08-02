if(document.addEventListener) {
	document.addEventListener("DOMContentLoaded", sellerMenu);
} else {
	window.onload = sellerMenu;
}

function sellerMenu() {
	// 退出事件
	document.querySelector('.quit').addEventListener('tap', function() {

	})

	//mui初始化
	mui.init();
	
	function promptBtn(elem, text){
		document.querySelector('.mui-popup-button-bold').classList.add('mui-disabled');
		elem.innerHTML = text;
	}

	// 点击验证券密码事件
	document.getElementById("promptBtn").addEventListener('tap', function(e) {
		//	e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
		var btnArray = ['取消', '确定'];
		// 弹出框
		mui.prompt('', '', '请输入券密码', btnArray, function(e) {
				if(e.index == 1) {
					// 点击确定后的程序
					// e.value是input的内容

					// 显示验证中...
					var popup_text = document.querySelector('.mui-popup-text')
					popup_text.innerHTML = '<span class="mui-spinner"></span><span class="content">正在查询券密码</span>'
					// 验证时确定按钮不能点击
					document.querySelector('.mui-popup-button-bold').classList.add('mui-disabled');

					// 发送ajax(e.value)
					// 定时器只是模拟ajax的延迟，实际需要删除。内部的if语句也只是模拟，需要删除
					setTimeout(function() {
						// 请求完成后让loading消失
						// 如果success
						if(e.value == '1') {
							document.querySelector('.mui-popup-button-bold').classList.remove('mui-disabled');
							popup_text.innerHTML = '';
							window.location.href = "../main/main.html#validation" + e.value;
//							return true;
						}

						// error(服务器超时)
						if(e.value == '2') {
							promptBtn(popup_text,'您的网络异常，请稍后重试');
//							return false;
						}

						// error(如果输入错误)
						if(e.value == '3') {
							promptBtn(popup_text,'您的券密码输入有误');
//							return false;
						}

						// error(如果已经消费)
						if(e.value == '4') {
							promptBtn(popup_text,'此券号已经消费过');
//							return false;
						}
						
						// 这里要在ajax返回结果之后使用，让按钮重新可选
						document.querySelector('.mui-popup-button-bold').classList.remove('mui-disabled');
					}, 2000)
					
					// 这里要在ajax返回结果之后使用，让按钮重新可选，定时器不能模拟效果
					// document.querySelector('.mui-popup-button-bold').classList.remove('mui-disabled');
					return false;

				} else {
					// 点击取消后的程序
				}
			})
			// 让输入框只能输入数值
		document.querySelector('.mui-popup-input input').type = 'number';
	});

}